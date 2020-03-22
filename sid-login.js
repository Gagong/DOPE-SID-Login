let nick;
let node;
let node1;
let node2;
window.addEventListener('load', function() {
    setInterval(function() {
        let updateNick

        if (window.location.href.includes("#Panel")){
            updateNick = getUser();
        }
        if (document.querySelector('.add_button') !== null) {
            if (nick !== updateNick) {
                node.remove();
            }
        } else {
            if (window.location.href.includes("#Panel")){
                if (getSid() && getSid().length === 0) {

                } else {
                    addLogButton();
                }
            }
        }
        nick = updateNick;
    }, 250);
    if (document.querySelector('.add_buttonStart') === null) {
        addStartButton();
        addStopButton();
    }
}, false)

attemtSidLogin();

function addLogButton(){
    node = document.createElement("button");
    let textnode = document.createTextNode("Login");
    node.appendChild(textnode);
    let button = document.getElementById('main').getElementsByClassName('sessionId')[0].appendChild(node).className = "add_button";

    let styles = `.add_button {
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
    }.add_button:hover {background-color: #4468b6}`;

    let styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    if (getSid() == null || getSid().length === 0) {
        node.remove();
    }

    node.addEventListener("click", function() {
        sendSid();
    });
}

function addStartButton(){
    node1 = document.createElement("button");
    let textnode1 = document.createTextNode("Start All");
    node1.appendChild(textnode1);
    let button1 = document.getElementById('topNav').appendChild(node1).className = "add_buttonStart";

    let styles1 = `.add_buttonStart {
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

    let styleSheet1 = document.createElement("style");
    styleSheet1.type = "text/css";
    styleSheet1.innerText = styles1;
    document.head.appendChild(styleSheet1);

    node1.addEventListener("click", function() {
        var divs = document.querySelectorAll('.botItemControls > .fas.fa-play ');
        for (var i = 0; i < divs.length; ++i) {
            divs[i].click();
        };
    });
}

function addStopButton(){
    node2 = document.createElement("button");
    let textnode2 = document.createTextNode("Stop All");
    node2.appendChild(textnode2);
    let button2 = document.getElementById('topNav').appendChild(node2).className = "add_buttonStop";

    let styles2 = `.add_buttonStop {
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

    let styleSheet2 = document.createElement("style");
    styleSheet2.type = "text/css";
    styleSheet2.innerText = styles2;
    document.head.appendChild(styleSheet2);

    node2.addEventListener("click", function() {
        var divs = document.querySelectorAll('.botItemControls > .fas.fa-stop ');
        for (var i = 0; i < divs.length; ++i) {
            divs[i].click();
        };
    });
}

function sendSid() {
    window.open('https://' + getServer() + '.darkorbit.com/?dosid=' + getSid(), '_blank');
}

function getServer() {
    let data;
    let dataEl = document.getElementsByClassName("title withSub");
    for (let i = 0; i < dataEl.length; i++) {
        data = dataEl[i].innerText.split('_')
    }
    return data[data.length - 1];
}

function getUser() {
    let data;
    let userName = "";
    let dataEl = document.getElementsByClassName("title withSub");
    for (let i = 0; i < dataEl.length; i++) {
        data = dataEl[i].innerText.split('_')
    }
    for (let v = 0; v < data.length - 1; v++) {
        userName += data[v];
    }
    return userName;
}

function getSid(){
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
    let dosid = /[?&]dosid=([^&]+)/.exec(window.location.href);
    if (dosid == null) dosid = /[?&]sid=([^&]+)/.exec(window.location.href);
    if (dosid == null) return;

    let server = /^http[s]?:[/][/]([^.]+)[.]darkorbit[.]com/.exec(window.location.href);
    if (server == null) return;

    document.cookie = "dosid=" + dosid[1] + ";path=/";
    window.location.href = "https://" + server[1] + ".darkorbit.com/indexInternal.es?action=internalStart";
}