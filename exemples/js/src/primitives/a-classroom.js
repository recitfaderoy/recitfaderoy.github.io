/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-classroom", {

  defaultComponents: {
    classeroomdeskchair: {},
    injectwalls:{},
    position:{},
        rotation :{},
        scale:{}
  },
  mappings: {
    row: 'classeroomdeskchair.row' ,
    column: 'classeroomdeskchair.column' ,
    widthc: 'classeroomdeskchair.widthc' ,
    depthc: 'classeroomdeskchair.depthc' ,
    scrid: 'classeroomdeskchair.scrid',
    model: "injectwalls.model"
        
        
  }
})