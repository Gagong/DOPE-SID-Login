class Rget {
    request(resource, server, sid){
        const Http = new XMLHttpRequest();
        Http.open("GET", "https://" + server + ".darkorbit.com/indexInternal.es?action=internalSkylab&subaction=upgrade&construction=" + resource);
        Http.send();

        Http.onreadystatechange = (e) => {
            //console.log(Http.responseText)
        }
    }

}