import * as React from "react";
import { Avatar, Image, Space, Badge } from 'antd';
import {
    BellOutlined
} from '@ant-design/icons';

interface HeaderViewStates {
    [key: string]: any,

}
export class HeaderView extends React.Component<any, HeaderViewStates>  {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }
    render() {
        return <div id="header-view">
            <Space>
                {/*<Avatar>*/}
                    {/*<Badge*/}
                        {/*className="site-badge-count-109"*/}
                        {/*count={true ? 109 : 0}*/}
                        {/*style={{ backgroundColor: '#52c41a' }}*/}
                    {/*/>*/}
                {/*</Avatar>*/}
                {/*<div className="msg-count">*/}
                    {/*<BellOutlined/>*/}
                    {/*<Badge count={5}>*/}
                        {/*<span className="head-example" />*/}
                    {/*</Badge>*/}
                {/*</div>*/}
                <Badge count={99}>
                    <BellOutlined/>
                </Badge>
                <Avatar><i className="iconfont">&#xe6a0;</i></Avatar>
            </Space>
        </div>
    }
}