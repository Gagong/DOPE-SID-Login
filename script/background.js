chrome.extension.onMessage.addListener(function (message, sender, callback) {
	var flashResIdentifier; 
   	chrome.contentSettings.plugins.getResourceIdentifiers(function(resIdentifiers) {
   		for (var i=0; i<resIdentifiers.length; i++) {
			console.log(resIdentifiers[i]);
   			if (resIdentifiers[i].id == "adobe-flash-player") {
   				flashResIdentifier = resIdentifiers;
   				break;
   			}
   		}
   	});
   	chrome.contentSettings.plugins.set({'primaryPattern':"https://*.darkorbit.com/*", 'resourceIdentifier':flashResIdentifier, 'setting':'allow'});

	if(message.incognito != true)
		chrome.cookies.set({name:"dosid",url:"https://" + message.sv + ".darkorbit.com", value: message.sid});

	if (message.db != true && message.incognito != true) 
		chrome.tabs.create({url:"https://" + message.sv + message.url + message.lg});

	if (message.db != true && message.incognito == true) {
		chrome.windows.create({"url": "https://" + message.sv + ".darkorbit.com/?dosid=" + message.sid, "incognito": true},function(newWin) {

		});
	}
});