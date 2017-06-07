var adet = 0;

function createNotification(data){
    var notOpt = {
        type: 'basic',
        title: 'Yeni veri eklendi !',
        message: data.name,
        iconUrl: 'icon.png'
    }

    chrome.notifications.create('id5',notOpt,(id)=>{
        adet+=1;
        chrome.browserAction.setBadgeText({text: adet.toString()});
    });
}

function baglan(){

    fetch('http://licencephp.com/licences/extension.php')
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

setInterval(baglan, 1500);

chrome.runtime.onMessage.addListener((resp, sender, senResp)=>{
    createNotification();
});

chrome.browserAction.setBadgeText({text: "0"});