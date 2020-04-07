/// <reference path="../tools/MeetLogger.ts"/>
/// <reference path="./AllowedDiffuseSurfaceProperty.ts"/>
/// <reference path="../GL/GLBabylonLight.ts"/>
/// <reference path="../GL/GLBabylonMaterialDiffuser.ts"/>



class ActionCustomisableDiffuseSurfaceLight extends IInitialisable implements IActionSender , IGLLight, ICustomisable
{
    lightIntensity: number; // useless
    lightColor: ColorRGB;// useless
   
    _allowedProperties : Map<string, AllowedDiffuseSurfaceProperty>;
    _defaultKey : string;


    _isNightMode : boolean;

    _surfaceDiffuserMaterial : GLMaterialDiffuser// BABYLON.Material; / material d'une surface emission : pour gérer texture et emission
    _surfaceLightMaterial : GLMaterial; // BABYLON.Material; // material de l'ampoule : pour gérer l'émission
    _surfaceLight : GLLight; // 

    constructor(surfaceLight :  BABYLON.Light
        ,surfaceDiffuserMaterial : BABYLON.Material
        ,surfaceLightMaterial : BABYLON.Material
        ,private _scene : MeetScene) {
        super();
        this._surfaceLight = new GLBabylonLight(surfaceLight);
        this._surfaceDiffuserMaterial = new GLBabylonMaterialDiffuser(surfaceDiffuserMaterial as BABYLON.StandardMaterial);
        this._surfaceLightMaterial = new GLBabylonMaterial(surfaceLightMaterial as BABYLON.StandardMaterial);
        this._isNightMode = false;

        this._allowedProperties = new Map<string, AllowedDiffuseSurfaceProperty>();
        
        
        
    }
    // inherited
    ApplyDefault(): void {

        this._setCustomisable(this._defaultKey);

        this._AnimatedSunToMoonLights(0) ;
        

    }
    ApplyCustomisationHandler(...tests): void {
        let buttonName = (tests[1].target as BABYLON.GUI.Button).name;

        this._setCustomisable(buttonName);
    }

    _setCustomisable(strKey : string) : void
    {
        let selectedProperties = this._allowedProperties.get(strKey);
        if( selectedProperties != null)
        {
            this._surfaceDiffuserMaterial.CopyFrom(selectedProperties._diffuserProperties);

            this._surfaceDiffuserMaterial.SetDiffuseTexture(selectedProperties._diffuserProperties.diffuseTexture,
                 selectedProperties._diffuserProperties.uScaleTexture, selectedProperties._diffuserProperties.vScaleTexture);
            this._surfaceDiffuserMaterial.SetEmissiveTexture(selectedProperties._diffuserProperties.emissiveTexture,
                selectedProperties._diffuserProperties.uScaleTexture, selectedProperties._diffuserProperties.vScaleTexture);
            this._surfaceDiffuserMaterial.ApplyColor();

            this._surfaceLightMaterial.emissive = selectedProperties._surfaceLightColor;
            this._surfaceLightMaterial.ApplyColors();

            this._surfaceLight.CopyFrom(selectedProperties._lightProperties);
            this._surfaceLight.ApplyProperties();



        }
    }
    ActionHandler(...tests: any[]): void {
        MeetLogger.LogDebugObject(tests);
        if(this._isNightMode)
        {
            this._AnimatedMoonToSunLights();   
            this._isNightMode = false;
        }
        else
        {
            this._AnimatedSunToMoonLights();
            this._isNightMode = true;
        }
    }

    eventOnActiveHandler() : void
    {
       this.ActionHandler();
    }
    eventOnDesactivateHandler() : void
    {
       this.ActionHandler();
    }

    _AnimatedSunToMoonLights(maxFrame : number = 100) : void
    {
        // intensité de la veilleuse -> allume la veilleuse
        var animationSunToMoonLight = new BABYLON.Animation("animationSunToMoonLight", "intensity", MEET_ANIMATION_SPEED,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

        var keysSunToMoonLight = [];

        keysSunToMoonLight.push({
            frame: 0,
            value: 0,
        });
        keysSunToMoonLight.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME,
            value: this._surfaceLight.lightIntensity *0.5
        });
        keysSunToMoonLight.push({
           frame: MEET_ANIMATION_LIGHT_ON_FRAME +5,
           value: this._surfaceLight.lightIntensity *0.9
       });        
       keysSunToMoonLight.push({
            frame: 100,
            value: this._surfaceLight.lightIntensity *1.2

        });
        animationSunToMoonLight.setKeys(keysSunToMoonLight);

        
        (this._surfaceLight as GLBabylonLight)._gllight.animations = [];
        (this._surfaceLight as GLBabylonLight)._gllight.animations.push( animationSunToMoonLight);

