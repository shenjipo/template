import html2canvas from "html2canvas";

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

    static exportImage(targetDom: any, title: string) {

        return html2canvas(targetDom.$el, {
            useCORS: true,
            allowTaint: true,

        }).then((canvas: any) => {
            let imgUrl = canvas.toDataURL("image/png");
            let a = document.createElement("a");
            a.download = `${title}.png`;// 设置下载的文件名，默认是'下载'
            a.href = imgUrl;

            a.click();
            a.remove(); // 下载之后把创建的元素删除

        }).catch(err => {
            return err
        })
    }

    static exportMd(content: string, title: string) {
        // 定义要导出的文本内容
        const text = content;

        // 创建Blob对象
        const blob = new Blob([text], { type: "text/plain" });

        // 创建URL对象
        const url = URL.createObjectURL(blob);

        // 创建a标签并设置href属性和download属性
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.md`;
        a.click();
        a.remove()
    }
}