/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-erlenmeyer", {

  defaultComponents: {
    injecterlenmeyer: {},
    position:{},
        rotation :{},
        scale:{}
  },
  mappings: {
        name: 'injecterlenmeyer.name' ,
        solute: 'injecterlenmeyer.solute' ,
        volume: 'injecterlenmeyer.volume' ,
        percent: 'injecterlenmeyer.percent' ,
        opacity: 'injecterlenmeyer.opacity',
        colorliq: 'injecterlenmeyer.colorliq',
        
  }
})