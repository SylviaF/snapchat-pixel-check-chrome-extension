/*
* @Author: fangsimin
* @Date:   2018-04-08 19:33:59
* @Last Modified by:   fangsimin
* @Last Modified time: 2018-04-20 15:42:37
*/
import {toObj} from './common/util';

const SNAP_REPORT_REG_EXP = /^https:\/\/tr\.snapchat\.com\/p/;
let reportdata = {};
let pid = '';

/*--- 渲染: begin ---*/
import ReactDOM from 'react-dom';
import CheckList from './component/CheckList';
// ReactDOM.render(
//     <CheckList data={reportdata}/>,
//     document.getElementById('app-container')
// );
class ReactChecklistCnt {
	constructor(data, container) {
		this._container = container;
		this._data = data.data;
		this._pid = data.pid;
		this._render();
	}

	_render() {
		ReactDOM.render(
			<CheckList data={this._data} pid={this._pid}/>,
			this._container
		);
	}

	get data() {
		return this._data;
	}

	set data(value) {
		this._data = value;
		this._render();
	}

	get pid() {
		return this._pid;
	}

	set pid(value) {
		this._pid = value;
		this._render();
	}

	destroy() {
		ReactDOM.unmountComponentAtNode(this._container);
	}
}
let reactChecklistCnt = new ReactChecklistCnt({
		data: {},
		pid: ''
	}, document.getElementById('app-container'));
/*--- 渲染: end ---*/

window.onload = () => {
	let pidIpt = document.getElementById('pidIpt');
	let clearDataBtn = document.getElementById('clearDataBtn');

	pidIpt.onchange = e => {
		console.log(e);
		reactChecklistCnt.pid = pidIpt.value;
	};

	clearDataBtn.onclick = e => {
		reactChecklistCnt.data = reportdata = {};
	}

};

let backgroundPageConnection = chrome.runtime.connect({
    // name: 'devtools-page'
    name: 'devtools-panel'
});

backgroundPageConnection.onMessage.addListener(function (message) {
    // Handle responses from the background page, if any
});

chrome.devtools.network.onRequestFinished.addListener(
    function(data) {
        let request = data.request;
        let url = request.url;
        if (url &&  SNAP_REPORT_REG_EXP.test(url)) {
        	backgroundPageConnection.postMessage({
                request: request,
                type: 'snap_report'
                // tabId: chrome.devtools.inspectedWindow.tabId
            });
            let params = toObj(request.postData.params);
            reportdata[params['ev']] = params;
            reactChecklistCnt.data = reportdata;
        }
    });