/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-glasses", {

  defaultComponents: {
    injectglasses: {},
    position:{},
        rotation :{},
        scale:{}
  },
  
  mappings: {
    volume: 'injectglasses.volume' ,
        waterlevel: 'injectglasses.waterleve' ,
        opacity: 'injectglasses.opacity',
        colorliq: 'injectglasses.colorliq',
        
  }

})