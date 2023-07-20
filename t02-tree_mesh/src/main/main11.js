//目标：纹理的进度
import  * as THREE from "three";
import requestAnimationFrame from "dat.gui/src/dat/utils/requestAnimationFrame";
//导入控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// console.log(THREE);
// 导入dat.gui
import * as dat from "dat.gui";
//1、场景
const scene = new THREE.Scene();

//2、创建相机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000);

//设置相机位置
camera.position.set(0,0,20);
scene.add(camera);

var div = document.createElement("div");
div.style.width = "200px";
div.style.height = "200px";
div.style.position = "fixed";
div.style.right = 0;
div.style.top = 0;
div.style.color = "#fff";
document.body.appendChild(div);
let event = {};
// 单张纹理图的加载
event.onLoad = function () {
    console.log("图片加载完成");
};
event.onProgress = function (url, num, total) {
    console.log("图片加载完成:", url);
    console.log("图片加载进度:", num);
    console.log("图片总数:", total);
    let value = ((num / total) * 100).toFixed(2) + "%";
    console.log("加载进度的百分比：", value);
    div.innerHTML = value;
};
event.onError = function (e) {
    console.log("图片加载出现错误");
    console.log(e);
};

// 设置加载管理器
const loadingManager = new THREE.LoadingManager(
    event.onLoad,
    event.onProgress,
    event.onError
);

//3、添加物体
// 导入纹理
const textureLoader = new THREE.TextureLoader(loadingManager);
// const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load(
    "./textures/door/color.jpg",
      // event.onLoad,
      // event.onProgress,
      // event.onError
);
// console.log(doorColorTexture);
const doorAplhaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAoTexture = textureLoader.load("./textures/door/ambientOcclusion.jpg");
//导入置换贴图
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
// 导入粗糙度贴图
const roughnessTexture = textureLoader.load("./textures/door/roughness.jpg");
// 导入金属贴图
const metalnessTexture = textureLoader.load("./textures/door/metalness.jpg");
// 导入法线贴图
const normalTexture = textureLoader.load("./textures/door/normal.jpg");

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(10, 10, 10, 100, 100, 100);
// 材质
const material = new THREE.MeshStandardMaterial({
    color: "#ffff00",
      map: doorColorTexture,
      alphaMap: doorAplhaTexture,
    transparent: true,
    aoMap: doorAoTexture,
    aoMapIntensity: 1,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    roughness: 1,
    roughnessMap: roughnessTexture,
    metalness: 1,
    metalnessMap: metalnessTexture,
    normalMap: normalTexture,
    // opacity: 0.3,
    //   side: THREE.DoubleSide,
});
material.side = THREE.DoubleSide;
const cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);

// 给cube添加第二组uv
cubeGeometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
);

// 添加平面
const planeGeometry = new THREE.PlaneGeometry(10, 10, 200, 200);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(13, 0, 0);
scene.add(plane);
// 给平面设置第二组uv
planeGeometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
);

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);
//直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(15, 15, 15);
scene.add(directionalLight);

//4、初始化渲染器 渲染画布
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
// console.log(renderer);
document.body.appendChild(renderer.domElement);
//使用渲染器，通过相机将场景渲染进来
// renderer.render(scene,camera);


//创建轨道控制器
const  controls = new OrbitControls(camera ,renderer.domElement);
//设置控制器阻尼,让控制器更有真实效果，必须在动画循环里调用update()
controls.enableDamping =true ;

//添加坐标辅助器
const axesHelper = new THREE.AxesHelper( 20 );
scene.add(axesHelper);


function render(){
    controls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();
//监听画面变化，更新渲染器
window.addEventListener("resize",()=>{
    console.log("resize");
    //更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //更新摄像头投影矩阵
    camera.updateProjectionMatrix();

    //更新渲染器
    renderer.setSize(window.innerWidth,window.innerHeight);
    //更新渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
})
