/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-beaker", {

  defaultComponents: {
    injectbeaker: {},
    position:{},
        rotation :{},
        scale:{}
  },
  mappings: {
        name: 'injectbeaker.name' ,
        solute: 'injectbeaker.solute' ,
        volume: 'injectbeaker.volume' ,
        percent: 'injectbeaker.percent' ,
        opacity: 'injectbeaker.opacity',
        colorliq: 'injectbeaker.colorliq',
        
  }
})