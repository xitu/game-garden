class Rank extends eui.Group {
    private stageW:number;
    private stageH:number;
    private list:eui.List;
    private scroller:eui.Scroller;
    
    constructor(stageW:number,stageH:number) {
        super();

        this.stageW = stageW;
        this.stageH = stageH;

        const mask:egret.Sprite = new egret.Sprite();
        mask.zIndex = 999;
        mask.graphics.beginFill(0x000000,0.4);
        mask.graphics.drawRect(0,0,stageW,stageH);
        mask.graphics.endFill();

        this.addChild(mask);
    }
    protected async createChildren() {

        const groupWidth = 460;
        const groupHeight = 400

        super.createChildren();
        var group = new eui.Group();
        group.width = groupWidth;
        group.height = groupHeight;

        var scroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        scroller.width = groupWidth;
        scroller.height = groupHeight;
        scroller.left = this.stageW / 2 - (groupWidth / 2);
        scroller.top = this.stageH / 2 - (groupHeight / 2) + 60;
        scroller.viewport = group;
        this.scroller = scroller;

        let rect = new eui.Rect();
        rect.width = groupWidth + 100;
        rect.height = 700;
        rect.left = this.stageW / 2 - ((groupWidth + 100) / 2);
        rect.top = this.stageH / 2 - (700 / 2);
        rect.fillColor = 0xFFFFFF;
        rect.strokeColor = 0x000000;
        rect.strokeWeight = 5;
        rect.ellipseWidth = 20;
        rect.ellipseHeight = 20;
        this.addChild(rect);

        var exml = `<e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" width="${groupWidth}" height="50"> 
            <e:Group width="${groupWidth}" height="50" >
                <e:Label border="false" text="{data.rank}"  textAlign="left" verticalAlign="middle" width="60" height="50" textColor.up="0x000000" textColor.down="0x000000" horizontalCenter="0" verticalCenter="0"/> 
                <e:Label border="false" text="{data.playerName}" textAlign="center" verticalAlign="middle" width="300" height="50" textColor.up="0x000000" textColor.down="0x000000" horizontalCenter="0" verticalCenter="0"/> 
                <e:Label border="false" text="{data.score}" textAlign="right" verticalAlign="middle" width="100" height="50" textColor.up="0x000000" textColor.down="0x000000" horizontalCenter="0" verticalCenter="0"/> 
                <e:layout>
                    <e:HorizontalLayout gap="0" verticalAlign="middle"/>
                </e:layout>
            </e:Group>
        </e:Skin>`;

        var list = new eui.List();
        list.itemRendererSkinName = exml;
        group.addChild(list);
        this.list = list;
        this.addChild(scroller);

        var title = new eui.Label();
        title.text = '排行榜'
        title.size = 40;
        title.textColor = 0x000000;
        title.width = 200;
        title.height = 60;
        title.textAlign = "center"
        title.x = this.stageW / 2 - 200/2;
        title.y = this.stageH * 0.28 - 60/2;
        this.addChild(title);

        var head = new eui.Group();
        head.width = groupWidth;
        head.height = 60;
        const headLayout = new eui.HorizontalLayout();
        headLayout.gap = 0;
        headLayout.verticalAlign = "center";
        head.layout = headLayout
    
        const headLabels = [
            { text: '排名', width: 60 , align:"left" },
            { text: '玩家名称', width: 300 , align:"center" },
            { text: '得分', width: 100 , align:"right"},
        ]
        headLabels.forEach(i=>{
            const label = new eui.Label();
            label.text = i.text;
            label.width = i.width;
            label.textColor = 0x000000;
            label.textAlign = i.align;
            label.size = 30
            label.bold = true
            head.addChild(label)
        })

        head.x = this.stageW / 2 - groupWidth/2;
        head.y = this.stageH * 0.36 - 60/2;
        this.addChild(head);

        const closeBtn:egret.Sprite = new egret.Sprite(); 
        closeBtn.graphics.lineStyle(5,0x000000);
        closeBtn.graphics.beginFill(0xffffff);
        closeBtn.graphics.drawCircle(0,0,30);
        closeBtn.x = this.stageW - 55;
        closeBtn.y = 230;
        closeBtn.graphics.endFill();

        const closeIcon:egret.TextField = new egret.TextField();
        closeIcon.touchEnabled = true;
        closeIcon.textColor = 0x000000;
        closeIcon.size = 40;
        closeIcon.text='x';
        closeIcon.y = -20;
        closeIcon.x = -10;
        closeBtn.addChild(closeIcon);

        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            SoundManager.getInstance().playButtonSound()
            this.dispatchEvent(new egret.Event('close'))
        },closeBtn);
    
        this.addChild(closeBtn);
    }
    private async getRankList(){
        const res = await Http.GetRequest<{
            code:number,
            data:{
                ranks:{ playerName:string,score:number }[]
            },
            success:boolean
        }>('/api/ranks');
        return res
    }
    public load(){
        this.scroller.viewport.scrollV = 0
        Loading.getInstance().show();
        if(IS_LOCAL){
            this.list.dataProvider = new eui.ArrayCollection([]);
            Loading.getInstance().hide();
            return
        }
        this.getRankList().then(res=>{
            if(res.success){
                this.list.dataProvider = new eui.ArrayCollection(res.data.ranks.map( (i,index)=> ({ rank:index+1,...i }) ));
            }
            Loading.getInstance().hide();
        })
    }
}