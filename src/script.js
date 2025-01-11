import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera =  new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)

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
const particlesGeometry = new THREE.BufferGeometry()

const count = 5000
const positions = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/snowflake.jpg')

const particlesMaterial = new THREE.PointsMaterial({size: 0.1, sizeAttenuation: true, map: particleTexture})
const particles = new THREE.Points(particlesGeometry, particlesMaterial)


camera.position.z = 2

scene.add(camera)
scene.add(particles)

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