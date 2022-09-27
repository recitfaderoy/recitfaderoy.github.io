AFRAME.registerSystem('recitbreackoutgame', {

    schema: {

    },
    init: function() {
        this.entities = [];
    },
    registerMe: function (el) {
        this.entities.push(el);
    },
    tick: function(time, delta) {
  
    }
  })
    // ... 
;
 