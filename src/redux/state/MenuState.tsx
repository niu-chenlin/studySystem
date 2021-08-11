import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    ApartmentOutlined,
    AppstoreOutlined,
    CodeSandboxOutlined,
    ShakeOutlined,
    TableOutlined,
    ShopOutlined,
    WalletOutlined,
    WechatOutlined,
    ZhihuOutlined,
} from '@ant-design/icons';
import * as React from "react";
import {DashboardView} from "../../views/dashboard-view/dashboard-view";
import {AboutView} from "../../views/about-view/about-view";
import {ReduxView} from "../../views/react-view/redux-view";
import {ReactContextView} from "../../views/react-context-view/react-context-view";
import { ReactHooksView } from "../../views/react-hooks-view/react-hooks-view";
import { MapServerView } from "../../views/map-server-view/map-server-view";
/**
 * 为什么要把菜单数据定义到redux中呢？
 * 原因：菜单数据可能存在权限控制行为，基于数据驱动视图，render不同权限下的菜单数据
 * Create Date: 2021-5-7
 * Create Auth: 牛晨林
 */
const MenuState = [
    {
        name: "Study仪表盘",
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
        name: "React全家桶",
        key: "react",
        icon: <ApartmentOutlined />,
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
                name: "ReactHooks",
                key: "ReactHooks",
                role: "0",
                component: <ReactHooksView/>
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
        name: "Vue全家桶",
        key: "vue",
        icon: <AppstoreOutlined />,
        role: "0",
        children: [
            {
                name: "Vuex",
                key: "reactVuex",
                role: "0",
                component: <ReduxView/>
            }
        ]
    },
    {
        name: "NodeJs",
        key: "node",
        icon: <CodeSandboxOutlined />,
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
        name: "React移动端开发",
        key: "reactydd",
        icon: <ShakeOutlined />,
        role: "0",
        router: "/wenxin",
        children: [
            {
                name: "express",
                key: "express",
                role: "0",
                router: "/vite",
            }
        ]
    },
    {
        name: "sql语句",
        key: "sql",
        icon: <TableOutlined />,
        role: "0",
        router: "/mysql"
    },
    {
        name: "服务端渲染",
        key: "renderServer",
        icon: <ShopOutlined />,
        role: "0",
        router: "/server",
        children: [
            {
                name: "express",
                key: "express",
                role: "0",
                router: "/serverRender",
            }
        ]
    },
    {
        name: "vite | webpack",
        key: "vite",
        icon: <WalletOutlined />,
        role: "0",
        router: "/vite",
        children: [
            {
                name: "express",
                key: "express",
                role: "0",
                router: "/vite",
            }
        ]
    },
    {
        name: "小程序开发",
        key: "xcx",
        icon: <WechatOutlined />,
        role: "0",
        router: "/wenxin",
        children: [
            {
                name: "express",
                key: "express",
                role: "0",
                router: "/vite",
            }
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
        name: "MapServer",
        key: "mapServer",
        icon: <FileOutlined />,
        role: "0",
        component: <MapServerView/>
    },
    {
        name: "关于",
        key: "about",
        icon: <ZhihuOutlined />,
        role: "0",
        component: AboutView
    },
];

export default MenuState;