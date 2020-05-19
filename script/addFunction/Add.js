var queue = [];

class Add {
    addLoginButton() {
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
    
        if (get.getSid() == null || get.getSid().length === 0)
            loginNode.remove();
    
        //loginNode.addEventListener("click", function() {
        //    set.setSid();
        //});
        var timer;
        var checkClick;
        loginNode.addEventListener('mousedown', function(event) { 
            checkClick = false;
            console.log("a mousedown");

            timer = setTimeout(function(){
                checkClick = true;
                chrome.runtime.sendMessage({sid:get.getSid(),sv:get.getServer(),incognito:true}, function(callback) {
                    window.location.href = "https://" + sid + ".darkorbit.com/indexInternal.es?action=internalStart";
                });
            }, 1000);
        });
        loginNode.addEventListener('mouseup', function(event) {
            if(!checkClick)
                set.setSid();
            clearTimeout(timer);
        });
    }
    
    addStartButton() {
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
    
    addStopButton() {
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
    
    addCheckbox(){
        boxNode = document.createElement("input");
        boxNode.type = 'checkbox';
        chrome.storage.local.get('navbar', function (result) {
            boxNode.checked = result.navbar
        });
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
    
    addSkylabButton() {
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
            background-color: #5075c5;
            border-radius: 5px;
            margin-left: 0px;
            margin-right: 0px;
            bottom: 0px;
            font-family: "Muli", sans-serif;
        }.add_buttonSkylab:hover {background-color: #4468b6}`;
    
        let skylabStyleSheet = document.createElement("style");
        skylabStyleSheet.type = "text/css";
        skylabStyleSheet.innerText = skylabStyles;
        document.head.appendChild(skylabStyleSheet);
    
        skylabNode.addEventListener("click", function() {
            let server = get.getServer()
            let sid = get.getSid()
            queue.push(server);queue.push(sid);
            let resource = ["", "baseModule", "solarModule", "prometiumCollector", "enduriumCollector", "terbiumCollector", "storageModule", "prometidRefinery", "duraniumRefinery", "promeriumRefinery", "xenoModule", "sepromRefinery", ""]
            if(queue.length === 2){
                chrome.runtime.sendMessage({sid:queue[1],sv:queue[0],db:true}, function(callback) {
                    console.log("sid setted");
                });
                for (let i = 0; i < resource.length; i++) {
                    setTimeout( function(){
                        req.request(resource[i], queue[0], queue[1]);
                        if(i === 12){
                            queue.shift();queue.shift();
                            if(queue.length !== 0){
                                repeat();
                            }
                        }
                    }, 2000 * i);
                }
            }
            function repeat(){
                chrome.runtime.sendMessage({sid:queue[1],sv:queue[0],db:true}, function(callback) {
                    console.log("sid setted");
                });
                for (let i = 0; i < resource.length; i++) {
                    setTimeout( function(){
                        req.request(resource[i], queue[0], queue[1]);
                        if(i === 12){
                            queue.shift();queue.shift();
                            if(queue.length !== 0){
                                repeat();
                            }
                        }
                    }, 2000 * i);
                }
            }
            console.log(queue.length);
    
            //var expires = new Date(Date.now() + 130800).toUTCString();
            //document.cookie = get.getUser() + "=" + get.getServer() + "; expires=" + expires + 130800 + ";path=/;";
    
            //document.getElementsByClassName("add_buttonSkylab")[0].style.display = "none";
        });
    }
    
    addLabelThisVersion(){
        labelThisVNode = document.createElement("label");
        let thisVTextNode = document.createTextNode("Extension Version: ");
        labelThisVNode.appendChild(thisVTextNode);
    
        let labelThisVNode1 = document.createElement("label");
        let thisVTextNode1 = document.createTextNode(version);
        labelThisVNode1.appendChild(thisVTextNode1);
        labelThisVNode.appendChild(labelThisVNode1);
        document.querySelector('#topNav').insertBefore(labelThisVNode, document.querySelector('.languageChange')).className = "thisVersionLabel";
    
        let labelThisVStyles;
        if(version === configArr[0])
            labelThisVStyles = `.thisVersionLabel {
                position: relative;
                color: #ffffff;
                -webkit-font-smoothing: antialiased;
                margin-left: 70px;
                margin-right: 0px;
                font-family: "Muli", sans-serif;
            }.thisVersionLabel label:nth-child(2n+1) {
                color: green;
            }`;
        else
            labelThisVStyles = `.thisVersionLabel {
                position: relative;
                color: #ffffff;
                -webkit-font-smoothing: antialiased;
                margin-left: 70px;
                margin-right: 0px;
                font-family: "Muli", sans-serif;
            }.thisVersionLabel label:nth-child(2n+1) {
                color: red;
            }`;
    
        let skylabStyleSheet = document.createElement("style");
        skylabStyleSheet.type = "text/css";
        skylabStyleSheet.innerText = labelThisVStyles;
        document.head.appendChild(skylabStyleSheet);
        if(version !== configArr[0])
            add.addLabelNewVersion();
    }
    
    addLabelNewVersion(){
        labelNewVNode = document.createElement("label");
        let newVTextNode = document.createTextNode("  Update available:");
        labelNewVNode.appendChild(newVTextNode);
    
        let labelNewVNode1 = document.createElement("a");
        let newVTextNode1 = document.createTextNode(" Click Here");
        labelNewVNode1.setAttribute('href', "#");
        labelNewVNode1.appendChild(newVTextNode1);
    
        labelNewVNode.appendChild(labelNewVNode1);
        document.querySelector('.thisVersionLabel').appendChild(labelNewVNode).className = "newVersionLabel";
    
        let labelNewVStyles = `.newVersionLabel {
            position: relative;
            color: #ffffff;
            -webkit-font-smoothing: antialiased;
            font-family: "Muli", sans-serif;
        }.newVersionLabel a:nth-child(2n+1) {
            color: royalblue;
        }.newVersionLabel a:nth-child(2n+1):hover{
            color: deepskyblue;
        }`;
    
        let skylabStyleSheet = document.createElement("style");
        skylabStyleSheet.type = "text/css";
        skylabStyleSheet.innerText = labelNewVStyles;
        document.head.appendChild(skylabStyleSheet);
    
        labelNewVNode1.addEventListener("click", function() {
            window.open('https://github.com/Gagong/DOPE-SID-Login/archive/master.zip', '_blank');
        });
    }
}
