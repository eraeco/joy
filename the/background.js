// This file is currently an empty template for any potential future RPC operations.

var both;
try{both = browser}catch(e){}
try{both = both || chrome}catch(e){}

both.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install"){
  }else if(details.reason == "update"){
		var thisVersion = both.runtime.getManifest().version;
		console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
  }
});

both.runtime.onSuspend.addListener(function() {
  //console.log("Suspended");
});

// listen to the content script sending requests to this extension:
both.runtime.onMessage.addListener(function(msg, info, ack){ var tmp;
	//console.log("background:", msg);
	msg._ = {}; // overwrite _ as it is reserved or may not be serializable.
	if(tmp = msg.rpc){
		if(!(tmp = both.RPC[tmp] || both.RPC[tmp[0]])){ // check if we support the operation.
			ack({err: "Command '"+tmp+"' not found."});
			return;
		}
		tmp(msg, ack, info); // call it!
		return true;
	}
	return true;
});


both.RPC = {};