//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;

let controls;

let objToRender = 'lambo';

const loader = new GLTFLoader();

loader.load(
    `models/${objToRender}/scene.gltf`,
    function (gltf) {
        object = gltf.scene;
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log(error);
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById('container3D').appendChild(renderer.domElement);

camera.position.z = 100;

// controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === 'mini_macbook_pro' ? 1 : 1);
scene.add(ambientLight);

let mauszeiger = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', function (event) {
    mauszeiger.x = event.clientX;
    mauszeiger.y = event.clientY;
});

let scroll = 0;

window.addEventListener('scroll', function () {
    scroll = window.scrollY;
} );

let stdGroesse = 30;

function animate() {
    requestAnimationFrame(animate);

    if (object && scroll < 200) {
        object.rotation.x = mauszeiger.y * 0.001;
    }
    object.position.y = 1 + scroll / 15;
        object.rotation.y = mauszeiger.x * 0.001 + 155;

    if (object) {
        // object.scale.set(scroll / 10 + stdGroesse, scroll / 10 + stdGroesse, scroll / 10 + stdGroesse);
        object.scale.set(stdGroesse, stdGroesse, stdGroesse);
        document.getElementById('container3D').style.opacity = 1 - scroll / 1000;
    }

    renderer.render(scene, camera);
}



window.addEventListener('resize', function () { 
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();


