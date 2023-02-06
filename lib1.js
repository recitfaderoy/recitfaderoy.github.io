Element.prototype.ensure = function (selector, name = selector, attrs = {}, innerHTML = "") {
    let _childEl, attr, val
    _childEl = this.querySelector(selector)
    if (!_childEl) {
      _childEl = document.createElement(name)
      this.appendChild(_childEl)
      for (attr in attrs) {
        val = attrs[attr]
        _childEl.setAttribute(attr, val)
      }
      _childEl.innerHTML = innerHTML
    }
    return _childEl
  }



  AFRAME.registerComponent('manage-gltf-material', {
    
    schema:
    { mat:{type: 'string'
  }
  },
      // materi als:    {type: "Array",default:"side:double; shader: standard; src:./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_basecolor.jpg;height:450; repeat: 9 3; ambientOcclusionMap:./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_ambientOcclusion.jpg; ambientOcclusionTextureRepeat:9 3;normalMap:./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_normal.jpg; normalTextureRepeat: 9 3; displacementMap:./assets/Sci-Fi_Wall_014_SD/Sci-Fi_Wall_014_height.png; displacementBias:0.0190; displacementScale:0.21;displacementTextureRepeat:9 3; roughness: 0.4; metalness: 0.4"}
   // },
    
  
    init: function()
    {
      console.log("manage-gltf-material is on")
     
      this.el.addEventListener('model-loaded', function(event){
        const ell=this
      
        ell.meshs = new Set();
        ell.Meshs = new Set();
        ell.items =[];
        ell.olditems =[];
        ell.texturesmap =[];
        ell.texturesnormalMap =[];
        ell.texturesaoMap =[];
        
        let data = this.components["manage-gltf-material"].data.mat;
          let newdata=[];
           newdata = data.split("$/$") ; 
           newdatajson = {}
              
        let i = 0 ;
        ell.Meshs = this.object3D.traverse(function(object)
        {
         
          if ( object.material ) 
          console.log("EEEEEEEEEEEE   ",ell.sceneEl.systems)
          {ell.sceneEl.systems.escaperoom.materialSet.add(object.material)
            //el.systems.escaperoom.materialSet.add( object.material );
            if (object.isMesh) 
              {ell.meshs.add( object )}
          }
        })
        ell.meshs.forEach((element) => {
          newdatajson[i] = JSON.parse(newdata[i])
        //  console.log(newdata[i] === "{1}", newdata[i].includes("map"))
          //console.log(newdatajson[i])
          //console.log(element.material)
          ell.olditems.push(element.material);
  
  console.log(newdatajson[i].no, newdatajson[i].mapuri, newdatajson[i].color, newdatajson[i].normalMapuri,)
          if(newdatajson[i].no === 1)
               {element.material = element.material
               //console.log("newdata",JSON.parse(newdata[i]).color)}
               }
               else if(newdatajson[i].value){
                // element.material = element.material
                 console.log("newdata",JSON.parse(newdata[i]).color)
                 element.material= new THREE.MeshBasicMaterial({value: newdatajson[i].value})
              }
          else if(newdatajson[i].color){
                 // element.material = element.material
                  console.log("newdata",JSON.parse(newdata[i]).color)
                  element.material= new THREE.MeshBasicMaterial({color: newdatajson[i].color})
               }
          else if(newdatajson[i].mapuri)
           {console.log("wwwww",this.sceneEl.systems.escaperoom.materialSet)
            element.material= new THREE.MeshBasicMaterial({value: this.sceneEl.systems.escaperoom.materialSet[i]})
           }
           /*ell.texturesmap[i] = new THREE.TextureLoader().load(newdatajson[i].mapuri);
           element.material= new THREE.MeshBasicMaterial({map: ell.texturesmap[i]})
               console.log("newdata",newdatajson[i].normalMapuri)}
          else if(newdatajson[i].normalMapuri)
           {
            ell.texturesnormalMap[i] = new THREE.TextureLoader().load(newdatajson[i].normalMapuri);
           element.material= new THREE.MeshBasicMaterial({normalMap: ell.texturesnormalMap[i]})
              // console.log("newdata",newdatajson.normalMapuri[i])
              }   
              else if(newdatajson[i].aoMapuri)
           {
            ell.texturesaoMap[i] = new THREE.TextureLoader().load(newdatajson[i].aoMapuri);
           element.material= new THREE.MeshBasicMaterial({map: ell.texturesaoMap[i]})
          // element.material= new THREE.MeshBasicMaterial({map: ell.texturesaoMap[i]})
        //   element.material= new THREE.MeshBasicMaterial({map: ell.texturesaoMap[i]})
               console.log("newdata",newdatajson[i].aoMapuri)
              }    */     
               //
                
            i++
            ell.items.push(element.material)})
            const er = new Promise((resolve) => {
              setTimeout( function() {
                resolve(this.AFRAME.scenes[0].systems.material.materials["4fd4b5b9-d331-445e-a049-cf37cca9598f"]/*.sceneEl.sceneEl.systems.material.materials["0e8b3142-53a0-4d98-a026-e4cae984a426"]*/)  // Tout s'est bien passé !
              }, 250)}    )
             console.log("!!!!!",er)
     //       console.log("items", ell.items,ell.olditems,this.sceneEl.systems.material.materials["4416489c-28b1-439e-bcf2-e03c4f23d505"]/*.AFRAME.scenes.systems.material*/)  
              

            } )
              
      //console.log("this= ",this.el.sceneEl.systems)
      //console.log("XXXXXXXXXXXXXXEEEEEEEEfffEEEE   ",this.AFRAME.scenes.systems.material)
     
     }
     
  });

  