var adet = 0;

function kaldir(id){

    chrome.storage.sync.remove('bildirimler', function() {
        console.log('kaldirildi');
    });

}

document.getElementById('send').addEventListener('click', kaldir);