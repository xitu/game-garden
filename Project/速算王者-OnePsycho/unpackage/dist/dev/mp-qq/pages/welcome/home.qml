<view class="page"
    ><view class="logo"><image class="logo-image" src="../../static/logo.png" mode="widthFix"></image><image src="../../static/myLogo.png" mode="widthFix"></image></view
    ><view class="btn-start"
        ><image class="btns-item" src="../../static/btn_start.png" mode="widthFix" data-event-opts="{{[['tap',[['onStart',['$event']]]]]}}" bindtap="__e"></image
        ><button open-type="share"><image src="../../static/btn_share.png" mode="widthFix" data-event-opts="{{[['tap',[['onShare',['$event']]]]]}}" bindtap="__e"></image></button></view
    ><view data-event-opts="{{[['tap',[['hideModal',['$event']]]]]}}" class="{{['cu-modal',isShowModal?'show':'']}}" bindtap="__e"
        ><view data-event-opts="{{[['tap',[['',['$event']]]]]}}" class="cu-dialog" catchtap="__e"
            ><view class="type-title _p">选择模式</view><view data-event-opts="{{[['tap',[['goStart',['twoAdd',10]]]]]}}" class="type-item" bindtap="__e">两位数 / 加法 / 10个</view
            ><view data-event-opts="{{[['tap',[['goStart',['twoReduce',10]]]]]}}" class="type-item" bindtap="__e">两位数 / 减法 / 10个</view
            ><view data-event-opts="{{[['tap',[['goStart',['twoRide',10]]]]]}}" class="type-item" bindtap="__e">两位数 / 乘法 / 10个</view
            ><view data-event-opts="{{[['tap',[['goStart',['threeAdd',10]]]]]}}" class="type-item" bindtap="__e">三位数 / 加法 / 10个</view
            ><view class="type-tips _p">游戏规则：输入答案点击OK 正确则自动进入下一题 错误则需重新输入正确答案</view></view
        ></view
    ></view
>
