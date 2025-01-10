import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', ()  => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
const camera =  new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)

camera.position.z = 2

scene.add(camera)
scene.add(mesh)

const controls = new OrbitControls(camera, canvas)

//Render must be called
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// Render update
// * * *  makes motion happen
const animateFrame = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(animateFrame)
}

animateFrame()