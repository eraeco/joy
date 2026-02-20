import "./the.js"

var b = the.view({
  fill: "Hello, from B!",
  size: [5]
})

var c = the.view({
  fill: "Hello, from C!",
  size: [2]
})

var d = the.view({
  fill: "Hello, from D!",
  size: [1]
})

b.into();
c.into(b);
d.into();