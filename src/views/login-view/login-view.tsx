import * as React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {ValidationTool} from "../../tools/validation-tool";

interface LoginViewStates {
    nameValidateStatus: any,
    pwdValidateStatus: any,
    [key: string]: any
}
export class LoginView extends React.Component<any, LoginViewStates> {
    timeId: any;
    constructor(props: any) {
        super(props);
        this.state = {
            nameValidateStatus: "",
            pwdValidateStatus: "",
        }
    }
    changeValueByValidation(v: string, t: string) {
        // 这里没必要使用闭包，因为有先天条件对timeId进行缓存，使用闭包反而容易造成内存溢出的风险
        if(this.timeId) clearTimeout(this.timeId);
        this.timeId = setTimeout(() => {
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
    render() {
        return <div id="login-view">
            <div className="l-left">
                <div className="l-login">
                    <h1>Sign In.</h1>
                    <sub>Welcome to the door of the world</sub>
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
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </div>
            </div>
            <div className="l-right">

            </div>
        </div>
    }
}
