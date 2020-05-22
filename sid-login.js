let nick = null, skylab = null, loginNode = null, startNode = null, stopNode = null, boxNode = null, labelNode = null, skylabNode = null;
let labelThisVNode = null, labelNewVNode = null;
let blockStyleSheet = null, activeStyleSheet = null;
var isBlock = 0, checkState = [], stopClick = false;
let configArr = [], version = "0.8";

let get = new Get();
let set = new Set();
let add = new Add();
let req = new Rget();

if (window.location.href.includes("https://powerofdark.space/") && !window.location.href.includes("Account"))
    checkConfig();
window.addEventListener('load', function() {
    setInterval(function() {
        let updateNick;

        if (window.location.href.includes("#Panel"))
            updateNick = get.getUser();
        
        if (document.querySelector('.add_buttonLogin') !== null) {
            if (nick !== updateNick)
                loginNode.remove();
        } else {
            if (window.location.href.includes("#Panel")) {
                if (get.getSid() !== undefined)
                    if (get.getSid().length === 0)
                        return;
                    else
                        add.addLoginButton();
            }
        }
        if (document.querySelector('.add_buttonSkylab') !== null) {
            if (skylab !== updateNick)
                skylabNode.remove();
        } else {
            if (window.location.href.includes("#Panel")) {
                if (get.getSid() !== undefined)
                    if (get.getSid().length === 0)
                        return;
                    else
                        if(document.cookie.indexOf(get.getUser()) === -1)
                            add.addSkylabButton();
            }
        }

        nick = updateNick;
        skylab = updateNick;

        if (!window.location.href.includes("Account"))
            if (document.querySelector('.add_Checkbox') === null) 
                add.addCheckbox();

        if (!window.location.href.includes("Account"))
            if (boxNode.checked) {
                if (isBlock === 0) {
                    isBlock = 1;
                    set.setStyleBlock();
                    if (activeStyleSheet !== undefined && activeStyleSheet !== null)
                        activeStyleSheet.remove();
                }
            } else {
                if (isBlock === 1) {
                    isBlock = 0;
                    set.setStyleActive();
                    blockStyleSheet.remove();
                }
            }
    }, 250);

    if (document.querySelector('.add_buttonStart') === null && !window.location.href.includes("Account")) {
        add.addStartButton();
        add.addStopButton();
    }
    
    document.addEventListener("keyup", function(event) {
        if (event.altKey && event.keyCode === 83) {
            if(document.querySelector('.rightNavInfo  > .Running ') !== null){
                var accountlist = document.querySelectorAll('.botItem  > .fas.fa-robot.icon ');
                for (var c = 0; c < accountlist.length; ++c) {
                    switch(true) {
                        case accountlist[c].className.includes("Running"):
                            checkState[c] = 1;
                            break;
                        case accountlist[c].className.includes("Stopped"):
                            checkState[c] = 0;
                            break;
                        case accountlist[c].className.includes("Paused"):
                            checkState[c] = 2;
                            break;
                        default:
                            checkState[c] = 0;
                            break;
                    }
                    stopClick = true;
                }
                window.alert("Status of all bots saved\nClick 'Start all' to restore");
            }
        }   
    });
}, false)

attemtSidLogin();

chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
		var storageChange = changes[key];
    }
    if(key === "navbar")
	    document.getElementsByClassName("add_Checkbox")[0].checked = storageChange.newValue;
});

var Base64 = { 
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+ "abcdefghijklmnopqrstuvwxyz0123456789+/=",
    decode: function(e) { 
        var t = ""; 
        var n, r, i; 
        var s, o, u, a; 
        var f = 0; 
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); 
        while (f < e.length) { 
            s = this._keyStr.indexOf(e.charAt(f++)); 
            o = this._keyStr.indexOf(e.charAt(f++)); 
            u = this._keyStr.indexOf(e.charAt(f++)); 
            a = this._keyStr.indexOf(e.charAt(f++)); 
            n = s << 2 | o >> 4; 
            r = (o & 15) << 4 | u >> 2; 
            i = (u & 3) << 6 | a; 
            t = t + String.fromCharCode(n); 
            if (u != 64) { 
                t = t + String.fromCharCode(r) 
            } 
            if (a != 64) { 
                t = t + String.fromCharCode(i) 
            } 
        } 
        t = Base64._utf8_decode(t); 
        return t 
    },
    _utf8_decode: function(e) { 
        var t = ""; 
        var n = 0; 
        var r = c1 = c2 = 0; 
        while (n < e.length) { 
            r = e.charCodeAt(n); 
            if (r < 128) { 
                t += String.fromCharCode(r); 
                n++ 
            } else if (r > 191 && r < 224) { 
                c2 = e.charCodeAt(n + 1); 
                t += String.fromCharCode( 
                (r & 31) << 6 | c2 & 63); 
                    
                n += 2 
            } else { 
                c2 = e.charCodeAt(n + 1); 
                c3 = e.charCodeAt(n + 2); 
                t += String.fromCharCode( 
                (r & 15) << 12 | (c2 & 63) 
                << 6 | c3 & 63); 
                n += 3 
            } 
        } 
        return t 
    }
}

async function checkConfig(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            configArr = JSON.parse(this.responseText);
            add.addLabelThisVersion();
        }
    };
    xmlhttp.open("GET", "https://gist.githubusercontent.com/fabio1999ita/80f55ae8d0f68acdf1bfdde87656e1d2/raw", true);
    xmlhttp.send();
}

//Credits: Popcorn
function attemtSidLogin() {
  var dosid = /[?&]dosid=([^&]+)/.exec(window.location.href);
  if (dosid == null) dosid = /[?&]sid=([^&]+)/.exec(window.location.href);  
  if (dosid == null) return; // No sid is on the url, return.

  var server = /^http[s]?:[/][/]([^.]+)[.]darkorbit[.]com/.exec(window.location.href);
  if (server == null) return;

  chrome.runtime.sendMessage({sid:dosid[1],sv:server[1],db:true}, function(callback) {
	  window.location.href = "https://" + server[1] + ".darkorbit.com/indexInternal.es?action=internalStart";
  });
}
