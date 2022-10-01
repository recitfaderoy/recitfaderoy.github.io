

AFRAME.registerComponent('injectregisterlock', {
    schema: {
     // active:  { type: 'boolean', default: true },
        },
        schema: {
        },
init: function() {
  document.querySelector('a-scene').systems["recitbreackoutgame"].registerLock(this.el);

  ///this.ecoute= AFRAME.utils.bind(this.ecoute, this);
  
      console.log("injectregisterLock is load")
console.log("valise", this.el)
      this.el.addState("ouvert")      
      console.log("glt",this.el.states)
         },
    update (time, timeDelta) {
      setTimeout(() => {
         console.log(this.states +'open')
    this.el.ecouteouvre(this.el, this.el)
  },500)
  },
 
})
