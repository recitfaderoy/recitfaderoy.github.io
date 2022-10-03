/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-pipette", {

  defaultComponents: {
    injectpipette: {},
    position:{},
        rotation :{},
        scale:{}
  },
  mappings: {
        name: 'injectpipette.name',
       pipettecolor: "injectpipette.pipettecolor"
        
  }
})