;(function(){
	
console.log("Hello Experiments! Do whatever you want in this folder or files!");



function load(src, cb){
  var script = document.createElement('script');
  script.onload = cb; script.src = src;
  document.head.appendChild(script);
}
//load('other-experiments.js');

}());