class Rget {
    request(resource, server, sid){
        
        console.log(resource + " " + server + " " + sid + " upgrading...");
        const Http = new XMLHttpRequest();
        Http.open("GET", "https://" + server + ".darkorbit.com/indexInternal.es?action=internalSkylab&subaction=upgrade&construction=" + resource);
        Http.send();

        Http.onreadystatechange = (e) => {
            //console.log(Http.responseText)
        }
    }

}