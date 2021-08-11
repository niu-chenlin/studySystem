import axios, {AxiosResponse} from 'axios';
export class ApiTools {
    api?: string;
    paras: any;
    token?: string;
    sign: string;
    timestamp: number;
    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();
    protected preRequest() {
        this.timestamp = (new Date()).getTime();
        // this.sign = SignTool.createSign(this);
    }
}