class Main extends egret.DisplayObjectContainer {
    constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage():void{
        this.drawGame();
    }

    private drawGame():void{
        // 是否第一次进入游戏 第一次则不重制分数
        const menu:Menu = new Menu(this.stage.stageWidth,this.stage.stageHeight);
        const game:Game =  new Game(this.stage.stageWidth,this.stage.stageHeight);
        const start:StartView = new StartView(this.stage.stageWidth,this.stage.stageHeight);

        const menuView:egret.Sprite = menu.draw();
        const gameView:egret.Sprite = game.draw();
        const startView:egret.Sprite =  start.draw();

        const startGameEvent = new egret.Event('startGame');
        const changeHistoryEvent = new egret.Event('changeHistory')

        const stage = this;
        stage.addChild(menuView);
        // stage.addChild(gameView);

        const onStartGame = async ()=>{
            if(menuView.parent) stage.removeChild(menuView);
            if(gameView.parent) stage.removeChild(gameView);
            stage.addChild(startView);
            await start.showText();
            SoundManager.getInstance().playStartSound()
            stage.removeChild(startView);
            gameView.dispatchEvent(startGameEvent);
            stage.addChild(gameView);
            SoundManager.getInstance().playBgSound()
        }
        
        menuView.addEventListener('startGame',onStartGame,menuView);
        
        gameView.addEventListener('restart',onStartGame,menuView);

        gameView.addEventListener('gameOver',function(){
            // 修改游戏历史
            menuView.dispatchEvent(changeHistoryEvent);
            // SoundManager.getInstance().stopBgSound();
            SoundManager.getInstance().stopPullShoutSound();
        },gameView)

        gameView.addEventListener('backMenu',function(){
            gameView.parent.removeChild(gameView);
            stage.addChild(menuView);
            SoundManager.getInstance().stopBgSound();
            SoundManager.getInstance().stopPullShoutSound();
        },gameView);

    }
}

class StartView {
    startText:egret.TextField;
    stageW:number;
    stageH:number;
    
    constructor(stageW,stageH){
        this.stageW = stageW;
        this.stageH = stageH;
    }
    draw(){
        const startView:egret.Sprite = new egret.Sprite()
        startView.graphics.drawRect(0,0,this.stageW,this.stageH);
        const startText:egret.TextField = new egret.TextField;
        startText.textColor = 0x000000;
        startText.text = 'START'
        startText.size = 50;
        startView.addChild(startText);

        startText.width = this.stageW;
        startText.height = this.stageH;
        startText.textAlign = egret.HorizontalAlign.CENTER;
        startText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.startText = startText;

        return startView
    }
    showText(){
        return new Promise(resolve=>{
            const tw = egret.Tween.get(this.startText);
            tw.to({ size:100 },500,egret.Ease.circIn)
            .wait(200).call(resolve)
            .to({ size:50 },500,egret.Ease.circIn)
        })
    }
}