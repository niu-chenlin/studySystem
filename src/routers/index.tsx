import * as React from "react";
import {HomeView} from "../views/home-view/home-view";
import {AboutView} from "../views/about-view/about-view";

interface router {
    path: string,
    exact?: boolean,
    component: any,
    children?: any[]
}
export const ROUTER: Array<router> = [
    {
        path: '/',
        exact: true,
        component: HomeView
    },
    {
        path: '/about',
        exact: true,
        component: AboutView
    }
]