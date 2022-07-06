/* global AFRAME, THREE */


AFRAME.registerPrimitive("a-fluorescent", {
  
  defaultComponents: {
    geometry: {
      primitive: "cylinder", radius: 0.05, height: 1
    },
    material: {
       color: "white", roughness: 0, metalness: 0.5, opacity: 0.7, shader: "standard", emissive: "white", emissiveIntensity: 45,  ambientOcclusionMapIntensity :1
      },
    
    rotation: {},
    position:{},
    scale:{},
    injectfluo: {},
    
    
  },
  mappings: {
    
    intensity: "injectfluo.intensity",
           
  }
})




  
  
  
  


  