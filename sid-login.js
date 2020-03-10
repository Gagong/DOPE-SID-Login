let nick;
let node;
window.addEventListener('load', function() {
    setInterval(function() {
        if (document.querySelector('.add_button') !== null) {
            if (nick !== getData()[0]) {
                node.remove();
            }
        } else {
            if (window.location.href.includes("#Panel")) {
                if (getSid() && getSid().length === 0) {

                } else {
                    addButton();
                }
            }
        }
        nick = getData()[0];
    }, 250);
}, false)

attemtSidLogin();

function addButton(){
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

function sendSid() {
    window.open('https://' + getData()[1] + '.darkorbit.com/?dosid=' + getSid(), '_blank');
}

function getData() {
    let data;
    let dataEl = document.getElementsByClassName("title withSub");
    for (let i = 0; i < dataEl.length; i++) {
        data = dataEl[i].innerText.split('_')
    }
    return data;
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