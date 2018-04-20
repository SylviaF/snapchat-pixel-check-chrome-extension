/*
* @Author: fangsimin
* @Date:   2018-04-08 21:00:02
* @Last Modified by:   fangsimin
* @Last Modified time: 2018-04-08 21:00:14
*/
export function toObj(kvArr, keyName = 'name', valueName = 'value') {
    return Array.prototype.reduce.call(kvArr, (ret, item) => {
        ret[item[keyName]] = item[valueName];
        return ret;
    }, {});
}