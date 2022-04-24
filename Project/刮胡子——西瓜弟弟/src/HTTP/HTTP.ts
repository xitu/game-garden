const BASE_URL = 'http://localhost:3000'

// 本地环境 无服务器环境
const IS_LOCAL = true;

module Http {
    // 数据处理
    function querify(object = {}){
        const keys = Object.keys(object);
        const result = keys.reduce((prev,current)=>{
            prev += `&${ current }=${ object[current] }`;
            return prev;   
        },'').slice(1)
        return result;
    }
    export function PostRequest<T>(uri,params:Object = {}){
        return new Promise<T>((resolve,reject)=>{
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            // 设置为POST请求
            request.open(BASE_URL + uri , egret.HttpMethod.POST);
            request.setRequestHeader("Accept","application/json");
            request.setRequestHeader("Content-Type","application/json");
            let keys = Object.keys(params);
            request.send(JSON.stringify(params));
            
            request.addEventListener(egret.Event.COMPLETE,(event:egret.Event)=>{
                var request = <egret.HttpRequest>event.currentTarget;
                const res = JSON.parse(request.response)
                 resolve(res)
            },this);
            
            request.addEventListener(egret.IOErrorEvent.IO_ERROR,(event:egret.Event)=>{
                const res = JSON.parse(request.response)
                // 关闭全局加载
                Loading.getInstance().hide()
                alert(res.errmsg)
                reject(res)
            },this);
        })
    }
    export function GetRequest<T>(uri){
        return new Promise<T>((resolve,reject)=>{
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(BASE_URL + uri , egret.HttpMethod.GET);
            request.send();

            request.addEventListener(egret.Event.COMPLETE,(event:egret.Event)=>{
                var request = <egret.HttpRequest>event.currentTarget;
                const res = JSON.parse(request.response)
                resolve(res)
            },this);

            request.addEventListener(egret.IOErrorEvent.IO_ERROR,(event:egret.Event)=>{
                const res = JSON.parse(request.response)
                // 关闭全局加载
                Loading.getInstance().hide()
                alert(res.errmsg)
                reject(event)
            },this);
        })
    }
}