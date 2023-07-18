//目标：gsap 设置各种动画效果
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
// cube.position.set(5,0,0);
// cube.position.x=3
//缩放
// cube.scale.set(3,2,1);
// cube.scale.x = 5;

//旋转
// cube.rotation.set(Math.PI/4,0,0,"XZY");

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

var animatel=gsap.to(cube.position,{x:5, duration: 5, ease: "power1.inOut",
    //重复次数，-1无限循环
    repeat:-1,
    //往返
    yoyo: true,
    //延迟两秒
    delay: 2,
    onComplete:()=>{
    console.log("动画完成");
    },
    onStart:()=>{
    console.log("动画开始");
    }
});
gsap.to(cube.rotation,{x:2*Math.PI,duration: 5});
window.addEventListener("dblclick",()=>{
    console.log(animatel);
    if(animatel.isActive()){
        animatel.pause();
    }else{
        animatel.resume();
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
