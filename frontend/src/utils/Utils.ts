
export class Utils {
    static copy(data: any) {
        return JSON.parse(JSON.stringify(data))
    }
    // 不输入参数调用的就是当前时间
    // 参数--需转换时间的时间戳
    static formatDate(time: string) {
        if (time === null) return '--'
        let date = new Date(parseInt(time));

        let YY = date.getFullYear();
        let MM = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        // 这里修改返回时间的格式
        return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
    }


}