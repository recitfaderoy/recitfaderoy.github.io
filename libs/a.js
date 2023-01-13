/*var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,c){a.raw=c;return a};
AFRAME.registerComponent("atmosphere",{init:function(){var a=this.el.getObject3D("mesh");this._material=new THREE.ShaderMaterial({side:THREE.BackSide,transparent:!0,uniforms:{bloomPos:{value:new THREE.Vector3(0,-1,0)},bloomIntensity:{value:0},bloomMultiplier:{value:0},bloomExponent:{value:0},bloomColor:{value:new THREE.Vector3}},vertexShader:THREE.ShaderChunk.common+"\n\t\t\t\t"+THREE.ShaderChunk.logdepthbuf_pars_vertex+"\n\t\t\t\tvarying vec3 fPos;\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n\t\t\t\t\tfPos = position;\n\t\t\t\t\t"+
THREE.ShaderChunk.logdepthbuf_vertex+"\n\t\t\t\t}\n\t\t\t",fragmentShader:THREE.ShaderChunk.logdepthbuf_pars_fragment+"\n\t\t\t\tvarying vec3 fPos;\n\n\t\t\t\tuniform vec3 bloomPos;\n\t\t\t\tuniform float bloomIntensity;\n\t\t\t\tuniform float bloomMultiplier;\n\t\t\t\tuniform float bloomExponent;\n\t\t\t\tuniform vec3 bloomColor;\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tfloat h = 1.0 - fPos.y / 100000000.0;\n\t\t\t\t\tvec4 atmosphere = vec4(0.1, 0.2, 0.8, 0.1 * pow(h, 0.25));\n\n\t\t\t\t\tfloat intensity = pow(max(0.0, dot(bloomPos, normalize(fPos))) * bloomMultiplier, bloomExponent) * bloomIntensity;\n\t\t\t\t\tvec4 bloom = vec4(vec3(intensity * 1.75) * bloomColor, intensity);\n\n\t\t\t\t\tgl_FragColor = atmosphere + bloom;\n\t\t\t\t\t"+
THREE.ShaderChunk.logdepthbuf_fragment+"\n\t\t\t\t}\n\t\t\t"});a=new THREE.Mesh(a.geometry,this._material);a.renderOrder=1;this.el.setObject3D("mesh",a)},tick:function(a,c){var d=document.getElementById("experience").object3D.children[0].children[0];this._material.uniforms.bloomPos.value.copy(d.localToWorld(new THREE.Vector3));this._material.uniforms.bloomPos.value.normalize();this._material.uniforms.bloomIntensity.value=d.bloomIntensity;this._material.uniforms.bloomMultiplier.value=d.bloomMultiplier;
this._material.uniforms.bloomExponent.value=d.bloomExponent;this._material.uniforms.bloomColor.value.copy(d.bloomColor)}});AFRAME.registerComponent("auto-shadow",{init:function(){var a=AFRAME.utils.device;(a.isFirefoxReality()||a.isGearVR()||a.isMobile()||a.isMobileVR()||a.isOculusBrowser()||a.isOculusGo())&&this.el.setAttribute("shadow","enabled:false")}});
AFRAME.registerComponent("experience",{init:function(){var a=this;this._progress=.3;this._planetIndex=0;this._showStartOnceMoonInPlace=this._showText=this._started=!1;this._light=this.el.children[0];this._light.object3D.children[0].bloomColor=new THREE.Vector3;this.el.startExperience=function(){a._started=!0;setTimeout(function(){a._showText=!0},2500)}},tick:function(a,c){this._progress=this._started?this._progress+1.9E-5*c:Math.min(.3,this._progress+1.9E-5*c);.3==this._progress&&this._showStartOnceMoonInPlace&&
(document.getElementById("start").show(),this._showStartOnceMoonInPlace=!1);for(var d=0;7>=d;++d)this.el.children[1+d].object3D.visible=d==this._planetIndex?!0:!1;for(;this._progress>=this.el.children[1+this._planetIndex].endTime;)++this._planetIndex,--this._progress,7<this._planetIndex?(this._planetIndex=0,this._started=!1,this._progress=Math.min(.3,this._progress),document.getElementById("title").show(),document.getElementById("credits").show(),this._showStartOnceMoonInPlace=!0):this._showText=
!0,this._progress+=this.el.children[1+this._planetIndex].startTime;d=this.el.children[1+this._planetIndex];this._showText&&(0==this._planetIndex?(d.textObject.show(10),setTimeout(function(){document.getElementById("distanceText").show(15)},11500)):d.textObject.show(6),this._showText=!1);d.planetTexture&&(d.planetTexture.offset.x=d.textureOffset+.88+.8*this._progress);var f=.15+.7*this._progress,e=-Math.cos(f*Math.PI*2);f=-Math.sin(f*Math.PI*2);d.object3D.position.set(0,385E6*e,385E6*f);this._light.object3D.position.set(0,
1E3*Math.max(0,e),1E3*f);this._light.object3D.children[0].color.setHex(d.lightColor);e=.05;f=.2;0==this._planetIndex?(e=.14,f=.15):1==this._planetIndex?(e=.13,f=.14):2==this._planetIndex?(e=.13,f=.14):3==this._planetIndex?(e=.13,f=.14):4==this._planetIndex?(e=.115,f=.17):5==this._planetIndex?(e=.115,f=.17):6==this._planetIndex?(e=.08,f=.21):7==this._planetIndex&&(e=.07,f=.225);var b=this._light.object3D.children[0];b.intensity=Math.max(0,2*(this._progress<e?0:this._progress>=e&&this._progress<f?(this._progress-
e)/(f-e):1-(this._progress-f)/(.82-f))*d.lightIntensity);0==this._planetIndex?(b.bloomIntensity=1E3*b.intensity/2,b.bloomMultiplier=1/1.033,b.bloomExponent=200,b.bloomColor.set(1,1,0)):1==this._planetIndex?(b.bloomIntensity=600*b.intensity/2,b.bloomMultiplier=1/1.06,b.bloomExponent=100,b.bloomColor.set(1,.5,0)):2==this._planetIndex?(b.bloomIntensity=400*b.intensity/2,b.bloomMultiplier=1/1.036,b.bloomExponent=150,b.bloomColor.set(1,1,0)):3==this._planetIndex?(b.bloomIntensity=600*b.intensity/2,b.bloomMultiplier=
1/1.06,b.bloomExponent=100,b.bloomColor.set(1,1,1)):4==this._planetIndex?(b.bloomIntensity=300*b.intensity/2,b.bloomMultiplier=1/1.11,b.bloomExponent=50,b.bloomColor.set(.4,.6,1)):5==this._planetIndex?(b.bloomIntensity=250*b.intensity/2,b.bloomMultiplier=1/1.29,b.bloomExponent=20,b.bloomColor.set(.6,.7,1)):6==this._planetIndex?(b.bloomIntensity=150*b.intensity/2,b.bloomMultiplier=1/1.7,b.bloomExponent=10,b.bloomColor.set(1,1,.5)):7==this._planetIndex&&(b.bloomIntensity=170*b.intensity/2,b.bloomMultiplier=
1/1.7,b.bloomExponent=10,b.bloomColor.set(1,.8,.5))}});
AFRAME.registerComponent("fader",{schema:{show:{type:"bool","default":!0},speed:{type:"number","default":3}},init:function(){var a=this;this._show=1==this.data.show;this._speed=parseFloat(this.data.speed);this.el.hide=function(){a._show=!1};this.el.show=function(c){c=void 0===c?null:c;a._show=!0;null!=c&&setTimeout(function(){a._show=!1},1E3*c)}},tick:function(a,c){var d=this.el.object3D.children[0].material;this._show?(this.el.object3D.visible=!0,d.opacity=Math.min(1,d.opacity+this._speed*c/1E3)):
(d.opacity=Math.max(0,d.opacity-this._speed*c/1E3),0==d.opacity&&(this.el.object3D.visible=!1))}});
AFRAME.registerComponent("planet",{schema:{type:"string","default":"moon"},init:function(){var a=this;this.el.addEventListener("model-loaded",function(c){var d=c.detail.model.children[0],f=document.querySelector("a-scene").renderer.capabilities.getMaxAnisotropy(),e=document.querySelector("a-scene").renderer.capabilities.maxTextureSize;if(c.target==a.el){switch(a.data){case "moon":var b="images/moon.jpg";var g=1738.1;var h=1736;a.el.lightColor=16777215;a.el.lightIntensity=.1;a.el.startTime=.1;a.el.endTime=
.9;a.el.textureOffset=.07;break;case "mars":b="images/mars.jpg";g=3396.2;h=3376.2;a.el.lightColor=15627073;a.el.lightIntensity=.15;a.el.startTime=.1;a.el.endTime=.9;a.el.textureOffset=0;break;case "venus":b="images/venus.jpg";h=g=6051.8;a.el.lightColor=15451269;a.el.lightIntensity=.2;a.el.startTime=.1;a.el.endTime=.9;a.el.textureOffset=0;break;case "earth":b="images/earth.jpg";g=6378.1;h=6356.8;a.el.lightColor=2047094;a.el.lightIntensity=.15;a.el.startTime=.1;a.el.endTime=.9;a.el.textureOffset=0;
break;case "neptune":b=2048>e?"images/neptune1024.jpg":"images/neptune2048.jpg";g=24764;h=24341;a.el.lightColor=4159952;a.el.lightIntensity=.3;a.el.startTime=.1;a.el.endTime=.92;a.el.textureOffset=.14;break;case "uranus":b="images/uranus.jpg";g=25559;h=24973;a.el.lightColor=11263716;a.el.lightIntensity=.35;a.el.startTime=.1;a.el.endTime=.92;a.el.textureOffset=0;break;case "saturn":b=2048>e?"images/saturn1024.jpg":"images/saturn2048.jpg";g=60268;h=54364;a.el.lightColor=16773335;a.el.lightIntensity=
.6;a.el.startTime=.05;a.el.endTime=.95;a.el.textureOffset=0;break;case "jupiter":b=2048>e?"images/jupiter1024.jpg":"images/jupiter2048.jpg",g=71492,h=66854,a.el.lightColor=12033928,a.el.lightIntensity=.5,a.el.startTime=.05,a.el.endTime=1,a.el.textureOffset=-.13}a.el.textObject=document.getElementById(a.data+"Text");c=(new THREE.TextureLoader).load(b);c.flipY=!1;c.anisotropy=Math.min(3,f);c.wrapS=THREE.RepeatWrapping;a.el.planetTexture=c;e="saturn"==a.data?"images/light_saturn.png":"images/light.png";
e=(new THREE.TextureLoader).load(e);e.flipY=!1;e.anisotropy=Math.min(8,f);f=new THREE.MeshBasicMaterial({map:c,lightMap:e});d.material=f;d.scale.set(1E3*g,1E3*h,1E3*g)}else g=2048>e?"images/saturn_rings1024.png":"images/saturn_rings2048.png",g=(new THREE.TextureLoader).load(g),g.flipY=!1,h=(new THREE.TextureLoader).load("images/light_rings.png"),h.flipY=!1,g=new THREE.MeshBasicMaterial({map:g,lightMap:h,side:THREE.DoubleSide,transparent:!0}),d.material=g,d.scale.set(60268E3,60268E3,60268E3)})}});
AFRAME.registerComponent("scenery",{init:function(){var a=this;this.el.addEventListener("model-loaded",function(c){document.querySelector("a-scene").renderer.shadowMap.needsUpdate=!0;a.el.object3D.children[0].renderOrder=-1})}});
AFRAME.registerComponent("start",{init:function(){var a=this;this._hideProgress=1;this._isWaitingForSoundsToLoad=this._hide=!0;this._fuseProgress=0;this._ambientEntity=document.getElementById("ambientEntity").object3D.children[0].children[0];this._musicEntity=document.getElementById("musicEntity").object3D.children[0].children[0];this._reticle=document.getElementById("reticle");this._loading=document.getElementById("loading");this.el.addEventListener("click",function(){a._hide||(a._hide=!0,document.getElementById("title").hide(),
document.getElementById("credits").hide(),document.getElementById("leftController").getObject3D("line").visible=!1,document.getElementById("rightController").getObject3D("line").visible=!1,a._reticle.getObject3D("mesh").visible=!1,document.getElementById("experience").startExperience(),a._ambientEntity.gain.gain.setTargetAtTime(0,0,3),a._ambientEntity.gain.gain.setTargetAtTime(.8,a._ambientEntity.context.currentTime+360+3,20),a._musicEntity.play())});this.el.show=function(){a._hide=!1;a._fuseProgress=
0;a._isFusing=!1;document.getElementById("leftController").getObject3D("line").visible=!0;document.getElementById("rightController").getObject3D("line").visible=!0;a._reticle.getObject3D("mesh").visible=!0}},tick:function(a,c){this._isWaitingForSoundsToLoad&&null!=this._musicEntity.buffer&&null!=this._ambientEntity.buffer&&(this._isWaitingForSoundsToLoad=this._hide=this._loading.object3D.visible=!1);this._hide?(this._hideProgress+=10*c/1E3,1<=this._hideProgress&&(this.el.object3D.visible=!1,this._hideProgress=
1)):(this.el.object3D.visible=!0,this._hideProgress=Math.max(0,this._hideProgress-10*c/1E3),this._reticle.is("cursor-fusing")?(this._fuseProgress=Math.min(1,this._fuseProgress+c/1500),this.el.object3D.children[0].scale.set(this._fuseProgress,this._fuseProgress,this._fuseProgress),this.el.object3D.children[0].visible=!0):(this._fuseProgress=0,this.el.object3D.children[0].visible=!1));var d=1-this._hideProgress;this.el.object3D.scale.set(.4*d,.4*d,.4*d)}});
AFRAME.registerComponent("texture-fallback",{init:function(){var a=document.querySelector("a-scene").renderer.capabilities.maxTextureSize;4096>a&&(2048>a?(document.getElementById("stars").src="images/stars1024.jpg",document.getElementById("neptune").src="images/neptune1024.jpg",document.getElementById("saturn").src="images/saturn1024.jpg",document.getElementById("saturn-rings").src="images/saturn_rings1024.png",document.getElementById("jupiter").src="images/jupiter1024.jpg"):document.getElementById("stars").src=
"images/stars2048.jpg")}});
AFRAME.components["look-controls"].Component.prototype.onTouchMove=function(a){if(this.touchStarted&&this.data.touchEnabled){var c=this.el.sceneEl.canvas;this.yawObject.rotation.y+=2*Math.PI*(a.touches[0].pageX-this.touchStart.x)/c.clientWidth*.5;this.pitchObject.rotation.x+=2*Math.PI*(a.touches[0].pageY-this.touchStart.y)/c.clientHeight*.3;this.pitchObject.rotation.x=Math.max(-Math.PI/2,Math.min(Math.PI/2,this.pitchObject.rotation.x));this.touchStart={x:a.touches[0].pageX,y:a.touches[0].pageY}}};
AFRAME.registerComponent("view-distance",{init:function(){var a=this,c=document.querySelector("a-scene"),d=c.renderer.xr;c.addEventListener("enter-vr",function(){var c=a.el.getObject3D("camera"),e=d.getCamera(c);e.far=c.far;e.near=c.near;for(var b=0;b<e.cameras.length;++b)e.cameras[b].far=c.far,e.cameras[b].near=c.near})}});
*/

