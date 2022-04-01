import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { loadImage } from "@/utils/image"
import React from "react";
import Fragment from "@/components/image-break/fragment";
import anime from 'animejs'
import './style.less'
function imageBreak({ canvasWidth, canvasHeight, imgUrl, onFinished }:ImageBreakProps, ref : any) {
  if (!canvasWidth || !canvasHeight) {
    return (
      <div>加载中...</div>
    )
  }
  const imageRef = React.createRef<HTMLImageElement>()
  const containerRef = React.createRef<HTMLDivElement>()
  const [showFullImage, setShowFullImage] = useState(true)
  let fragments:Array<Fragment> = []

  const renderImage = async (el: HTMLDivElement) => {
      const image = await loadImage(imgUrl)
      const { vertices, indices } = triangulate({ canvasWidth, canvasHeight })
      const result = initFragments({  vertices, indices, canvasWidth, canvasHeight, container: el, img: image})
      fragments = result.fragments
  }

  useImperativeHandle(ref, () => ({
      // changeVal 就是暴露给父组件的方法
      breakPage: () => {
        breakPage()
      }
  }));
  const breakPage = async () => {
    containerRef.current && renderImage(containerRef.current)
    await anime({
      targets: imageRef.current ,
      opacity: 0,
      duration: 2000
    }).finished
    await (containerRef.current && shake({ fragments, canvasWidth, canvasHeight, container: containerRef.current }).finished)
    console.log('--shaked--')
    await (containerRef.current && shatter({ fragments, canvasWidth, canvasHeight, container: containerRef.current }).finished)
    console.log('--shattered--')
    onFinished && onFinished()
  }
  return (
    <div className="page-breaker" ref={containerRef}>
      {showFullImage ? <div ref={imageRef} className="page-breaker__full-image" style={{backgroundImage: `url(${imgUrl})`}}></div> : null}
    </div>
  )
}

export default forwardRef(imageBreak)

const TWO_PI = Math.PI * 2;

export interface ImageBreakProps {
  canvasWidth: number,
  canvasHeight: number,
  imgUrl: string,
  onFinished?: Function
}


/**
 * 生成三角形顶点数据
 * @param { canvasWidth, canvasHeight }
 * @returns
 */
function triangulate({ canvasWidth, canvasHeight } : { canvasWidth: number, canvasHeight: number }): {
  vertices: Array<Array<number>>,
  indices: Array<number>
} {
  const rings = [
        {r:50, c:12},
        {r:150, c:12},
        {r:300, c:12},
        {r:1200, c:12} // very large in case of corner clicks
      ];
  const centerX = canvasWidth/2;
  const centerY = canvasHeight/2;
  const vertices: Array<Array<number>> = [];
  vertices.push([centerX, centerY]);
  vertices.push([0, 0])
  vertices.push([0, canvasHeight])
  vertices.push([canvasWidth, 0])
  vertices.push([canvasWidth, canvasHeight])
  rings.forEach(function(ring) {
      var radius = ring.r,
          count = ring.c,
          variance = radius * 0.25;

      for (var i = 0; i < count; i++) {
          let x = Math.cos((i / count) * TWO_PI) * radius + centerX + randomRange(-variance, variance);
          let y = Math.sin((i / count) * TWO_PI) * radius + centerY + randomRange(-variance, variance);
          vertices.push([x, y]);
      }
  });

  vertices.forEach(function(v) {
      v[0] = clamp(v[0], 0, canvasWidth);
      v[1] = clamp(v[1], 0, canvasHeight);
  });

  const indices: Array<number> = (window as any).Delaunay.triangulate(vertices);

  return {
    vertices,
    indices
  }
}

/**
 * 生成碎片数组
 * @param {vertices, indices, canvasWidth, canvasHeight, container, img}
 * @returns
 */
function initFragments( {vertices, indices, canvasWidth, canvasHeight, container, img} : {
  vertices: Array<Array<number>>,
  indices: Array<number>,
  canvasWidth: number,
  canvasHeight: number,
  container: HTMLDivElement,
  img: CanvasImageSource
}) : { fragments: Array<Fragment> } {
  let p0, p1, p2,fragment;
  const fragments:Array<Fragment> = []

  for (let i = 0; i < indices.length; i += 3) {
      p0 = vertices[indices[i + 0]];
      p1 = vertices[indices[i + 1]];
      p2 = vertices[indices[i + 2]];
      fragment = new Fragment(p0, p1, p2);
      fragment.clip(img, canvasWidth, canvasHeight)
      fragments.push(fragment);
      container.appendChild(fragment.canvas);
  }
  return {
    fragments
  }
}

function shake({ fragments, container, canvasWidth, canvasHeight, }: { fragments: Array<Fragment>, container: HTMLDivElement, canvasWidth: number, canvasHeight: number }):anime.AnimeTimelineInstance {
  const tl: anime.AnimeTimelineInstance = anime.timeline();
  tl.add({
    targets: fragments.map(t => t.canvas),
    rotateX: {
      value: randomRange(-5, 15),
    },
    rotateY: {
      value: randomRange(-5, 15),
    },
    scale: 0.95,
    easing:'easeInOutSine',
    duration: 300,
  }, 0);
  return tl;
}

function shatter({ fragments, container, canvasWidth, canvasHeight, }: { fragments: Array<Fragment>, container: HTMLDivElement, canvasWidth: number, canvasHeight: number }):anime.AnimeTimelineInstance {
  const tl: anime.AnimeTimelineInstance = anime.timeline();
  fragments.forEach((fragment: Fragment) => {
    const dx = fragment.centroid[0] - canvasWidth/2;
    const dy = fragment.centroid[1] - canvasHeight/2;
    const d = Math.sqrt(dx * dx + dy * dy);
    const rx = 30 * sign(dy);
    const ry = 90 * -sign(dx);
    const delay = d * 3 * randomRange(0.9, 1.2);
    fragment.canvas.style.zIndex = Math.floor(d).toString();
    tl.add({
      targets: fragment.canvas,
      scale: {
        value: 0,
        duration: 1000,
      },
      opacity: {
        value: 0,
        duration: 400,
        delay: delay + 600
      },
      left: canvasWidth/2 - fragment.box.w/2,
      top: canvasHeight/2 - fragment.box.h/2,
      rotateX: {
        value: rx,
        duration: 400,
        delay: delay + 600
      },
      rotateY: {
        value: ry,
        duration: 400,
        delay: delay + 600
      },
      easing:'cubicBezier(0.420, 0.000, 1.000, 1.000)',
      duration: 1000,
    }, delay);
  })
  return tl
}

/////////////////
// MATH UTILS //
////////////////

function randomRange(min: number, max: number) {
  return min + (max - min) * Math.random();
}

function clamp(x: number, min: number, max: number) {
  return x < min ? min : (x > max ? max : x);
}

function sign(x: number) {
  return x < 0 ? -1 : 1;
}
