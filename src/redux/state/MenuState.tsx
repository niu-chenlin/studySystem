import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import * as React from "react";
/**
 * 为什么要把菜单数据定义到redux中呢？
 * 原因：菜单数据可能存在权限控制行为，基于数据驱动视图，render不同权限下的菜单数据
 * Create Date: 2021-5-7
 * Create Auth: 牛晨林
 */
const MenuState = [
    {
        name: "Dashboard",
        key: "dashboard",
        icon: <PieChartOutlined />,
        role: "0",
        router: "/router",
    },
    {
        name: "leaflet",
        key: "leaflet",
        icon: <DesktopOutlined />,
        role: "0",
        router: "/leaflet",
        children: [
            {
                name: "理论",
                key: "leafletTheory",
                role: "0",
                router: "/leafletTheory",
            },
            {
                name: "实例",
                key: "leafletInstance",
                role: "0",
                router: "/leafletInstance",
            },
            {
                name: "其他",
                key: "leafletOther",
                role: "0",
                router: "/leafletOther",
            }
        ]
    },
    {
        name: "React",
        key: "BaseReact",
        icon: <UserOutlined />,
        role: "0",
        router: "/baseReact",
        children: [
            {
                name: "Redux",
                key: "Redux",
                role: "0",
                router: "/reactRedux",
            },
            {
                name: "DeepWebJs",
                key: "deep-web-js",
                role: "0",
                router: "/deepWebJs",
            },
            {
                name: "DeepWebCss",
                key: "deep-web-css",
                role: "0",
                router: "/deepWebCss",
            },
            {
                name: "DeepWebHtml",
                key: "deep-web-html",
                role: "0",
                router: "/deepWebHtml",
            }
        ]
    },
    {
        name: "NodeJs",
        key: "node",
        icon: <TeamOutlined />,
        role: "0",
        router: "/node",
        children: [
            {
                name: "express",
                key: "express",
                role: "0",
                router: "/nodeExpress",
            },
            {
                name: "koa",
                key: "koa",
                role: "0",
                router: "/nodeKoa",
            },
        ]
    },
    {
        name: "Last",
        key: "last",
        icon: <FileOutlined />,
        role: "0",
        router: "/last",
    },
]

export default MenuState;