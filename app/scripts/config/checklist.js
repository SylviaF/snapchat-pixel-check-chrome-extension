/**
 * @Author: fangsimin
 * @Date:   2018-04-08 19:06:30
 * @Last Modified by:   fangsimin
 * @Last Modified time: 2018-04-20 15:54:39
 */
export const paramChecklist = {
    'pid': {
        key: 'pid',
        name: 'pixel id',
        hint: '请确认pixel id是否正确',
        required: true
    },
    'u_hem': {
        key: 'u_hem',
        name: 'email',
        hint: '请确认是否有上传邮箱哈希值|手机号码哈希值',
        checkfunc: (val) => {
            if (!val) {
                return {
                    code: -1,
                    msg: '缺少邮箱|手机号码参数',
                    solve: [{
                        type: 'text',
                        data: '请获取用户的真实邮箱将下面代码里的<b style="color:red">USER-EMAIL</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'init\',\'${pid}\',{\'user_email\':\'USER-EMAIL\'});'
                    }, {
                        type: 'text',
                        data: '如果用户是以手机号码登录，请使用用户真实的手机号码将下面的代码的<b style="color:red">USER-PHONE-NUMBER</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'init\',\'${pid}\',{\'user_phone_number\':\'USER-PHONE-NUMBER\'});'
                    }]
                };
            } else if (val.length !== 64) {
                return {
                    code: -2,
                    msg: '邮箱格式不正确',
                    solve: [{
                        type: 'text',
                        data: '请获取用户的<b style="color:red">正确格式的邮箱</b>将下面代码里的<b style="color:red">USER-EMAIL</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'init\',\'${pid}\',{\'user_email\':\'USER-EMAIL\'});'
                    }]
                };
            } else {
                return {
                    code: 0,
                    msg: '邮箱|手机号码格式正确'
                };
            }
        }
    },
    'u_hpn': {
        key: 'u_hpn',
        name: 'phone',
        hint: '请确认是否有上传邮箱哈希值|手机号码哈希值',
        checkfunc: (val) => {
            if (!val) {
                return {
                    code: -1,
                    msg: '缺少邮箱|手机号码参数',
                    solve: [{
                        type: 'text',
                        data: '请获取用户的真实邮箱将下面代码里的<b style="color:red">USER-EMAIL</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'init\',\'${pid}\',{\'user_email\':\'USER-EMAIL\'});'
                    }, {
                        type: 'text',
                        data: '如果用户是以手机号码登录，请使用用户真实的手机号码将下面的代码的<b style="color:red">USER-PHONE-NUMBER</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'init\',\'${pid}\',{\'user_phone_number\':\'USER-PHONE-NUMBER\'});'
                    }]
                };
            } else if (val.length !== 64) {
                return {
                    code: -2,
                    msg: '手机号码格式不正确',
                    solve: [{
                        type: 'text',
                        data: '请获取用户的<b style="color:red">正确格式的手机号码</b>将下面代码里的<b style="color:red">USER-PHONE-NUMBER</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'init\',\'${pid}\',{\'user_phone_number\':\'USER-PHONE-NUMBER\'});'
                    }]
                };
            } else {
                return {
                    code: 0,
                    msg: '邮箱|手机号码格式正确'
                };
            }
        }
    },
    'e_pr': {
        key: 'e_pr',
        name: 'price',
        hint: '请确认是否有上传物品价格',
        checkfunc: (val) => {
            if (!val) {
                return {
                    code: -1,
                    msg: '缺少价格参数',
                    solve: [{
                        type: 'text',
                        data: '请获取物品价格将下面代码里的<b style="color:red">PRICE</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'price\':\'PRICE\', ...});'
                    }]
                };
            } else if (!parseFloat(val)) {
                return {
                    code: -2,
                    msg: '价格格式不正确',
                    solve: [{
                        type: 'text',
                        data: '下面<b style="color:red">PRICE</b>应替换为真实的价格, 格式应该是整数或小数'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'price\':\'PRICE\', ...});'
                    }]
                };
            } else {
                return {
                    code: 0,
                    msg: '价格格式正确'
                };
            }
        }
    },
    'e_cur': {
        key: 'e_cur',
        name: 'currency',
        hint: '请确认是否有上传物品流通货币(标准ISO 4217代码)',
        checkfunc: (val) => {
            if (!val) {
                return {
                    code: -1,
                    msg: '缺少流通货币参数',
                    solve: [{
                        type: 'text',
                        data: '请用流通货币类型（eg: USD）将下面代码里的<b style="color:red">CURRENCY</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'currency\':\'CURRENCY\', ...});'
                    }]
                };
            } else if (val.length !== 3) {
                return {
                    code: -2,
                    msg: '流通货币格式为(标准ISO 4217代码)，由三位大写字母组成',
                    solve: [{
                        type: 'text',
                        data: '下面<b style="color:red">CURRENCY</b>应替换为流通货币代码，应该是3位字母组成'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'currency\':\'CURRENCY\', ...});'
                    }]
                };
            } else if (String.prototype.toUpperCase.call(val) !== val) {
                return {
                    code: -3,
                    msg: '流通货币格式为(标准ISO 4217代码)，由三位大写字母组成',
                    solve: [{
                        type: 'text',
                        data: '下面<b style="color:red">CURRENCY</b>应替换为流通货币代码，应该是大写字母格式'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'currency\':\'CURRENCY\', ...});'
                    }]
                };
            } else {
                return {
                    code: 0,
                    msg: '流通货币格式正确'
                };
            }
        }
    },
    'e_iids': {
        key: 'e_iids',
        name: 'item_ids',
        hint: '请确认是否有上传物品id',
        checkfunc: (val) => {
            if (!val) {
                return {
                    code: -1,
                    msg: '缺少物品id',
                    solve: [{
                        type: 'text',
                        data: '请用可以标识本页面商品的id将下面代码里的<b style="color:red">ITEM_IDS</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'item_ids\':\'ITEM_IDS\', ...});'
                    }]
                };
            } else {
                return {
                    code: 0,
                    msg: '物品id已上传'
                };
            }
        }
    },
    'e_ic': {
        key: 'e_ic',
        name: 'item_category',
        hint: '请确认是否有上传物品分类',
        checkfunc: (val) => {
            if (!val) {
                return {
                    code: -1,
                    msg: '缺少物品分类',
                    solve: [{
                        type: 'text',
                        data: '请用本页面商品相关分类将下面代码里的<b style="color:red">ITEM_CATEGORY</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'item_category\':\'ITEM_CATEGORY\', ...});'
                    }]
                };
            } else {
                return {
                    code: 0,
                    msg: '物品分类已上传'
                };
            }
        }
    },
    // todo: add solve
    'e_pia': {
        key: 'e_pia',
        name: 'payment_info_available',
        hint: '请确认是否有上传payment_info_available',
        checkfunc: (val) => {
            if (!val) {
                return {
                    code: -1,
                    msg: '缺少payment_info_available'
                };
            } else if ((+val) !== 1 && (+val) !== 0) {
                return {
                    code: -2,
                    msg: 'payment_info_available是0或1'
                };
            } else {
                return {
                    code: 0,
                    msg: 'payment_info_available格式正确'
                };
            }
        }
    },
    'e_tid': {
        key: 'e_tid',
        name: 'transaction_id',
        hint: '请确认是否有上传交易id',
        checkfunc: (val) => {
            if (!val) {
                return {
                    code: -1,
                    msg: '缺少交易id',
                    solve: [{
                        type: 'text',
                        data: '请用可以标识本交易的id将下面代码里的<b style="color:red">TRANSACTION_ID</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'transaction_id\':\'TRANSACTION_ID\', ...});'
                    }]
                };
            } else {
                return {
                    code: 0,
                    msg: '交易id已上传'
                };
            }
        }
    },
    'e_ni': {
        key: 'e_ni',
        name: 'number_items',
        hint: '请确认是否有上传物品数量',
        checkfunc: (val) => {
            if (!val) {
                return {
                    code: -1,
                    msg: '缺少物品数量',
                    solve: [{
                        type: 'text',
                        data: '请用商品数量将下面代码里的<b style="color:red">NUMBER_ITEMS</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'number_items\':\'NUMBER_ITEMS\', ...});'
                    }]
                };
            } else if (parseInt(val) !== +val) {
                return {
                    code: -2,
                    msg: '物品数量格式不正确',
                    solve: [{
                        type: 'text',
                        data: '下面<b style="color:red">NUMBER_ITEMS</b>应替换为物品数量，应该是整数'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'number_items\':\'NUMBER_ITEMS\', ...});'
                    }]
                };
            } else {
                return {
                    code: 0,
                    msg: '物品数量格式正确'
                };
            }
        }
    },
    'e_ss': {
        key: 'e_ss',
        name: 'search_string',
        hint: '请确认是否有上传搜索词',
        checkfunc: (val) => {
            if (!val) {
                return {
                    code: -1,
                    msg: '缺少搜索词',
                    solve: [{
                        type: 'text',
                        data: '请用用户搜索用的搜索词将下面代码里的<b style="color:red">SEARCH_STRING</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'search_string\':\'SEARCH_STRING\'});'
                    }]
                };
            } else {
                return {
                    code: 0,
                    msg: '搜索词已上传'
                };
            }
        }
    },
    'e_sm': {
        key: 'e_sm',
        name: 'sign_up_method',
        hint: '请确认是否有上传注册方法',
        checkfunc: (val) => {
            if (!val) {
                return {
                    code: -1,
                    msg: '缺少注册方法',
                    solve: [{
                        type: 'text',
                        data: '请用用户使用的注册方法(eg: Facebook, Twitter, Email, Phone...)将下面代码里的<b style="color:red">SIGN_UP_METHOD</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'sign_up_method\':\'SIGN_UP_METHOD\', ...});'
                    }]
                };
            } else {
                return {
                    code: 0,
                    msg: '注册方法已上传'
                };
            }
        }
    },
    'e_su': {
        key: 'e_su',
        name: 'success',
        hint: '请确认是否有上传是否成功',
        checkfunc: (val) => {
            if (!val) {
                return {
                    code: -1,
                    msg: '缺少是否成功',
                    solve: [{
                        type: 'text',
                        data: '请用是否成功的结果（成功为1，失败为0）将下面代码里的<b style="color:red">SUCCESS</b>替换'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'success\':\'SUCCESS\', ...});'
                    }]
                };
            } else if ((+val) !== 1 && (+val) !== 0) {
                return {
                    code: -2,
                    msg: '是否成功是0或1',
                    solve: [{
                        type: 'text',
                        data: '下面<b style="color:red">SUCCESS</b>是否成功的结果，应为0或1，成功为1，失败为0'
                    }, {
                        type: 'code',
                        data: 'snaptr(\'track\',\'${eventName}\',{\'success\':\'SUCCESS\', ...});'
                    }]
                };
            }  else {
                return {
                    code: 0,
                    msg: '是否成功已上传'
                };
            }
        }
    }
};