! function (e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var r = n[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function (e, t) {
    var n = AFRAME.utils.debug,
        o = n("aframe-text-component:error"),
        r = new THREE.FontLoader;
    AFRAME.registerComponent("text3d", {
        schema: {
            bevelEnabled: {
                default: !1
            },
            bevelSize: {
                default: 8,
                min: 0
            },
            bevelThickness: {
                default: 12,
                min: 0
            },
            curveSegments: {
                default: 12,
                min: 0
            },
            font: {
                type: "asset",
                default: "fava.json"
            },
            height: {
                default: .05,
                min: 0
            },
            size: {
                default: .5,
                min: 0
            },
            style: {
                default: "normal",
                oneOf: ["normal", "italics"]
            },
            text: {
                default: ""
            },
            weight: {
                default: "normal",
                oneOf: ["normal", "bold"]
            }
        },
        update: function (e) {
            var t = this.data,
                n = this.el,
                a = n.getOrCreateObject3D("mesh", THREE.Mesh);
            t.font.constructor === String ? r.load(t.font, function (e) {
                var n = AFRAME.utils.clone(t);
                n.font = e, a.geometry = new THREE.TextGeometry(t.text, n)
            }) : t.font.constructor === Object ? a.geometry = new THREE.TextGeometry(t.text, t) : o("Must provide `font` (typeface.json) or `fontPath` (string) to text component.")
        }
    })
}]);