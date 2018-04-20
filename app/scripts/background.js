// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

// chrome.runtime.onInstalled.addListener((details) => {
//     console.log('previousVersion', details.previousVersion);
// })

chrome.tabs.onUpdated.addListener((tabId) => {
    chrome.pageAction.show(tabId);
})
import {toObj} from './common/util';

function log() {
    var data = arguments;
    console.log(data);
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tab) {
        // console.log(tab);
        if (tab && tab[0]) {
            chrome.tabs.sendMessage(tab[0].id, {
                cmd: 'console',
                data: data
            });
        }
    });
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    log(request);
});

chrome.runtime.onConnect.addListener(function (devToolsConnection) {
    // devToolsConnectionInstance = devToolsConnection;
    log(devToolsConnection);

    var devToolsListener = function (message, sender, sendResponse) {
        if (message.type === 'snap_report') {
            let request = message.request;
            let params = request && request.postData && request.postData.params;

            log(toObj(params));
        } else {
            log(message);
        }
    };

    devToolsConnection.onMessage.addListener(devToolsListener);

    devToolsConnection.onDisconnect.addListener(function() {
        devToolsConnection.onMessage.removeListener(devToolsListener);
    });
});