import * as uuid from "uuid";
const AuthorToken = "AuthorToken";
export interface AuthorObj {
    id: string;
    name: string;
    expire?: Date; // 如果使用sessionStorage这个参数没必要
    pwd: string;
    role: number;
}
export class AuthorTool {
    private static _initialData: AuthorObj[] = [
        {
            id: uuid.v4(),
            name: "admin",
            pwd: "_admin",
            role: 0
        },
        {
            id: uuid.v4(),
            name: "test1",
            pwd: "_test1",
            role: 1
        },
        {
            id: uuid.v4(),
            name: "test2",
            pwd: "_test2",
            role: 2
        }
    ];

    /**
     * 访问页面时写入init数据，用于仿造user表
     */
    public static initAuthor() {
        sessionStorage.setItem("initAuthor", JSON.stringify(this._initialData));
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