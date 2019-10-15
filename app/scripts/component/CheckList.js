'use strict';
import React from 'react';
import Solve from './Solve';
import {paramChecklist, eventChecklist} from '../config/checklist';

export default class CheckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventChecklist: eventChecklist,
            paramChecklist: paramChecklist,
            data: props.data || {},
            pid: props.pid || '',
            otherEvs: []
        };
        this.getCheckList = this.getCheckList.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.checkParams = this.checkParams.bind(this);
        this.getCheckParamsResult = this.getCheckParamsResult.bind(this);
        this.standEvs = [
            'PAGE_VIEW', 'VIEW_CONTENT', 'ADD_CART', 'START_CHECKOUT',
            'ADD_BILLING', 'PURCHASE', 'SEARCH', 'SIGN_UP', 'SAVE'
        ];
    }
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps: ', nextProps);
        this.setState({
            data: nextProps.data,
            pid: nextProps.pid
        });
        this.checkOtherEvent(nextProps.data);
    }
    getCheckList() {
        let ret = [];
        for (let key in this.state.eventChecklist) {
            let item = this.state.eventChecklist[key];
            ret.push(this.renderItem(item));
        }
        return ret;
    }

    renderItem(item) {
        return (<li key={item.key}>
            <h5>{item.key}:</h5>
            {
                this.state.data[item.key]
                    ? <ul>{item.params
                            ? this.checkParams(item.params, item.key)
                            : ''
                        }</ul>
                    : <div>
                        <p className="text-warning">{item.hint}</p>
                        <p className="text-error">暂未抓取到相关上报，请执行上述操作</p>
                    </div>
            }
        </li>);
    }

    checkParams(params, eventName) {
        let data = this.state.data;
        let paramChecklist = this.state.paramChecklist;
        return <ul class="paramCheckUl">
            {params.map(param => {
                if (param === 'userinfo') {
                    let paramData = {name: 'userinfo'};
                    return <li key={param}>
                        <p><b>user info</b>: {
                            JSON.stringify(data[eventName]['u_hem']
                                || data[eventName]['u_hpn']
                                || '')}</p>
                        {
                            data[eventName] && typeof data[eventName] === 'object'
                                ? this.getCheckParamsResult(
                                    data[eventName], paramData)
                                : <p className="text-warning">{paramData['hint']}</p>
                        }
                    </li>;

                } else {
                    let paramData = paramChecklist[param];
                    return <li key={param}>
                        <p><b>{paramData['name']}</b>: {JSON.stringify(data[eventName][param] || '')}</p>
                        {
                            data[eventName] && typeof data[eventName] === 'object'
                                ? this.getCheckParamsResult(
                                    data[eventName], paramData)
                                : <p className="text-warning">{paramData['hint']}</p>
                        }
                    </li>;
                }
            })}
        </ul>
    }

    getCheckParamsResult(data, param) {
        console.log('getCheckParamsResult: ', data, param);
        if (param.name === 'userinfo') {
            console.log('check userinfo');
            let paramChecklist = this.state.paramChecklist;
            let key = 'u_hem';
            let ret = paramChecklist[key].checkfunc(data[key]);
            if (ret.code !== 0) {
                key = 'u_hpn';
                ret = paramChecklist[key].checkfunc(data[key]);
            }
            return ret.code === 0
                ? <p className="result text-success">
                    <i className="check"></i> {ret.msg}</p>
                : <div>
                    <p className="result text-error">
                        <i className="close"></i> {ret.msg}</p>
                    {
                        ret.solve
                            ? <Solve data={this.replaceSolveData(ret.solve, data)}></Solve>
                            : ''
                    }
                </div>;
        } else if (param && typeof param.checkfunc === 'function') {
            let key = param['key'];
            let ret = param.checkfunc(data[key]);
            return ret.code === 0
                ? <p className="result text-success">
                    <i className="check"></i> {ret.msg}</p>
                : <div>
                    <p className="result text-error">
                        <i className="close"></i> {ret.msg}</p>
                    {
                        ret.solve
                            ? <Solve data={this.replaceSolveData(ret.solve, data)}></Solve>
                            : ''
                    }
                </div>;
        } else if (param && param['key'] === 'pid') {
            if (this.state.pid) {
                return this.state.pid === data['pid']
                    ? <p className="result text-success">
                        <i className="check"></i> pixel id正确</p>
                    : <p className="result text-error">
                        <i className="close"></i> pixel id错误</p>;
            } else {
                return <p className="text-warning">请在【Snapchat提供的pixel id】输入框输入Snapchat后台取到的pixel id</p>;
            }
        } else {
            return <p className="text-warning">{param['hint']}</p>;
        }
    }

    replaceSolveData(solveData, data) {
        return solveData.map(item => {
            item.data = item.data
                .replace('${pid}', this.state.pid || '后台获取的pixel id')
                .replace('${eventName}', data.ev || '');
            return item;
        });
    }

    checkOtherEvent(data) {
        if (data && typeof data === 'object') {
            let evKeys = Object.keys(data);
            let otherEvs = evKeys.reduce((arr, item) => {
                if (this.standEvs.indexOf(item) === -1) {
                    arr.push(item);
                }
                return arr;
            }, []);

            this.setState({
                'otherEvs': otherEvs
            });
        }
    }

    render() {
        return (
            <ul>
                { this.getCheckList().map(ret => {
                    return ret;
                }) }
                {
                    this.state.otherEvs && this.state.otherEvs.length
                        ? (<li>
                                <h5>非标准事件:</h5>
                                <p className="text-warning">上报了以下非标准事件，建议验证是否拼写错误</p>
                                <ul>
                                    {this.state.otherEvs.map(item => {
                                        return <li>{item}</li>
                                    })}
                                </ul>
                            </li>)
                        : ''
                }
            </ul>
        );
    }
}
