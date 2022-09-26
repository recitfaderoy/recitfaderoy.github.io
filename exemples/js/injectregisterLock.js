AFRAME.registerComponent('injectregisterLock', {
    
    
    schema: {
      active:  { type: 'boolean', default: true },
    
      
    },
    init() { 
      if (this.data.active  ===false)
      {
        return
    }
      else
      {
        document.querySelector('a-scene').systems["recitbreackoutgame"].registerLock(this.el)
        this.el.addEventListener('stateadded', function (evt,) {
          var E= this.el
          console.log(E)
          console.log(evt.detail)
    
          switch(evt.detail){
            case'ouvert':
            E.removeAttribute('mixin', 'er')
           E.setAttribute('animation-mixer')
           console.log(E)
           console.log('Entity now selected!');
            console.log(E.getAttribute("mixin"))
            break
            case'ferme':
            E.removeAttribute('animation-mixer')
           E.setAttribute('mixin', 'et')
            console.log('Entity now selected!');
            console.log(E.getAttribute("mixin"))
            break
            case'ouvrir':
            E.removeAttribute('animation-mixer')
            E.setAttribute('mixin', 'or')
             console.log('Entity now selected!');
             console.log(E.getAttribute("mixin"))
             break
             case'fermer':
            E.removeAttribute('animation-mixer')
            E.setAttribute('mixin', 'ot')
             console.log('Entity now selected!');
             console.log(E.getAttribute("mixin"))
             break
            default:
              E.removeAttribute('animation-mixer')
           E.setAttribute('mixin', 'et')
            console.log('Entity now selected!');
            console.log(E.getAttribute("mixin"))
            break
          }
           
    
           
           
           
         
          
            
            //E.setAttribute('animation-mixer', 'clip:ouvert;loop:once; clampWhenFinished:true;')
          
        })
      }
    },
    update (time, timeDelta) {
      setTimeout(() => {
         console.log(this.id +'open')
    this.el.addEventListener('stateadded', function (evt,) {
      var E= this.el
      console.log(E)
      console.log(evt.detail)

      switch(evt.detail){
        case'ouvert':
        E.removeAttribute('mixin', 'er')
       E.setAttribute('animation-mixer')
       console.log(E)
       console.log('Entity now selected!');
        console.log(E.getAttribute("mixin"))
        break
        case'ferme':
        E.removeAttribute('animation-mixer')
       E.setAttribute('mixin', 'et')
        console.log('Entity now selected!');
        console.log(E.getAttribute("mixin"))
        break
        case'ouvrir':
        E.removeAttribute('animation-mixer')
        E.setAttribute('mixin', 'or')
         console.log('Entity now selected!');
         console.log(E.getAttribute("mixin"))
         break
         case'fermer':
        E.removeAttribute('animation-mixer')
        E.setAttribute('mixin', 'ot')
         console.log('Entity now selected!');
         console.log(E.getAttribute("mixin"))
         break
        default:
          E.removeAttribute('animation-mixer')
       E.setAttribute('mixin', 'et')
        console.log('Entity now selected!');
        console.log(E.getAttribute("mixin"))
        break
      }
       

       
       
       
     
      
        
        //E.setAttribute('animation-mixer', 'clip:ouvert;loop:once; clampWhenFinished:true;')
      
    })
    
  },500)
  }
})