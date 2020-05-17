class Get {
    getServer() {
        let data;
        let dataEl = document.getElementsByClassName("title withSub");
    
        for (let i = 0; i < dataEl.length; i++) 
            data = dataEl[i].innerText.split('_')
        
        return data[data.length - 1];
    }
    
    getUser() {
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
    
    getSid() {
        const findSessionId = (className = "sessionId", tagName = "div") => {
            const el = document.querySelector(`.${className}`)
            if (typeof el === "undefined" || el === null) return;
    
            const children = el.querySelectorAll(tagName)
            if (typeof children === "undefined") return;
            if (children.length == 0) return;
    
            return Array.from(children)[1].innerText;
        }
        return findSessionId();
    }
    
    getLang(){
        return document.querySelector('#topNav > .languageChange').textContent.substring(0,2);
    }
}