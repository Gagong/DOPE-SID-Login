window.onload = function(){
    chrome.storage.local.get('navbar', function (result) {
        document.getElementById('navbar').checked = result.navbar
    });
    chrome.storage.local.get('lang', function (result) {
        document.getElementById('lang').checked = result.lang
    });
    chrome.storage.local.get('fastlogin', function (result) {
        document.getElementById('fastlogin').checked = result.fastlogin
    });
    
    document.querySelector('#navbar').addEventListener('click', checkNavbar);
    console.log(document.querySelector('#navbar'));
    document.querySelector('#lang').addEventListener('click', checkLang);
    console.log(document.querySelector('#lang'));
    document.querySelector('#fastlogin').addEventListener('click', checkFastLogin);
    console.log(document.querySelector('#fastlogin'));
}

function checkNavbar(){
    console.log('metod 1');
    var checkBoxNavbar = document.getElementById('navbar');
    chrome.storage.local.set({'navbar': checkBoxNavbar.checked}, function() {
        console.log('Value is set to ' + navbar.checked);
    });
}

function checkLang(){
    console.log('metod 2');
    var checkBoxLang = document.getElementById('lang');
    chrome.storage.local.set({'lang': checkBoxLang.checked}, function() {
        console.log('Value is set to ' + lang.checked);
    });
}

function checkFastLogin(){
    console.log('metod 3');
    var checkBoxFastlogin = document.getElementById('fastlogin');
    chrome.storage.local.set({'fastlogin': checkBoxFastlogin.checked}, function() {
        console.log('Value is set to ' + fastlogin.checked);
    });
}