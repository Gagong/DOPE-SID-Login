//Credits: Popcorn
chrome.extension.onMessage.addListener(function (message, sender, callback) {
	chrome.cookies.set({name:"dosid",url:"https://" + message.sv + ".darkorbit.com", value: message.sid});
	if (message.db != true) {
		chrome.tabs.create({url:"https://" + message.sv + ".darkorbit.com/indexInternal.es?action=internalStart" + message.lg},function(newTab) {
		});
	}
});