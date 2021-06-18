// 单例模式
export class Single {
    public static instance = null;
    public static init() {
        this.instance = new this.instance;
    }
    public static get getInstance() {
        return this.instance;
    }
}