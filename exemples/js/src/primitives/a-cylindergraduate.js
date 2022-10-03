/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-cylindergraduate", {

  defaultComponents: {
    injectcylindergraduate: {},
    position:{},
        rotation :{},
        scale:{}
  },
  mappings: {
        name: 'injectcylindergraduate.name' ,
        solute: 'injectcylindergraduate.solute' ,
        volume: 'injectcylindergraduate.volume' ,
        percent: 'injectcylindergraduate.percent' ,
        opacity: 'injectcylindergraduate.opacity',
        colorliq: 'injectcylindergraduate.colorliq',
        
  }
})