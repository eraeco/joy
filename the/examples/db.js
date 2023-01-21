var gun = Gun({ peers: ["http://localhost:8765/gun"] });
var me = Gun.text.random(8);
var session = (window.session = Gun.text.random(16));
var app = gun.get("chess");
const encode = (params) =>
	Object.keys(params)
		.map((k) => `${k}=${encodeURI(params[k])}`)
		.join("&");
// console.log("URL: ", encode({ who: me, session: window.session }))
app.map((v, k) => {
	share.set("data_" + k, v);
});
var decimals = {
	king: 9812,
	queen: 9813,
	rook: 9814,
	bishop: 9815,
	knight: 9816,
	pawn: 9817,
};

var emoji = function (piece, color) {
	var d = decimals[piece],
		e = color == "black" ? d + 6 : d;
	return String.fromCodePoint(`&#${e};`.slice(2, -1));
};
window.graph = function (k, v) {
	app.get(k).put(v);
};
window.setMap = function (k, v) {
	console.log("SETMAP: ", k, v);
	for (const i in v[k]) app.get(k).get(i).put(v[k]);
};
var render = function (o) {
	window.onmessage({ data: [o] });
	return render;
};
app.get("who").on((is) => {
	if (!is) return;
	render({
		name: "who",
		fill: emoji("king", is),
		sort: [-0.1, "SecureRender"],
	});
});
app.get("move").on((move) => {
	if (!move) return;
	[start, end] = move.split("-");
	console.log("moved: ", start, end);
});
