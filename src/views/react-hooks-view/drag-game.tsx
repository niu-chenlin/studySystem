
// export function observe(receive) {
//     const randPos = () => Math.floor(Math.random() * 8);
//     setInterval(() => {
//         receive([randPos(), randPos()])
//     }, 1000)
// }

let obj = {};
const $on = (name, fun) => { // 注册监听
    if(!obj[name]) {
        obj[name] = [];
    }
    obj[name].push(fun);
};
const $emit = (name, val) => { // 触发
    if(obj[name]) {
        obj[name].map(fn => {
            fn(val)
        })
    }
};
const $off = (name, fn) => {
    if(obj[name]) {
        if(fn) {
            let index = obj[name].indexOf(fn);
            if(index > -1) {
                obj[name].splice(index,1);
            }
        } else {
            obj[name].length = 0;
            //设长度为0比obj[name] = []更优，因为如果是空数组则又开辟了一个新空间，设长度为0则不必开辟新空间
        }
    }
};
export default {
    $on, $emit, $off
}