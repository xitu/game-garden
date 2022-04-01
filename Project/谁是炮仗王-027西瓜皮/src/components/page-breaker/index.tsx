import './index.less';
import ImageBreak from '@/components/image-break/index';
import Firecrackers from '@/components/firecrackers';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
export default function PageBreaker({ imgUrl }: { imgUrl: string }) {
  const containerRef = React.createRef<HTMLDivElement>();
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    if (
      containerRef.current?.clientWidth &&
      containerRef.current?.clientHeight
    ) {
      setWidth(containerRef.current?.clientWidth);
      setHeight(containerRef.current?.clientHeight);
    }
  }, [containerRef]);

  const breaker = React.createRef();

  const onBoom = () => {
    (breaker.current as any).breakPage();
  };

  const onFinished = () => {
    setFinished(true);
  };
  const onBtnClick = () => {
    setFinished(false);
  };

  return (
    <div className="container" ref={containerRef}>
      {finished ? (
        <div>
          <p className="text">恭喜你成功炸掉掘金</p>
          <Button className="center-btn" onClick={onBtnClick}>
            {' '}
            重新轰炸！
          </Button>
        </div>
      ) : null}
      {!finished ? (
        <>
          <Firecrackers className="center" onBoom={onBoom}></Firecrackers>
          {width && height && (
            <ImageBreak
              ref={breaker}
              canvasWidth={width}
              canvasHeight={height}
              imgUrl={imgUrl}
              onFinished={onFinished}
            />
          )}
        </>
      ) : null}
    </div>
  );
}
