//因为这里的App组件是需要当成模块来 "export default" 导出，所以此处加上 "@module 模块名" 标识
//并且后续export导出时，填写为"@export module:模块名"

/**
 * @description 这是项目开始的组件,
 * 我在这里添加了一行说明,
 * 这是1.0版本的组件
 * @module App
 * @version 1.0
 * @author lean
 * @param {Object} props 入口
 * @return {Fiber} 项目组件
 * @export module:App
 */
export default function App(props) {
    //由于"clickHandle"函数是用"const"关键声明的箭头函数,所以显式的填写"@function 函数名"
    //jsdoc也可以配置babel,进行语法识别,本文不做讨论

    /**
     * @description  标签下的点击事件,在控制台输出Event对象,无返回值
     * @function clickHandle
     * @param {Event} e
     * @return void
     */
    const clickHandle = (e) => {
        let ret: Number = 1;
        console.log(ret);
        console.log(e);
    };

    //jsdoc也可以省略"@description"标识,直接写上说明
    //这里标识了一个常量,用"@memberof" 关键字来标识这个变量是属于某个 类/模块 下的成员
    //这个常量的类型是整型数字,这里 用"@type {int}" 来标识

    /**
     * 这是一个常量整型数字,这个数字控制了xxxxx逻辑
     * @memberof module:App
     * @type {Int}
     */
    const logicNumber = 20;

    return <div className="App">
        ...
    </div>;
}
/**
 * 提供Bootstrap的alert实现
 * @class StiStrap.alert
 * @summary 基于Vue的子组件规范实现，不可直接实例化
 * @example
 import { alert } from StiStrap
 export defualt {
    components : {
        alert
    }
 }
 */
export default {

    /**
     * @lends StiStrap.alert.prototype
     */
    props : {

        /**
         * @desc 是否显示此组件
         * @type { boolean }
         */
        show : {
            type : Boolean
        },

        /**
         * @type {Number}
         * @desc 控制组件的高度
         */
        height : {
            type : Number
        }
    }

}