//Credits: Popcorn
chrome.extension.onMessage.addListener(function (message, sender, callback) {
	chrome.cookies.set({name:"dosid",url:"https://" + message.sv + ".darkorbit.com", value: message.sid});
});