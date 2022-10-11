AFRAME.registerPrimitive("a-hiddenunder", {
    
    defaultComponents: {
      
     // material:{},
      id:{},
      rotation: {},
      position:{},
      scale:{},
      injecthiddenunder: {},
    },
    mappings: {
       // id:"injectchooseobject.id",
        src :"injecthiddenunder.src"
        
    }
  })
  
  AFRAME.registerComponent("injecthiddenunder", {
    schema: {
    src: {}
    },
    init() {
        this.getDimensions= AFRAME.utils.bind(this.getDimensions, this);
    /*    this.el.model = this.el.ensure(".gltf ","a-gltf-model", {
            'src': this.data.src ,
            'position': { x: 0, y: 0.6, z: 0},
            "rotation": { x: 0, y: 0, z: 0 }
          
        })*/
     // this.dimension =  new this.getDimensions(this.el.model.object3D)

      //  console.log(this.dimension)
       //     console.log(this.el.querySelector("a-gltf-model").object3D)
      //  this.model= 
        this.box =  this.el.ensure(".box12", "a-box", {
                        'height':1.2,
                        'width': 0.8,
                       'depth': 0.8,
                       'material':"color: red; transparent:true; opacity:0.0;",
                       'class':'raycastable',
                       "label-anchor":"offsetVector: 0.2 0.2 0;",
                      //"visible":false
          }/*,' <a-text material="color:white" value="DISTANCED LABEL" anchor="left" align="left"  width=2  label="overwrite:true"></a-text>'*/)
          this.box.model = this.box.ensure(".name", "a-gltf-model", {
            'src': this.data.src ,
            'position': { x: 0, y: 0.6, z: 0},
            "rotation": { x: 0, y: 0, z: 0 },
          
          
            }) 
            this.box.addEventListener("mouseenter",function (evt ){
                console.log(evt.detail)
                console.log(this)
              this.setAttribute("anination_1", "property: material; color: red; transparent:true; opacity:0.4;");
             //   this.model.setAttribute("anination", "property: rotation;  to: 180 90 0;  dur: 500;");
               
              this.innerHTML =' <a-text material="color:white" value="DISTANCED LABEL" anchor="left" align="left"  width=1  label="overwrite:true"></a-text>'
                
            })
            this.box.addEventListener("mouseleave",function (evt) {
                console.log(evt.detail)
                this.setAttribute("anination_1", "property: visible;  to:false; dur: 500;");
                this.model.setAttribute("anination", "property: rotation;  to: 0 90 0;  dur: 500;");
                
            })
        },

   /* events: {
        'mouseenter': function (evt) {
            console.log(evt.detail)
            console.log( this.el)
            console.log( this.el.model)
            console.log(  this.box)
            this.el.setAttribute("anination", "property: rotation;  to: 180 90 0;  dur: 500;");
            this.box.setAttribute("anination_1", "property: visible;  to:true; dur: 500;");
    //        this.el.model.innerHTML =' <a-text material="color:white" value="DISTANCED LABEL" anchor="left" align="left"  width=2  label="overwrite:true"></a-text>';
            
        },
        'mouseleave': function (evt) {
            console.log(evt.detail)
            this.box.setAttribute("anination_1", "property: visible;  to:false; dur: 500;");
            this.el.setAttribute("anination", "property: rotation;  to: 0 90 0;  dur: 500;");
            
        }
    },*/
getDimensions: function (object3d) {
            
   
        // e.g., object3d = document.querySelector('#goban').object3D
        var box = new THREE.Box3().setFromObject( object3d );
        var x = box.max.x - box.min.x 
        var y = box.max.y - box.min.y 
        var z = box.max.z - box.min.z 

        return {x,y,z}
    }
})