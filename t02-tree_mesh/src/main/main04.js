//目标：纹理常用属性
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
camera.position.set(20,0,0);
scene.add(camera);

//3、添加物体
// 导入纹理
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
console.log(doorColorTexture);
const texture = textureLoader.load("./textures/minecraft.png");

// console.log(doorColorTexture);
// 设置纹理偏移
// doorColorTexture.offset.x = 0.5;
// doorColorTexture.offset.y = 0.5;
// doorColorTexture.offset.set(0.5, 0.5);
// 纹理旋转
// 设置旋转的原点
doorColorTexture.center.set(0.5, 0.5);
// // 旋转45deg
doorColorTexture.rotation = Math.PI / 4;
// 设置纹理的重复
// doorColorTexture.repeat.set(2, 2);
// // 设置纹理重复的模式
// doorColorTexture.wrapS = THREE.MirroredRepeatWrapping;
// doorColorTexture.wrapT = THREE.RepeatWrapping;

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
    color: "#ffff00",
      map: doorColorTexture,
    // map: texture,
});
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);

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
