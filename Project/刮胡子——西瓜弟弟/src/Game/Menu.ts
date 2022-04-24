interface MenuInter {
    stageW:number,
    stageH:number
}

class Menu extends egret.Sprite implements MenuInter{

    stageW:number;
    stageH:number;

    constructor(stageW,stageH){
        super();
        this.stageW = stageW;
        this.stageH = stageH;
    }

    draw(){
        const menu:egret.Sprite = new egret.Sprite();
        menu.graphics.drawRect(0,0,this.stageW,this.stageH);
        menu.graphics.endFill();

        // 游戏名称按钮
        var gameName:egret.TextField = new egret.TextField();
        gameName.textColor = 0x000000;
        gameName.size = 80;
        menu.addChild(gameName);

        gameName.width =  this.stageW,
        gameName.height = this.stageH
        gameName.text = "刮胡子";
        gameName.textAlign = egret.HorizontalAlign.CENTER;

        gameName.anchorOffsetX = this.stageW/2;

        gameName.x = this.stageW/2;
        gameName.y = this.stageH/10 * 3;

        const tw = egret.Tween.get( gameName,{ loop:true } );
        this.gameNameAnim(tw);

        var buttons:egret.Sprite = new egret.Sprite();
        buttons.graphics.drawRect(0,0,400,400);
        buttons.x = this.stageW/2 - 400/2;
        buttons.y = (this.stageH/2 - 400/2) + 200;
        buttons.graphics.endFill();

        // 开始游戏按钮
        var startBtn:egret.TextField = new egret.TextField();
        startBtn.textColor = 0x000000;
        startBtn.touchEnabled = true;
        buttons.addChild(startBtn);
        startBtn.size = 35;
        startBtn.width =  400;
        // startBtn.height = this.stageH;
        startBtn.text = '开始游戏';
        startBtn.y = 20;
        startBtn.textAlign = egret.HorizontalAlign.CENTER;
        startBtn.verticalAlign = egret.VerticalAlign.MIDDLE;
        const startGammEvent:egret.Event = new egret.Event('startGame');
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            SoundManager.getInstance().playButtonSound()
            menu.dispatchEvent(startGammEvent);
        },startBtn)

        // 关于游戏按钮
        const aboutBtn:egret.TextField = new egret.TextField();
        aboutBtn.textColor = 0x000000;
        aboutBtn.touchEnabled = true;
        buttons.addChild(aboutBtn);
        aboutBtn.size = 35;
        aboutBtn.width =  400;
        // aboutBtn.height = this.stageH;
        aboutBtn.text = '关于游戏';
        aboutBtn.y = 100;
        aboutBtn.textAlign = egret.HorizontalAlign.CENTER;
        aboutBtn.verticalAlign = egret.VerticalAlign.MIDDLE;

        // 音乐开关按钮
        const musicBtn:egret.TextField = new egret.TextField();
        musicBtn.textColor = 0x000000;
        musicBtn.touchEnabled = true;
        buttons.addChild(musicBtn);
        musicBtn.size = 35;
        musicBtn.width =  400;
        musicBtn.text = '音乐：' + (SoundManager.musicIsPlay ? '开' : '关');
        musicBtn.y = 180;
        musicBtn.textAlign = egret.HorizontalAlign.CENTER;
        musicBtn.verticalAlign = egret.VerticalAlign.MIDDLE;

        // 排行榜
        const rankBtn:egret.TextField = new egret.TextField();
        rankBtn.textColor = 0x000000;
        rankBtn.touchEnabled = true;
        buttons.addChild(rankBtn);
        rankBtn.size = 35;
        rankBtn.width =  400;
        rankBtn.text = '排行榜';
        rankBtn.y = 260;
        rankBtn.textAlign = egret.HorizontalAlign.CENTER;
        rankBtn.verticalAlign = egret.VerticalAlign.MIDDLE;

        menu.addChild(buttons)

        // 作者
        const author:egret.TextField = new egret.TextField();
        author.textColor = 0x708090;

        menu.addChild(author);

        author.size = 30;
        author.text = '作者：西瓜弟弟';
        author.y = this.stageH / 10 * 9;
        author.width =  this.stageW;
        author.textAlign = egret.HorizontalAlign.CENTER;
        author.verticalAlign = egret.VerticalAlign.MIDDLE;

        // history
        const historyScore = egret.localStorage.getItem(GAME_STORAGE_NAME);
        const history:egret.TextField = new egret.TextField();
        history.textColor = 0x708090;
        history.size = 30;
        history.y = this.stageH / 10 * 1;
        history.width =  this.stageW;
        history.textAlign = egret.HorizontalAlign.CENTER;
        history.verticalAlign = egret.VerticalAlign.MIDDLE;

        if(historyScore){
            history.text = '最高纪录：' + historyScore;
            menu.addChild(history);
        }

        let touchEnabled = true;

        menu.addEventListener('changeHistory',()=>{
            const historyScore = egret.localStorage.getItem(GAME_STORAGE_NAME);
            history.text = '最高纪录：' + historyScore;
            menu.addChild(history);
        },menu);

        const aboutView = this.drawAboutView(this.stageW,this.stageH);

        aboutBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            touchEnabled = false
            SoundManager.getInstance().playButtonSound()
            menu.addChild(aboutView);
        },aboutBtn)

        aboutView.addEventListener('close',()=>{
            touchEnabled = true
            SoundManager.getInstance().playButtonSound()
            menu.removeChild(aboutView);
        },aboutView)

        musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            SoundManager.musicIsPlay = !SoundManager.musicIsPlay;
            musicBtn.text = '音乐：' + (SoundManager.musicIsPlay ? '开' : '关');
            SoundManager.getInstance().playButtonSound()
        },musicBtn)


        let rankView = new Rank(this.stageW , this.stageH);
        rankView.addEventListener('close',()=>{
            menu.removeChild(rankView);
        },null);

        rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            if(!touchEnabled) return
            SoundManager.getInstance().playButtonSound()
            menu.addChild(rankView);
            rankView.load();
        },musicBtn)

        return menu;
    }

    private gameNameAnim(tw:egret.Tween):void{
        tw.to({ rotation:10 },999,egret.Ease.backInOut)
        tw.to({ rotation:-10 },999,egret.Ease.backInOut)
        .call( this.gameNameAnim.bind(this,tw) )
    }

    private drawAboutView(stageW:number,stageH:number){
        const mask:egret.Sprite = new egret.Sprite();
        mask.zIndex = 999;
        mask.graphics.beginFill(0x000000,0.4);
        mask.graphics.drawRect(0,0,stageW,stageH);
        mask.graphics.endFill();

        // 绘制关于视图
        const aboutView:egret.Sprite = new egret.Sprite();
        aboutView.graphics.lineStyle(5,0x000000);
        aboutView.graphics.beginFill(0xffffff);
        aboutView.graphics.drawRoundRect(0,0,500,500,20,20);
        aboutView.x = this.stageW/2 - 500/2;
        aboutView.y = this.stageH/2 - 500/2;
        aboutView.graphics.endFill();

        const closeAbout:egret.Sprite = new egret.Sprite();
        closeAbout.graphics.lineStyle(5,0x000000);
        closeAbout.graphics.beginFill(0xffffff);
        closeAbout.graphics.drawCircle(0,0,30);
        closeAbout.x = 500;
        closeAbout.graphics.endFill();

        const closeBtn:egret.TextField = new egret.TextField();
        closeBtn.touchEnabled = true;
        closeBtn.textColor = 0x000000;
        closeBtn.size = 40;
        closeBtn.text='x';
        closeAbout.addChild(closeBtn);
        closeBtn.y = -20;
        closeBtn.x = -10;

        const aboutTitle:egret.TextField = new egret.TextField();
        aboutTitle.textColor = 0x000000;
        aboutTitle.size = 42;
        aboutTitle.text='关于游戏';
        aboutView.addChild(aboutTitle);
        aboutTitle.y = 40;
        aboutTitle.width = 500;
        aboutTitle.textAlign = egret.HorizontalAlign.CENTER;

        const aboutText:egret.TextField = new egret.TextField();
        aboutText.textColor = 0x000000;
        aboutText.size = 32;
        aboutText.text='瞧呐！！！快看看这个家伙，胡子长个不停。大家赶快来帮帮它。用手指划动或者点击脸部下巴的胡子，即可帮它拔掉，看看你们在规定的秒数内可以刮掉多少胡子。';
        aboutView.addChild(aboutText);
        aboutText.lineSpacing = 15;
        aboutText.y = 120;
        aboutText.x = 30;
        aboutText.width = 450;

        aboutView.addChild(closeAbout);

        closeAbout.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            mask.dispatchEvent(new egret.Event('close'))
        },closeAbout);

        mask.addChild(aboutView);

        return mask
    }

}
