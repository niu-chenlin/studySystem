import * as uuid from "uuid";
import * as Base64 from "js-base64";
const AuthorToken = "AuthorToken";
export interface AuthorObj {
    id: string;
    name: string;
    expire?: number; // 过期时间毫秒数
    pwd: string;
    role: number;
}
export class AuthorTool {
    private static _initialData: AuthorObj[] = [
        {
            id: uuid.v4(),
            name: "admin",
            pwd: Base64.encode("_admin"),
            expire: 60*60*1000,
            role: 0
        },
        {
            id: uuid.v4(),
            name: "test1",
            pwd: Base64.encode("_test1"),
            expire: 60*60*1000,
            role: 1
        },
        {
            id: uuid.v4(),
            name: "test2",
            pwd: Base64.encode("_test2"),
            expire: 60*60*1000,
            role: 2
        }
    ];

    /**
     * 访问页面时写入init数据，用于仿造user表
     */
    public static initAuthor() {
        sessionStorage.setItem("initAuthor", JSON.stringify(this._initialData));
    }

    public static checkAuthor(username: string, password: string) {
        let sqlData: AuthorObj[] = JSON.parse(sessionStorage.getItem("initAuthor"));
        sqlData.forEach((data) => {
            if(data.name === username && Base64.decode(data.pwd) === password) return true;
        });

        return false;
    }

    public static setAuthor(value: AuthorObj) {
        sessionStorage.setItem(AuthorToken, JSON.stringify(value));
    }

    public static getAuthor() {
        return JSON.parse(sessionStorage.getItem(AuthorToken));
    }

    public static clearAuthor() {
        sessionStorage.removeItem(AuthorToken);
    }
}