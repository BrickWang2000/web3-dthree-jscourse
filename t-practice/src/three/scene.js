import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
// 初始化场景
const scene = new THREE.Scene();

// 添加雾霾
const fog = new THREE.Fog(0x000000, 0, 10000);
scene.fog = fog;

// const cubeTextureLoader = new THREE.CubeTextureLoader().setPath("./textures/");
// const texture = cubeTextureLoader.load([
//   "1.jpg",
//   "2.jpg",
//   "3.jpg",
//   "4.jpg",
//   "5.jpg",
//   "6.jpg",
// ]);

// 导入hdr纹理
const hdrLoader = new RGBELoader();
hdrLoader.loadAsync("./textures/hdr/1.hdr").then((texture) => {
  //给场景添加背景
  scene.background = texture;
  //给场景所有的物体添加默认的环境贴图
  // scene.environment = texture;
  scene.environment.mapping = THREE.EquirectangularReflectionMapping;
});

const light1 = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light1);
// 添加平行光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, -10, 0);
light.castShadow = true;
// // 设置阴影贴图模糊度
light.shadow.radius = 20;
// 设置阴影贴图的分辨率
light.shadow.mapSize.set(4096, 4096);
// console.log(directionalLight.shadow);

// 设置平行光投射相机的属性
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
light.shadow.camera.top = 5;
light.shadow.camera.bottom = -5;
light.shadow.camera.left = -5;
light.shadow.camera.right = 5;
// scene.add(light);

export default scene;
