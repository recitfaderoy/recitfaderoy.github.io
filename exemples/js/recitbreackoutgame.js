

AFRAME.registerSystem('recitbreackoutgame', {

schema: {

},
init: function() {
    //setTimeout(() => 
      
 console.log(this )
    this.actionner = [];
    this.lock = [];
    this.lockid=""
   /* document.addEventListener('DOMContentLoaded', () => {
      document.querySelector('a-scene').addEventListener('loaded', () => {
       */
 /*   var otherlock = document.querySelectorAll("[injectregisterLock]")
    console.log(otherlock)
    Array.prototype.forEach.call(otherlock, (element, index) => {
      this.lock.push(element);
    })*/
    //document.querySelector('.preloader').setAttribute('hidden', true)
  /*})
})*/


   
   setTimeout(() => { console.log("Syseme informations", this.actionner, this.lock  )
    //this.lockid =this.actionner[0].attributes[7].id
    this.box0 = this.actionner[0].childNodes[0]
    this.box1 = this.actionner[0].childNodes[1]
    this.box2 = this.actionner[0].childNodes[2]
    this.box3 = this.actionner[0].childNodes[3]
    Array.prototype.forEach.call(this.lock,((element, index) => {
      if(  element.id ===  this.lockid){
        console.log("index", index)
         this.lock0 = this.lock[index - 1]
      }
   })
   )
         
    console.log("lok0",this.lock0)
   // this.lock0 = this.lock[3]
    this.lock1= this.lock[1]
    this.lock2= this.lock[2]
    this.lock3= this.lock[3]
    this.lock1= this.lock[5]
 //   console.log("bonne réponse",this.actionner[0].attributes.good.nodeValue)
    this.box0.addEventListener('click', (evt) => {
            var object = evt.detail.intersection.object;
            
       
            console.log("Objet 0 cliqué")
            
            if (this.actionner[0].attributes.good.value === '0"'){
              this.lock0.removeState("ferme")
            this.lock0.removeState("fermer")
            this.lock0.addState("ouvrir")}
            else {
                        this.lock0.addState("fermer")
                        this.lock0.removeState("ouvert")
                        this.lock0.removeState("ouvrir")
            }
          })
          this.box1.addEventListener('click', (evt) => {
            var object = evt.detail.intersection.object;
            console.log("Objet 1 cliqué")
            if (this.actionner[0].attributes.good.nodeValue === "1"){
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
            console.log("Objet 2 cliqué")
            if (this.actionner[0].attributes.good .value=== "3"){
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
            console.log("Objet 3 cliqué")
            if (this.actionner[0].attributes.good.value === '4'){
              this.lock0.removeState("ferme")
            this.lock0.removeState("fermer")
            this.lock0.addState("ouvrir")}
            else {
                        this.lock0.addState("fermer")
                        this.lock0.removeState("ouvert")
                        this.lock0.removeState("ouvrir")
            }
          })
    //console.log("actionner",this.box0,this.box1,this.box2,this.box3,this.lock0)
  },500)
  
},



registerLock: function (el) {
    this.lock.push(el);
},
registerLockid: function (el) {
  this.lockid= el;
},
registerAction: function (el) {
    this.actionner.push(el);
},

        
})

// ... 
;