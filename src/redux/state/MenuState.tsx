
const MenuState = [
    {
        name: "Dashboard",
        key: "dashboard",
        role: "0",
        router: "/router",
        component: "",
        isChild: false,
        children: []
    },
    {
        name: "BaseWeb",
        key: "base-web",
        role: "0",
        router: "/baseWeb",
        component: "",
        isChild: true,
        children: [
            {
                name: "BaseWebJs",
                key: "base-web-js",
                role: "0",
                router: "/baseWebJs",
                component: "",
                isChild: false,
                children: []
            },
            {
                name: "BaseWebCss",
                key: "base-web-css",
                role: "0",
                router: "/baseWebCss",
                component: "",
                isChild: false,
                children: []
            },
            {
                name: "BaseWebHtml",
                key: "base-web-html",
                role: "0",
                router: "/baseWebHtml",
                component: "",
                isChild: false,
                children: []
            }
        ]
    },
    {
        name: "DeepWeb",
        key: "deep-web",
        role: "0",
        router: "/deepWeb",
        component: "",
        isChild: true,
        children: [
            {
                name: "DeepWebJs",
                key: "deep-web-js",
                role: "0",
                router: "/deepWebJs",
                component: "",
                isChild: false,
                children: []
            },
            {
                name: "DeepWebCss",
                key: "deep-web-css",
                role: "0",
                router: "/deepWebCss",
                component: "",
                isChild: false,
                children: []
            },
            {
                name: "DeepWebHtml",
                key: "deep-web-html",
                role: "0",
                router: "/deepWebHtml",
                component: "",
                isChild: false,
                children: []
            }
        ]
    },
    {
        name: "NodeJs",
        key: "node",
        role: "0",
        router: "/node",
        component: "",
        isChild: true,
        children: [
            {
                name: "express",
                key: "express",
                role: "0",
                router: "/nodeExpress",
                component: "",
                isChild: false,
                children: []
            },
            {
                name: "koa",
                key: "koa",
                role: "0",
                router: "/nodeKoa",
                component: "",
                isChild: false,
                children: []
            },
        ]
    },
]

export default MenuState;