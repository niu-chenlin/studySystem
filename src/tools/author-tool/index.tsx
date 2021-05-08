
const AuthorToken = "AuthorToken";
export interface AuthorObj {
    id: string;
    name: string;
    pwd: string;
    role: number;
}
export class AuthorTool {

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