window.onload = function(){
    chrome.storage.local.get('navbar', function (result) {
        document.getElementById('navbar').checked = result.navbar
    });
    chrome.storage.local.get('lang', function (result) {
        document.getElementById('lang').checked = result.lang
    });
    
    document.querySelector('#navbar').addEventListener('click', checkNavbar);
    console.log(document.querySelector('#navbar'));
    document.querySelector('#lang').addEventListener('click', checkLang);
    console.log(document.querySelector('#lang'));
}

function checkNavbar(){
    console.log('metod 1');
    var checkBoxNavbar = document.getElementById('navbar');
    chrome.storage.local.set({'navbar': checkBoxNavbar.checked}, function() {
        console.log('Value is set to ' + navbar.checked);
    });
    //document.getElementsByClassName("add_Checkbox")[0].checked = navbar.checked;
}

function checkLang(){
    console.log('metod 2');
    var checkBoxLang = document.getElementById('lang');
    chrome.storage.local.set({'lang': checkBoxLang.checked}, function() {
        console.log('Value is set to ' + lang.checked);
      });
}