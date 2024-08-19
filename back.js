


chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "SendTextForSSP",
        title: "選択したテキストをゴーストに送信",
        // テキスト選択時のみ表示
        contexts: ["selection"]
    });
});



chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "SendTextForSSP") {
        console.log( "back" );
        // 選択したテキストを取得
        // console.log( info.selectionText );
        SendSSTP( info.selectionText , "" , "" );
    }
});



function SendSSTP( SakuraScript , beforeText , afterText ) { 
    var Sender = "ChromeExtension-AddMenuSendGhost";

    //前後整形。
    SakuraScript = beforeText + SakuraScript + afterText;
    //console.log( SakuraScript );

    var sstpText =        "SEND SSTP/1.4\r\n";
    sstpText = sstpText + "Content-Type: text/plain"             + "\r\n"; 
    sstpText = sstpText + "Charset: UTF-8"                       + "\r\n"; 
    sstpText = sstpText + "Sender: " + Sender                    + "\r\n"; 
    sstpText = sstpText + "SecurityLevel: external"              + "\r\n"; 
    sstpText = sstpText + "Option: nobreak"                      + "\r\n"; 
    sstpText = sstpText + "Script: " + SakuraScript              + "\r\n"; 
    sstpText = sstpText + "\r\n"; 

    const url = "http://localhost:9801/api/sstp/v1";
    var dataSSTP = {}
    dataSSTP[ "method" ]    = "POST";
    dataSSTP[ "body" ]      = sstpText;
    //var promise_SSTP = (resolve, reject) => { 
    fetch( url , dataSSTP );
    //} 
    //return new Promise(promise_SSTP); 
} 
