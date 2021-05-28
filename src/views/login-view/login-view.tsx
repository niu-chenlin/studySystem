import * as React from "react";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {ValidationTool} from "../../tools/validation-tool";
import { AuthorObj, AuthorTool } from "../../tools/author-tool";
const loginUrl = require("../../static/img/login1.jpeg");
import { VerificationCode } from "verification_code_ncl";
import { g_canvas_color } from "../../config/global-config";
import { withRouter } from "react-router";
import { Test } from "../test/test";

interface LoginViewStates {
    [key: string]: any,
    nameValidateStatus: any,
    pwdValidateStatus: any,
    btnDisabled: boolean,
    testStyle: any
}
class LoginView extends React.Component<any, LoginViewStates> {
    nameTimeId: any;
    pwdTimeId: any;
    verificationRes: boolean = false;
    constructor(props: any) {
        super(props);
        this.state = {
            nameValidateStatus: "",
            pwdValidateStatus: "",
            btnDisabled: true,
            testStyle: {overflow: 'hidden'}
        }
    }
    changeValueByValidation(v: string, t: string) {
        // 这里没必要使用闭包，因为有先天条件对timeId进行缓存，使用闭包反而容易造成内存溢出的风险
        if(this[t + 'TimeId']) clearTimeout(this[t + 'TimeId']);
        this[t + 'TimeId'] = setTimeout(() => {
            if(ValidationTool.validationLogin(v)) {
                this.setState({[t + "ValidateStatus"] : "success"});
            } else {
                this.setState({[t + "ValidateStatus"] : "error"});
            }
        }, 500);
    }
    doInputChange(e: any, t: string) {
        this.setState({[t + "ValidateStatus"] : "validating"});
        this.changeValueByValidation(e.target.value, t);
    }

    doLogin(form: any) {
        if(!this.verificationRes) message.error("验证码错误！");
        let {nameValidateStatus, pwdValidateStatus} = this.state;
        if(nameValidateStatus === "success" && pwdValidateStatus === "success") {
            let loginData = AuthorTool.getAuthorByLogin(form.username, form.password);
            if(loginData) {
                AuthorTool.setAuthor(loginData);
                setTimeout(() => {
                    this.props.history.push("/main");
                }, 800);
                message.success("登录成功！");
            } else {
                message.error("用户名密码错误！");
            }
        } else {
            message.error("登录失败，请确认输入信息是否有误！");
        }
    }

    onVerification(resMsg: any) {
        this.verificationRes = resMsg.code === 200;
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
                        <VerificationCode
                          onResult={(resMsg) => this.onVerification(resMsg)}
                          onResCanvasColor={() => (g_canvas_color[Math.floor(Math.random() * g_canvas_color.length)])}/>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
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
export default withRouter(LoginView);