import * as React from "react";

export class AboutView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    getDerivedStateFromProps(props, state) {

    }
    render() {
        return<div>
            <head>
                <title>This is About</title>
            </head>
            <main>
                This is NCL test antd project
            </main>
            <footer>
                create date 2021-4
            </footer>
        </div>
    }
}