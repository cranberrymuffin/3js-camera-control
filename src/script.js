import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

function generateRandomPointInSphere(radius) {
    // Generate random values for phi and theta
    const phi = Math.random() * 2 * Math.PI;
    const theta = Math.acos(2 * Math.random() - 1);
  
    // Generate a random radius value within the sphere
    const r = Math.cbrt(Math.random()) * radius; 
  
    // Convert spherical coordinates to Cartesian coordinates
    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(theta);
  
    return [x, y, z ];
}

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera =  new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
//uncomment to see globe movement
// camera.translateZ(10)
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
const radius = 5

for(let i = 0; i < count; i+=3) {
    const point = generateRandomPointInSphere(radius)
    positions[i] = point[0]
    positions[i+1] = point[1]
    positions[i+2] = point[2]    
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/snowflake.jpg')

const particlesMaterial = new THREE.PointsMaterial({size: 0.1, sizeAttenuation: true, map: particleTexture})
const particles = new THREE.Points(particlesGeometry, particlesMaterial)

scene.add(camera)
scene.add(particles)

//Render must be called
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// Render update
// * * *  makes motion happen
const animateFrame = () => {
    particles.rotateX(-0.01)
    renderer.render(scene, camera)
    window.requestAnimationFrame(animateFrame)
}

animateFrame()