import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const sizes = {
    width: 800,
    height: 600
}
const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
const camera =  new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)

camera.position.z = 2

scene.add(camera)
scene.add(mesh)

const controls = new OrbitControls(camera, canvas)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

const tick = () => {

    //Update Camera
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()