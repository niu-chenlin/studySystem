
export class ValidationTool {
    public static validationLogin(v: string) {
        let tool: RegExp = /^_?[a-zA-Z]{2,10}$/;
        return tool.test(v);
    }
}