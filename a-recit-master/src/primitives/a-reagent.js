/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-reagent", {

  defaultComponents: {
    injectreagent: {},
    position:{},
        rotation :{},
        scale:{}
  },
  mappings: {
        name: 'injectreagent.name' ,
        info :'injectreagent.info' ,
        colorrea: 'injectreagent.colorliq',
        
  }
})