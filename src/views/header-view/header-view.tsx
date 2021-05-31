import * as React from "react";
import { Avatar, Image, Space, Badge, Dropdown, Menu, message } from 'antd';
import {
    BellOutlined,
    SettingOutlined,
    FormOutlined,
    EditOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { AuthorTool } from "../../tools/author-tool";
import { withRouter } from "react-router";

interface HeaderViewStates {
    [key: string]: any,

}
class HeaderView extends React.Component<any, HeaderViewStates>  {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }
    onMenuClick(event: any, type: string) {
        event.stopPropagation();
        event.preventDefault();
        switch (type) {
            case "logout":
                AuthorTool.clearAuthor();
                console.log(this.props.history);
                this.props.history.push("/login");
                break;
            default :
                message.info('等待开发中...');
        }
    }
    initMenu() {
        return <Menu>
            <Menu.Item>
                <a target="_self" rel="noopener noreferrer" href="#" onClick={(e) => this.onMenuClick(e,'set-info')}>
                    <SettingOutlined />修改个人信息
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_self" rel="noopener noreferrer" href="#" onClick={(e) => this.onMenuClick(e,'up-pwd')}>
                    <FormOutlined />修改密码
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_self" rel="noopener noreferrer" href="#" onClick={(e) => this.onMenuClick(e,'re-pwd')}>
                    <EditOutlined />重置密码
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_self" rel="noopener noreferrer" href="#" onClick={(e) => this.onMenuClick(e,'logout')}>
                    <LogoutOutlined />退出登录
                </a>
            </Menu.Item>
        </Menu>
    }
    render() {
        return <div id="header-view">
            {/*<Badge count={99} style={{display: 'none'}}>*/}
                {/*<i className="iconfont" style={{fontSize: 30}}>&#xe62b;</i>*/}
            {/*</Badge>*/}
            <Dropdown overlay={this.initMenu()} placement="bottomRight" arrow>
                <Avatar><i className="iconfont g-mouse-hand">&#xe6a0;</i></Avatar>
            </Dropdown>
        </div>
    }
}
export default withRouter(HeaderView);