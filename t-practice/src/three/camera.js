import * as THREE from "three";
import eventHub from "@/utils/eventHub";
// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerHeight / window.innerHeight,
  1,
  10000
);
// 设置相机位置
// object3d具有position，属性是1个3维的向量
// camera.position.set(300000, 200, 300000);
camera.position.set(200, 100, 200);
class CameraModule {
  constructor() {
    this.activeCamera = camera;
    this.collection = {
      default: camera,
    };

    eventHub.on("toggleCamera", (name) => {
      this.setActive(name);
    });
  }
  add(name, camera) {
    this.collection[name] = camera;
  }
  setActive(name) {
    this.activeCamera = this.collection[name];
  }
}

export default new CameraModule();
