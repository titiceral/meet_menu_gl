/// <reference path="./IInitialisable.ts"/>

/// <reference path="../tools/MeetLogger.ts"/>

/// <reference path="d:/dev/js_reference/babylon.d.ts" />
/// <reference path="../Scene/MeetScene.ts" />
/// <reference path="./IActionSender.ts"/>


class ActionAmbientLight extends IInitialisable implements IActionSender
{
    InitiliseCallback(eventOnActiveHandlerEndIn: (sender: any) => void, sender: any): void {
       // throw new Error("Method not implemented.");
       //do nothing
    }
    eventOnActiveHandlerEnd: () => void;
   
    private _isNightMode : boolean;

    _ambientLight : BABYLON.Light;

    ApplyDefault(): void {
       this._AnimatedSunToMoonAmbient(0);
    }
    

  
    eventOnActiveHandler() : void
    {
       this.ActionHandler();
    }
    eventOnDesactivateHandler() : void
    {
       this.ActionHandler();
    }
    /**
     *
     */
    constructor(ambientLight :  BABYLON.Light
        ,private _scene : MeetScene) {
        super();
        this._ambientLight = ambientLight;
        
        
    }
    ActionHandler(...tests: any[]): void {
        MeetLogger.LogDebugObject(tests);
        if(this._isNightMode)
        {
            this._AnimatedMoonToSunAmbient();   
            this._isNightMode = false;
        }
        else
        {
            this._AnimatedSunToMoonAmbient();
            this._isNightMode = true;
        }
    }

    
    private _AnimatedSunToMoonAmbient(lastFrame : number = 100) : void
    {
        // amibiante light -> passe du soleil de midi vers la lumiere de la lune avec un couché de soleil
        var animationSunToMoon = new BABYLON.Animation("animationSunToMoon", "diffuse", MEET_ANIMATION_SPEED,
        BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysSunToMoon = [];
        keysSunToMoon.push({
            frame: 0,
            value: new BABYLON.Color3(1,1,1)
        });
   
        keysSunToMoon.push({
            frame: 50,
            value: new BABYLON.Color3(0.8,0.8,0.8)
        });
        var intensity = 0.5;
       
       keysSunToMoon.push({
        frame: 60,
        value: new BABYLON.Color3(201.0/255.0 * intensity,201.0/255.0 * intensity,201.0/255.0 * intensity)

        });
        intensity = 0.2;
       keysSunToMoon.push({
            frame: 100,
            value: new BABYLON.Color3(201.0/255.0 * intensity,201.0/255.0 * intensity,201.0/255.0 * intensity)

        });

        animationSunToMoon.setKeys(keysSunToMoon);
        // specular
        var animationSunToMoonSpecular = new BABYLON.Animation("animationSunToMoonSpecular", "specular", MEET_ANIMATION_SPEED,
        BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysSunToMoonSpecular = [];
        keysSunToMoonSpecular.push({
            frame: 0,
            value: new BABYLON.Color3(1,1,1)
        });
   
        keysSunToMoonSpecular.push({
            frame: 40,
            value: new BABYLON.Color3(0.8,0.8,0.8)
        });
        var intensity = 0.5;
       
        keysSunToMoonSpecular.push({
        frame: 59,
        value: new BABYLON.Color3(255.0/255.0 * intensity,120.0/255.0 * intensity,30.0/255.0 * intensity)

        });
        keysSunToMoonSpecular.push({
            frame: 60,
            value: new BABYLON.Color3(0,0,0)
    
            });
        
        intensity = 0.2;
        keysSunToMoonSpecular.push({
            frame: 100,
            value: new BABYLON.Color3(201.0/255.0 * intensity,201.0/255.0 * intensity,201.0/255.0 * intensity)

        });

        animationSunToMoonSpecular.setKeys(keysSunToMoonSpecular);
          // light direction
        var animationSunToMoonDirection = new BABYLON.Animation("animationSunToMoonDirection", "direction", MEET_ANIMATION_SPEED,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keysSunToMoonDirection = [];
         intensity = 0.2;
         keysSunToMoonDirection.push({
            frame: 0,
            value: new BABYLON.Vector3(100,100,-10)
        });
        intensity = 0.5;
        keysSunToMoonDirection.push({
            frame: 50,
            value: new BABYLON.Vector3(100,20,-10)
        });
      
       
        keysSunToMoonDirection.push({
          frame: 60,
            value: new  BABYLON.Vector3(100,10,-10)

        });
        keysSunToMoonDirection.push({
            frame: 70,
            value: new  BABYLON.Vector3(100,100,-10)
    
            });
            
        keysSunToMoonDirection.push({
            frame: 100,
            value: new BABYLON.Vector3(100,100,-10)

        });
        animationSunToMoonDirection.setKeys(keysSunToMoonDirection);

        // set animations
        this._ambientLight.animations = [];
        this._ambientLight.animations.push( animationSunToMoon);
        this._ambientLight.animations.push( animationSunToMoonSpecular);
    
        this._ambientLight.animations.push( animationSunToMoonDirection);
        this._scene.scene.beginAnimation(this._ambientLight, 0, lastFrame,false);

 
    }

    private _AnimatedMoonToSunAmbient() : void
    {
        // amibiante light -> passe du soleil de midi vers la lumiere de la lune avec un couché de soleil
        var animationSunToMoon = new BABYLON.Animation("animationSunToMoon", "diffuse", MEET_ANIMATION_SPEED,
        BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keysSunToMoon = [];
        var intensity = 0.2;
        keysSunToMoon.push({
            frame: 0,
            value: new BABYLON.Color3(201.0/255.0 * intensity,201.0/255.0 * intensity,201.0/255.0 * intensity)
        });
        intensity = 0.5;
        keysSunToMoon.push({
            frame: 50,
            value: new BABYLON.Color3(201.0/255.0 * intensity,201.0/255.0 * intensity,201.0/255.0 * intensity)
        });
      
       
       keysSunToMoon.push({
        frame: 60,
        value: new BABYLON.Color3(0.8,0.8,0.8)

        });
        
       keysSunToMoon.push({
            frame: 100,
            value: new BABYLON.Color3(1,1,1)

        });
        animationSunToMoon.setKeys(keysSunToMoon);
        // ambiente ligth : specular componante
        var animationSunToMoonSpecular = new BABYLON.Animation("animationSunToMoonSpecular", "specular", MEET_ANIMATION_SPEED,
        BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keysSunToMoonSpecular = [];
         intensity = 0.2;
        keysSunToMoonSpecular.push({
            frame: 0,
            value: new BABYLON.Color3(201.0/255.0 * intensity,201.0/255.0 * intensity,201.0/255.0 * intensity)
        });
        intensity = 0.5;
        keysSunToMoonSpecular.push({
            frame: 50,
            value: new BABYLON.Color3(201.0/255.0 * intensity,201.0/255.0 * intensity,201.0/255.0 * intensity)
        });
      
       
        keysSunToMoonSpecular.push({
        frame: 60,
        value: new BABYLON.Color3(0.8,0.8,0.8)

        });
        
        keysSunToMoonSpecular.push({
            frame: 100,
            value: new BABYLON.Color3(1,1,1)

        });
        animationSunToMoonSpecular.setKeys(keysSunToMoonSpecular);
        this._ambientLight.animations =  [];
        this._ambientLight.animations.push( animationSunToMoon);
        this._ambientLight.animations.push( animationSunToMoonSpecular);
        this._scene.scene.beginAnimation(this._ambientLight, 0, 100,false);

 
    }
    
}