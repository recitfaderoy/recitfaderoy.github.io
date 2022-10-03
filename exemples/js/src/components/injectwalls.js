

AFRAME.registerComponent('injectwalls', {
    
    
  schema: {
    model:  {  default: "base" },
    positionclass: {  default: "0 0.01 0" }
    
  }
,
  init() {
    if (this.data.model === "base"){
      var model = "../a-recit-master/arecit/gltfJS/classBase.gltf";
        
    }
    else{
      var model = "#" + this.data.model;
      var door = "../a-recit-master/arecit/gltfJS/door2.gltf";
    }
    
     
     var door = "../a-recit-master/arecit/gltfJS/door2.gltf";
  
    this.el.ensure(".classrooma", "a-gltf-model", {
      "src": model,
      'shadow':{"receive":true},
      "position": this.data.positionclass})
      
      this.el.ensure(".door", "a-gltf-model", {
        "src": door,
        "position": "1.5 0.01 8.2",
        "rotation": "0 90 0"})
        },
  update(oldData) {
    
  },

  tick(time, timeDelta) {
  }
})