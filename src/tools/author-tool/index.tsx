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

    public static getAuthorByLogin(username: string, password: string) {
        let sqlData: AuthorObj[] = JSON.parse(sessionStorage.getItem("initAuthor"));
        // return sqlData.some(data => { // 只要数组中有一项满足条件就返回true 否则返回false。与arr.every相反
        //     return  data.name === username && Base64.decode(data.pwd) === password;
        // });
        let retData = sqlData.filter(data => {
            return  data.name === username && Base64.decode(data.pwd) === password;
        });
        console.log(retData);
        return retData[0];
        // 使用forEach循环无法正常终止，只能抛出异常实现forEach终止，抛出异常在这里不适用
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