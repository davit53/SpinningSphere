/**
 * @auhtor Davit Najaryan
 * @date January 16, 2024
 */

import * as THREE from "three"
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

//Scene
const scene = new THREE.Scene()

/**
 * Create sphere (using js geometries)
 * @param radius
 * @param widthSegments
 * @param heightSegments
 */
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({

  color: "#287AB8",


})

/**
 * Combine the geometrical shape and material to get final mesh
 * @param geometry
 * @param material
 */
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

/**Add light
 * @param colour
 * @param lightIntensity
 */
const light = new THREE.PointLight(0xffffff, 200, 100)
light.position.set(0,10,10)
scene.add(light)


/**
 * Add a camera (how the user views the webiste)
 * @param fov
 * @param aspectRatioX
 * @param aspectRatioY
 * @param nearClipingPoint
 * @param farClipingPoint
 */
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)

//Render 
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas})
//Define how big the canvas is
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene, camera)

/**
 * Controls for the sphere
 * @param camera
 * @param canvas
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true //add some damping
controls.enablePan = false

/**
 * Rezising
 */
window.addEventListener("resize", () => {
  //update sizes (everytime we resize the window, store the height and width numbers so we can update camera)
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camera

  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
})

//loop that renders the 3D scene and requests the next frame
const loop = () =>{
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()