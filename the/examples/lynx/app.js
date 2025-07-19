import "./the.js"

the.place({
  fill: [0, 1, 0, 1],
  size: [[100, '.'], [100, '.']],
}).into(the.view);

the.place({
  fill: [1, 1, 0, 1],
  size: [[100, '.'], [100, '.']],
}).into(the.view);

the.place({
  fill: [1, 0, 0, 1],
  size: [[100, '.'], [100, '.']]
}).into(the.view);

the.place({
  fill: "Hello from THE!",
  size: [2]
}).into(the.view);

the.place({
  fill: "Hello from THE!",
  size: [2]
}).into(the.view);

the.place({
  fill: "Hello from THE!",
  size: [3]
}).into(the.view);