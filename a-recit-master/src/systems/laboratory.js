AFRAME.registerComponent('laboratory', {
    schema: {

    },

    init() {
        var scene = document.querySelector('a-scene');
        var scene = document.querySelector('laboratory');
        this.run = AFRAME.utils.bind(this.run, this);
        this.run()

    },

    update() {
        // Do something when component's data is updated.
    },

    remove() {
        // Do something the component or its entity is detached.
    },

    tick(time, timeDelta) {
        // Do something on every scene tick or frame.
    },
    run() {
        var laborecit = document.querySelector('a-laboratory');
        

        // Do something when component first attached.

        var laboratoryitems = Array.prototype.slice.call(laborecit.querySelectorAll('.laboratory'));
        console.log("laboratoryitems " + laboratoryitems)
        var laboratoryitemsid = [];
        var laboratoryitemsidt = laboratoryitems.forEach(function (element, index) 
        {
            var innerscience = ""
            console.log(element.getAttribute("id"))
            console.log(element)
            console.log(element.getAttribute("name"))
            laboratoryitemsid[element.getAttribute("id")] = element.getAttribute("id")
            //this.el.sciencepannel = this.el.querySelector("a-gui-flex-container")
            //console.log("sciencepannel "+ sciencepannel)
            innerscience += ` 
                <a-gui-label
                    id = "labela` + index + `"
                    width="2.5" height="0.75"
                    value="` + element.getAttribute("name") + `"
                    font-family="assets/fonts/DiplomataSC-Regular.ttf"
                    font-size="0.35"
                    line-height="0.8"
                    letter-spacing="0"
                    margin="0 0 0.05 0"
                >
                </a-gui-label>
                <a-gui-label
                    width="2.5" height="0.75"
                    value="V total"
                    font-family="assets/fonts/DiplomataSC-Regular.ttf"
                    font-size="0.35"
                    line-height="0.8"
                    letter-spacing="0"
                    margin="0 0 0.05 0"
                >
                </a-gui-label>
                <a-gui-slider 	
                    id = "slider_v_` + element.getAttribute("id")+`"
                    width="2.5" height="0.75"
                    onclick="slideActionFunction"
                    percent=` + element.getAttribute("percent") + `
                    margin="0 0 0.05 0"
                    >
                </a-gui-slider>
                <a-gui-label
                    width="2.5" height="0.75"
                    value="Masse soluté"
                    font-family="assets/fonts/DiplomataSC-Regular.ttf"
                    font-size="0.35"
                    line-height="0.8"
                    letter-spacing="0"
                    margin="0 0 0.05 0"
                >
                </a-gui-label>
                <a-gui-slider 	
                        id = "slider_sol_` + element.getAttribute("id")+`"
                        width="2.5" height="0.75"
                        onclick="slideActionFunction"
                        percent=` + element.getAttribute("opacity") + `
                        margin="0 0 0.05 0"
                >
                </a-gui-slider>
                `
                            
                laborecit.ensure(".a-gui-flex-container"+index, "a-gui-flex-container", {
                    ["flex-direction"]: "column",
                    ["justify-content"]: "center",
                    ["align-items"]: "normal",
                    ["component-padding"]: "0.1",
                    opacity: "0.7",
                    width: "3",
                    height: "4.5",
                    position: 0 +index*0.3 + " 1.5 -1",
                    rotation: "0 0 0",
                    scale: "0.1 0.1 0.1"
                }, innerscience)
        })
                
    }
});