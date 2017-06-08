var adet = 0;

var veriler = [];

function createNotification(data){

    veriler = veriler.concat(data);
    chrome.storage.sync.set({'veriler': veriler}, function() {
        console.log('veriler saved');
    });

    for(var i = 0; i<data.length; i++){
        var notOpt = {
            type: 'basic',
            title: 'Yeni veri eklendi !',
            message: data[i].site + ' - ' + data[i].zaman,
            iconUrl: 'icon.png'
        }

        chrome.notifications.create('id5',notOpt,(id)=>{
            adet+=1;
            chrome.browserAction.setBadgeText({text: adet.toString()});
        });

    }

    
}

function baglan(){

    fetch('http://localhost:5000/deneme')
    .then((data) =>{
        return data.json();
    })
    .then((data) =>{
        if(data.bildirim_id == 'null'){
            console.log('data null');
        }else{
            createNotification(data);
        }
    });

}

setInterval(baglan, 2000);

chrome.runtime.onMessage.addListener((resp, sender, senResp)=>{
    if(resp.msg = 'sayac_sifirla'){
        adet = 0;
        chrome.browserAction.setBadgeText({text: "0"});
        veriler = [];
        chrome.storage.sync.set({'veriler': veriler}, function() {
          console.log('veriler sifirlandi');
        });
    }
});

chrome.browserAction.setBadgeText({text: "0"});