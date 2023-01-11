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
        const materials = new Set();
        ell.meshs = new Set();
        ell.Meshs = new Set();
        ell.items =[];
        ell.olditems =[];
        ell.textures =[];
        let data = this.components["manage-gltf-material"].data.mat;
          let newdata=[];
           newdata = data.split("$/$") ; 
           newdatajson = {}
           
        let i = 0 ;
        ell.Meshs = this.object3D.traverse(function(object)
        {
         
          if ( object.material ) 
          {materials.add( object.material );
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
  
  console.log(newdatajson[i].no, newdatajson[i].map, newdatajson[i].color)
          if(newdatajson[i].no === 1)
               {element.material = element.material
               //console.log("newdata",JSON.parse(newdata[i]).color)}
               }
          
          else if(newdatajson[i].color){
                 // element.material = element.material
                  console.log("newdata",JSON.parse(newdata[i]).color)
                  element.material= new THREE.MeshBasicMaterial({color: newdatajson[i].color})
               }
          else if(newdatajson[i].map)
           {
            ell.textures[i] = new THREE.TextureLoader().load(newdatajson[i].map);
           element.material= new THREE.MeshBasicMaterial({map: ell.textures[i]})
               console.log("newdata",newdatajson[i].map)
              }      
               //
                
            i++
            ell.items.push(element.material)})
             console.log(newdatajson.color)
            console.log("items", ell.items,ell.olditems, materials)  
              }   
           
      )   
     }
  });

  