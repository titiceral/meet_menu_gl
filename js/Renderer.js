/// <reference path="d:/dev/js_reference/babylon.d.ts" />
/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />
//@ts-check
// Page entièrement chargé, on lance le jeu
document.addEventListener("DOMContentLoaded", function () {
    new Renderer('renderCanvas');
}, false);

var RENDERER ;
Renderer = function(canvasId) {
    RENDERER = this;
    // Canvas et engine défini ici
    var canvas = document.getElementById(canvasId);
    var engine = new BABYLON.Engine(canvas, true);
    var _this = this;
    _this._configurator = null;
    // On initie la scène avec une fonction associé à l'objet Game
    this.scene = this._initScene(engine);
   
   
    var _player = new Player(_this, canvas);
    this._arena = new MeetScene(_this, this._onSceneLoaded);
   
   //  this._onSceneLoaded(null);


    

    // Permet au jeu de tourner
    engine.runRenderLoop(function () {
        _this.fps= Math.round(1000/engine.getDeltaTime() );

        if ( _this._configurator != null)
        {
          _this._configurator.render(engine.getDeltaTime());
        }
        _this.scene.render();

    });

    // Ajuste la vue 3D si la fenetre est agrandi ou diminué
    window.addEventListener("resize", function () {
        
        if (engine) {
            engine.resize();
        }
    },false);

};


Renderer.prototype = {
    // Prototype d'initialisation de la scène
    _initScene : function(engine) {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor=new BABYLON.Color4(0,0,0,1);
        return scene;
    },
    _onSceneLoaded : function( sender)
    {
      
        console.log("arena" + RENDERER._arena);
        RENDERER._configurator = new Configurator( RENDERER._arena);
        
        RENDERER._gui = new Gui( RENDERER.scene, RENDERER._configurator);
        RENDERER._configurator._gui = RENDERER._gui;

        ConfigurationManager.instance().ApplyDefaults();
        // condition de jours
     //ETS TMP   RENDERER._arena._initialiseSunToMoonAmbient();
        //ETS TMP RENDERER._arena._initialiseSunToMoonLights();
      


    }
};