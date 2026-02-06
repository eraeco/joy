;(function(){

// *WEBGL

// TODO: Jargon Buzzword Bug! All "views" need to be Neural Gaussian Klien Riemann Mobius Tetra/icosahedron Manifolds
//return; // WEBGL RENDERER TURNED OFF BY DEFAULT, COMMENT OUT THIS LINE TO REPLACE THE HTML ONE. IT IS STILL COMPLETELY BROKEN AND DOES NOT OBEY THE LAYOUT RULES YET.

class Box {
  constructor(name) {
    this.name = name;
    this.id = 'v'+name.replace(aZ09,'');
    this.size = [1,1,1];
    this.turn = [0,0,0];
    this.grab = [0,0,0];
    this.zoom = [1,1,1];
    //this.warp = [0,0,0]; // bend or skew?
    this.fill = [0,0,0,1];
    this.away;
    this.drip = [0,0,0];
    this.flow;
    this.unit = { turn: [], zoom: [], grab: [] };

    this.actualSize = [0.1, 0.1, 0.1];  // In GL units
    this.actualGrab = [0, 0, 0];  // In GL units
  }

  *getChildren() {
    for (let child = this.firstChild; child; child = child.nextSibling) {
      yield child;
    }
  }

  get children () {
    return this.getChildren();
  }

  remove() {
    if (this === rootBox) return null;
    name2box.delete(this.name);

    const prev = this.previousSibling;
    const next = this.nextSibling;

    if (!prev) {
      this.parent.firstChild = next;
    }
    else {
      prev.nextSibling = next;
    }

    if (!next) {
      this.parent.lastChild = prev;
    }
    else {
      next.previousSibling = prev;
    }
  }

  insertAdjacent(where, what) {
    switch (where) {
      case 'beforebegin':
        if (this === rootBox) {
          return what.remove();
        }

        const prev = this.previousSibling;

        what.nextSibling = this;
        what.previousSibling = prev;
        what.parent = this.parent;
        this.previousSibling = what;

        if (!prev) {
          this.parent.firstChild = what;
        }
        else {
          prev.nextSibling = what;
        }
        break;

      case 'afterend':
        if (this === rootBox) {
          return what.remove();
        }

        const next = this.nextSibling;

        what.nextSibling = next;
        what.previousSibling = this;
        what.parent = this.parent;
        this.nextSibling = what;

        if (!next) {
          this.parent.lastChild = what;
        }
        else {
          next.previousSibling = what;
        }
        break;

      case 'afterbegin':
        const first = this.firstChild;

        what.parent = this;
        what.nextSibling = first;
        this.firstChild = what;

        if (first) {
          first.previousSibling = what;
        }
        else {
          this.lastChild = what;
        }
        break;

      case 'beforeend':
        const last = this.lastChild;

        what.parent = this;
        what.previousSibling = last;
        this.lastChild = what;

        if (last) {
          last.nextSibling = what;
        }
        else {
          this.firstChild = what;
        }
        break;

      default:
        return console.error('Cannot insert here:', where);
    }
    name2box.set(what.name, what);
  }

  // Calculates actualGrab for all children (relative to this), and this.actualSize
  innerLayout() {
    const oneTilde = 50;

    // TODO: deal with other units
    this.actualSize = this.size.map(d => (d[0] || d) / oneTilde);
    if (!this.firstChild) return;

    const flow = this.flow?.map(f => '><v^'.indexOf(f)) || [0, 2, 4];
    if (flow.length < 3) flow[2] = 4;
    const actual2logical = v => flow.map(f => v[f >> 1]);
    const logical2actual = v => v.reduce((acc, a, i) => Object.assign(acc, {[flow[i] >> 1]: a}), []);

    const drip = Array.isArray(this.drip) ? this.drip : [this.drip, this.drip, this.drip];

    const [cWidth, cHeight] = actual2logical(this.size.map(d => (d[2] || d[0] || d) / oneTilde));

    const boxes = [...this.children];

    boxes.forEach(child => child.innerLayout());

    let offsetY = 0.;
    let i = 0;
    let maxLineWidth = 0.;

    while (i < boxes.length) {
      let j = i, lineWidth = 0., maxLineHeight = 0.;

      while (j < boxes.length) {
        let [dx, dy] = boxes[j].logicalSize = actual2logical(boxes[j].actualSize);

        if (lineWidth + dx > cWidth) break;
        j++;
        lineWidth += dx;
        if (dy > maxLineHeight) maxLineHeight = dy;
      }

      if (lineWidth > maxLineWidth) maxLineWidth = lineWidth;
      let offsetX = 0;

      while (i < j) {
        const logicalGrab_i = actual2logical(boxes[i].grab);

        boxes[i].logicalGrab = [
          offsetX + logicalGrab_i[0] / oneTilde,
          offsetY + logicalGrab_i[1] / oneTilde + 0.5 * (maxLineHeight - boxes[i].logicalSize[1]),
          0
        ];
        boxes[i].lineWidth = lineWidth;

        offsetX += boxes[i++].logicalSize[0];
      }
      offsetY += maxLineHeight;
    }

    const minSize = actual2logical(this.actualSize);

    const thisLogicalSize = [
      Math.max(minSize[0], maxLineWidth),
      Math.max(minSize[1], Math.min(cHeight, offsetY)),
      1
    ];

    this.actualSize = logical2actual(thisLogicalSize);

    for (let i = 0; i < boxes.length; i++) {
      const dripShift = [
        0.5 * (thisLogicalSize[0] - boxes[i].lineWidth),
        0.5 * (thisLogicalSize[1] - offsetY),
        0
      ];

      for (let k of [0, 1]) {
        boxes[i].logicalGrab[k] += dripShift[k] * (1 - drip[k]);

        if (flow[k] & 1) {
          boxes[i].logicalGrab[k] = thisLogicalSize[k] - boxes[i].logicalGrab[k] - boxes[i].logicalSize[k];
        }
      }

      boxes[i].actualGrab = logical2actual(boxes[i].logicalGrab);
      delete boxes[i].logicalGrab;
      delete boxes[i].logicalSize;
      delete boxes[i].lineWidth;

      boxes[i].crop();
    }
  }

  crop() {
    // Crops actualGrab and actualSize to fit within the parent
    if (!this.parent) return;
    const parentSize = this.parent.actualSize;

    for (let i = 0; i < 3; i++) {
      if (this.actualGrab[i] < 0) {
        this.actualSize[i] += this.actualGrab[i];
        this.actualGrab[i] = 0;
      }
      if (this.actualGrab[i] + this.actualSize[i] > parentSize[i]) {
        this.actualSize[i] = parentSize[i] - this.actualGrab[i];
      }
    }
  }

  *compose(corner) {
    const grabFlow = [1, -1, 1];
    const offset = this.actualGrab.map((g, i) => corner[i] + grabFlow[i] * g);

    if (this !== rootBox) {
      yield [...offset, ...this.fill, ...this.actualSize];
    }

    for (let child of this.children) {
      if (child.actualSize.every(d => d > 0)) {
        yield* child.compose(offset);
      }
    }
  }
}

var see = { allocatedBoxes: 0 };
var rootBox = new Box('SecureRender');
var name2box = new Map([['SecureRender', rootBox]]);

const vertexShaderSource = `
attribute vec4 dot;
attribute vec4 grab;

attribute vec4 hue;
attribute vec3 size;

uniform mat4 projection;

varying vec4 fill;

void main() {
  mat4 move = mat4(
    vec4(size.x, 0, 0, 0),
    vec4(0, size.y, 0, 0),
    vec4(0, 0, 1, 0),
    grab
  );

  gl_Position = projection * move * dot;
  fill = hue;
}
`;


const fragmentShaderSource = `
precision mediump float;
varying vec4 fill;

void main() {
  gl_FragColor = fill;
}
`;

function setupProjectionMatrix(gl, program) {
  const aspect = gl.canvas.width / gl.canvas.height;

  const M = [
  2,0,0,0,
    0,2*aspect,0,0,
    0,0,2,0,
    0,0,0,2
  ];

  const projectionUnifLoc = gl.getUniformLocation(program, 'projection');
  gl.uniformMatrix4fv(projectionUnifLoc, false, M);

}

function linkAttributesToBuffers(gl, program) {
  // Bind "dot" attr

  const dotAttrLoc = gl.getAttribLocation(program, "dot");
  gl.enableVertexAttribArray(dotAttrLoc);

  const dotBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, dotBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([ // a single box wireframe
    0, 0, 1, 0, 1, -1,
    0, 0, 0, -1, 1, -1
  ]), gl.STATIC_DRAW);

  var size = 2;          // 2 components per iteration
  var normalize = false; // don't normalize the data

  gl.vertexAttribPointer(dotAttrLoc, size, gl.FLOAT, normalize, /*stride=*/ 0, /*offset = */ 0);

  // Bind dynamic attributes

  const grabAttrLoc = gl.getAttribLocation(program, "grab");
  const hueAttrLoc = gl.getAttribLocation(program, "hue");
  const sizeAttrLoc = gl.getAttribLocation(program, "size");

  gl.enableVertexAttribArray(grabAttrLoc);
  gl.enableVertexAttribArray(hueAttrLoc);
  gl.enableVertexAttribArray(sizeAttrLoc);

  gl.many.vertexAttribDivisorANGLE(grabAttrLoc, 1);
  gl.many.vertexAttribDivisorANGLE(hueAttrLoc, 1);
  gl.many.vertexAttribDivisorANGLE(sizeAttrLoc, 1);

  const dynAttrBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, dynAttrBuffer);

  const bytes = Float32Array.BYTES_PER_ELEMENT;
  const nDynAttr = 10;

  const stride = nDynAttr * bytes;

  gl.vertexAttribPointer(grabAttrLoc, 3, gl.FLOAT, normalize, stride, 0);
  gl.vertexAttribPointer(hueAttrLoc, 4, gl.FLOAT, normalize, stride, 3 * bytes);
  gl.vertexAttribPointer(sizeAttrLoc, 3, gl.FLOAT, normalize, stride, 7 * bytes);

  return dynAttrBuffer;
}

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

