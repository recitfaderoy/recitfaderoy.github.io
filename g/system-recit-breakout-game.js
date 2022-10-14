    AFRAME.registerSystem('recitbreackoutgame', {

    schema: {},

    init: function() {
        this.entities = [];
        this.actionner = [];
        this.lock = [];
        this.room = [];
        
        setTimeout(() => {
            this.box0 = this.actionner[0].childNodes[0]
            this.box1 = this.actionner[0].childNodes[1]
            this.box2 = this.actionner[0].childNodes[2]
            this.box3 = this.actionner[0].childNodes[3]
            this.lock0= this.lock[0]

            this.box0.addEventListener('click', (evt) => {
                    var object = evt.detail.intersection.object;

                    if (this.actionner[0].attributes.good === 'good="1"'){
                    this.lock0.removeState("ferme")
                    this.lock0.addState("ouvert")}
                    else {
                                this.lock0.addState("ferme")
                                this.lock0.removeState("ouvert")
                    }
                })
                this.box1.addEventListener('click', (evt) => {
                    var object = evt.detail.intersection.object;

                    if (this.actionner[0].attributes.good.nodeValue === "2"){
                    this.lock0.removeState("ferme")
                    this.lock0.addState("ouvert")}
                    else {
                                this.lock0.addState("ferme")
                                this.lock0.removeState("ouvert")
                    }
                })
                this.box2.addEventListener('click', (evt) => {
                    var object = evt.detail.intersection.object;

                    if (this.actionner[0].attributes.good === 'good="3"'){
                    this.lock0.removeState("ferme")
                    this.lock0.addState("ouvert")}
                    else {
                                this.lock0.addState("ferme")
                                this.lock0.removeState("ouvert")
                    }
                })
                this.box3.addEventListener('click', (evt) => {
                    var object = evt.detail.intersection.object;

                    if (this.actionner[0].attributes.good === 'good="4"'){
                    this.lock0.removeState("ferme")
                    this.lock0.addState("ouvert")}
                    else {
                                this.lock0.addState("ferme")
                                this.lock0.removeState("ouvert")
                    }
                })
        },500);
    },

    registerLock: function (el) {
        this.lock.push(el);
    },

    registerAction: function (el) {
        this.actionner.push(el);
    },

    registerRoom: function (el) {
        this.room.push(el);
    },

    update: function () {},

    tick: function(time, delta) {

    }
});