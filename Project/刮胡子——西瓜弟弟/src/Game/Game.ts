const GAME_TIME_SECOUND = 15;
const GAME_STORAGE_NAME = 'gameScoreRecode'
const PLAYNAME_STORAGE_NAME = 'playerName'

interface GameInterface {
    stageW:number,
    stageH:number,
    playing:boolean,
    gameTime:number,
    firstPlay:boolean,
    timer:number
}

interface DarwResultViewReturn {
    view:egret.Sprite,
    changeScore:(score:number)=>void
}

class Game extends egret.Sprite implements GameInterface {
    
    stageW:number;
    stageH:number;
    // 是否正在游戏
    playing:boolean = true;
    // 倒计时时间
    gameTime:number = GAME_TIME_SECOUND
    // 已经开始过了
    firstPlay:boolean = true;
    // 计时器
    timer:number = null;
    
    expressionScore:number = 0;
    useTime:number = 0 
    
    constructor(stageW,stageH){
        super();
        this.stageW = stageW;
        this.stageH = stageH;
    }

    draw(){
        
        // 游戏是否在进行中
        this.playing = false;
        const backMenuEvent = new egret.Event('backMenu');
        const restartEvent = new egret.Event('restart');
        const gameOverEvent = new egret.Event('gameOver');

        const resultView = this.drawResultView({
            backMenuCb:()=> gameView.dispatchEvent(backMenuEvent),
            restartCb:()=> gameView.dispatchEvent(restartEvent),
        })

        const intoRankView = this.drawIntoRankView();

        const gameView:egret.Sprite = new egret.Sprite();
        gameView.graphics.drawRect(0,0,this.stageW,this.stageH);
        gameView.graphics.endFill();

        const face = new Face({ x:this.stageW/2,y:this.stageH/2,width:0,height:0 });
        const faceView = face.draw();

        // 返回
        const backBtn :egret.TextField = new egret.TextField();
        backBtn.size = 30;
        backBtn.textColor = 0x000000;
        backBtn.text = '返回';
        gameView.addChild(backBtn);
        backBtn.y = 40;
        backBtn.x = 80;
        backBtn.touchEnabled = true;
        

        backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            SoundManager.getInstance().playButtonSound()
            clearTimeout(this.timer);
            this.playing = false;
            gameView.dispatchEvent(backMenuEvent);
        },backBtn)

        // 游戏分数   
        const gameSecound:egret.TextField = new egret.TextField();
        gameSecound.size = 60;
        gameSecound.text = GAME_TIME_SECOUND + '';
        gameSecound.textColor = 0x000000;
        gameView.addChild(gameSecound);
        gameSecound.y = this.stageH/2 - 400;
        gameSecound.width = this.stageW;
        gameSecound.textAlign = egret.HorizontalAlign.CENTER;

        const gameTimeOut = (emit:()=>any) =>{
            this.timer = setTimeout(()=>{
                if(this.gameTime !== 0){
                    gameSecound.text = (--this.gameTime) + '';
                    ++this.useTime
                    if( this.gameTime === 0 ){
                         emit();
                         return;
                    }
                    gameTimeOut(emit)
                }
            },1000)
        }
        
        const timeOutEmit = ()=>{
            this.playing = false;
            gameView.dispatchEvent(gameOverEvent);
        }

        // 剩余秒数         
        let score:number = 0;
        const scoreText :egret.TextField = new egret.TextField();
        scoreText.size = 30;
        scoreText.textColor = 0x000000;
        scoreText.text = '得分：' + score;
        scoreText.y = 40;
        scoreText.x = this.stageW - 200;
        gameView.addChild(scoreText);

        const reset = ()=>{
            this.expressionScore = 0
            this.useTime = 0
            faceView.touchChildren = true;
            faceView.touchEnabled = true;
            backBtn.touchEnabled = true;

            clearTimeout(this.timer);
            this.gameTime = GAME_TIME_SECOUND;
            score = 0;
            scoreText.text = '得分：' + score;
            gameSecound.text = this.gameTime + '';
            resultView.changeScore(0);
            if( resultView.view.parent ){
                resultView.view.parent.removeChild(resultView.view);
            }
            this.playing = true;
            gameTimeOut(timeOutEmit);
        }

        const perfectText =  this.showText(gameView,'PERFECT',0xCC00FF,0xCC99FF);
        const goodText =  this.showText(gameView,'GOOD',0xFA8072,0xFFA500);
        const niceText = this.showText(gameView,'NICE',0x00BFFF,0x87CEFA);

        const touchBread =  (event:egret.Event) => {
            if(!this.playing) return
            let reward = 0
            let needClearExpressionScore = false
            this.expressionScore += event.data;
            if(this.useTime === 1){
                if(this.expressionScore >= 50){
                    reward = 20
                    SoundManager.getInstance().playLongShoutSound();
                    face.shyness();
                    face.openMouthAction();
                    this.shakeView(gameView)
                    perfectText.show()
                }
                else if(this.expressionScore >= 40){
                    reward = 15
                    SoundManager.getInstance().playShoutSound();
                    face.openMouthAction();
                    this.shakeView(gameView)
                    goodText.show()
                }
                else if(this.expressionScore >= 30){
                    reward = 10
                    SoundManager.getInstance().playNiceSound();
                    face.openMouthAction();
                    niceText.show();
                }
                // console.log(this.expressionScore);
                this.expressionScore = 0
                this.useTime = 0
            } 
            score += event.data
            scoreText.text = '得分：' + (score + reward)
        }

        intoRankView.view.addEventListener('finish',(event)=>{
            gameView.removeChild(intoRankView.view);
            resultView.changeScore(event.data);
            gameView.addChild(resultView.view);
        },intoRankView);

        gameView.addEventListener('startGame',reset,gameView);

        gameView.addEventListener('restart',reset,gameView);

        faceView.addEventListener('touchBread',touchBread,faceView);

        gameView.addEventListener('gameOver',async ()=>{
            this.expressionScore = 0
            this.useTime = 0
            faceView.touchChildren = false;
            faceView.touchEnabled = false;
            backBtn.touchEnabled = false;

            let rank = -1;
            
            if(score !== 0 && !IS_LOCAL){
                Loading.getInstance().show();
                rank = await this.checkScoreIntoRank(score)
                Loading.getInstance().hide();
            }

            if(rank !== -1){
                SoundManager.getInstance().playWoWSound();
                intoRankView.changeScore(score);
                intoRankView.changeRank(rank);
                gameView.addChild(intoRankView.view);
            }else{
                resultView.changeScore(score);
                gameView.addChild(resultView.view);
            }

            // 记录数据
            const historyScore = egret.localStorage.getItem(GAME_STORAGE_NAME);
            if( historyScore ){
                if( Number(score) > Number(historyScore) ){
                    egret.localStorage.setItem(GAME_STORAGE_NAME,score + '');
                }
            }else{
                egret.localStorage.setItem(GAME_STORAGE_NAME,score + '');
            }
            
        },gameView)
        

        gameView.addChild(faceView);


        return gameView;
    }
    
    drawResultView({ restartCb,backMenuCb }):DarwResultViewReturn{

        // 最终得分
        const resultMask:egret.Sprite = new egret.Sprite();
        resultMask.zIndex = 999;
        resultMask.graphics.beginFill(0x000000,0.4);
        resultMask.graphics.drawRect(0,0,this.stageW,this.stageH);
        resultMask.graphics.endFill();
        
        const resultView:egret.Sprite = new egret.Sprite(); 
        resultView.graphics.lineStyle(5,0x000000);
        resultView.graphics.beginFill(0xffffff);
        resultView.graphics.drawRoundRect(0,0,500,500,20,20);
        resultView.x = this.stageW/2 - 500/2;
        resultView.y = this.stageH/2 - 500/2;
        resultView.graphics.endFill();


        const resultTitle:egret.TextField = new egret.TextField();
        resultTitle.textColor = 0x000000
        resultTitle.size = 45;
        resultTitle.text = '时间到～'
        const gameResult:egret.TextField = new egret.TextField();
        gameResult.textColor = 0x000000
        gameResult.text = '你的得分是：';
        gameResult.size = 35;

        const restartBtn:egret.TextField = new egret.TextField();
        restartBtn.text = '重新开始'
        restartBtn.size = 30;
        restartBtn.textColor = 0x000000
        restartBtn.touchEnabled = true;
        const backMenu:egret.TextField = new egret.TextField();
        backMenu.text = '返回菜单'
        backMenu.size = 30;
        backMenu.textColor = 0x000000
        backMenu.touchEnabled = true;

        resultView.addChild(restartBtn);
        resultView.addChild(backMenu);
        resultView.addChild(resultTitle);
        resultView.addChild(gameResult);

        resultTitle.width = 500;
        resultTitle.y = 40;
        resultTitle.textAlign = egret.HorizontalAlign.CENTER;

        gameResult.width = 500;
        gameResult.y = 120;
        gameResult.textAlign = egret.HorizontalAlign.CENTER;

        restartBtn.width = 500;
        restartBtn.y = 300;
        restartBtn.textAlign = egret.HorizontalAlign.CENTER;

        restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            SoundManager.getInstance().playButtonSound()
            restartCb && restartCb.bind(this)();
        },restartBtn)

        backMenu.width = 500;
        backMenu.y = 380;
        backMenu.textAlign = egret.HorizontalAlign.CENTER;

        backMenu.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            SoundManager.getInstance().playButtonSound()
            backMenuCb && backMenuCb.bind(this)();
        },backMenu)

        resultMask.addChild(resultView);

        return {
            view:resultMask,
            changeScore:(score)=>{
                gameResult.text = '你的得分是：' + score
            }
        }
    }

    drawIntoRankView(){

        let _score = 0;
        // 最终得分
        const mask:egret.Sprite = new egret.Sprite();
        mask.zIndex = 999;
        mask.graphics.beginFill(0x000000,0.4);
        mask.graphics.drawRect(0,0,this.stageW,this.stageH);
        mask.graphics.endFill();

        const view:egret.Sprite = new egret.Sprite(); 
        view.graphics.lineStyle(5,0x000000);
        view.graphics.beginFill(0xffffff);
        view.graphics.drawRoundRect(0,0,500,500,20,20);
        view.x = this.stageW/2 - 500/2;
        view.y = this.stageH/2 - 500/2;
        view.graphics.endFill();

        const img = new eui.Image();
        img.source = "resource/assets/cd.png"
        img.width = 1028;
        img.height = 856;
        img.x = -300;
        img.y = 130;
        mask.addChild(img);

        const title:egret.TextField = new egret.TextField();
        title.textColor = 0x000000
        title.size = 35;
        title.text = '你的成绩进入排行榜啦～'
        title.width = 500;
        title.y = 40;
        title.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(title);

        const tips:egret.TextField = new egret.TextField();
        tips.textColor = 0x000000
        tips.size = 24;
        tips.width = 400;
        tips.y = 120;
        tips.x = 50;
        tips.lineSpacing = 10;
        tips.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(tips);

        const inputTips:egret.TextField = new egret.TextField();
        inputTips.textColor = 0x000000
        inputTips.text = '请在下面输入框输入你的名称';
        inputTips.size = 18;
        inputTips.width = 300;
        inputTips.y = 230;
        inputTips.x = 100;
        inputTips.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(inputTips);

        const input = new eui.TextInput();
        var exml = `<e:Skin class="skins.TextInputSkin" minHeight="40" minWidth="300" states="normal,disabled,normalWithPrompt,disabledWithPrompt" xmlns:e="http://ns.egret.com/eui">
            <e:Rect height="100%" width="100%" strokeColor="0x000000" strokeWeight="2" fillColor="0xffffff"/>
            <e:EditableText id="textDisplay" verticalCenter="0" left="10" right="10" textColor="0x000000" textColor.disabled="0xff0000" width="100%" height="24" size="20" />
            <e:Label id="promptDisplay" verticalCenter="0" left="10" right="10" textColor="0xa9a9a9" width="100%" height="24" size="20" touchEnabled="false" includeIn="normalWithPrompt,disabledWithPrompt"/>
        </e:Skin>`;
        input.skinName = exml;
        input.prompt = "请输入昵称";
        input.y = 260;
        input.x = 50;
        input.width = 400;
        input.height = 50;

        view.addChild(input)

        const validateTips:egret.TextField = new egret.TextField();
        validateTips.textColor = 0xFF0000
        validateTips.text = '请在上面输入框输入你的名称';
        validateTips.size = 18;
        validateTips.width = 300;
        validateTips.y = 320;
        validateTips.x = 100;
        validateTips.textAlign = egret.HorizontalAlign.CENTER;
        validateTips.alpha = 0;
        view.addChild(validateTips);

        const sureBtn:egret.TextField = new egret.TextField();
        sureBtn.text = '确定'
        sureBtn.size = 24;
        sureBtn.touchEnabled = true;
        sureBtn.textColor = 0x000000
        sureBtn.width = 100;
        sureBtn.y = 400;
        sureBtn.x = 100;

        sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,async ()=>{
            if(!input.text) {
                validateTips.alpha = 1;
                return
            }else{
                validateTips.alpha = 0;
            };
            
            try{
                Loading.getInstance().show();
                const res = await Http.PostRequest('/api/rank',{ playerName:input.text,score:_score });
                localStorage.setItem(PLAYNAME_STORAGE_NAME,input.text)
                Loading.getInstance().hide();
            }finally{
                SoundManager.getInstance().playButtonSound()
                mask.dispatchEvent(new egret.Event('finish',false,false,_score));
            }
        },sureBtn)

        view.addChild(sureBtn);

        const cancleBtn:egret.TextField = new egret.TextField();
        cancleBtn.text = '取消'
        cancleBtn.size = 24;
        cancleBtn.touchEnabled = true;
        cancleBtn.textColor = 0x000000
        cancleBtn.width = 100;
        cancleBtn.y = 400;
        cancleBtn.x = 350;

        cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            SoundManager.getInstance().playButtonSound()
            mask.dispatchEvent(new egret.Event('finish',false,false,_score));
        },cancleBtn)

        view.addChild(cancleBtn);

        mask.addChild(view);

        return {
            view:mask,
            changeRank:(rank:number)=>{
                validateTips.alpha = 0;
                if(localStorage.getItem(PLAYNAME_STORAGE_NAME)){
                    input.text = localStorage.getItem(PLAYNAME_STORAGE_NAME)
                };

                tips.textFlow = [
                    { text: "恭喜你进入排行榜第", style: { "textColor": 0x000000, "size": 24 } },
                    { text: ` ${rank} `, style: { "textColor": 0xFF4d4F, "size": 30 , bold:true } },
                    { text: "名，留下你的", style: { "textColor": 0x000000, "size": 24 } }, 
                    { text: "「掘金昵称」", style: { "textColor": 0x007fff, "size": 24 , bold:true } },
                    { text: "让更多人来挑战你吧", style: { "textColor": 0x000000, "size": 24 } },
                ];
            },
            changeScore:(score)=>{
                _score = score
            }
        }
    }

    shakeView(view:egret.Sprite){
        egret.Tween.get(view)
        .to({ x:-8 },50,egret.Ease.cubicInOut)
        .to({ x:8 },50,egret.Ease.cubicInOut)
        .to({ x:-8 },50,egret.Ease.cubicInOut)
        .to({ x:0 },50,egret.Ease.cubicInOut)
    }

    showText(view:egret.Sprite,str:string,color:number,strokeColor:number){
        const text:egret.TextField = new egret.TextField;
        
        text.y = this.stageH * 0.28;

        text.width = this.stageW;
        text.height = 50;
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.verticalAlign = egret.VerticalAlign.MIDDLE;
        
        text.textColor = color;
        text.text = str
        text.size = 50;

        text.strokeColor = strokeColor;
        text.stroke = 4;
        text.alpha = 0;
        text.zIndex = 99;
        
        const show = ()=>{
            view.addChild(text);
            egret.Tween.get(text)
            .to({ alpha:1,y:this.stageH * 0.25 },300)
            .wait(200)
            .to({ alpha:0,y:this.stageH * 0.23 },300)
            .call(()=>{
                text.y = this.stageH * 0.28; 
                view.removeChild(text);
            });
        }

        return { show }
    }

    async checkScoreIntoRank(score){
        const res = await Http.PostRequest<{
            code:number,
            data:{ rank:number},
            success:boolean
        }>('/api/check-score',{ score });

        if(res.success){
            return res.data.rank
        }
        return -1
    }
}