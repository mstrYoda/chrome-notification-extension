var veriler = [];

function kaldir(id){
    chrome.runtime.sendMessage({msg: 'sayac_sifirla'}, function(response) {

    });
}

document.getElementById('send').addEventListener('click', kaldir);

function messageReceived(data){
    veriler = data;
    var ul = document.getElementById('veriler');

    var liste = '';

    for(var i = 0; i< veriler.length; i++){
        liste += `<li> ${veriler[i].site} </li>`;
    }

    ul.innerHTML = liste;

}

chrome.runtime.onMessage.addListener(messageReceived);

 chrome.storage.sync.get('veriler', function(items) {
    var ul = document.getElementById('veriler');
    console.log(items);

    var liste = '';

    for(var i = 0; i< items.veriler.length; i++){
        liste += `<li> ${items.veriler[i].site} </li>`;
    }

    ul.innerHTML = liste;
});