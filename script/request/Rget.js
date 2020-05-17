class Rget {
    request(resource, server, sid){
        chrome.runtime.sendMessage({sid:sid,sv:server,db:true}, function(callback) {
        });
        console.log(resource + " " + server + " " + sid);
        const Http = new XMLHttpRequest();
        Http.open("GET", "https://" + server + ".darkorbit.com/indexInternal.es?action=internalSkylab&subaction=upgrade&construction=" + resource);
        Http.send();

        Http.onreadystatechange = (e) => {
            console.log(Http.responseText)
        }
    }

}