        // tissus
        // Light Tissu emissive color
        var animSunToMoonTissu = new BABYLON.Animation("animSunToMoonTissu", "emissiveColor",MEET_ANIMATION_SPEED,
        BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysSunToMoonTissu = [];

        keysSunToMoonTissu.push({
            frame: 0,
            value: BABYLON.Color3.Black,
        });
        keysSunToMoonTissu.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME,
            value: BABYLON.Color3.Black
        });
        keysSunToMoonTissu.push({
           frame: MEET_ANIMATION_LIGHT_ON_FRAME + 5,
           value: ColorRGBBabylon.FromColorRGB(this._surfaceDiffuserMaterial.emissiveColor)
       });        
       keysSunToMoonTissu.push({
            frame: 100,
            value: ColorRGBBabylon.FromColorRGB(this._surfaceDiffuserMaterial.emissiveColor)

        });
        animSunToMoonTissu.setKeys(keysSunToMoonTissu);
        (this._surfaceDiffuserMaterial as GLBabylonMaterialDiffuser).glmaterial.animations = [];
        (this._surfaceDiffuserMaterial as GLBabylonMaterialDiffuser).glmaterial.animations.push( animSunToMoonTissu);

        // transparence du tissu lorsque la lumière s'allume
        var animSunToMoonTissuTransparency = new BABYLON.Animation("animSunToMoonTissuTransparency", "alpha", MEET_ANIMATION_SPEED,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysSunToMoonTissuTrans = [];

        keysSunToMoonTissuTrans.push({
            frame: 0,
            value: 1.9,
        });
        keysSunToMoonTissuTrans.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME ,
            value: 1.9,
        });
        keysSunToMoonTissuTrans.push({
           frame: MEET_ANIMATION_LIGHT_ON_FRAME +1,
           value: 1,
       });      
       keysSunToMoonTissuTrans.push({
            frame: 100,
            value: 1

        });
        animSunToMoonTissuTransparency.setKeys(keysSunToMoonTissuTrans);
        
        (this._surfaceDiffuserMaterial as GLBabylonMaterialDiffuser).glmaterial.animations.push( animSunToMoonTissuTransparency);

        // _lightMesh -> 
        var animSunToMoonLightMesh = new BABYLON.Animation("animSunToMoonLightMesh", "emissiveColor",MEET_ANIMATION_SPEED,
        BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysSunToMoonLightMesh = [];

        keysSunToMoonLightMesh.push({
            frame: 0,
            value: BABYLON.Color3.Black,
        });
        keysSunToMoonLightMesh.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME,
            value: BABYLON.Color3.Black
        });
        keysSunToMoonLightMesh.push({
           frame: MEET_ANIMATION_LIGHT_ON_FRAME + 5 ,
           value: ColorRGBBabylon.FromColorRGB(this._surfaceLightMaterial.emissive)
       });        
       keysSunToMoonLightMesh.push({
            frame: 100,
            value: ColorRGBBabylon.FromColorRGB(this._surfaceLightMaterial.emissive)

        });
        animSunToMoonLightMesh.setKeys(keysSunToMoonLightMesh);
        
        (this._surfaceLightMaterial as GLBabylonMaterial).glmaterial.animations = [];
        (this._surfaceLightMaterial as GLBabylonMaterial).glmaterial.animations.push( animSunToMoonLightMesh);

      /*  this._lightMesh.material.subMaterials[0].animations = [];
        this._lightMesh.material.subMaterials[0].animations.push( animSunToMoonLightMesh);
*/
        this._scene.scene.beginAnimation((this._surfaceDiffuserMaterial as GLBabylonMaterialDiffuser).glmaterial, 0, maxFrame, true);
        this._scene.scene.beginAnimation((this._surfaceLightMaterial as GLBabylonMaterial).glmaterial, 0, maxFrame, true);
        this._scene.scene.beginAnimation((this._surfaceLight as GLBabylonLight)._gllight, 0, maxFrame, true);
    }
    _AnimatedMoonToSunLights() : void
    {
        // intensité de la veilleuse -> allume la veilleuse
        var animationMoonToSunLight = new BABYLON.Animation("animationMoonToSunLight", "intensity", MEET_ANIMATION_SPEED,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

        var keysMoonToSunLight = [];

        keysMoonToSunLight.push({
            frame: 0,
            value: this._surfaceLight.lightIntensity *1.2,
        });
        keysMoonToSunLight.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME,
            value: this._surfaceLight.lightIntensity *0.9
        });
        keysMoonToSunLight.push({
           frame: MEET_ANIMATION_LIGHT_ON_FRAME +5,
           value: this._surfaceLight.lightIntensity *0.5
       });        
       keysMoonToSunLight.push({
            frame: 100,
            value: 0

        });
        animationMoonToSunLight.setKeys(keysMoonToSunLight);

        
        (this._surfaceLight as GLBabylonLight)._gllight.animations = [];
        (this._surfaceLight as GLBabylonLight)._gllight.animations.push( animationMoonToSunLight);

        // tissus
        // Light Tissu emissive color
       var animMoonToSunTissu = new BABYLON.Animation("animMoonToSunTissu", "emissiveColor",MEET_ANIMATION_SPEED,
        BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysMoonToSunTissu = [];

        
       keysMoonToSunTissu.push({
            frame: 0,
            value: ColorRGBBabylon.FromColorRGB(this._surfaceDiffuserMaterial.emissiveColor)

        });
        keysMoonToSunTissu.push({
           frame: MEET_ANIMATION_LIGHT_ON_FRAME ,
           value: ColorRGBBabylon.FromColorRGB(this._surfaceDiffuserMaterial.emissiveColor)
       });
          keysMoonToSunTissu.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME +5,
            value: BABYLON.Color3.Black
        });
             keysMoonToSunTissu.push({
            frame: 100,
            value: BABYLON.Color3.Black,
        });
       
        animMoonToSunTissu.setKeys(keysMoonToSunTissu);
        (this._surfaceDiffuserMaterial as GLBabylonMaterialDiffuser).glmaterial.animations = [];
        (this._surfaceDiffuserMaterial as GLBabylonMaterialDiffuser).glmaterial.animations.push( animMoonToSunTissu);

        // transparence du tissu lorsque la lumière s'allume
        var animMoonToSunTissuTransparency = new BABYLON.Animation("animMoonToSunTissuTransparency", "alpha", MEET_ANIMATION_SPEED,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysMoonToSunTissuTrans = [];

       
       keysMoonToSunTissuTrans.push({
            frame: 0,
            value: 1,

        });
        keysMoonToSunTissuTrans.push({
           frame: MEET_ANIMATION_LIGHT_ON_FRAME ,
           value: 1,
       }); 
        keysMoonToSunTissuTrans.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME + 1 ,
            value: 1.9,
        });
             keysMoonToSunTissuTrans.push({
            frame: 100,
            value: 1.9,
        });
        
        animMoonToSunTissuTransparency.setKeys(keysMoonToSunTissuTrans);

        (this._surfaceDiffuserMaterial as GLBabylonMaterialDiffuser).glmaterial.animations.push( animMoonToSunTissuTransparency);

        // _lightMesh -> 
        var animMoonToSunLightMesh = new BABYLON.Animation("animMoonToSunLightMesh", "emissiveColor",MEET_ANIMATION_SPEED,
        BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysMoonToSunLightMesh = [];
        keysMoonToSunLightMesh.push({
            frame: 0,
            value:ColorRGBBabylon.FromColorRGB(this._surfaceLightMaterial.emissive)

        });
        keysMoonToSunLightMesh.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME  ,
            value: ColorRGBBabylon.FromColorRGB(this._surfaceLightMaterial.emissive)
        });        
        keysMoonToSunLightMesh.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME + 5,
            value: BABYLON.Color3.Black
        });
        keysMoonToSunLightMesh.push({
            frame: 100,
            value: BABYLON.Color3.Black,
        });
       
       
        animMoonToSunLightMesh.setKeys(keysMoonToSunLightMesh);
        

        (this._surfaceLightMaterial as GLBabylonMaterial).glmaterial.animations = [];
        (this._surfaceLightMaterial as GLBabylonMaterial).glmaterial.animations.push( animMoonToSunLightMesh);

       this._scene.scene.beginAnimation((this._surfaceDiffuserMaterial as GLBabylonMaterialDiffuser).glmaterial, 0, 100,true);
        this._scene.scene.beginAnimation((this._surfaceLightMaterial as GLBabylonMaterial).glmaterial, 0, 100,true);
        this._scene.scene.beginAnimation((this._surfaceLight as GLBabylonLight)._gllight, 0, 100,true);
    }

}