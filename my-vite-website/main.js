/**
 * @auhtor Davit Najaryan
 * @date January 16, 2024
 */

import * as THREE from "three"
import "./style.css"
import gsap from "gsap"
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
  roughness: 0.5

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
renderer.setPixelRatio(2) //Increases the pixels to make shape smoother
renderer.render(scene, camera)

/**
 * Controls for the sphere
 * @param camera
 * @param canvas
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true //add some damping
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

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

//mouse colour animation
let mouseDown = false
let colour = [];
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false)) //turn it to false when we let go of the mouse

window.addEventListener("mousemove", (e) => {
  if(mouseDown == true) {
    colour = [
      //get a value between 0 and 255 for rgb
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.height)*255),
      150
    ]
    //update the colour of the material
    let newColour = new THREE.Color(`rgb(${colour.join(",")})`)
    new THREE.Color(`rgb(0, 100, 150)`)
    gsap.to(mesh.material.color, {r: newColour.r, g: newColour.g, b: newColour.b})
  }


})


//timeline
const tl = gsap.timeline({defaults: {duration: 0.9}}) 
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x: 1, y:1}) //animate something from one poisiton to another
tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity: 0}, {opacity: 1})
