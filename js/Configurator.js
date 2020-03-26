//@ts-check

Configurator = function( pScene)
    {
      console.log(pScene);
        this._scene = pScene;

    };

Configurator.prototype =
{
    render : function(timespan)
    {


    },
    intialiseState : function(sender , stateType)
    {
        console.log("state " + stateType);

        this._time = 0;
        this._duration = 3000;

        switch( stateType)
        {
            
            case "SunToMoon":
                this._time = 0;
                this._duration = 3000;
                this._gui.lockButton(sender);
                this._scene._initialiseSunToMoonAmbient();
                this._scene._initialiseSunToMoonLights();
                //launch annimation
                var gui = this._gui;
              
                setTimeout(async () => {
                    var anim =  this._scene.scene.beginAnimation(this._scene._ambientLight, 0, 100,false);
                    this._scene.scene.beginAnimation(this._scene._tissu.material, 0, 100,false);

                    this._scene.scene.beginAnimation(this._scene._lightMesh.material.subMaterials[0], 0, 100,false);
                    this._scene.scene.beginAnimation(this._scene._mainLight, 0, 100,false);
                    await anim.waitAsync();
                    console.log("SunToMoonEnd animation ended");

                    gui.SunToMoonEnd(sender);

                 });
                
                break;
            case "MoonToSun":
                this._time = 0;
                this._duration = 3000;
                this._gui.lockButton(sender);
                this._scene._initialiseMoonToSunAmbient();
                this._scene._initialiseMoonToSunLights();
                //launch annimation               
                 var gui = this._gui;
                 setTimeout(async () => {
                    var anim = this._scene.scene.beginAnimation(this._scene._ambientLight, 0, 100,false, 1.0);/*,function()
                {
                    console.log("MoonToSun animation ended");
                    gui.MoonToSunEnd(sender);
                });*/
                this._scene.scene.beginAnimation(this._scene._tissu.material, 0, 100,false);

                this._scene.scene.beginAnimation(this._scene._lightMesh.material.subMaterials[0], 0, 100,false);
                this._scene.scene.beginAnimation(this._scene._mainLight, 0, 100,false);
                await anim.waitAsync();
                console.log("MoonToSunEnd animation ended");

                gui.MoonToSunEnd(sender);

             });
                break;
            default:
                console.log("intialiseState not stateType Found");

        }// hctiws
    }
   
};