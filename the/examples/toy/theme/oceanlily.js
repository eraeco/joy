function theme(ast) {
  //if (!ast || !ast.type) return [[0.5, 0.5, 0.5, 0.8], [1, 1, 1, 1]]; // Fallback: gray bg, white text

  // Base hues for Lego-like colors (in degrees)
  const baseHues = [190, 150, 240, 300, 500]; 

  // Hash function to map node type to base hue
  const hash = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
    }
    return Math.abs(h) % baseHues.length;
  };

  // Select base hue and adjust for parent
  let hueIndex = hash(ast.type||'default');
  if (ast.up && ast.up.type) {
    const parentIndex = hash(ast.up.type||'default');
    if (hueIndex === parentIndex) {
      hueIndex = (hueIndex + 1) % baseHues.length; // Avoid same hue as parent
    }
  }

  // Randomize within constraints
  const hue = baseHues[hueIndex] + (Math.random() * 30 - 15); // ±15° variation
  const saturation = 0.6 + Math.random() * 0.2; // 60-80%
  const lightness = 0.3 + Math.random() * 0.2; // 30-50%

  // Convert HSL to RGB
  const hslToRgb = (h, s, l) => {
    h = h % 360;
    s = Math.min(Math.max(s, 0), 1);
    l = Math.min(Math.max(l, 0), 1);
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;
    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    return [(r + m), (g + m), (b + m), 0.8];
  };

  const bgColor = hslToRgb(hue, saturation, lightness);
  const textColor = [1, 1, 1, 1]; // Always white

  return (ast.fill instanceof Array && ast.fill) || bgColor;
};
//Math.random().toString(32)