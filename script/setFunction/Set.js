class Set {
    setSid() {
        chrome.storage.local.get('lang', function (result) {
            if(result.lang == false)
                chrome.runtime.sendMessage({sid:get.getSid(),sv:get.getServer(),lg:""}, function(callback) {
                });
            else
                chrome.runtime.sendMessage({sid:get.getSid(),sv:get.getServer(),lg:"&lang="+get.getLang()}, function(callback) {
                });
        });
        
    }

    setStyleBlock() {
        let styles5 = `
        @media only screen and (max-width: 2300px) {
            #main{transform: translateX(-5%);} .NotifItem.NotifPush{visibility: visible;transform: translateX(-85%);} .NotifContainer{visibility: hidden;}
        }
        @media only screen and (max-width: 1650px) {
            #main{transform: translateX(-10%);} .NotifItem.NotifPush{visibility: visible;transform: translateX(-85%);} .NotifContainer{visibility: hidden;}
        }
        a{text-decoration:none;}
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

    setStyleActive() {
        let styles6 = `
            a{text-decoration:none;}
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
}