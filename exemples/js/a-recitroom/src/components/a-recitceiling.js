/* global AFRAME, THREE */

  
  AFRAME.registerPrimitive("a-recitceiling", {
    
    defaultComponents: {
      
      
      rotation: {},
      position:{},
      scale:{},
      injectrecitceiling: {},
      
      
    },
    mappings: {
      
        coord :"injectrecitceiling.coord",
    }
  })
  AFRAME.registerComponent('injectrecitceiling', {
    
    
    schema: {coord:{  default: {},
    parse: function (str) {
      return JSON.parse(str);
    }}
             
    
            
        }       ,
    init() { 
        
        const  ceiling = new THREE.Group();       
        const coord =this.data.coord ;
       
        const plafond = new THREE.Shape();
        plafond.moveTo(0, 0);
        
        var extrudeSettings = {
                steps: 1,
                depth: 0.2,
                bevelEnabled: false
            };
                      
            for (var j=0; j < coord.length; j++) {
             // console.log("aplafond coord =  (" + coord[j].x + " , " + coord[j].y)
               plafond.lineTo(coord[j].x, coord[j].y );
               
              }
              plafond.autoClose = true;
           //    console.log("plafond = " + plafond)  
               var extrudeSettings = {
                steps: 1,
                depth: 0.0008,
                bevelEnabled: false
            };
            var diffuseColor = new THREE.Color( "#f0f5f5" )
              var metalness = 0.56
              var roughness = 0.1
              var bumpScale = 1
            const material = new THREE.MeshStandardMaterial( {
                color: diffuseColor,
                metalness: metalness,
                roughness: roughness
              } );

        const mesh =new THREE.Mesh( new THREE.ExtrudeGeometry( plafond, extrudeSettings ), material);
                    mesh.rotation.x = THREE.Math.degToRad(( -90))
                    mesh.rotation.z = THREE.Math.degToRad(( -90))
                    mesh.position.set(0, 5.9, 0)
                    ceiling.add( mesh );
                    this.el.setObject3D('group',mesh)
          
        }, 
  })