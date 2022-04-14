// 300
// 100
const BREAS_NUM = 100;
const MIN_BREAS_NUM = Math.floor(BREAS_NUM  * 0.8)
const BREAS_Y = 50;

// 设置p2.js 和 egret 二者距离的度量转换比例
// p2.js 单位MKS（米 千克 秒）egret是像素px
// 可理解为p2.js的一米长度是egret中屏幕的50px
const factor:number = 50;

interface BeardItem{
    shape:egret.Sprite,
    line:egret.Shape, 
    body:p2.Body, 
    drop:boolean
}

interface BeardInterface{
    faceX:number,
    faceY:number,
    beards:Array<BeardItem>,
    touchBreadCb:(breadNum:number)=>void
}

interface BreadParamsInterface<T>{
    faceX:T,
    faceY:T,
    touchBreadCb?:(breadNum:number)=>void
}

class Beards extends egret.Sprite implements BeardInterface{
    
    faceX:number = 0;
    faceY:number = 0;
    beards:Array<BeardItem> = [];
    
    // 胡子对象池
    beardsPool:Array<BeardItem> = [];

    static touchPositionRecrod:{ x:number,y:number };
    
    word:p2.World;
    touchBreadCb:(breadNum:number)=>void = function(){};
    
    constructor(beardParmas:BreadParamsInterface<number>){
        super();

        this.faceX = beardParmas.faceX;
        this.faceY = beardParmas.faceY;

        if( this.touchBreadCb ){
            this.touchBreadCb = beardParmas.touchBreadCb
        }

        this.word = new p2.World({ gravity:[0,0.01] });
        this.word.sleepMode = p2.World.BODY_SLEEPING;
        this.addEventListener(egret.Event.ENTER_FRAME,this.Update,this);
    }
    private Update(){    
        this.word.step(2.5);
        this.beards.filter(i=>i.drop).forEach((i)=>{
            // console.log(i.shape.x , i.shape.y , i.body.position[0] * factor , i.body.position[1] * factor);
            if(Math.floor(i.shape.x) !== Math.floor(i.body.position[0] * factor)) i.shape.x = i.body.position[0] * factor;
            if(Math.floor(i.shape.y) !== Math.floor(i.body.position[1] * factor)) i.shape.y = i.body.position[1] * factor;
        })
    }
    public draw(face:egret.Sprite){
        this.drawBeards(face);   
        face.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchStart,face);
    }
    private drawBeard(x:number,y:number,face:egret.Sprite):BeardItem{
        
        var boxShape = new p2.Box({ radius:20 / factor });
        const boxBody : p2.Body = new p2.Body({  
            mass:1,
            position:[x/factor , y/factor],
            collisionResponse:false,
            ccdIterations:false 
        });
        boxBody.addShape(boxShape);
        const shp:egret.Sprite = new egret.Sprite(); 
        shp.x = x;
        shp.y = y;
        shp.anchorOffsetX = x;
        shp.anchorOffsetY = y;        
        const beardAngle = Math.atan2(this.faceY * 0.5 - y,this.faceX - x) * 180 / Math.PI;
        shp.rotation = beardAngle - 90;
        // 测试查看点击范围
        // shp.graphics.lineStyle(2,0x000000);
        shp.graphics.beginFill(0x000000,0);
        shp.graphics.drawCircle(x,y - 8,40);
        shp.graphics.endFill();            
        shp.touchEnabled = true;

        const line = new egret.Shape();
        line.x = x;
        line.y = y;
        line.anchorOffsetX = x;
        line.anchorOffsetY = y; 
        // 0x696969
        line.graphics.lineStyle( 2, 0x000000 );
        const lineExtlong =  (y / 100) > 5.5 ? Math.floor( (y / 100) * 0.5) : 0
        line.graphics.moveTo(x,y - (5 + lineExtlong))
        line.graphics.lineTo(x,y)
        line.graphics.endFill();
        line.scaleY = 0;
        var tw = egret.Tween.get(line);
        tw.to( { scaleY:1 }, 300, egret.Ease.backInOut)

        shp.addChild(line);
        this.word.addBody(boxBody);
        boxBody.displays = [shp];

        const beardItem = { shape:shp,line:line ,body:boxBody,drop:false, }
        shp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchBeard.bind(this,beardItem,face),shp,true)
        shp.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchBeard.bind(this,beardItem,face),shp,true)

        return beardItem;
    }
    private reDrawBear(x:number,y:number,face:egret.Sprite):BeardItem{
 
        const beard = this.beardsPool.pop()

        beard.body.position[0] = x / factor;
        beard.body.position[1] = y / factor;

        beard.shape.graphics.clear();
        beard.shape.touchEnabled = true;
        beard.shape.x = x;
        beard.shape.y = y;
        beard.shape.$anchorOffsetX = x;
        beard.shape.$anchorOffsetY = y;
        const beardAngle = Math.atan2(this.faceY * 0.5 - y,this.faceX - x) * 180 / Math.PI;
        beard.shape.rotation = beardAngle - 90;
        beard.shape.graphics.clear();
        // beard.shape.graphics.lineStyle( 2, 0x000000 );
        beard.shape.graphics.beginFill(0x000000,0);
        beard.shape.graphics.drawCircle(x,y - 8,40);
        beard.shape.graphics.endFill();            

        beard.line.$alpha = 1;
        beard.line.graphics.clear();
        beard.line.x = x;
        beard.line.y = y;
        beard.line.anchorOffsetX = x;
        beard.line.anchorOffsetY = y; 
        // 0x696969
        beard.line.graphics.lineStyle( 2, 0x000000 );
        const lineExtlong =  (y / 100) > 5.5 ? Math.floor( (y / 100) * 0.5) : 0
        beard.line.graphics.moveTo(x,y - (5 + lineExtlong))
        beard.line.graphics.lineTo(x,y)
        beard.line.graphics.endFill();
        beard.line.scaleY = 0;
        var tw = egret.Tween.get(beard.line);
        tw.to( { scaleY:1 }, 300, egret.Ease.backInOut)

        beard.shape.addChild(beard.line);

        return beard
    }
    private removeBeard = (beardItem:BeardItem):Promise<undefined> => {
        let beardIndex = -1;
        beardItem.drop = true;
        const beard = beardItem.shape
        beard.$touchEnabled = false;

        // 600ms 为给胡子掉落的动画时间
        return new Promise(resolve=>{
            var timer = setTimeout(()=>{
                const beardIndex = this.beards.indexOf(beardItem);
                // 停止掉落动画计算
                beardItem.drop = false;
                // 清除动画
                egret.Tween.removeTweens(beardItem.line);
                // 胡子从画布上消失
                beardItem.shape.parent.removeChild(beardItem.shape);
                // 从胡子数组中移除
                this.beards.splice(beardIndex,1);
                // 加入胡子对象池
                this.beardsPool.push(beardItem)
                clearTimeout(timer);
                resolve();
            },600);
        })

    }
    private findClosestBeards(x:number,y:number){
        const nearBeards = this.beards.filter(beard=>{
            if(beard.drop) return false;
            const distance = Math.abs(Math.sqrt(Math.pow(x - beard.line.x,2) + Math.pow(y - beard.line.y,2)))
            return distance <= 25
        })
        return nearBeards
    }
    private touchBeard = async (beardItem:BeardItem,face:egret.Sprite,event:egret.TouchEvent)=> {
        
        const nearBeards = this.findClosestBeards(event.$stageX,event.$stageY);

        // 上下的位置 -1 为上 1 为下
        const verticalDirection = event.$stageY > Beards.touchPositionRecrod.y ? -1 : 1;
        // 左右的位置 -1 为左 1 为右
        const horizontalDirection = event.$stageX > Beards.touchPositionRecrod.x ? 1 : -1;
        Beards.touchPositionRecrod = { x:event.$stageX , y:event.$stageY }
        this.touchBreadCb(nearBeards.length);            

        nearBeards.forEach(beard=>{
            beard.body.applyForceLocal([0.1 * horizontalDirection,0.1 * verticalDirection],[beardItem.shape.x / factor,beardItem.shape.y / factor]);
            // 清除胡子
            this.removeBeard(beard)
            .then(()=>{
                // 再重新创建一条新胡子
                this.createBear(face,true);
            });
        })
       
        //  小于胡子的最小数量时及时补充
        if( this.beards.length <  (BREAS_NUM * 0.9) ){
            const timer = setTimeout(()=>{
                // 每次只补充10条
                let i = 0;
                while(++i < BREAS_NUM - this.beards.length) this.createBear(face);
                clearTimeout(timer);
            })
        }
    }
    // https://zhuanlan.zhihu.com/p/447898464 在圆中均匀分布随机点
    private randomPoint(r:number,centerX:number,centerY:number,tryCount:number = 0):Array<number>{
           let theta = 2 * Math.PI * Math.random();
           let len = Math.sqrt(Math.random()) * r;
           let x = centerX + len * Math.cos(theta); 
           let y = centerY + len * Math.sin(theta);
           // y值太大 重新绘制 重新绘制次数为3次 都为失败则不绘制
           if( y < this.faceY - BREAS_Y && tryCount != 3 ){
               return this.randomPoint(r,centerX,centerY,++tryCount)
           }
           return [x,y];
    }
    private createBear(face:egret.Sprite,usePool:boolean = false){
        const [x,y] = this.randomPoint(250,this.faceX,this.faceY);
        
        if( y > this.faceY - BREAS_Y ){
            const beard = usePool ? this.reDrawBear(x,y,face) : this.drawBeard(x,y,face);
            this.beards.push(beard);
            face.addChild(beard.shape);
        }
    }
    private drawBeards(face:egret.Sprite){
        let count = 0;
        for( let i = 0; i < BREAS_NUM ; i ++ ){
            this.createBear(face);
        }
    } 
    private touchStart(event:egret.TouchEvent){
        Beards.touchPositionRecrod = { x:event.$stageX , y:event.$stageY }
    }

}