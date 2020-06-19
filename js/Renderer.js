/// <reference path="d:/dev/js_reference/babylon.d.ts" />
/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />
//@ts-check
// Page entièrement chargé, on lance le jeu
document.addEventListener(
  "DOMContentLoaded",
  function () {
    new Renderer("renderCanvas")
  },
  false
)

var RENDERER
Renderer = function (canvasId) {
  RENDERER = this
  // Canvas et engine défini ici
  var canvas = document.getElementById(canvasId)
  var engine = new BABYLON.Engine(canvas, true)

  //ETS TODO mettre dans un fichier de configuration client

  engine.loadingScreen = new MeetLoadingScreen(
    canvas,
    "black",
    "./assets/images/subo.png",
    "./assets/images/subo_loadingIcon.png"
  )

  //ETS End todo
  engine.displayLoadingUI()

  this._engine = engine
  var _this = this
  _this._configurator = null
  // On initie la scène avec une fonction associé à l'objet Game
  this.scene = this._initScene(engine)

  var _player = new Player(_this, canvas)
  this._arena = new MeetScene(_this, this._onSceneLoaded)

  //  this._onSceneLoaded(null);

  // Permet au jeu de tourner
  engine.runRenderLoop(function () {
    _this.fps = Math.round(1000 / engine.getDeltaTime())

    if (_this._configurator != null) {
      _this._configurator.render(engine.getDeltaTime())
    }

    _this.scene.render()
  })

  // Ajuste la vue 3D si la fenetre est agrandi ou diminué
  window.addEventListener(
    "resize",
    function () {
      if (engine) {
        engine.resize()
      }
    },
    false
  )
}

Renderer.prototype = {
  // Prototype d'initialisation de la scène
  _initScene: function (engine) {
    var scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1)
    return scene
  },
  _onSceneLoaded: function (sender) {
    // condition de jours

    setTimeout(async () => {
      RENDERER._gui = new Gui(RENDERER._arena)

      // applique les conditions de jours
      ConfigurationManager.instance().ApplyDefaults()

      setTimeout(function () {
        RENDERER._engine.hideLoadingUI()
      }, 1500)
    })
  },
}
