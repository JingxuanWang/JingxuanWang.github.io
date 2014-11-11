/**
 * Created by wang.jingxuan on 14-11-8.
 */

function shuffle(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function ajax(url, onSuccess, onError) {
    var xmlhttp = new XMLHttpRequest();

    if (xmlhttp.overrideMimeType) {
        xmlhttp.overrideMimeType("application/json");
    }

    xmlhttp.open("GET", url, true);

    // set the callbacks
    xmlhttp.ontimeout = onError;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            // status = 0 when file protocol is used, or cross-domain origin,
            // (With Chrome use "--allow-file-access-from-files --disable-web-security")
            if ((xmlhttp.status === 200) || ((xmlhttp.status === 0) && xmlhttp.responseText)) {
                // get the Texture Packer Atlas content
                //var data = JSON.parse();

                // fire the callback
                onSuccess(xmlhttp.responseText);
            }
            else {
                onError();
            }
        }
    };
    // send the request
    xmlhttp.send(null);
};