export const eventChecklist = {
    'PAGE_VIEW': {
        key: 'PAGE_VIEW',
        params: [
            'pid', 'userinfo'
        ],
        hint: '打开每个页面时上报'

    },
    'VIEW_CONTENT': {
        key: 'VIEW_CONTENT',
        params: [
            'pid', 'userinfo', 'e_pr', 'e_cur',
            'e_iids', 'e_ic', 'e_ni'
        ],
        hint: '打开商品详情页时上报'
    },
    'ADD_CART': {
        key: 'ADD_CART',
        params: [
            'pid', 'userinfo', 'e_pr', 'e_cur',
            'e_iids', 'e_ic', 'e_ni'
        ],
        hint: '点击“加入购物车”时触发上报'
    },
    'START_CHECKOUT': {
        key: 'START_CHECKOUT',
        params: [
            'pid', 'userinfo', 'e_pr', 'e_cur',
            'e_iids', 'e_ic', 'e_ni', 'e_pia'
        ],
        hint: '点击“结算”时触发上报（点击事件触发上报）'
    },
    'ADD_BILLING': {
        key: 'ADD_BILLING',
        params: [
            'pid', 'userinfo', 'e_pr', 'e_cur',
            'e_iids', 'e_ic', 'e_ni', 'e_pia'
        ],
        hint: '确认添加付款信息后上报'
    },
    'PURCHASE': {
        key: 'PURCHASE',
        params: [
            'pid', 'userinfo', 'e_pr', 'e_cur',
            'e_iids', 'e_ic', 'e_ni', 'e_pia', 'e_tid'
        ],
        hint: '付款成功后上报'
    },
    'SEARCH': {
        key: 'SEARCH',
        params: [
            'pid', 'userinfo', 'e_ss'
        ],
        hint: '搜索'
    },
    'SIGN_UP': {
        key: 'SIGN_UP',
        params: [
            'pid', 'userinfo', 'e_sm'
        ],
        hint: '注册'
    }
};