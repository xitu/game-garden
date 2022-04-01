import { ReactComponent as Firecracker } from './firecracker.svg';
import anime from 'animejs';
import mojs from '@mojs/core';
import { Button } from 'antd';
import { useState } from 'react';
import React from 'react';
import './style.less';
export default function firecrackers({
  className,
  onBoom,
}: {
  className: string;
  onBoom: Function;
}) {
  const [showBoom, setShowBoom] = useState(true);
  const [displaying, setDisplaying] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [tip, setTip] = useState('点击鞭炮开始游戏');
  let a: anime.AnimeInstance = anime({});
  const [animation, setAnimation] = useState(a);
  const MAX_COUNT = window.location.hash === '#/juejin/m' ? 30 : 25;

  const onClickSpark = () => {
    if (isOver || clickCount > MAX_COUNT) {
      return;
    }
    clickCount == 0 && progressCotrol();
    sparkCotrol();
    clickCount > 15 && IconCotrol('.czIcon');
    clickCount > 10 && IconCotrol('.yhIcon');
    clickCount > 5 && IconCotrol('.tonyIcon');
    setClickCount(clickCount + 1);
    if (clickCount >= 20) {
      setTip('再点击几下就成功了！');
    }
    if (clickCount >= MAX_COUNT) {
      setTip('恭喜你点燃鞭炮');
      setIsOver(true);
      onShowBoom();
    }
    mojsBurstCotrol('.spark', 150);
  };

  const mojsBurstCotrol = (target: string, radius: number) => {
    new mojs.Burst({
      // 爆裂范围 {从多大 : 到多大}
      radius: { 0: radius },
      // 动画挂载的父元素, 如果不填默认挂载到 <body>
      parent: target,
      // 动画延迟的贝塞尔曲线函数
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      // 动画延迟时间
      duration: 1500,
      // 在动画动之前等待的时间 (这里一般设置150ms方便减少低端机型可能会存在的卡顿)
      delay: 300,
      // 扩散的粒子配置
      children: {
        duration: 750,
        // 粒子大小变换 {从多大 : 到多大}
        // rand(from, to) rand函数可以帮我们随机出一个区间的值
        radius: { 0: `rand(5, ${radius * 0.3})` },
        // 形状选择, 这里我们选择了 “圆形”
        shape: 'circle',
        // 粒子可选的填充色
        fill: [
          '#1abc9c',
          '#2ecc71',
          '#00cec9',
          '#3498db',
          '#9b59b6',
          '#fdcb6e',
          '#f1c40f',
          '#e67e22',
          '#e74c3c',
          '#e84393',
        ],
      },
      // 透明度
      opacity: 0.6,
      // 生成的粒子数量
      count: 20,
    }).play();
  };

  const sparkCotrol = () => {
    anime({
      targets: '.spark',
      left: Math.ceil(document.body.clientWidth * 0.9 * Math.random()) - 50,
      top: Math.ceil(document.body.clientHeight * 0.9 * Math.random()) - 130,
      scale: 0.5,
      duration: 200,
      easing: 'linear',
    });
  };

  const progressCotrol = () => {
    let a = anime({
      targets: progressRef.current,
      width: 0,
      duration: 1000 * 18,
      easing: 'linear',
      complete: () => {
        isOver || clickCount > MAX_COUNT || setTip('游戏失败，欢迎再次尝试');
        setIsOver(true);
      },
    });
    setAnimation(a);
  };

  const onClickCZ = () => {
    IconClick('.czIcon', 1200);
  };

  const onClickYH = () => {
    IconClick('.yhIcon', 1000);
  };

  const onClickTony = () => {
    IconClick('.tonyIcon', 700);
  };

  const IconClick = (target: string, time: number) => {
    if (isOver) return;
    IconCotrol(target);
    mojsBurstCotrol(target, 80);
    animation.pause();
    animation.seek(animation.currentTime - time);
    animation.play();
    timeTipCotrol(target);
  };

  const IconCotrol = (target: string) => {
    setTip('点击头像可以奖励时间');
    anime({
      targets: target,
      left: Math.ceil(document.body.clientWidth * 0.8 * Math.random()) - 50,
      top: Math.ceil(document.body.clientHeight * 0.8 * Math.random()) - 50,
      duration: 200,
      easing: 'linear',
    });
  };

  const timeTipCotrol = (target: string) => {
    anime({
      targets: `${target} .timeTip`,
      opacity: [0, 1, 0],
      left: 50,
      top: -30,
      duration: 800,
      easing: 'easeInQuad',
    });
  };

  const onBtnClick = () => {
    location.reload();
  };

  const onShowBoom = async () => {
    if (displaying) {
      return;
    }
    setDisplaying(true);
    const body = window.document.querySelector('body') as HTMLBodyElement;
    const { clientHeight: bodyClientHeight, clientWidth: bodyClientWidth } =
      body;
    const timeline: anime.AnimeTimelineInstance = anime.timeline();
    timeline.add({
      targets: '#fuse',
      strokeDashoffset: (target: any) => -target.getTotalLength(),
      duration: 2000,
      begin: (animation) => {
        const target = animation.animatables[0].target;
        const length = (target as any).getTotalLength();
        target.setAttribute('stroke-dasharray', length);
      },
      easing: 'linear',
    });
    const motionPath: SVGElement = document.querySelector(
      '#fuse',
    ) as SVGElement;
    const path = anime.path(motionPath);
    timeline.add(
      {
        targets: '#spark',
        translateX: path('x'),
        translateY: path('y'),
        rotate: path('angle'),
        duration: 2000,
        easing: 'linear',
      },
      '-=2000',
    );

    timeline.add(
      {
        targets: '#ember',
        transform: Array(21)
          .fill('scale(2.5)')
          .map((scale, index) => (index % 2 === 0 ? 'scale(1.4)' : scale)),
        duration: 2000,
        easing: 'easeInOutSine',
        direction: 'alternate',
      },
      '-=2000',
    );

    timeline.add(
      {
        targets: '#sparkles',
        transform: Array(21)
          .fill('scale(1.5)')
          .map((scale, index) => (index % 2 === 0 ? 'scale(0)' : scale)),
        duration: 2000,
        easing: 'easeInOutSine',
        direction: 'alternate',
      },
      '-=2000',
    );

    timeline.add({
      targets: '#spark',
      scale: 4.5,
      opacity: 0,
      duration: 250,
      easing: 'easeInOutSine',
    });
    timeline.add({
      targets: '#bomb',
      opacity: 0,
      duration: 250,
      easing: 'easeInOutSine',
    });
    timeline.add(
      {
        targets: sparkRef.current,
        backgroundColor: {
          value: '#fff',
          duration: 300,
        },
        width: 1 * Math.max(bodyClientHeight, bodyClientWidth),
        height: 1 * Math.max(bodyClientHeight, bodyClientWidth),
        duration: 1000,
        complete: () => {
          onBoom && onBoom();
        },
      },
      '+=10',
    );
    timeline.add(
      {
        targets: maskRef.current,
        backgroundColor: `rgba(0,0,0,0.8)`,
        duration: 800,
        easing: 'easeInOutCirc',
      },
      '-=1000',
    );
    timeline.add({
      targets: sparkRef.current,
      width: 0,
      height: 0,
      opacity: 0,
      duration: 3000,
      easing: 'easeInOutCirc',
    });
    timeline.add(
      {
        targets: maskRef.current,
        backgroundColor: `rgba(0,0,0,0)`,
        duration: 3000,
        opacity: 0,
        easing: 'easeInOutCirc',
      },
      '-=3000',
    );

    await timeline.finished;
    setShowBoom(false);
  };

  const sparkRef = React.createRef<HTMLDivElement>();
  const maskRef = React.createRef<HTMLDivElement>();
  const progressRef = React.createRef<HTMLDivElement>();
  const czIconRef = React.createRef<HTMLDivElement>();
  const yhIcon = React.createRef<HTMLDivElement>();
  const tonyIcon = React.createRef<HTMLDivElement>();

  return showBoom ? (
    <div ref={maskRef} className={`${className} mask`}>
      <p className="tip">{tip}</p>
      {!isOver || clickCount > 24 ? (
        <div ref={sparkRef} className="spark" onClick={onClickSpark}>
          <Firecracker />
        </div>
      ) : clickCount < MAX_COUNT ? (
        <Button className="center-btn" onClick={onBtnClick}>
          重新轰炸！
        </Button>
      ) : null}
      <div className="czIcon icon" ref={czIconRef} onClick={onClickCZ}>
        <span className="timeTip">+1.2s</span>
      </div>
      <div className="yhIcon icon" ref={yhIcon} onClick={onClickYH}>
        <span className="timeTip">+1.0s</span>
      </div>
      <div className="tonyIcon icon" ref={tonyIcon} onClick={onClickTony}>
        <span className="timeTip">+0.7s</span>
      </div>
      <div className="progress-box">
        <div ref={progressRef} className="progress"></div>
      </div>
    </div>
  ) : null;
}
