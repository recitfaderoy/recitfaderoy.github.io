/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-testtube", {

  defaultComponents: {
    injecttesttube: {},
    position:{},
        rotation :{},
        scale:{}
  },
  mappings: {
        name: 'injecttesttube.name' ,
        solute: 'injecttesttube.solute' ,
        volume: 'injecttesttube.volume' ,
        percent: 'injecttesttube.percent' ,
        opacity: 'injecttesttube.opacity',
        colorliq: 'injecttesttube.colorliq',
        
  }
})