see.create = function(){
  if(see.DOM){ return }
  var w = window, c = document.createElement('canvas'), tmp;
  c.width = w.innerWidth, c.height = w.innerHeight;
  (tmp = c.style).position = 'fixed'; tmp.left = tmp.top = 0;
  tmp.height = tmp.width = '100%';
  SecureRender.appendChild(see.DOM = c);
  var gl = see.gl = c.getContext('webgl');
  gl.many = gl.getExtension('ANGLE_instanced_arrays');

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  const program = see.program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  see.mainBuffer = linkAttributesToBuffers(gl, program);

  sr.how.view = render;
}

see.create();
see.all = 0;

window.onresize = function(){
  const gl = see.gl;
  const c = gl.canvas;

  const dpr = window.devicePixelRatio;

  const {width, height} = c.getBoundingClientRect();
  const displayWidth  = Math.round(width * dpr);
  const displayHeight = Math.round(height * dpr);

  if (c.width != displayWidth || c.height != displayHeight) {
    c.width  = displayWidth;
    c.height = displayHeight;
  }

  gl.viewport(0, 0, c.width, c.height);

  setupProjectionMatrix(gl, see.program);

  rootBox.size = [100, 100, 100];    // TODO: what does really has to be here?
}
window.onresize();

//function grow(a, x, r){ return (r = new Numbers(a.length + (x||100))).set(a, 0), r } // however much bigger you want it. Delete this, just inline it!
function render(list){
  // console.log('**** WEBGL render, list', list);

  //return;
  const gl = see.gl;

  for (let change of list) {
    if (!change.name) {
      console.error('No change.name in render', change);
      continue;
    }

    const name = change.name;
    let what = name2box.get(name);

    if (!what) {
      if (!change.sort) {
        console.error('Missing insert sort location in render', change)
        continue;
      }
      const [where, relName] = change.sort;
      const rel = name2box.get(relName);

      if (!rel || !(where in place)) {
        console.error('Invalid sort location', change.sort);
        continue;
      }

      what = new Box(name);
      rel.insertAdjacent(place[where], what)
    }

    Object.assign(what, change);

    if (what.fill.length < 4) what.fill[3] = 1;
  }

  rootBox.innerLayout();

  const boxes = [...rootBox.compose([-1, 1, 0])];
  const boxAttributes = new Float32Array(boxes.flat());

  gl.bindBuffer(gl.ARRAY_BUFFER, see.mainBuffer);

  if (see.allocatedBoxes < boxes.length) {
    gl.bufferData(gl.ARRAY_BUFFER, boxAttributes, gl.DYNAMIC_DRAW);
    see.allocatedBoxes = boxes.length;
  }
  else {
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, boxAttributes);
  }

  gl.many.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, boxes.length);
}

// render.scroll = function(){ // UPGRADE THIS TO VIEW MATRIX TRANSFORM.
//   var gl = see.gl, box = see.view.box;
//   box.scroll = gl.getUniformLocation(box, 'scroll'); // THIS IS THE SLOW WAY TO DO THIS, REFACTOR TO viewspace/translation
//   gl.uniform1f(box.scroll, see.scroll); // out of the selected buffer.
//   render([]);
// }

// see.scroll = 0;
// ;(function(){ // TMP! DELTE! // NOTE: Why is this with GL? It should work with both. But for now, we're working on GL, so ... we hacked it in here.
// var s = document.body.style, i = window.innerHeight, h = i, _y;
// s.height = (h *= 10)+'px';
// function scroll(){
//   var y = window.scrollY, r = y / h, d = y - _y; _y = y;
//   see.scroll = y/see.tall;
//   if(d > 0){
//     s.height = (h += i*0.1*r)+'px';
//   } else
//   if(r < 0.75 && (i*10) < h){
//     s.height = (h -= i*0.1)+'px';
//   }
//   render.scroll();
// }
// window.onwheel = scroll;
// if('ontouchstart' in window){ window.onscroll = scroll }
// }());

}());