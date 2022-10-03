/* global AFRAME, THREE */

AFRAME.registerComponent("injectplayer", {

  init() {
   this.el.addState("noinput")
    this.el.ensure("a-camera ", "a-camera", {
      "look-controls": { pointerLockEnabled: false, touchEnabled: false },
      "wasd-controls": { enabled: false }
    })
    this.el.ensure("a-hand[side=\"left\"]", "a-hand", { side: "left" })
    this.el.ensure("a-hand[side=\"right\"]", "a-hand", { side: "right" })
    this.el.cam = this.el.querySelector("a-camera")
    console.log(this.el.cam)
    this.el.cam.ensure("a-flashlight ", "a-flashlight", {
      "intensity": 40,
      "id": "camflash",
      "color": "blue" ,
      "visible": false,
      "position": "0.5 -0.2 -0.5 ",
      "rotation" :"0 90 0"
    })
    
    
    


  
},


});

 


  
