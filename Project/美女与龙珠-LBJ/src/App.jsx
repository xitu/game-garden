import { Editor, Model, Skybox, ThirdPersonCamera, useKeyboard, useLoop, World, Find, Reticle, Joystick } from "lingo3d-react"
import { createRef, useState } from "react"

function App() {
  // useKeyboard用于监控当前按键
  const key = useKeyboard()
  // console.log(key);
  const [oneStar, setOneStar] = useState(false);
  const [twoStar, setTwoStar] = useState(false);
  const [threeStar, setThreeStar] = useState(false);
  const [fourStar, setFourStar] = useState(false);
  const [fiveStar, setFiveStar] = useState(false);
  const [sixStar, setSixStar] = useState(false);
  const [sevenStar, setSevenStar] = useState(false);

  // const [angleY, setAngleY] = useState(180);

  const [sl, setSl] = useState(false);


  const mapRef = createRef();
  const characterRef = createRef()
  const cameraRef = createRef()
  //用于标记找到的龙珠
  let [findBall, setFindBall] = useState(new Set())
  //声明motion，用于表示当前角色应该对应的动画，默认为站立idle
  let motion = "idle";
  // 前
  if (key === "w") {
    motion = "running"
  }
  // 后
  if (key === "s") {
    motion = "walkingBackwards"
  }
  // 按下w和e时，开始跑
  if (key === "w e") {
    motion = "running"
  }
  // 或者只按e时，开始跑
  if (key === "e") {
    motion = "running"
  }

  if (key === "Space") {
    motion = "jumping"
  }

  if (key === "d") {
    motion = "dancing"
  }

  // useLoop 帧循环勾子
  useLoop(() => {
    characterRef.current.moveForward(-10)
  }, key === "w");
  useLoop(() => {
    characterRef.current.moveForward(1.8)
  }, key === "s");
  useLoop(() => {
    characterRef.current.moveForward(-15)
  }, key === "w e");
  useLoop(() => {
    characterRef.current.moveForward(-10)
  }, key === "e");
  useLoop(() => {

    characterRef.current.moveForward(-2)
    characterRef.current.y += 5
  }, key === "Space");






  return (
    <>

      <World>
        {/* <Editor /> */}
        <Skybox texture="skybox.jpg" />

        <ThirdPersonCamera active mouseControl innerY={66} ref={cameraRef}>
          <Model
            ref={characterRef}
            src="girl.fbx"
            physics={findBall.size < 9 ? "character" : "map"}
            animations={{
              idle: "idle.fbx",
              walking: "walking.fbx",
              walkingBackwards: "walking-backwards.fbx",
              running: "running.fbx",
              jumping: "jumping.fbx",
              dancing: "dancing.fbx"
            }}
            animation={motion}
            scale={1}
            x={findBall.size < 9 ? -221.30 : 209.39}
            y={findBall.size < 9 ? -1300.07 : -317.7}
            z={findBall.size < 9 ? -6722.07 : 703.66}
            // x={505.20}
            // y={471.73}
            // z={684.88}
            // rotationY={180}

            rotationY={180}
          />
        </ThirdPersonCamera>

        <Model
          ref={mapRef}
          src={findBall.size < 9 ? "map/scene.gltf" : "myhome.fbx"}
          // src={"myhome.fbx"}
          scale={40}
          physics="map"
        >
        </Model>

        <Model
          src="dragon_balls\scene.gltf"
          scale={3}
          physics="map"
          x={-221.30}
          y={-1300.07}
          z={-6722.07}
        />

        <Model
          src="dragon_ball.fbx"
          physics="map"
          x={516.29}
          y={-1198.63}
          z={173.60}
          scale={.5}
        >
          <Find name="Two Star_02 - Default_0"
            outline={oneStar}
            onClick={() => {
              setOneStar(true)
              findBall.add(1)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("龙珠收集成功，龙已经出现在某个地方")
              }
            }} ></Find>
        </Model>


        <Model
          id="two"
          src="dragon_ball.fbx"
          physics="map"
          x={-980.8}
          y={-801.4}
          z={2693.9}
          scale={.8}
        >
          <Find name="Two Star_02 - Default_0"
            outline={twoStar}
            onClick={() => {
              setTwoStar(true)
              findBall.add(2)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("龙珠收集成功，龙已经出现在某个地方")
              }
            }} ></Find>
        </Model>


        <Model
          src="dragon_ball.fbx"
          physics="map"
          x={-420.9}
          y={-1289.5}
          z={-3538.2}
          scale={.5}
        >
          <Find name="Two Star_02 - Default_0"
            outline={threeStar}
            onClick={() => {
              setThreeStar(true)
              findBall.add(3)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("龙珠收集成功，龙已经出现在某个地方")
              }
            }} ></Find>
        </Model>

        <Model
          src="dragon_ball.fbx"
          physics="map"
          x={-676.3}
          y={-1900.2}
          z={6343.7}
          scale={.8}
        >
          <Find name="Two Star_02 - Default_0"
            outline={fourStar}
            onClick={() => {
              setFourStar(true)
              findBall.add(4)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("龙珠收集成功，龙已经出现在某个地方")
              }
            }} ></Find>
        </Model>


        <Model
          src="dragon_ball.fbx"
          physics="map"
          x={-898.7}
          y={-1231.8}
          z={3563.8}
          scale={.5}
        >
          <Find name="Two Star_02 - Default_0"
            outline={fiveStar}
            onClick={() => {
              setFiveStar(true)
              findBall.add(5)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("龙珠收集成功，龙已经出现在某个地方")
              }
            }} ></Find>
        </Model>


        <Model
          src="dragon_ball.fbx"
          physics="map"
          x={395.9}
          y={-1308.6}
          z={5900.3}
          scale={.8}
        >
          <Find name="Two Star_02 - Default_0"
            outline={sixStar}
            onClick={() => {
              setSixStar(true)
              findBall.add(6)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("龙珠收集成功，龙已经出现在某个地方")
              }
            }} ></Find>
        </Model>


        <Model
          src="dragon_ball.fbx"
          physics="map"
          x={455.8}
          y={-1267.0}
          z={3867.4}
          scale={.8}
        >
          <Find name="Two Star_02 - Default_0"
            outline={sevenStar}
            onClick={() => {
              setSevenStar(true)
              findBall.add(7)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("龙珠收集成功，龙已经出现在某个地方")

              }
            }} ></Find>
        </Model>

        <Model
          visible={findBall.size === 7}
          src="sl2.fbx"
          scale={1}
          x={-221.30}
          y={-1300.07}
          z={-3700}

          onClick={() => {
            setSl(true)
            findBall.add(0)
          }}
        />

        <Model
          visible={sl && (findBall.size === 8)}

          src="sl0.fbx"
          scale={37.82}
          x={-214.9}
          y={-804.91}
          z={-8364}
          onClick={() => {
            findBall.add(8)
            console.log(findBall)
          }}
        />



      </World >
      <Reticle color="white" variant={1} />

      {/* 添加Joystick 摇杆 */}

      {/* Joystick组件，有个onMove方法，它接收一个函数，函数会接收一个参数e，e.x的值是-50到50，e.y也是-50到50;e.angle是正负180，以x轴正方向为0度，你顺时针为正，逆时针为负 */}
      <Joystick
        onMove={e => {
          // 控制前、后的移动和站立
          if (e.y < 0) {
            characterRef.current.moveForward(-10)
            characterRef.current.animation = "running"
          } else if (e.y > 0) {
            characterRef.current.moveForward(5)
            characterRef.current.animation = "walkingBackwards"
          } else {
            characterRef.current.animation = "idle"
          }

          // 根据摇杆转动的角度，控制角色的转动
          // characterRef.current.innerRotationY=3*e.y;
          // cameraRef.current.innerRotationY = 3*e.y;

          // console.log(e.y);


          // console.log(e.angle);

          // characterRef.current.rotationY=e.angle;

          // characterRef.current.innerRotationY = e.angle+90;
          // cameraRef.current.innerRotationY = e.angle+90;

          characterRef.current.rotationY = e.angle+90;
          cameraRef.current.rotationY = e.angle+90;
        }}
      />

    </>
  )
}

export default App
