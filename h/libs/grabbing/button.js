/* global AFRAME, THREE */

AFRAME.registerComponent("button", {
  schema: {
    action: { type: "string", default: "" },
  },
  init(){
this.state ={}
this.el.classList.add("clickable");
  switch (this.data.action) {
    case "toggleouverture":
      this.closeall=this.closeall.bind(this);
   // let Tobeopen =[{ouvrir0:false},ouvrir1=false,ouvrir2=false,ouvrir3=false,ouvrir4=false, ouvrir5=false, ouvrir6=false]
   // console.log("this",this)
    
      break;
  
    default:

      break;
  }
},
update: function () {
  switch (this.data.action) {
    case "toggleouverture":
      this.el.addEventListener('click', (evt) => {
        var object = evt.detail.intersection.object;
          console.log(this.getState())
          // name of entity to which component is attached
          console.log(this.el.getObject3D('mesh').name);

          // name of object directly clicked
          console.log(object.name);
          
switch(object.name)
{
    case 'ouvrir0':
        console.log(this.getState().ouvrir0);
  
                     if(this.getState().ouvrir0===true){
            
     this.el.setAttribute('animation-mixer', 'clip:fermer0; loop:once; clampWhenFinished:true;');
        this.state = {ouvrir0: false,}
        console.log(this.getState().ouvrir0);
        }else{
            if(this.getState().ouvrir1===true){
                this.el.setAttribute('animation-mixer', 'clip:fermer1; loop:once; clampWhenFinished:true;');
                this.state = {ouvrir1: false,}}
        if(this.getState().ouvrir2===true){
            this.el.setAttribute('animation-mixer', 'clip:fermer2; loop:once; clampWhenFinished:true;');
            this.state = {ouvrir2: false,}}
        if(this.getState().ouvrir3===true){
                this.el.setAttribute('animation-mixer', 'clip:fermer3; loop:once; clampWhenFinished:true;');
                this.state = {ouvrir3: false,}}
        if(this.getState().ouvrir4===true){
            this.el.setAttribute('animation-mixer', 'clip:fermer4; loop:once; clampWhenFinished:true;');
            this.state = {ouvrir4: false,}}
        if(this.getState().ouvrir5===true){
                        this.el.setAttribute('animation-mixer', 'clip:fermer5; loop:once; clampWhenFinished:true;');
                        this.state = {ouvrir5: false,}}
            this.el.setAttribute('animation-mixer', 'clip:ouvrir0; loop:once; clampWhenFinished:true;');
            this.state.ouvrir0=true;
    }
        break   
    case 'ouvrir1':
        console.log(this.getState().ouvrir1);
        if(this.getState().ouvrir1===true){
            this.closeall();
       // this.el.setAttribute('animation-mixer', 'clip:fermer1; loop:once; clampWhenFinished:true;');
       // this.state = {ouvrir1: false,}
        console.log(this.getState().ouvrir1);
        }
        else 
        {
            this.el.setAttribute('animation-mixer', 'clip:ouvrir1; loop:once; clampWhenFinished:true;');
            this.state.ouvrir1=true;
        }
        break
        case 'ouvrir2':
            console.log(this.getState().ouvrir2);
            if(this.getState().ouvrir2===true){
            this.el.setAttribute('animation-mixer', 'clip:fermer2; loop:once; clampWhenFinished:true;');
            this.state = {ouvrir2: false,}
            console.log(this.getState().ouvrir2);
            }
            else 
            {
                this.el.setAttribute('animation-mixer', 'clip:ouvrir2; loop:once; clampWhenFinished:true;');
                this.state.ouvrir2=true;
            }
            break
        case 'ouvrir3':
            console.log(this.getState().ouvrir3);
            if(this.getState().ouvrir3===true){
            this.el.setAttribute('animation-mixer', 'clip:fermer3; loop:once; clampWhenFinished:true;');
            this.state = {ouvrir3: false,}
            console.log(this.getState().ouvrir3);
            }
            else 
            {
                this.el.setAttribute('animation-mixer', 'clip:ouvrir3; loop:once; clampWhenFinished:true;');
                this.state.ouvrir3=true;
            }
            break
            case 'ouvrir4':
                console.log(this.getState().ouvrir4);
                if(this.getState().ouvrir4===true){
                this.el.setAttribute('animation-mixer', 'clip:fermer4; loop:once; clampWhenFinished:true;');
                this.state = {ouvrir4: false,}
                console.log(this.getState().ouvrir4);
                }
                else 
                {
                    this.el.setAttribute('animation-mixer', 'clip:ouvrir4; loop:once; clampWhenFinished:true;');
                    this.state.ouvrir4=true;
                }
                break
      }
       

})
      break;
  
    default:

      break;
  }
},
getState(){
  return this.state;
},
closeall()          {
  if(this.getState().ouvrir0===true){
      this.el.setAttribute('animation-mixer', 'clip:fermer0; loop:once; clampWhenFinished:true;');
      this.state = {ouvrir0: false,}}
  if(this.getState().ouvrir1===true){
          this.el.setAttribute('animation-mixer', 'clip:fermer1; loop:once; clampWhenFinished:true;');
          this.state = {ouvrir1: false,}}
  if(this.getState().ouvrir2===true){
      this.el.setAttribute('animation-mixer', 'clip:fermer2; loop:once; clampWhenFinished:true;');
      this.state = {ouvrir2: false,}}
  if(this.getState().ouvrir3===true){
          this.el.setAttribute('animation-mixer', 'clip:fermer3; loop:once; clampWhenFinished:true;');
          this.state = {ouvrir3: false,}}
  if(this.getState().ouvrir4===true){
      this.el.setAttribute('animation-mixer', 'clip:fermer4; loop:once; clampWhenFinished:true;');
      this.state = {ouvrir4: false,}}
  if(this.getState().ouvrir5===true){
                  this.el.setAttribute('animation-mixer', 'clip:fermer5; loop:once; clampWhenFinished:true;');
                  this.state = {ouvrir5: false,}}

}
})
