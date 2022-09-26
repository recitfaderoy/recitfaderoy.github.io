AFRAME.registerSystem('recitbreackoutgame', {

  schema: {
  
  },
  init: function() {
    console.log(this.el)
      var gltf = Array.prototype.slice.call(this.el.querySelectorAll('a-gltf-model'));
      this.actionner = [];
      this.lock = [];
      gltf.forEach(function (element,index) {this.el.systems["recitbreackoutgame"].registerLock(element);})
      
   
      console.log("Syseme informations",gltf, this.entities, this.actionner, this.lock  )
     setTimeout(() => {
      this.box0 = this.actionner[0].childNodes[0]
      this.box1 = this.actionner[0].childNodes[1]
      this.box2 = this.actionner[0].childNodes[2]
      this.box3 = this.actionner[0].childNodes[3]
      this.lock0= this.lock[0]
      this.lock1= this.lock[1]
      this.lock2= this.lock[2]
      console.log(this.actionner[0].attributes.good.nodeValue)
      this.box0.addEventListener('click', (evt) => {
              var object = evt.detail.intersection.object;
              console.log("Objet 1 cliqué")
              if (this.actionner[0].attributes.good === 'good="1"'){
                this.lock0.removeState("ferme")
              this.lock0.removeState("fermer")
              this.lock0.addState("ouvrir")
              this.lock1.removeState("fermer")
              this.lock1.addState("ouvrir")}
              else {
                          this.lock0.addState("fermer")
                          this.lock0.removeState("ouvert")
                          this.lock0.removeState("ouvrir")
              }
            })
            this.box1.addEventListener('click', (evt) => {
              var object = evt.detail.intersection.object;
              console.log("Objet 1 cliqué")
              if (this.actionner[0].attributes.good.nodeValue === "2"){
              this.lock0.removeState("ferme")
              this.lock0.removeState("fermer")
              this.lock0.addState("ouvrir")}
              else {
                          this.lock0.addState("fermer")
                          this.lock0.removeState("ouvert")
                          this.lock0.removeState("ouvrir")
              }
            })
            this.box2.addEventListener('click', (evt) => {
              var object = evt.detail.intersection.object;    
              console.log("Objet 1 cliqué")
              if (this.actionner[0].attributes.good === 'good="3"'){
                this.lock0.removeState("ferme")
              this.lock0.removeState("fermer")
              this.lock0.addState("ouvrir")}
              else {
                          this.lock0.addState("fermer")
                          this.lock0.removeState("ouvert")
                          this.lock0.removeState("ouvrir")
              }
            })
            this.box3.addEventListener('click', (evt) => {
              var object = evt.detail.intersection.object;
              console.log("Objet 1 cliqué")
              if (this.actionner[0].attributes.good === 'good="4"'){
                this.lock0.removeState("ferme")
              this.lock0.removeState("fermer")
              this.lock0.addState("ouvrir")}
              else {
                          this.lock0.addState("fermer")
                          this.lock0.removeState("ouvert")
                          this.lock0.removeState("ouvrir")
              }
            })
      console.log("actionner",this.box0,this.box1,this.box2,this.box3,this.lock0.states)
    },10000)
  },
  
  registerLock: function (el) {
      this.lock.push(el);
  },
  registerAction: function (el) {
      this.actionner.push(el);
  },
  
          update: function () {
            setTimeout(() => {
               //console.log("actionner",this.lock0.states)    
           
            },500)},
  tick: function(time, delta) {
  
  }
  })
  // ... 
  ;