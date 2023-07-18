import  * as THREE from "three";
//导入控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import requestAnimationFrame from "dat.gui/src/dat/utils/requestAnimationFrame";
// console.log(THREE);

//1、场景
const scene = new THREE.Scene();

//2、创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);

//3、添加物体
//几何体
const cubeGeometry = new THREE.BoxGeometry();
//材质
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
//物体
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
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

//添加坐标辅助器
const axesHelper = new THREE.AxesHelper( 5 );
scene.add(axesHelper);

function render(){
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();

