;(function(){ // WebGL renderer // gemini 3 Pro
  
  console.log("geminigl renderer");
  // --- 1. Constants & Config ---
  const MAX_INSTANCES = 20000;
  const ATLAS_SIZE = 1024;
  const FONT_SIZE = 64;
  const UNIT_PX = 16; // 1 '~' (em) = 16px
  
  // --- 2. Font Atlas Generation (Canvas 2D -> Texture) ---
  const atlasCanvas = document.createElement('canvas');
  atlasCanvas.width = atlasCanvas.height = ATLAS_SIZE;
  const actx = atlasCanvas.getContext('2d');
  actx.font = `bold ${FONT_SIZE}px sans-serif`;
  actx.textBaseline = 'top';
  actx.fillStyle = 'white';
  
  const glyphs = {};
  let gx = 0, gy = 0, gh = FONT_SIZE * 1.2;
  // White pixel for solid boxes
  actx.fillRect(0,0,4,4);
  const whiteUV = [0,0, 4/ATLAS_SIZE, 4/ATLAS_SIZE];
  gx += 8;

  // Generate ASCII
  for(let i=32; i<127; i++){
    const char = String.fromCharCode(i);
    const m = actx.measureText(char);
    const w = Math.ceil(m.width);
    if(gx + w > ATLAS_SIZE){ gx = 0; gy += gh; }
    actx.fillText(char, gx, gy);
    glyphs[char] = {
      uv: [gx/ATLAS_SIZE, gy/ATLAS_SIZE, w/ATLAS_SIZE, FONT_SIZE/ATLAS_SIZE],
      aspect: w / FONT_SIZE,
      w: w
    };
    gx += w + 4;
  }
  
  // --- 3. WebGL Setup ---
  
  const canvas = document.createElement('canvas');
  canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;";
  const gl = canvas.getContext('webgl', {alpha: true, antialias: false}) || canvas.getContext('experimental-webgl');
  const ext = gl.getExtension('ANGLE_instanced_arrays');
  
  // Shaders
  const VS = `
  attribute vec2 a_vert;
  attribute vec3 a_pos;
  attribute vec2 a_size;
  attribute vec4 a_color;
  attribute vec4 a_uv;
  attribute vec3 a_turn; // rotZ, rotX, rotY
  
  uniform mat4 u_proj;
  
  varying vec4 v_color;
  varying vec2 v_uv;
  
  void main() {
    // 1. Scale
    vec2 pos = (a_vert - 0.5) * a_size;
    
    // 2. Rotate (Simple Z-axis for UI, can expand to 3D)
    float c = cos(a_turn.x * 6.28318);
    float s = sin(a_turn.x * 6.28318);
    vec2 rotPos = vec2(pos.x * c - pos.y * s, pos.x * s + pos.y * c);
    
    // 3. Translate
    vec3 finalPos = a_pos + vec3(rotPos, 0.0);
    
    gl_Position = u_proj * vec4(finalPos, 1.0);
    v_color = a_color;
    v_uv = a_uv.xy + a_vert * a_uv.zw;
  }`;
  
  const FS = `
  precision mediump float;
  varying vec4 v_color;
  varying vec2 v_uv;
  uniform sampler2D u_tex;
  void main() {
    vec4 tex = texture2D(u_tex, v_uv);
    // Text acts as alpha mask, Block is white texture * color
    gl_FragColor = v_color * tex;
    if(gl_FragColor.a < 0.1) discard;
  }`;
  
  function compile(type, src){
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);
  
  // Buffers
  // Quad
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0, 1,0, 0,1, 1,0, 1,1, 0,1]), gl.STATIC_DRAW);
  const a_vert = gl.getAttribLocation(prog, 'a_vert');
  gl.enableVertexAttribArray(a_vert);
  gl.vertexAttribPointer(a_vert, 2, gl.FLOAT, false, 0, 0);
  
  // Instances
  const instanceBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, MAX_INSTANCES * 64, gl.DYNAMIC_DRAW); // Preallocate
  
  const stride = 64; // 16 floats * 4 bytes
  const attrs = [
    {name: 'a_pos', size: 3, off: 0},
    {name: 'a_size', size: 2, off: 12},
    {name: 'a_color', size: 4, off: 20},
    {name: 'a_uv', size: 4, off: 36},
    {name: 'a_turn', size: 3, off: 52}
  ];
  attrs.forEach(a => {
    const loc = gl.getAttribLocation(prog, a.name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, a.size, gl.FLOAT, false, stride, a.off);
    ext.vertexAttribDivisorANGLE(loc, 1);
  });
  
  // Texture
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlasCanvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  
  // --- 4. Scene Graph & Layout Engine ---
  
  const nodes = new Map();
  let root = null;
  
  class Node {
    constructor(name) {
      this.name = name;
      this.children = [];
      this.parent = null;
      // Physics / Animation State
      this.t = { // Targets
        fill: [0,0,0,0], size: [[1,'~',1,'~'],[1,'~',1,'~']], 
        flow: ['>','v'], drip: 0,
        turn: [0,0,0], grab: [0,0,0], zoom: [1,1,1],
        time: 0, text: null
      };
      this.c = { // Current
        fill: [0,0,0,0], size: [0,0], // Computed size
        turn: [0,0,0], grab: [0,0,0], zoom: [1,1,1],
        pos: [0,0,0]
      };
      // Animation tracking
      this.anim = {}; // Stores start val, start time, duration per prop
      this.layout = {x:0, y:0, w:0, h:0};
      this.isText = false;
    }
    
    update(dt, now) {
      // Interpolate properties
      const props = ['fill','turn','grab','zoom'];
      for(let k of props){
        if(!this.anim[k]) { this.anim[k] = {v: this.t[k], t:0, d:0, s: this.t[k]}; this.c[k] = this.t[k]; }
        const a = this.anim[k];
        if(a.d > 0) { // Animating
           let t = (now - a.t) / a.d;
           if(t >= 1) { t = 1; a.d = 0; }
           // Ease Out Quad
           t = t * (2 - t); 
           if(k === 'fill') this.c[k] = a.s.map((v,i) => v + (this.t[k][i]-v)*t);
           else this.c[k] = a.s.map((v,i) => v + (this.t[k][i]-v)*t);
        } else {
           this.c[k] = this.t[k];
        }
      }
    }

    set(prop, val) {
      if(prop === 'fill' && typeof val === 'string') {
        this.t.text = val;
        this.isText = true;
        this.t.fill = [1,1,1,1]; // Text color default
      } else {
        if(prop === 'fill' && val.length === 3) val = [...val, 1];
        this.t[prop] = val;
        // Start animation if time > 0
        if(this.t.time > 0 && prop in this.c) {
          this.anim[prop] = {
            s: [...this.c[prop]], 
            t: performance.now()/1000, 
            d: this.t.time,
            v: val
          };
        }
      }
    }
  }
  
  // Layout Engine (Flex-ish)
  function computeLayout(node, parentW, parentH) {
    const S = node.t.size;
    const U = (v, u, ref) => (u === '%' ? v/100 * ref : (u === '~' ? v * UNIT_PX : v));
    
    // 1. Determine constraints
    let minW = U(S[0][0], S[0][1], parentW);
    let maxW = U(S[0][2], S[0][3], parentW);
    let minH = U(S[1][0], S[1][1], parentH);
    let maxH = U(S[1][2], S[1][3], parentH);
    
    // 2. Measure Content
    let contentW = 0, contentH = 0;
    
    if(node.isText && node.t.text) {
      // Text wrapping logic
      const words = node.t.text.split(' ');
      let lx = 0, ly = 0, lh = UNIT_PX; // Default line height
      let maxL = 0;
      // Rough estimation for wrapping
      words.forEach(word => {
        let ww = 0;
        for(let c of word) ww += (glyphs[c]?.aspect || 0.5) * UNIT_PX; // Assume 1em font size
        if(lx + ww > maxW && maxW > 0) {
           if(lx > maxL) maxL = lx;
           lx = 0; ly += lh;
        }
        lx += ww + (UNIT_PX * 0.3); // Space
      });
      contentW = maxW > 0 ? Math.max(maxL, lx) : lx;
      contentH = ly + lh;
    } else {
      // Children Layout
      // Simplification: Assume 'flow' directs layout. 
      // Main Axis / Cross Axis
      // If flow > : sum widths, max height
      const dir = node.t.flow[0]; 
      const isRow = (dir === '>' || dir === '<');
      
      // First pass: measure children with available space
      node.children.forEach(c => {
        const d = computeLayout(c, maxW, maxH); // Recursive
        if(isRow) {
          contentW += d.w;
          contentH = Math.max(contentH, d.h);
        } else {
          contentW = Math.max(contentW, d.w);
          contentH += d.h;
        }
      });
    }
    
    // 3. Resolve Size
    node.layout.w = Math.max(minW, Math.min(contentW, maxW || 99999));
    node.layout.h = Math.max(minH, Math.min(contentH, maxH || 99999));
    
    // 4. Position Children (Arrange)
    // Only if not text (Text is handled in render emit)
    if(!node.isText) {
      let cx = 0, cy = 0;
      const drip = node.t.drip;
      const dir = node.t.flow[0];
      
      // Calculate total used space for alignment
      let totalUsed = 0;
      node.children.forEach(c => totalUsed += (dir==='>'||dir==='<'?c.layout.w:c.layout.h));
      
      // Drip Alignment (Start: -1, Center: 0, End: 1)
      let offset = 0;
      if(dir === '>') offset = (drip === 0) ? (node.layout.w - totalUsed)/2 : (drip === 1 ? node.layout.w - totalUsed : 0);
      else if(dir === 'v') offset = (drip === 0) ? (node.layout.h - totalUsed)/2 : (drip === 1 ? node.layout.h - totalUsed : 0);

      // Handle Direction
      if(dir === '>') cx = offset;
      if(dir === 'v') cy = offset;
      
      node.children.forEach(c => {
         // Cross-axis alignment (drip applies to main axis pack, but maybe cross axis too? 
         // Test case implies drip affects start/center/end of flow.
         // Let's keep it simple: Center on cross axis
         let ox = 0, oy = 0;
         if(dir === '>' || dir === '<') oy = (node.layout.h - c.layout.h)/2;
         else ox = (node.layout.w - c.layout.w)/2;
         
         c.layout.x = cx + ox;
         c.layout.y = cy + oy;
         
         // Advance
         if(dir === '>') cx += c.layout.w;
         else if(dir === '<') cx -= c.layout.w;
         else if(dir === 'v') cy += c.layout.h;
         else if(dir === '^') cy -= c.layout.h;
      });
    }
    
    return node.layout;
  }
  
  // Instance Data Generation
  const data = new Float32Array(MAX_INSTANCES * 16);
  let ptr = 0;
  
  function emit(node, px, py, pz) {
    // Apply Physics/Anim offsets
    const gx = node.c.grab[0] * UNIT_PX + px + node.layout.x; // Simplified unit conversion
    const gy = node.c.grab[1] * UNIT_PX + py + node.layout.y;
    const gz = pz; // Z is flat
    
    const sx = node.layout.w * node.c.zoom[0];
    const sy = node.layout.h * node.c.zoom[1];
    
    if(node.isText && node.t.text) {
      // Render Glyphs
      const words = node.t.text.split(' ');
      const fontSize = UNIT_PX; // 1em
      let lx = 0, ly = 0;
      const lh = fontSize;
      
      // Check wrap width
      const maxW = node.layout.w;
      
      words.forEach(word => {
        // Measure word
        let ww = 0;
        for(let c of word) ww += (glyphs[c]?.aspect || 0.5) * fontSize;
        
        if(lx + ww > maxW && maxW > 0) { lx = 0; ly += lh; }
        
        // Draw word
        for(let c of word) {
           const g = glyphs[c] || glyphs['?'];
           if(!g) continue;
           const gw = g.aspect * fontSize;
           
           // Push Instance
           if(ptr < MAX_INSTANCES){
             const i = ptr * 16;
             data[i] = gx + lx + gw/2; // Center X
             data[i+1] = gy + ly + lh/2; // Center Y (Text is top-left usually, shifting)
             data[i+2] = gz;
             data[i+3] = gw; // Size W
             data[i+4] = fontSize; // Size H
             
             data[i+5] = node.c.fill[0]; // R
             data[i+6] = node.c.fill[1]; // G
             data[i+7] = node.c.fill[2]; // B
             data[i+8] = node.c.fill[3]; // A
             
             data[i+9] = g.uv[0]; // U
             data[i+10] = g.uv[1]; // V
             data[i+11] = g.uv[2]; // UW
             data[i+12] = g.uv[3]; // UH
             
             data[i+13] = node.c.turn[0]; // Rot
             // ...
             ptr++;
           }
           lx += gw;
        }
        lx += fontSize * 0.3; // Space
      });
      
    } else {
      // Render Box Background if has fill
      if(node.t.fill[3] > 0) {
         if(ptr < MAX_INSTANCES){
           const i = ptr * 16;
           data[i] = gx + sx/2;
           data[i+1] = gy + sy/2;
           data[i+2] = gz;
           data[i+3] = sx;
           data[i+4] = sy;
           
           data[i+5] = node.c.fill[0];
           data[i+6] = node.c.fill[1];
           data[i+7] = node.c.fill[2];
           data[i+8] = node.c.fill[3];
           
           data[i+9] = whiteUV[0];
           data[i+10] = whiteUV[1];
           data[i+11] = whiteUV[2];
           data[i+12] = whiteUV[3];
           
           data[i+13] = node.c.turn[0];
           ptr++;
         }
      }
      // Children
      node.children.forEach(c => emit(c, gx, gy, gz + 0.1));
    }
  }

  // --- 5. Main Loop & RPC ---
  
  sr.how.view = function(list) {
    if(!document.contains(canvas)) document.getElementById('SecureRender').appendChild(canvas);
    if(!root) { root = new Node('SecureRender'); nodes.set('SecureRender', root); }
    
    list.forEach(msg => {
       let n = nodes.get(msg.name);
       // Handle sort/insertion
       if(msg.sort) {
         const [how, relName] = msg.sort;
         const rel = nodes.get(relName);
         if(rel) {
            // Create if new
            if(!n) { n = new Node(msg.name); nodes.set(msg.name, n); }
            // Detach
            if(n.parent) n.parent.children = n.parent.children.filter(c => c!==n);
            // Attach
            n.parent = rel;
            if(Math.abs(how) === 0.1) rel.children[how>0?'push':'unshift'](n); // Into
            else if(rel.parent) { // After/Before
               n.parent = rel.parent;
               const idx = rel.parent.children.indexOf(rel);
               rel.parent.children.splice(idx + (how>0?1:0), 0, n);
            }
         }
       }
       if(n) {
         Object.keys(msg).forEach(k => {
           if(k !== 'sort' && k !== 'name') n.set(k, msg[k]);
         });
       }
    });
  };

  function loop() {
    requestAnimationFrame(loop);
    if(!root) return;
    
    const now = performance.now()/1000;
    
    // 1. Update State (Physics)
    const update = (n) => { n.update(0.016, now); n.children.forEach(update); };
    update(root);
    
    // 2. Layout
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    gl.viewport(0,0,w,h);
    computeLayout(root, w, h);
    
    // 3. Render
    ptr = 0;
    emit(root, 0, 0, 0);
    
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Projection (Top-Left 0,0)
    const proj = [
      2/w, 0, 0, 0,
      0, -2/h, 0, 0,
      0, 0, -0.01, 0,
      -1, 1, 0, 1
    ];
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, 'u_proj'), false, proj);
    
    // Upload & Draw
    gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, data.subarray(0, ptr*16));
    ext.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, ptr);
  }
  loop();

}());