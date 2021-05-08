import * as React from "react";
import {AuthorObj, AuthorTool} from "../../tools/author-tool";

interface MenuContainerProps {
    menuList: any;
}

export class MenuContainer extends React.Component<MenuContainerProps, any> {
    authorObj: AuthorObj = AuthorTool.getAuthor();
    renderMenuObj: any;
    constructor(props: MenuContainerProps) {
        super(props);
        this.renderMenuObj = this.getMenuByRoleFun();
        console.log(this.recursiveObj(this.renderMenuObj));
    }
    getMenuByRoleFun() {
        // return this.props.menuList.filter(item => {
        //     // return item.role.indexOf(this.authorObj.role) > 0;
        //     return item.role.indexOf(0) > 0;
        // });
        let ret = this.props.menuList.filter(item => {
            return item.role.indexOf(0) >= 0;
        });
        console.log(ret);
        return ret;
    }

    renderMenuFun() {
        this.renderMenuObj.forEach(item => {

        })
    }

    recursiveObj(arr) {
        let temp = {};
        // if(!obj[sub]) return obj;
        for(let i = 0; i < arr.length; i++) {

        }
        // for(let key in obj) {
        //     if(typeof obj[key].children === "object") {
        //         console.log(temp[key].children);
        //         temp[key].children = this.recursiveObj(temp[key].children);
        //     } else {
        //         temp[key] = obj[key];
        //     }
        // }
        return temp;
    }

    render() {
        return <div>This is MenuContainer view</div>
    }
}
