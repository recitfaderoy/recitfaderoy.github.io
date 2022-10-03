/* global AFRAME, THREE */

  
  AFRAME.registerPrimitive("a-recitroom", {
    
    defaultComponents: {
      rotation: {},
      position:{},
      scale:{},
      injectrecitroom: {},
    },
    mappings: {
              para: "injectrecitroom.para",
    }
  })
  AFRAME.registerComponent('injectrecitroom', {
    schema: {
        para:  {  default: {},
        parse: function (str) {
          return JSON.parse(str);
        }},
    } ,
    init() { 
      
        const coord= new Object()
        const plaf =[]
        const data =this.data.para ;
        const pos = [];
        const plafond = new THREE.Shape();
        //const  mat1 = "shader: flat; src: mat1
        plafond.moveTo(0, 0);
       // console.log(Object.keys.length)
        /* *****Ajout des murs à a primitive***** */
          for (var i=0; i < Object.keys(data).length; i++) {
        /* *****Calculs de l'origine des murs ***** */
                      pos[i] = new THREE.Vector3()
                      if (i === 0) { 
                        pos[0].x = 0;
                        pos[0].y = 0;
                        coord[0] =new THREE.Vector3(0, 0, 0);
                      plaf[0]=new THREE.Vector2(0, 0);}
                      else{
                        pos[i].y = ((Math.cos(THREE.Math.degToRad((data[i-1].angle))) * data[i-1].longueur))
                        pos[i].x = ((Math.sin(THREE.Math.degToRad((data[i-1].angle))) * data[i-1].longueur ))
                        coord[i] =new THREE.Vector3(pos[i].x + coord[i - 1].x, 0, pos[i].y + coord[i - 1].z)
       /* *****Coordonnées 2D du plancher ou plafond***** */
                        plaf[i] = new THREE.Vector2(coord[i].x, coord[i].z);
                      }
                    
      /* *****Ajout d'une primitive a-door ***** */

                                this.el.ensure(".recitwall"+ i, "a-recitwall", {
                                  "material":data[i].material,
                                  "longueur": data[i].longueur,
                                  "door": JSON.stringify(data[i].door),
                                  "window": data[i].window,
                                  'position':coord[i],
                                  "id": "wall_" +i,
                                  "rotation" : {x:0, y: data[i].angle, z:0} }  )                   
                        
                          
                          this.el.setAttribute("shape","cylinder")
                          this.el.setAttribute("body", "type", "static")
                          this.el.setAttribute("body", "restitution", "0")
                          }
                          //console.log(data[i].door)
      /* *****Ajout d'une primitive plancher ***** */

                          //console.log("coord" + coord[0].x)
                      this.el.ensure(".recitfloor"+ i, "a-recitfloor", {
                        "coord":JSON.stringify(plaf),
                        "rotation" : {x:0, y: 90 - data[1].angle, z:0},
                        "scale" :   {x:1.05, y:0, z:1.05},
                        "position" :   {x:-0.2, y:0.01, z:-0.2},
                        "material"  :"side:double; shader: standard; src:./assets/Metal_ArtDeco_Tiles_001_SD/Metal_ArtDeco_Tiles_001_basecolor.jpg;height:450; repeat: 9 9; ambientOcclusionMap:./assets/Metal_ArtDeco_Tiles_001_SD/Metal_ArtDeco_Tiles_001_ambientOcclusion.jpg; ambientOcclusionTextureRepeat:9 9;normalMap:./assets/Metal_ArtDeco_Tiles_001_SD/Metal_ArtDeco_Tiles_001_normal.jpg; normalTextureRepeat: 9 9; displacementMap:./assets/Metal_ArtDeco_Tiles_001_SD/Metal_ArtDeco_Tiles_001_height.png; displacementBias:0.0; displacementScale:0.1;displacementTextureRepeat:9 9; roughness: 0.3; metalness: 0.9"
                      })
       /* *****Ajout d'une primitive plafond ***** */
                      this.el.ensure(".recitceiling"+ i, "a-recitceiling", {
                        "coord":JSON.stringify(plaf),
                        "rotation" : {x:0, y: 90 - data[1].angle, z:0}   
                      })
                         return coord  //if(i < Object.keys(data).length)  
                          }
                         
                          
                     

                    
                    

        
          
  
  })
