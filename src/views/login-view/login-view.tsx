import * as React from "react";
// import {  } from "react-router";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {ValidationTool} from "../../tools/validation-tool";
import {AuthorTool} from "../../tools/author-tool";
const loginUrl = require("../../static/img/login1.jpeg");
// import test from "testnpm_ncl";
// import * as t from "verification_code_ncl";

interface LoginViewStates {
    [key: string]: any,
    nameValidateStatus: any,
    pwdValidateStatus: any,
    btnDisabled: boolean
}
export class LoginView extends React.Component<any, LoginViewStates> {
    timeId: any;
    constructor(props: any) {
        // test.printMsg();
        super(props);
        this.state = {
            nameValidateStatus: "",
            pwdValidateStatus: "",
            btnDisabled: true
        }
    }
    changeValueByValidation(v: string, t: string) {
        // 这里没必要使用闭包，因为有先天条件对timeId进行缓存，使用闭包反而容易造成内存溢出的风险
        if(this.timeId) clearTimeout(this.timeId);
        this.timeId = setTimeout(() => {
            if(ValidationTool.validationLogin(v)) {
                this.setState({[t + "ValidateStatus"] : "success"}, () => {this.setBtnDisabled()});
            } else {
                this.setState({[t + "ValidateStatus"] : "error"}, () => {this.setBtnDisabled()});
            }
        }, 500);
    }
    doInputChange(e: any, t: string) {
        this.setState({[t + "ValidateStatus"] : "validating"});
        this.changeValueByValidation(e.target.value, t);
    }
    setBtnDisabled() {
        let {nameValidateStatus, pwdValidateStatus} = this.state;
        if(nameValidateStatus === "success" && pwdValidateStatus === "success") {
            this.setState({btnDisabled: false});
        } else {
            this.setState({btnDisabled: true});
        }
    }
    doLogin(form: any) {
        if(AuthorTool.checkAuthor(form.username, form.password)) {
            // console.log(this.loca);
        }
        console.log(form);
    }
    render() {
        return <div id="login-view">
            <div className="l-left">
                <div className="l-login">
                    <h1>Sign In.</h1>
                    <sub>Welcome to the door of the world</sub>
                    <Form
                        onFinish={(form: any) => this.doLogin(form)}
                        initialValues={{ // 组件默认值 按照Item中的name属性定义的

                        }}
                    >
                        <Form.Item
                            name="username"
                            hasFeedback
                            validateStatus={this.state.nameValidateStatus}
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input placeholder="Username"
                                   onChange={(e: any) => {this.doInputChange(e, "name")}}/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            hasFeedback
                            validateStatus={this.state.pwdValidateStatus}
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input type="password"
                                   placeholder="Password"
                                   onChange={(e: any) => {this.doInputChange(e, "pwd")}}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" disabled={this.state.btnDisabled} htmlType="submit" className="login-form-button" onClick={(e: any) => this.doLogin(e)}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className="l-right">
                <img src={loginUrl} alt="Welcome to the door of the world"/>
            </div>
        </div>
    }
}
