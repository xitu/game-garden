var containerDiv=document.getElementById("container");
var ofrag;
var oldimgs=[];
var newimgs=[];
var imgItems=[];//里面全是DIV
var pos=[];
var minindex=5;
var near;
var row;
var col;
var shu;
function init(row,col){
    //为oldimgs赋值
    /*var ihtml="";*/
    for(var i=1;i<=row*col;i++){
        oldimgs.push(i);
    }
    newimgs=oldimgs.slice(0);//赋值新数组
    ofrag=document.createDocumentFragment();//文档碎片
    for(var i=0;i<row*col;i++){
        var x = -((i%col)*shu);
        var y =-(Math.floor((i/col))*shu);
        var div = document.createElement("div");
        div.style.cursor="move";
        div.style.backgroundImage="url(4.png)";
        div.style.backgroundRepeat="no-repeat";
        div.style.float="left";
        div.style.height=shu;
        div.style.width=shu;
        div.style.backgroundPosition=""+x+"px "+y+"px";
        imgItems.push(div);
        ofrag.appendChild(div);
    }
    containerDiv.appendChild(ofrag);
}
document.getElementById("start1").onclick=function(){
    row=3;
    col=3;
    shu=120;
    init(row,col);
    startGame();//开始游戏
}
document.getElementById("start2").onclick=function(){
    row=4;
    col=4;
    shu=90;
    init(row,col);
    startGame();//开始游戏
}
document.getElementById("start3").onclick=function(){
    row=6;
    col=6;
    shu=60;
    init(row,col);
    startGame();//开始游戏
}
function startGame(){
    //打乱图片的操作
    newimgs.sort(function(a,b){//绝对不是1~9
        return Math.random()>0.5 ?1:-1;
    })
    for(var i=0;i<row*col;i++){
        pos[i]=[imgItems[i].offsetLeft,imgItems[i].offsetTop];
    }
    for(var i=0;i<row*col;i++){
        var num= newimgs[i]-1;
        var x =-(num%row)*shu;
        var y=-(Math.floor((num/col))*shu);
        imgItems[i].style.left=pos[i][0]+"px";
        imgItems[i].style.top=pos[i][1]+"px";
        imgItems[i].style.position="absolute";
        imgItems[i].style.backgroundPosition=""+x+"px "+y+"px";
        imgItems[i].index=i;//设置index就是设置访问的下标 pos[1]
        imgItems[i].onmousedown=dragImage; 
    }
}
        //检查是否覆盖
        function cheakName(dom1,dom2){
            //dom1是我们拖动的那个DIV
            //dom2是我们循环的每一个DIV
            if(dom1==dom2){
                return;
            }
            
            var l1=dom1.offsetLeft;
            var t1=dom1.offsetTop;
            var r1=dom1.offsetWidth+l1;
            var b1=dom1.offsetHeight+t1;
            var l2=dom2.offsetLeft;
            var t2=dom2.offsetTop;
            var r2=dom2.offsetWidth+l2;
            var b2=dom2.offsetHeight+t2;
            //如何判断我拖动的图片覆盖的到下面的图片？？？
            if(l1>r2||t1>b2||r1<l2||b1<t2){
                return false;
            }
            else {
                return true;
            }
        }
        function dis(dom1,dom2){
            var l1=dom1.offsetLeft-dom2.offsetLeft;
            var l2=dom1.offsetTop-dom2.offsetTop;
            return Math.sqrt(l1*l1+l2*l2);//不能为负数
        }
        //找到near
        function findnear(dom){
            var index_nei=-1;
            var imin=999999;
            for(var i=0;i<row*col;i++){
                imgItems[i].className="";
                if(cheakName(dom,imgItems[i])){
                    var dx=dis(dom,imgItems[i]);
                    if(imin>dx){
                        index_nei=i;    
                        imin=dx;
                    }
                }
            }
            if(index_nei == -1){
                return null; //null 空值
            }
            else{
                return imgItems[index_nei];
            }
        }
        var disX,disY,l,t;
        function dragImage(event){
            var dom=this;
            minindex++;
            dom.style.zIndex=minindex;
            //放置鼠标点击的坐标
            disX=event.clientX-dom.offsetLeft;//X的坐标距离差
            disY=event.clientY-dom.offsetTop;//Y的坐标距离差
            //我们的鼠标点下去的坐标和我们每一个DIV图片的坐标是有距离差的
            document.onmousemove=function(event){
                l=event.clientX-disX;
                t=event.clientY-disY;
                //鼠标拖动图片进行移动
                near=findnear(dom);
                if(near){
                    //如果是一个真实的对象 返回真，如果不是 null false
                    near.className="active";
                }
                dom.style.left=l+"px";
                dom.style.top=t+"px";

            }
            document.onmouseup=function(){
                //move函数代表着图片移动回去
                if(near){
                    near.className="";
                    move(dom,pos[near.index][0],pos[near.index][1]);
                    move(near,pos[dom.index][0],pos[dom.index][1]);
                    //交换一下index???
                    var temp=0;
                    temp=near.index;
                    near.index=dom.index;
                    dom.index=temp;
                    for(var i=0;i<row*col;i++){
                        oldimgs[i]=imgItems[i].index+1;
                    }
                    if(success()){
                        gameOver();
                    }
                }
                else{
                    move(dom,pos[dom.index][0],pos[dom.index][1]);
                }
                
                //释放资源
                document.onmousemove=null;
                document.onmouseup=null;
            }
        }
        //拼图结束
        function success(){
            for(var i=0;i<row*col-1;i++){
                if(newimgs[i]!=oldimgs[i]){
                    return false;
                }
            }
            return true;
        }
        //游戏结束
        function gameOver(){
            var successDIV=document.createElement("div");
            var inner_p=document.createElement("p");
            var t=2;
            var timer;
            successDIV.style.cssText=
            "position:absolute;z-index:999999;top:45%;width:25%;text-align:center;font-size:70px;color:red;";
            successDIV.innerHTML="good job!!!";
            successDIV.appendChild(inner_p);
            containerDiv.appendChild(successDIV);
            function timerClear(){
                inner_p.innerHTML=t--;
                if(t<=0){
                    clearInterval(timer);
                    window.location.reload();//刷新本页面
                    return;
                }
                timer=setTimeout(function(){
                    timerClear();
                },1000)
            }
           timerClear();
        }
        function move(dom,left,top){
            //left和top是原始数组
            clearInterval(dom.timer);
            dom.timer=setInterval(function(){
                var stop_index=false;//鼠标停止移动
                //移动到新数据
                var i_left=parseInt(dom.style.left);
                var i_top=parseInt(dom.style.top);
                if(left!=i_left|| top!=i_top){
                    var i_speed_left=(left-i_left)/5;
                    var i_speed_top=(top-i_top)/5;
                    i_speed_left=i_speed_left>0?Math.ceil(i_speed_left):Math.floor(i_speed_left);
                    i_speed_top=i_speed_top>0?Math.ceil(i_speed_top):Math.floor(i_speed_top);
                    dom.style.left=(i_left+i_speed_left)+"px";
                    dom.style.top=(i_top +i_speed_top)+"px";
                }
                else{
                    stop_index=true;
                }
                if(stop_index){
                    clearInterval(dom.timer);
                }
            },10);
        }