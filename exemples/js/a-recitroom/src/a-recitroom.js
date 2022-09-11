
//require("./libs/pools")
//require("./libs/copyWorldPosRot")
require("./libs/ensureElement")
//require("./libs/touchGestures")
//require("./libs/betterRaycaster")

//require("./libs/recitcsg.js")
addEventListener('DOMContentLoaded', e => {
  document.body.addEventListener("swipeup", e => {
    document.body.requestFullscreen()
  })
})

require("./components/a-recitroom")
require("./components/a-recitwall3")
require("./components/a-recitfloor")
require("./components/a-recitceiling")
require("./components/a-door")
require("./components/a-window")

const pkg = require("../package")
console.log(`${pkg.title} Version ${pkg.version} by ${pkg.author}\n(${pkg.homepage})`)
