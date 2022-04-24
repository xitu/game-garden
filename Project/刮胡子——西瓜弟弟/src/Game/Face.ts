

interface FaceInterface{
    faceX:number,
    faceY:number
}

interface FaceParamsInterface<T>{
    x:T,
    y:T,
    width:T,
    height:T
}


class Face extends egret.Sprite implements FaceInterface{
    
    face:egret.Sprite;
    eyes:{ eyeballs:egret.Sprite[],eyebrows:egret.Sprite[] }
    openMouth:egret.Sprite;
    shynessFace:egret.Sprite;
    faceX:number = 0;
    faceY:number = 0;

    constructor(faceParmas:FaceParamsInterface<number>){
        super();
        this.faceX = faceParmas.x;
        this.faceY = faceParmas.y;
    }

    public draw():egret.Sprite{

        this.face = this.drawFace();
        
        this.openMouth = this.drawOpenMouth();
        this.shynessFace =  this.drawShyness(); 

        const bread = new Beards({ 
            faceX:this.faceX,
            faceY:this.faceY,
            touchBreadCb:(breadNum:number)=> this.face.dispatchEvent(new egret.Event('touchBread',false,false,breadNum)) 
        });

        this.drawBeardSkin(this.face);
        this.drawFaceLine(this.face);
        this.eyes = this.drawEyes(this.face);
        this.drawMouth(this.face);

        
        // 在脸上画胡子
        bread.draw(this.face);
        
        this.face.touchEnabled = true;
        this.face.addEventListener(egret.TouchEvent.TOUCH_MOVE,()=>{
            SoundManager.getInstance().palyPullShoutSound();
        },this.face);
        this.face.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
            SoundManager.getInstance().palyPullShoutSound();
        },this.face);
        this.face.addEventListener(egret.TouchEvent.TOUCH_END,()=>{
            SoundManager.getInstance().stopPullShoutSound();
        },this.face)
        this.face.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,()=>{
            SoundManager.getInstance().stopPullShoutSound();
        },this.face)
        
        
        return this.face;
    }
     
    private drawEyes(face:egret.Sprite){

        const eyeballs = [];
        const eyebrows = [];
        for(let i = 0; i < 2; i++){
            const eyebrow:egret.Sprite = new egret.Sprite();
            const eyeball:egret.Sprite = new egret.Sprite();

            eyebrows.push(eyebrow);
            eyeballs.push(eyeball)

            const eyebrowX = this.faceX - 75/2 + (i * 150/2);
            const eyebrowY = this.faceY - 200
            // drawing the eyebrow to the face
            eyebrow.x = eyebrowX;
            eyebrow.y = eyebrowY;
            eyebrow.$anchorOffsetX = eyebrowX;
            eyebrow.$anchorOffsetY = eyebrowY;

            eyebrow.graphics.lineStyle(4,0x000000);
            eyebrow.graphics.drawArc(eyebrowX,eyebrowY,10,0,Math.PI,false);
            eyebrow.graphics.endFill();

            eyebrow.rotation = 180;

            face.addChild(eyebrow);

            // x faceWitdh - 眼距/2 + (i * 眼距)
            const eyeballX = this.faceX - 75 + (i * 150);
            const eyeballY = this.faceY - 150;

            eyeball.x = eyeballX;
            eyeball.y = eyeballY;
            eyeball.$anchorOffsetX = eyeballX;
            eyeball.$anchorOffsetY = eyeballY;

            // drawing the eyeball to the face
            eyeball.graphics.beginFill(0x000000);
            eyeball.graphics.drawCircle(eyeballX,eyeballY,12);
            eyeball.graphics.endFill();

            var tw = egret.Tween.get(eyeball,{ loop:true, })
            .wait(2000)
            .to( { scaleY:0.1 }, 100 ,egret.Ease.cubicInOut)
            .to( { scaleY:1 }, 100 ,egret.Ease.cubicInOut)

            face.addChild(eyeball);
            
        }

        return { eyeballs,eyebrows }
    }

    private drawMouth(face:egret.Sprite) {
        const mouth:egret.Sprite = new egret.Sprite();
        mouth.graphics.lineStyle(4,0x000000);
        mouth.graphics.drawArc(this.faceX, this.faceY - 100,20,0,Math.PI,true);
        mouth.graphics.endFill();
        face.addChild(mouth);
    }

    private drawFaceLine(face:egret.Sprite){
        const faceLine:egret.Sprite = new egret.Sprite()
        faceLine.graphics.lineStyle(4,0xFFA500);
        faceLine.graphics.drawCircle(this.faceX,this.faceY,250);
        faceLine.graphics.endFill(); 
        face.addChild(faceLine);
    }

    private drawBeardSkin(face:egret.Sprite){
        
        const otherBearSkin:egret.Sprite = new egret.Sprite();
        otherBearSkin.graphics.beginFill(0xf5f5f5);
        otherBearSkin.graphics.drawArc(this.faceX,this.faceY * 2,250,0,Math.PI,true);
        otherBearSkin.graphics.endFill();
        otherBearSkin.scaleY = 0.5;
        face.addChild(otherBearSkin);

        const beardSkin:egret.Sprite = new egret.Sprite();
        beardSkin.graphics.beginFill(0xf5f5f5);
        beardSkin.graphics.drawArc(this.faceX,this.faceY,250,0,Math.PI,false);
        beardSkin.graphics.endFill();
        face.addChild(beardSkin);
    }

    private drawOpenMouth():egret.Sprite{
        const openMouth:egret.Sprite = new egret.Sprite();
        openMouth.graphics.lineStyle(4,0x000000);
        openMouth.graphics.beginFill(0xff00000);
        openMouth.graphics.drawCircle(this.faceX, this.faceY - 100,20);
        openMouth.graphics.endFill();
        return openMouth;
    }
    
    private drawFace():egret.Sprite{
        const face:egret.Sprite = new egret.Sprite();
        face.x = this.faceX;
        face.y = this.faceY;
        face.$anchorOffsetX = this.faceX;
        face.$anchorOffsetY = this.faceY;

        face.graphics.beginFill(0xFFEFD5);
        face.graphics.drawCircle(this.faceX,this.faceY,250);
        face.touchEnabled = true;

        var tw = egret.Tween.get(face,{ loop:true })
        .to( { scaleX:1.01,scaleY:1.01 }, 1000 ,egret.Ease.cubicInOut)
        .to( { scaleX:1,scaleY:1 }, 1000 ,egret.Ease.cubicInOut)

        return face;
    }

    private drawShyness():egret.Sprite{
        const shynessFace = new egret.Sprite();
        const y = this.faceY - 113;
        for(let i = 0; i < 2 ; i++){
            for(let i2 = 0; i2 < 3; i2++){
                const lineX = this.faceX - 85 + (i2 * 10) + (i * 155)
                const line = new egret.Shape();
                line.x = lineX;
                line.y = y;
                line.anchorOffsetX = lineX;
                line.anchorOffsetY = y; 
                line.graphics.lineStyle( 4, 0xFFB6C1 );
                line.graphics.moveTo(lineX,y - 8)
                line.graphics.lineTo(lineX - 4,y)
                line.graphics.endFill();
                shynessFace.addChild(line);
            }
        }
        return shynessFace
    }

    public shyness(){
        this.face.addChild(this.shynessFace);
        this.eyes.eyebrows.forEach(i=>i.rotation = 0);
        const timer = setTimeout(()=>{
            this.eyes.eyebrows.forEach(i=>i.rotation = 180);
            if(this.shynessFace.parent) this.shynessFace.parent.removeChild(this.shynessFace);
            clearTimeout(timer);
        },600)
    }

    public openMouthAction(){
        this.face.addChild(this.openMouth);
        const timer = setTimeout(()=>{
            if(this.openMouth.parent) this.openMouth.parent.removeChild(this.openMouth);
            clearTimeout(timer);
        },300)
    }

}