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
        object1:{  default: {}},
        object2:{  default: {}},
        object3:{  default: {}},
        object4:{  default: {}},
        good:{  default: {}},
        lockid:{  default: {}}
       },

    init() { 
   
      document.querySelector('a-scene').systems["recitbreackoutgame"].registerAction(this.el);
        ID =""
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
                  
        this.box1=this.el.ensure(".box1", "a-box", {
            
            'id': ID +  "_box1",
            'height':1.2,
            'width': 0.8,
            'depth': 0.8,
            'material':"color: red; transparent:true; opacity:0.0;",
            'position': { x: 0, y: 0.6, z: 0},
            "rotation": { x: 0, y: 0, z: 0 },
            "scale": "1 1 1",
            'class':'raycastable'
          })
          this.box2=this.el.ensure(".box2", "a-box", {
            'id': ID +  "_box2",
            'height':1.2,
            'width': 0.8,
            'depth': 0.8,
            'material':"color: red; transparent:true; opacity:0.0;",
            'position': { x: 0, y: 0.6, z: 1},
            "rotation": { x: 0, y: 0, z: 0 },
            "scale": "1 1 1",
            'class':'raycastable'
          })
          this.box3=this.el.ensure(".box3", "a-box", {
            'id': ID +  "_box3",
            'height':1.2,
            'width': 0.8,
            'depth': 0.8,
            'material':"color: red; transparent:true; opacity:0.0;",
            'position': { x: 0, y: 0.6, z: 2},
            "rotation": { x: 0, y: 0, z: 0 },
            "scale": "1 1 1",
            'class':'raycastable'
          })
          this.box4=this.el.ensure(".box4", "a-box", {
            'id': ID +  "_box4",
            'height':1.2,
            'width': 0.8,
            'depth': 0.8,
            'material':"color: red; transparent:true; opacity:0.0;",
            'position': '0 0.6 3',
            "rotation": { x: 0, y: 0, z: 0 },
            "scale": "1 1 1",
            'class':'raycastable'
          })
          this.objet1 =  this.box1.ensure(".model1", "a-gltf-model", {
            'src': this.data.object1,
            'position': '0 -0.6 0',
            "rotation": { x: 0, y: 0, z: 0 },
            "scale": "0.5 0.5 0.5",
            //'class':'raycastable'
          })
          this.objet2 = this.box2.ensure(".model2", "a-gltf-model", {
        'src': this.data.object2,
        'position': { x: 0, y: -0.6, z: 0},
        "rotation": { x: 0, y: 0, z: 0 },
        "scale": "0.5 0.5 0.5",
       // 'class':'raycastable'
        })
        this.objet3 = this.box3.ensure(".model3", "a-gltf-model", {
        'src': this.data.object3,
        'position': { x: 0, y: -0.6, z: 0},
        "rotation": { x: 0, y: 0, z: 0 },
        "scale": "0.5 0.5 0.5",
        //'class':'raycastable'
        })
        this.objet4 = this.box4.ensure(".model4", "a-gltf-model", {
        'src': this.data.object4,
        'position': { x: 0, y: -0.6, z: 0},
        "rotation": { x: 0, y: 0, z: 0 },
        "scale": "0.5 0.5 0.5",
       // 'class':'raycastable'
        })
  
        },
        update: function () {
          
            this.lock = document.querySelector("#doorwall_5")
            this.lock1 = document.querySelector("#doorwall_5door")

        console.log("updadethislock",this.lock, this.lock1)

            this.box1.addEventListener('click', (evt) => {
            var object = evt.detail.intersection.object;
            console.log("Objet 1 cliqué")
            if (this.data.good === "1"){
            this.box1.setAttribute("material","color: green; transparent:true; opacity:0.4;");
    //        this.lock1.addState("ouvert")
  }
            else {
              this.box1.setAttribute("material","color: red; transparent:true; opacity:0.4;")
           //   this.lock.addState("ferme")
            }
            this.box2.setAttribute("material","color: green; transparent:true; opacity:0.0;")
            this.box3.setAttribute("material","color: green; transparent:true; opacity:0.0;")
            this.box4.setAttribute("material","color: green; transparent:true; opacity:0.0;")
          })

          this.box2.addEventListener('click', (evt) => {
            var object = evt.detail.intersection.object;
            console.log("Objet 2 cliqué")
            this.box1.setAttribute("material","color: green; transparent:true; opacity:0.0;")
            if (this.data.good === "2"){
              this.box2.setAttribute("material","color: green; transparent:true; opacity:0.4;")
           //    this.el.emit("ouvert")
              
              //this.lock.setAttribute('animation-mixer', 'clip:ouvrir;loop:once; clampWhenFinished:true;')
    }
              else {
                this.box2.setAttribute("material","color: red; transparent:true; opacity:0.4;")
              //  this.lock.addState("ferme")
              }
           
            this.box3.setAttribute("material","color: green; transparent:true; opacity:0.0;")
            this.box4.setAttribute("material","color: green; transparent:true; opacity:0.0;")
          })
          this.box3.addEventListener('click', (evt) => {
            var object = evt.detail.intersection.object;
            console.log("Objet cliqué")
            this.box1.setAttribute("material","color: green; transparent:true; opacity:0.0;")
            this.box2.setAttribute("material","color: green; transparent:true; opacity:0.0;")
            if (this.data.good === "3"){
              
              this.box3.setAttribute("material","color: green; transparent:true; opacity:0.4;")
             // this.lock.addState("ouvert")
              //this.lock.setAttribute('animation-mixer', 'clip:  open ;loop:once; clampWhenFinished:true;')
    }
              else {
                this.box3.setAttribute("material","color: red; transparent:true; opacity:0.4;")
                //this.lock.addState("ferme")
              }
            this.box4.setAttribute("material","color: green; transparent:true; opacity:0.0;")
          })
          this.box4.addEventListener('click', (evt) => {
            var object = evt.detail.intersection.object;
            console.log("Objet cliqué")
            this.box1.setAttribute("material","color: green; transparent:true; opacity:0.0;")
            this.box2.setAttribute("material","color: green; transparent:true; opacity:0.0;")
            this.box3.setAttribute("material","color: green; transparent:true; opacity:0.0;")
            if (this.data.good === "4"){
              this.box4.setAttribute("material","color: green; transparent:true; opacity:0.4;")
              //this.lock.addState("ouvert")
              //this.lock.setAttribute('animation-mixer', 'clip:  open ;loop:once; clampWhenFinished:true;')
    }
              else {
                this.box4.setAttribute("material","color: red; transparent:true; opacity:0.4;")
               // this.lock.addState("ferme")
              }
          })

        },
        objetToChoose : function(el,id, position, boxname, objname, src,classo)
            {
            this.EL = el;
            this.ID= id;
            this.position=position;
            this.boxname = boxname;
            this.objname = objname;
            this.src =src;
            this.classo = classo;

            this.box = function()
            { 
                this.EL.ensure("." + this.boxname, "a-box", {
                'id': this.ID +  "_"+ this.boxname,
                'height':1.2,
                'width': 0.8,
                'depth': 0.8,
                'material':"color: red; transparent:true; opacity:0.0;",
                'position': this.position,
                "rotation": { x: 0, y: 0, z: 0 },
                "scale": "1 1 1",
                'class':'raycastable'
              })
              this.box.ensure("." + this.objname, "a-gltf-model", {
                'src': this.src ,
                'position': { x: 0, y: -0.6, z: 0},
                "rotation": { x: 0, y: 0, z: 0 },
                "scale": "0.5 0.5 0.5",
               
                })
            }
        }
    })