var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super.call(this) || this;
        // 程序内变量
        _this.storageKey = "race_score_number"; //浏览器存储key
        _this.baseScore = 3; //当前基础积分累加值
        _this.score = 0; //当前最好成绩
        _this.currentScore = 0; //当前轮次成绩
        _this.timeLast = 60; //成绩持续时间
        _this.questionRange = 20; //计算范围
        _this.passNum = 3; //当前可跳过次数
        _this.skinName = "resource/eui_skins/login.exml";
        _this.bindListener();
        _this.score = egret.localStorage.getItem(_this.storageKey) == undefined || egret.localStorage.getItem(_this.storageKey) == null ? 0 : Number(egret.localStorage.getItem(_this.storageKey));
        return _this;
    }
    /**
     * 绑定按钮监听
     */
    Login.prototype.bindListener = function () {
        var _this = this;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            _this.startGame();
        }, this);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            _this.ruleInfo.visible = !_this.ruleInfo.visible;
            _this.calculateGroup.visible = false;
            _this.currentScoreLabel.visible = false;
        }, this);
        this.scoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            _this.currentScoreLabel.visible = !_this.currentScoreLabel.visible;
            _this.calculateGroup.visible = false;
            _this.ruleInfo.visible = false;
            _this.currentScoreLabel.text = "最高积分：" + _this.score;
        }, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            _this.submitQuestion();
        }, this);
        this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            _this.startCalculate();
        }, this);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            _this.currentScoreLabel.visible = false;
            _this.calculateGroup.visible = false;
            _this.ruleInfo.visible = false;
            _this.titleGroup.visible = true;
        }, this);
        this.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            _this.baseScore = 3;
            _this.questionRange = 20;
            if (_this.passNum > 0) {
                _this.passNum--;
                _this.randomQuestion();
            }
            else {
                // 提示暂时无跳过次数剩余
                _this.alarmLabel.text = "跳过次数过多，暂无剩余可跳过次数！";
                _this.alarmLabel.visible = true;
            }
        }, this);
    };
    /**
     * 开始游戏按钮点击
     */
    Login.prototype.startGame = function () {
        console.log("点击开始游戏按钮，开始游戏隐藏启动ui！");
        this.titleGroup.visible = false;
        this.calculateGroup.visible = true;
        // 计时器启动
        this.startCalculate();
        // 随机题目
        this.randomQuestion();
    };
    /**
     * 计时器开始计时
     */
    Login.prototype.startCalculate = function () {
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
    };
    /**
     * 计时器回调，显示剩余时间
     */
    Login.prototype.timerCallFunc = function () {
        console.log("每秒计时");
        // 更新页面显示倒计时时间
        this.timeLabel.text = "剩余时间：" + (this.timeLast - this.timer.currentCount) + "秒";
    };
    /**
     * 计时器回调
     */
    Login.prototype.timerOverCallFunc = function () {
        console.log("游戏结束");
        this.timeLabel.text = "游戏结束！";
        // 处理成绩数据
        this.score = this.score > this.currentScore ? this.score : this.currentScore;
        this.currentScore = 0;
        egret.localStorage.setItem(this.storageKey, this.score.toString());
        // 处理显示数据
        this.restartBtn.visible = true;
        this.backBtn.visible = true;
        this.inputResult.visible = false;
        this.questionLabel.visible = false;
        this.submitBtn.visible = false;
        this.passBtn.visible = false;
        this.alarmLabel.visible = false;
    };
    /**
     * 问题提交按钮
     */
    Login.prototype.submitQuestion = function () {
        var answer = Number(this.inputResult.text);
        this.inputResult.text = "";
        if (answer == this.question * this.question) {
            // 具体的算法逻辑，待确认
            var doubleScore = this.question % 5 == 0 ? 2 : 1; //能被5整除2倍
            var doubleScore = this.question % 7 == 0 ? 3 : doubleScore; //能被7整除3倍
            this.currentScore = this.currentScore + this.baseScore * doubleScore;
            this.scoreLabel.text = "当前积分：" + this.currentScore;
            this.baseScore++; //积分基础分数变更
            this.questionRange += 10; //范围变更
            this.randomQuestion();
        }
        else {
            this.baseScore = 3;
            this.questionRange = 20;
            // 提示回答错误
            this.alarmLabel.text = "回答错误，积分基数重置为3";
            this.alarmLabel.visible = true;
        }
    };
    /**
     * 随机问题
     */
    Login.prototype.randomQuestion = function () {
        // 题目信息
        this.alarmLabel.visible = false; //保持提示信息关闭
        this.question = Math.round(Math.random() * this.questionRange);
        this.questionLabel.text = this.question + " * " + this.question;
    };
    return Login;
}(eui.Component));
__reflect(Login.prototype, "Login");
