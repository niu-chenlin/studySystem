
export class GlobalTool {
    public static getValueType(value) {
        return Object.prototype.toString.call(value).slice(8, -1);
    }

    public static getRowKey(record, index, attribute?) {
        if(attribute) {
            return record[attribute] + index;
        }
        return new Date().getTime() + index;
    }

    public static debounce(func, awit) {
        let timeId;
        console.log(this);
        return function(...params: any) {
            // let ctx = this;
            if(timeId) clearTimeout(timeId);
            timeId = setTimeout(() => {
                console.log(params);
                func.apply(params[0], ...params);
            }, awit);
        }
    }

    public static throttle(func, awit) {
        let lastTime, timeId;
        return function(...params: any) {
            // let ctx = this;
            let now = new Date().getTime();
            if(now - lastTime - awit > 0) { // 如果上次执行的时间和这次触发的时间大于一个执行周期，则执行
                if(timeId) clearTimeout(timeId);
                func.apply(this, ...params);
                lastTime = now;
            } else if(!timeId) {  //还不到一个执行周期 先注册最后一次执行 保证了函数能执行最后一次
                setTimeout(() => {
                    func.apply(this, ...params);
                }, awit);
            }
        }
    }

}