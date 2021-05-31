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
import {DashboardView} from "../../views/dashboard-view/dashboard-view";
import {AboutView} from "../../views/about-view/about-view";
import {ReduxView} from "../../views/react-view/redux-view";
import {ReactContextView} from "../../views/react-context-view/react-context-view";
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
        component: <DashboardView/>
    },
    {
        name: "leaflet",
        key: "leaflet",
        icon: <DesktopOutlined />,
        role: "0",
        children: [
            {
                name: "理论",
                key: "leafletTheory",
                role: "0"
            },
            {
                name: "实例",
                key: "leafletInstance",
                role: "0",
            },
            {
                name: "其他",
                key: "leafletOther",
                role: "0",
            }
        ]
    },
    {
        name: "React",
        key: "react",
        icon: <UserOutlined />,
        role: "0",
        children: [
            {
                name: "Redux",
                key: "reactRedux",
                role: "0",
                component: <ReduxView/>
            },
            {
                name: "React通信-Context",
                key: "reactContext",
                role: "0",
                component: <ReactContextView/>
            },
            {
                name: "测试ReactContextByJs",
                key: "reactContext11",
                role: "0",
                // component: <AppJs/>
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
    {
        name: "关于",
        key: "about",
        icon: <FileOutlined />,
        role: "0",
        component: AboutView
    },
]

export default MenuState;