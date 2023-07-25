import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import cameraModule from "./camera";
import renderer from "./renderer";
import eventHub from "@/utils/eventHub";

class ControlsModule {
  constructor() {
    this.setOrbitControls();
    eventHub.on("toggleControls", (name) => {
      this[`set${name}Controls`]();
    });
  }
  setOrbitControls() {
    console.log('setOrbitControls');
    // 初始化控制器
    this.controls = new OrbitControls(
      cameraModule.activeCamera,
      renderer.domElement
    );
    // 设置控制器阻尼
    this.controls.enableDamping = true;
    // 设置自动旋转
    // controls.autoRotate = true;

    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = 0;
  }
  setFlyControls() {
    console.log('setFlyControls');
    this.controls = new FlyControls(
      cameraModule.activeCamera,
      renderer.domElement
    );
    // 设置控制器阻尼
    this.controls.enableDamping = true;
    this.controls.movementSpeed = 25;
    this.controls.autoForward = true; //自动向前移动
    this.controls.dragToLook = false;
    this.controls.rollSpeed = Math.PI / 24;
  }
  setFirstPersonControls() {
    console.log('setFirstPersonControls');
    this.controls = new FirstPersonControls(
      cameraModule.activeCamera,
      renderer.domElement
    );
    // 设置控制器阻尼
    this.controls.enableDamping = true;
    this.controls.movementSpeed = 10000;
    this.controls.rollSpeed = Math.PI / 60;
  }
}

export default new ControlsModule();
