//目标：js控制画面全屏
import  * as THREE from "three";
//导入控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import requestAnimationFrame from "dat.gui/src/dat/utils/requestAnimationFrame";
import gsap from "gsap";
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
// console.log(cube);

//修改物体位置

//旋转

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
const axesHelper = new THREE.AxesHelper( 5 );
scene.add(axesHelper);


window.addEventListener("dblclick",()=>{
    const fullScreenElement = document.fullscreenElement;
    if(!fullScreenElement){
        renderer.domElement.requestFullscreen();
    }else {
        document.exitFullscreen();
    }
});
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
