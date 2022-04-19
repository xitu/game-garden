// 游戏音乐默认开启
let musicIsPlay = true;

if( localStorage.getItem('musicPlay') ){
    musicIsPlay = localStorage.getItem('musicPlay') === '1' ? true : false;
}else{
    localStorage.setItem('musicPlay','1');
}

interface SoundItem {
    sound:egret.Sound , 
    soundChannel:egret.SoundChannel,
    playing:boolean, // 是否在播放中
    play:boolean, // 是否可以播放
}

class SoundManager {

    private soundMap:{ [key:string]:SoundItem } = {};

    // 准备开始声
    // 待补充 按钮选择声 ｜  | 出现结果音效

    // 在音乐加载后进行播放
    private bgSoundPlaying = false;

    private static shared:SoundManager;
	public static getInstance(){
		if( !SoundManager.shared){
			SoundManager.shared = new SoundManager();
		}
		return SoundManager.shared;
	}

    public constructor(){

    }
    public static get musicIsPlay() {
        return musicIsPlay;
    }
    public static set musicIsPlay(value) {
        musicIsPlay = value;
        localStorage.setItem('musicPlay',value ? '1' : '0');
    }
    private loadSound(url){
        var sound:egret.Sound = new egret.Sound();

        sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event:egret.IOErrorEvent) {
            console.log("loaded error!");
            alert('背景音乐加载失败');
        }, this);

        sound.load(url);
        return sound;
    }

    async playSound(soundKey:string,loops:number,resourceSrc:string,start:number = 0):Promise<SoundItem>{
        
        let sound:egret.Sound = null;
        let soundChannel:egret.SoundChannel = null;

        if(!this.soundMap[soundKey]) {
            this.soundMap[soundKey] = { sound, soundChannel, play:true , playing:true } 
            sound = this.loadSound(resourceSrc);
            soundChannel = await new Promise<egret.SoundChannel>(resolve=>{
                sound.addEventListener(egret.Event.COMPLETE,()=>{
                    if(this.soundMap[soundKey].play) soundChannel = sound.play(start,loops);
                    resolve(soundChannel)
                },null);
            });
        }else{
            sound = this.soundMap[soundKey].sound
            // 加载完毕之后才可以播放
            // egret.Sound 类型定义没有加入loaded属性，这里只能暂时设置为any
            if(!(sound as any).loaded) return;
            soundChannel = sound.play(start,loops);
        }
        
        if(loops === 1){
            // 音频播放完毕后 音频playing设置为false
            soundChannel.addEventListener(egret.Event.SOUND_COMPLETE,()=>{
                this.soundMap[soundKey].playing = false
            },null)
        }
            
        this.soundMap[soundKey] = { sound, soundChannel, play:this.soundMap[soundKey].play , playing:true  }
        return this.soundMap[soundKey]

    }
    public async playButtonSound(){
        if( !SoundManager.musicIsPlay ) return 
        const { soundChannel } = await this.playSound('button',1,'resource/sounds/button.wav')
        soundChannel.volume = 0.3
    }
    public async playStartSound(){
        if( !SoundManager.musicIsPlay ) return 
        const { soundChannel } = await this.playSound('start',1,'resource/sounds/start.wav',0.2)
        soundChannel.volume = 0.3
    }
    public async playWoWSound(){
        if( !SoundManager.musicIsPlay ) return 
        const { soundChannel } = await this.playSound('wowShout',1,'resource/sounds/wow.wav')
        soundChannel.volume = 0.1
    }
    public async playNiceSound(){
        if( !SoundManager.musicIsPlay ) return 
        const { soundChannel } = await this.playSound('niceShout',1,'resource/sounds/nice.wav')
        soundChannel.volume = 0.1
    }
    public async playShoutSound(){
        if( !SoundManager.musicIsPlay ) return 
        // 防止频繁播放
        if(this.soundMap['shout'] && this.soundMap['shout'].playing) return;
        const { soundChannel } = await this.playSound('shout',1,'resource/sounds/shout.wav')
        soundChannel.volume = 0.1
    }
    public async playLongShoutSound(){
        if( !SoundManager.musicIsPlay ) return 
        const { soundChannel } = await this.playSound('longShout',1,'resource/sounds/longShout.wav')
        soundChannel.volume = 0.1
    }
    public async palyPullShoutSound(){
        if( !SoundManager.musicIsPlay ) return 

        if(this.soundMap['pullShount'] && this.soundMap['pullShount'].playing) return;
        const { soundChannel } = await this.playSound('pullShount',0,'resource/sounds/pullShout.wav')
        /* 
         * 这么写是因为 这个音效是在 touchStart事件播放 和 touchEnd事件停止播放 
         * 第一次执行音效可能还没加载完成，就已经触发完了touchEnd 。导致触发touchEnd后，音效才加载完成然后播放
         * playSound 中在音效加载事件中判断 play 是否要播放，
         * 如果加载完毕之前已经触发touchEnd了 play会变为false则不会播放音效 soundChannel 也会是null
         */
        if(!this.soundMap['pullShount'].soundChannel) return
        soundChannel.volume = 0.2
        this.soundMap['pullShount'].play = true
        this.soundMap['pullShount'].playing = true
    }
    public stopPullShoutSound(){
        if( !SoundManager.musicIsPlay ) return 
        if(!this.soundMap['pullShount']) return
        if(this.soundMap['pullShount'].soundChannel) this.soundMap['pullShount'].soundChannel.stop();
        this.soundMap['pullShount'].play = false
        this.soundMap['pullShount'].playing = false
    }
    public async playBgSound(){
        if( !SoundManager.musicIsPlay ) return 
        if(this.soundMap['bg'] && this.soundMap['bg'].playing) return;
        const { soundChannel } = await this.playSound('bg',0,'resource/sounds/bg.mp3')
        soundChannel.volume = 0.3
    }
    public stopBgSound(){
        if( !SoundManager.musicIsPlay ) return 

        this.soundMap['bg'].soundChannel.stop();
        this.soundMap['bg'].playing = false
    }
}