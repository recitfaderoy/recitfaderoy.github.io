AFRAME.registerState({
    initialState: {
      device: "desktop",
      score: 0,
      nom:"etienne"
    },
  
    handlers: {
      setDevice: function (state, devtype) {
        state.device = devtype;
      },
  
      decreasescore: function (state, action) {
        state.score -= action.points;
      },
  
      increasescore: function (state, action) {
        state.score += action.points;
      },
      setNom: function (state, action) {
        state.nom = action.nom;
      },
    
    }
  })

  AFRAME.registerComponent('device-changer', {
    init: function () {
      this.el.addEventListener('click', (evt) => {
        this.el.sceneEl.emit('setDevice', evt.target.getAttribute('name').value.toLowerCase());   
      });
    }, 
  });
  AFRAME.registerComponent('nom-action', {
    init: function () {
      var el = this.el;
      el.addEventListener('click', function () {
        el.sceneEl.emit('increasescore', {points: 50});
        console.log(el.sceneEl.systems.state.state.score)
      });
    }
  });
    