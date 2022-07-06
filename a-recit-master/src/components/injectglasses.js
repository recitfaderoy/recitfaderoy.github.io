/* global AFRAME, THREE */

AFRAME.registerComponent("injectglasses", {

     
    
      schema: {
        volume:  { default: '500ml' },
        waterlevel: { default: '0.2' },
        opacity: { default:' 0.2' },
        colorliq: { default:'#eef' },
        position:{ default:'0 0 0' },
        rotation :{ default:'0 0 0'},
        scale:{ default:'1 1 1'}
      }
      ,

    init() { 
      
      var etie = this.el
    console.log("lesd données"+this.data.colorliq)
   this.el.setAttribute("class","science")  
   this.el.setAttribute("shape","cylinder")
   this.el.setAttribute("body", "type", "kinematic")
   this.el.setAttribute("body", "restitution", "0")
    
    
      this.el.innerHTML = `<a-entity id="matlabo7" gltf-model="#lunettes" ><a-box id="sete" visible="true"  material="color:blue; transparent:true; opacity:0.3:" position="0 0 0" width="0.2" height="0.1"  depth="0.05" event-set__hoveron="_event: hover-start;  material.opacity: 0.7; transparent: true;" ></a-box> </a-entity>`
          
        
    },
    update(oldData) {
      
    },

    tick() {
    }
    
})

