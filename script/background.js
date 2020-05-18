//Credits: Popcorn
chrome.extension.onMessage.addListener(function (message, sender, callback) {
	if(message.incognito != true)
		chrome.cookies.set({name:"dosid",url:"https://" + message.sv + ".darkorbit.com", value: message.sid});

	if (message.db != true && message.incognito != true) 
		chrome.tabs.create({url:"https://" + message.sv + ".darkorbit.com/indexInternal.es?action=internalStart" + message.lg});

	if (message.db != true && message.incognito == true) {
		chrome.windows.create({"url": "", "incognito": true},function(newWin) {
			chrome.cookies.set({name:"dosid",url:"https://" + message.sv + ".darkorbit.com", value: message.sid});
		});
	}
});