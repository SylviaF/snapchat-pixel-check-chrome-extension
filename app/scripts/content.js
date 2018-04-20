/*
* @Author: fangsimin
* @Date:   2018-03-30 10:35:30
* @Last Modified by:   fangsimin
* @Last Modified time: 2018-04-09 14:23:32
*/
'use strict';
/*--- 通信: begin ---*/
chrome.extension.onMessage.addListener(function(request){
    if(request && request.cmd){
        if(request.cmd == 'console'){
            var arr = [];
            for(var key in request.data){
                arr[key] = request.data[key];
            }
            console.log.apply(console, arr);
        }
    }
});

chrome.runtime.sendMessage('content script loaded.');
/*--- 通信: end ---*/