/* global AFRAME, THREE */

  
  AFRAME.registerPrimitive("a-recitfloor", {
    
    defaultComponents: {
      
      material:{},
      rotation: {},
      position:{},
      scale:{},
      injectrecitfloor: {},
      
      
    },
    mappings: {
      
        coord :"injectrecitfloor.coord",
    }
  })
  AFRAME.registerComponent('injectrecitfloor', {
    
    
    schema: {coord:{  default: {},
    parse: function (str) {
      return JSON.parse(str);
    }}
             
    
            
        }       ,
    init() { 
        
        const  floor = new THREE.Group();       
        const coord =this.data.coord ;
       
        const plafond = new THREE.Shape();
        plafond.moveTo(-0.02, -0.02);
        
        var extrudeSettings = {
                steps: 12,
                depth: 0.2,
                bevelEnabled: false
            };
                      
            for (var j=0; j < coord.length; j++) {
              //console.log("aplafond coord =  (" + coord[j].x + " , " + coord[j].y)
             /* if (j !== 0){if(coord[j].x > coord[(j - 1)].x) {coord[j].x = (coord[j].x) + 0.2}
                else{ {coord[j].x = (coord[j].x) - 0.2}}
              if(coord[j].y > coord[(j - 1)].y) {coord[j].y = (coord[j].y) - 0.2}
                else{ {coord[j].y = (coord[j].y) + 0.2}}*/
               plafond.lineTo(coord[j].x, coord[j].y  );
            }
            //  }
              console.log(coord)
              plafond.autoClose = true;
               //le.log("plafond = " + plafond)  
               var extrudeSettings = {
                steps: 1,
                depth: 0.002,
                bevelEnabled: false
            };
            const material = new THREE.MeshBasicMaterial( { color: new THREE.Color(1.000, 0.766, 0.336), transparent: true, blending: THREE.AdditiveBlending 
            } );
            const material2 = new THREE.MeshBasicMaterial( {color: new THREE.Color(1.000, 0.766, 0.336),
            roughness: 0.3,
            metalness: 1} );
            const floorgeo = new THREE.ExtrudeGeometry( plafond, extrudeSettings)
            floorgeo.computeVertexNormals ()
            floorgeo.normalizeNormals () 

        const mesh =new THREE.Mesh( floorgeo ,   this.el.components.material.material);
                    mesh.rotation.x = THREE.Math.degToRad(( -90))
                    mesh.rotation.z = THREE.Math.degToRad(( -90))
                    floor.add( mesh );
                    this.el.setObject3D('group',mesh)
                    this.el.setAttribute("floor","")
                    //this.el.setAttribute("start","")
                    this.el.setAttribute("shape","box")
                          this.el.setAttribute("body", "type", "static")
                          this.el.setAttribute("body", "restitution", "0")
        }, 
  })