import * as React from "react";
import {AuthorObj, AuthorTool} from "../../tools/author-tool";
import {Menu} from "antd";
const { SubMenu } = Menu;

interface MenuContainerProps {
    menuList: any;
}

export class MenuContainer extends React.Component<MenuContainerProps, any> {
    authorObj: AuthorObj = AuthorTool.getAuthor();
    constructor(props: MenuContainerProps) {
        super(props);
        let renderMenuByRole = this.getMenuByRoleFun();
        let menuList = this.renderMenu(renderMenuByRole);
        this.state = {
            menuList
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) { // 从props中获取state
        console.log("new life cycle");
        let {menuList} = nextProps;
        if(menuList != prevState.menuList) {
            return {prevState}
        }
        return null;
    }
    componentDidMount() {

    }
    getMenuByRoleFun() {
        return this.props.menuList.filter(item => {
            return item.role.indexOf(0) >= 0;
        });
    }
    renderMenu(menuArr) {
        return menuArr.map(item => {
            if(item.children) {
                return <SubMenu key={item.key} icon={item.icon} title={item.name}>
                    {this.renderMenu(item.children)}
                </SubMenu>
            } else {
                return <Menu.Item key={item.key} icon={item.icon}>
                    {item.name}
                </Menu.Item>
            }
        });
    }
    menuOnClick(e) {
        console.log(3333333333);
        console.log(e);
        this.props
    }
    render() {
        return  <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={(e) => this.menuOnClick(e)}>
            {this.state.menuList}
        </Menu>
    }
}
