class Login extends eui.Component{
	private titleGroup:eui.Group;
	private calculateGroup:eui.Group;
	private startBtn:eui.Button;
	private ruleBtn:eui.Button;
	private scoreBtn:eui.Button;
	private ruleInfo:eui.Scroller;
	private currentScoreLabel:eui.Label;
	private inputResult:eui.TextInput;
	private submitBtn:eui.Button;
	private questionLabel:eui.Label;
	private scoreLabel:eui.Label;
	private timeLabel:eui.Label;
	private backBtn:eui.Button;
	private restartBtn:eui.Button;
	private passBtn:eui.Button;
	private alarmLabel:eui.Label;

// 程序内变量
	private storageKey:string = "race_score_number";//浏览器存储key
	private timer:egret.Timer;//程序计时器
	private baseScore:number = 3;//当前基础积分累加值
	private question:number;//当前问题平方前数值
	private score:number = 0;//当前最好成绩
	private currentScore:number = 0;//当前轮次成绩
	private timeLast:number = 60;//成绩持续时间
	private questionRange:number = 20;//计算范围
	private passNum:number = 3;//当前可跳过次数
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/login.exml";
		this.bindListener();
		this.score = egret.localStorage.getItem(this.storageKey) == undefined || egret.localStorage.getItem(this.storageKey) == null ? 0 : Number(egret.localStorage.getItem(this.storageKey));
	}

	/**
	 * 绑定按钮监听
	 */
	private bindListener(){
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.TouchEvent) => {
			this.startGame();
		},this);
		this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.TouchEvent) => {
			this.ruleInfo.visible = !this.ruleInfo.visible;
			this.calculateGroup.visible = false;
			this.currentScoreLabel.visible = false;
		},this);
		this.scoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.TouchEvent) => {
			this.currentScoreLabel.visible = !this.currentScoreLabel.visible;
			this.calculateGroup.visible = false;
			this.ruleInfo.visible = false;
			this.currentScoreLabel.text = "最高积分：" + this.score;
		},this);
		this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.TouchEvent) => {
			this.submitQuestion();
		},this);
		this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.TouchEvent) => {
			this.startCalculate();
		},this);
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.TouchEvent) => {
			this.currentScoreLabel.visible = false;
			this.calculateGroup.visible = false;
			this.ruleInfo.visible = false;
			this.titleGroup.visible = true;
		},this);
		this.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.TouchEvent) => {
			this.baseScore = 3;
			this.questionRange = 20;
			if(this.passNum > 0){
				this.passNum--;
				this.randomQuestion();
			}else{
				// 提示暂时无跳过次数剩余
				this.alarmLabel.text = "跳过次数过多，暂无剩余可跳过次数！";
				this.alarmLabel.visible = true;
			}
		},this);
	}

	/**
	 * 开始游戏按钮点击
	 */
	private startGame(){
		console.log("点击开始游戏按钮，开始游戏隐藏启动ui！");
		this.titleGroup.visible = false;
		this.calculateGroup.visible = true;
		// 计时器启动
		this.startCalculate();
		// 随机题目
		this.randomQuestion();
	}

	/**
	 * 计时器开始计时
	 */
	private startCalculate(){
		// 数据初始化
		this.baseScore = 3;
		this.questionRange = 20;
		this.inputResult.text = "";
		this.restartBtn.visible = false;
		this.backBtn.visible = false;
		this.inputResult.visible = true;
		this.questionLabel.visible = true;
		this.scoreLabel.visible = true;
		this.submitBtn.visible = true;
		this.passBtn.visible = true;
		this.alarmLabel.visible = false;
		this.timer = new egret.Timer(1 * 1000, this.timeLast);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerCallFunc, this);
		this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerOverCallFunc, this);
		this.timer.start();
	}

	/**
	 * 计时器回调，显示剩余时间
	 */
	private timerCallFunc(){
		console.log("每秒计时")
		// 更新页面显示倒计时时间
		this.timeLabel.text = "剩余时间：" + (this.timeLast - this.timer.currentCount) + "秒";
	}

	/**
	 * 计时器回调
	 */
	private timerOverCallFunc(){
		console.log("游戏结束")
		this.timeLabel.text = "游戏结束！";
		// 处理成绩数据
		this.score = this.score > this.currentScore ? this.score : this.currentScore;
		this.currentScore = 0;
		egret.localStorage.setItem(this.storageKey,this.score.toString());
		// 处理显示数据
		this.restartBtn.visible = true;
		this.backBtn.visible = true;
		this.inputResult.visible = false;
		this.questionLabel.visible = false;
		this.submitBtn.visible = false;
		this.passBtn.visible = false;
		this.alarmLabel.visible = false;
	}

	/**
	 * 问题提交按钮
	 */
	private submitQuestion(){
		var answer:number = Number(this.inputResult.text);
		this.inputResult.text = "";
		if( answer == this.question * this.question){
			// 具体的算法逻辑，待确认
			var doubleScore = this.question % 5 == 0 ? 2 : 1;//能被5整除2倍
			var doubleScore = this.question % 7 == 0 ? 3 : doubleScore;//能被7整除3倍
			this.currentScore = this.currentScore + this.baseScore * doubleScore;
			this.scoreLabel.text = "当前积分：" + this.currentScore;
			this.baseScore++;//积分基础分数变更
			this.questionRange += 10;//范围变更
			this.randomQuestion();
		}else{
			this.baseScore = 3;
			this.questionRange = 20;
			// 提示回答错误
			this.alarmLabel.text = "回答错误，积分基数重置为3";
			this.alarmLabel.visible = true;
		}
	}

	/**
	 * 随机问题
	 */
	private randomQuestion(){
		// 题目信息
		this.alarmLabel.visible = false;//保持提示信息关闭
		this.question = Math.round(Math.random() * this.questionRange);
		this.questionLabel.text = this.question + " * " + this.question;
	}
}