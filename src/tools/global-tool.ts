
export class GlobalTool {
    static getValueType(value) {
        return Object.prototype.toString.call(value).slice(8, -1);
    }
    static getRowKey(record, index, attribute?) {
        if(attribute) {
            return record[attribute] + index;
        }
        return new Date().getTime() + index;
    }
}