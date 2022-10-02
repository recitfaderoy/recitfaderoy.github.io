/* global AFRAME, THREE */

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
  
AFRAME.registerPrimitive("a-chooseobject", {
    
    defaultComponents: {
      
     // material:{},
      id:{},
      rotation: {},
      position:{},
      scale:{},
      injectchooseobject: {},
    },
    mappings: {
       // id:"injectchooseobject.id",
        object1 :"injectchooseobject.object1",
        object2:"injectchooseobject.object2",
        object3 :"injectchooseobject.object3",
        object4 :"injectchooseobject.object4",
        good :"injectchooseobject.good",
        lockid: "injectchooseobject.lockid",
        
    }
  })

  AFRAME.registerComponent('injectchooseobject', {
    
    
    schema: {
        object1:{  default: ""},
        object2:{  default: ""},
        object3:{  default:""},
        object4:{  default:""},
        good:{  default: ""},
        lockid:{  default: ""}
       },

    init() { 
   
      document.querySelector('a-scene').systems["recitbreackoutgame"].registerAction(this.el);
      document.querySelector('a-scene').systems["recitbreackoutgame"].registerLockid(this.data.lockid);
      this.lock = document.querySelector("#doorwall_5")
      this.lock1 = document.querySelector("#this.data.lockid")
        var ID =""
        if (!this.data.id)
        {
            ID = (Math.floor(Math.random() * 100)).toString()
        }
        else{
            ID = this.data.id
        }
       this.el.setAttribute("class", "breakout_Key_actionner")
        this.el.setAttribute("id","chooseobjet_" + ID)
        this.el.setAttribute("body","type:kinematic; autoshape:false;")
        this.objetToChoose= AFRAME.utils.bind(this.objetToChoose, this);
                  
   
          this.objet1 =  new this.objetToChoose(this.el,ID, { x: 0, y: 0.6, z: 0}, "box1", "objet1",  this.data.object1,"classo",this.data.good)
          this.objet2 = new this.objetToChoose(this.el,ID, { x: 0, y: 0.6, z: 1}, "box2", "objet2",  this.data.object2,"classo",this.data.good)
          this.objet3 = new this.objetToChoose(this.el,ID, { x: 0, y: 0.6, z: 2}, "box3", "objet3",  this.data.object3,"classo",this.data.good)
          this.objet4 = new this.objetToChoose(this.el,ID, { x: 0, y: 0.6, z: 3}, "box4", "objet4",  this.data.object4,"classo",this.data.good)
     //     this.objet5 = new this.objetToChoose(this.el,ID, { x: 0, y: 0.6, z: 4}, "box5", "objet5",  this.data.object4,"classo", this.data.good)
  
        },
        update: function () {
          
           



        },
  objetToChoose : function(el,id, position, boxname, objname, src, classo, good)
            {
            this.EL = el;
            this.EL.ID= id;
            this.EL.position=position;
            this.EL.boxname = boxname;
            this.EL.objname = objname;
            this.EL.src =src;
            this.EL.classo = classo;
            this.EL.type = "box"
            this.EL.goood = good

            var box =  this.EL.ensure("." + this.EL.boxname, "a-box", {
                'id': this.EL.ID +  "_"+ this.EL.boxname,
                'height':1.2,
                'width': 0.8,
                'depth': 0.8,
                'material':"color: red; transparent:true; opacity:0.0;",
                'position': this.EL.position,
                "rotation": { x: 0, y: 0, z: 0 },
                "scale": "1 1 1",
                'class':'raycastable'
              })
              this.EL.model = box.ensure("." + this.EL.objname, "a-gltf-model", {
                'src': this.EL.src ,
                'position': { x: 0, y: -0.6, z: 0},
                "rotation": { x: 0, y: 0, z: 0 },
                "scale": "0.5 0.5 0.5",
               "raycaster-target":""
               
                })
                box.addEventListener('click', (evt) => {
                           var ee = []
                           ee = this.EL.children
                          var object = evt.detail.intersection.object;
                    Array.prototype.forEach.call(ee, (element, index) => {
                          if (element === box){
                            if (this.EL.goood == index)
                            {
                                element.setAttribute("material","color: green; transparent:true; opacity:0.4;")
                              // this.lock.addState("ouvert")
                              //this.lock.setAttribute('animation-mixer', 'clip:  open ;loop:once; clampWhenFinished:true;')
                              }
                             else {
                                element.setAttribute("material","color: red; transparent:true; opacity:0.4;")
                              }
                          }
                          else {
                                element.setAttribute("material","color: red; transparent:true; opacity:0.0;")
                                            }
                })
              })
                box.addEventListener('raycaster-intersected', (evt) => {
                  var ee = []
                  ee = this.EL.children
                 var object = evt.detail.intersection.object;
           Array.prototype.forEach.call(ee, (element, index) => {
                 if (element === box){
                   if (this.EL.goood == index)
                   {
                       element.setAttribute("material","color: green; transparent:true; opacity:0.4;")
                     // this.lock.addState("ouvert")
                     //this.lock.setAttribute('animation-mixer', 'clip:  open ;loop:once; clampWhenFinished:true;')
                     }
                    else {
                       element.setAttribute("material","color: red; transparent:true; opacity:0.4;")
                     }
                 }
                 else {
                       element.setAttribute("material","color: red; transparent:true; opacity:0.0;")
                                   }
       })
        })
        
    
  }
})