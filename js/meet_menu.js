var MEET_LIGHT_COLOR = new BABYLON.Color3(1, 200.0 / 255.0, 120.0 / 255.0);
var MEET_LIGHT_COLOR_TISSU = new BABYLON.Color3(1 * 0.3, 200.0 / 255.0 * 0.3, 120.0 / 255.0 * 0.3);
var MEET_CAMERA_RADIUS = 65;
var MEET_LIGHT_INTENSITY = 10;
var MEET_SKY_INTENSITY = 1;
var MEET_ANIMATION_SPEED = 30;
var MEET_ANIMATION_LIGHT_ON_FRAME = 50;
class IInitialisable {
    constructor() {
        ConfigurationManager.instance().RegisterInitialisable(this);
    }
}
class MeetLogger {
    static LogInfoMessage(message) {
        console.log(`[Info] meet_menu : ${message}`);
    }
    static LogDebugMessage(message) {
        console.log(`[Debug] meet_menu : ${message}`);
    }
    static LogDebugObject(object) {
        console.log(`[Debug] meet_menu object :`);
        console.log(object);
    }
}
class MeetScene {
    constructor(renderer, onBabylonFileLoaded) {
        this.renderer = renderer;
        this.scene = renderer.scene;
        this.objectLoaded = new SOLVeilleuse(this);
        this.onFileLoaded = onBabylonFileLoaded;
        this.objectLoaded.LoadObject(onBabylonFileLoaded, this.renderer);
        this._loadManualSkybox("assets/textures/skybox/skybox");
        this._loadGround();
        this._loadAmbientLight();
    }
    _initScene(engine) {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
        return scene;
    }
    _loadManualSkybox(folderPath) {
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, this.scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
        skyboxMaterial.backFaceCulling = false;
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        skyboxMaterial.disableLighting = true;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(folderPath, this.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skybox.renderingGroupId = 0;
    }
    _loadGround() {
        var materialGround = new BABYLON.StandardMaterial("groundTexture", this.scene);
        materialGround.diffuseTexture = new BABYLON.Texture("./assets/images/brick.jpg", this.scene);
        materialGround.diffuseTexture.uScale = 4.0;
        materialGround.diffuseTexture.vScale = 4.0;
        materialGround.opacityTexture = new BABYLON.Texture("./assets/textures/groundAlpha.png", this.scene);
        materialGround.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
        var ground = BABYLON.Mesh.CreateGround("ground1", 400, 400, 2, this.scene);
        ground.scaling = new BABYLON.Vector3(1, 1, 1);
        ground.material = materialGround;
        this._ground = ground;
        this._groundCustomisable = new CustomisableMaterialTexture(new Set().add(new GLBabylonMaterial(materialGround)));
        this._groundCustomisable._defaultKey = "Brique";
        this._groundCustomisable._allowedTexture.set("Brique", new AllowedTexture("./assets/images/brick.jpg", 4, 4));
        this._groundCustomisable._allowedTexture.set("Sable", new AllowedTexture("./assets/textures/sable.jpg", 2, 2));
        this._groundCustomisable._allowedTexture.set("Bois", new AllowedTexture("./assets/3D/AT_sayo_wood_DIFF.jpg", 6, 4));
    }
    _loadAmbientLight() {
        var ambientLight = new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(100, 100, 0), this.scene);
        ambientLight.diffuse = new BABYLON.Color3(1, 1, 1);
        ambientLight.specular = new BABYLON.Color3(1, 1, 1);
        ambientLight.intensityMode = BABYLON.Light.INTENSITYMODE_LUMINOUSPOWER;
        ambientLight.intensity = MEET_SKY_INTENSITY;
        this._ambientLightCustom = new ActionAmbientLight(ambientLight, this);
    }
    _initialiseSunToMoonLights() {
    }
    _initialiseMoonToSunLights() {
    }
}
class ActionAmbientLight extends IInitialisable {
    constructor(ambientLight, _scene) {
        super();
        this._scene = _scene;
        this._ambientLight = ambientLight;
    }
    InitiliseCallback(eventOnActiveHandlerEndIn, sender) {
    }
    ApplyDefault() {
        this._AnimatedSunToMoonAmbient(0);
    }
    eventOnActiveHandler() {
        this.ActionHandler();
    }
    eventOnDesactivateHandler() {
        this.ActionHandler();
    }
    ActionHandler(...tests) {
        MeetLogger.LogDebugObject(tests);
        if (this._isNightMode) {
            this._AnimatedMoonToSunAmbient();
            this._isNightMode = false;
        }
        else {
            this._AnimatedSunToMoonAmbient();
            this._isNightMode = true;
        }
    }
    _AnimatedSunToMoonAmbient(lastFrame = 100) {
        var animationSunToMoon = new BABYLON.Animation("animationSunToMoon", "diffuse", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysSunToMoon = [];
        keysSunToMoon.push({
            frame: 0,
            value: new BABYLON.Color3(1, 1, 1)
        });
        keysSunToMoon.push({
            frame: 50,
            value: new BABYLON.Color3(0.8, 0.8, 0.8)
        });
        var intensity = 0.5;
        keysSunToMoon.push({
            frame: 60,
            value: new BABYLON.Color3(201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity)
        });
        intensity = 0.2;
        keysSunToMoon.push({
            frame: 100,
            value: new BABYLON.Color3(201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity)
        });
        animationSunToMoon.setKeys(keysSunToMoon);
        var animationSunToMoonSpecular = new BABYLON.Animation("animationSunToMoonSpecular", "specular", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysSunToMoonSpecular = [];
        keysSunToMoonSpecular.push({
            frame: 0,
            value: new BABYLON.Color3(1, 1, 1)
        });
        keysSunToMoonSpecular.push({
            frame: 40,
            value: new BABYLON.Color3(0.8, 0.8, 0.8)
        });
        var intensity = 0.5;
        keysSunToMoonSpecular.push({
            frame: 59,
            value: new BABYLON.Color3(255.0 / 255.0 * intensity, 120.0 / 255.0 * intensity, 30.0 / 255.0 * intensity)
        });
        keysSunToMoonSpecular.push({
            frame: 60,
            value: new BABYLON.Color3(0, 0, 0)
        });
        intensity = 0.2;
        keysSunToMoonSpecular.push({
            frame: 100,
            value: new BABYLON.Color3(201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity)
        });
        animationSunToMoonSpecular.setKeys(keysSunToMoonSpecular);
        var animationSunToMoonDirection = new BABYLON.Animation("animationSunToMoonDirection", "direction", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keysSunToMoonDirection = [];
        intensity = 0.2;
        keysSunToMoonDirection.push({
            frame: 0,
            value: new BABYLON.Vector3(100, 100, -10)
        });
        intensity = 0.5;
        keysSunToMoonDirection.push({
            frame: 50,
            value: new BABYLON.Vector3(100, 20, -10)
        });
        keysSunToMoonDirection.push({
            frame: 60,
            value: new BABYLON.Vector3(100, 10, -10)
        });
        keysSunToMoonDirection.push({
            frame: 70,
            value: new BABYLON.Vector3(100, 100, -10)
        });
        keysSunToMoonDirection.push({
            frame: 100,
            value: new BABYLON.Vector3(100, 100, -10)
        });
        animationSunToMoonDirection.setKeys(keysSunToMoonDirection);
        this._ambientLight.animations = [];
        this._ambientLight.animations.push(animationSunToMoon);
        this._ambientLight.animations.push(animationSunToMoonSpecular);
        this._ambientLight.animations.push(animationSunToMoonDirection);
        this._scene.scene.beginAnimation(this._ambientLight, 0, lastFrame, false);
    }
    _AnimatedMoonToSunAmbient() {
        var animationSunToMoon = new BABYLON.Animation("animationSunToMoon", "diffuse", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keysSunToMoon = [];
        var intensity = 0.2;
        keysSunToMoon.push({
            frame: 0,
            value: new BABYLON.Color3(201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity)
        });
        intensity = 0.5;
        keysSunToMoon.push({
            frame: 50,
            value: new BABYLON.Color3(201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity)
        });
        keysSunToMoon.push({
            frame: 60,
            value: new BABYLON.Color3(0.8, 0.8, 0.8)
        });
        keysSunToMoon.push({
            frame: 100,
            value: new BABYLON.Color3(1, 1, 1)
        });
        animationSunToMoon.setKeys(keysSunToMoon);
        var animationSunToMoonSpecular = new BABYLON.Animation("animationSunToMoonSpecular", "specular", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keysSunToMoonSpecular = [];
        intensity = 0.2;
        keysSunToMoonSpecular.push({
            frame: 0,
            value: new BABYLON.Color3(201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity)
        });
        intensity = 0.5;
        keysSunToMoonSpecular.push({
            frame: 50,
            value: new BABYLON.Color3(201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity, 201.0 / 255.0 * intensity)
        });
        keysSunToMoonSpecular.push({
            frame: 60,
            value: new BABYLON.Color3(0.8, 0.8, 0.8)
        });
        keysSunToMoonSpecular.push({
            frame: 100,
            value: new BABYLON.Color3(1, 1, 1)
        });
        animationSunToMoonSpecular.setKeys(keysSunToMoonSpecular);
        this._ambientLight.animations = [];
        this._ambientLight.animations.push(animationSunToMoon);
        this._ambientLight.animations.push(animationSunToMoonSpecular);
        this._scene.scene.beginAnimation(this._ambientLight, 0, 100, false);
    }
}
class IGLLight {
    constructor(colorOptions) {
        this.lightIntensity = null;
        this.lightColor = null;
        if (colorOptions.lightIntensity) {
            this.lightIntensity = colorOptions.lightIntensity;
        }
        if (colorOptions.lightColor) {
            this.lightColor = colorOptions.lightColor;
        }
    }
}
class GLLight extends IGLLight {
    CopyFrom(fromLight) {
        this.lightColor = fromLight.lightColor;
        this.lightIntensity = fromLight.lightIntensity;
    }
}
class AllowedDiffuseSurfaceProperty {
    constructor(_diffuserProperties, _lightProperties, _surfaceLightColor) {
        this._diffuserProperties = _diffuserProperties;
        this._lightProperties = _lightProperties;
        this._surfaceLightColor = _surfaceLightColor;
    }
}
class GLBabylonLight extends GLLight {
    constructor(_gllight) {
        super({});
        this._gllight = _gllight;
    }
    ApplyProperties() {
        if (this.lightColor) {
            this._gllight.diffuse = ColorRGBBabylon.FromColorRGB(this.lightColor);
            this._gllight.specular = ColorRGBBabylon.FromColorRGB(this.lightColor);
        }
    }
}
class IGLMaterialDiffuser {
    constructor(colorOptions) {
        this.diffuseTexture = null;
        this.emissiveTexture = null;
        this.opacityTexture = null;
        this.uScaleTexture = null;
        this.vScaleTexture = null;
        this.emissiveColor = null;
        if (colorOptions.diffuseTexture != null)
            this.diffuseTexture = colorOptions.diffuseTexture;
        if (colorOptions.uScaleTexture)
            this.uScaleTexture = colorOptions.uScaleTexture;
        if (colorOptions.vScaleTexture)
            this.vScaleTexture = colorOptions.vScaleTexture;
        if (colorOptions.emissiveTexture != null)
            this.emissiveTexture = colorOptions.emissiveTexture;
        if (colorOptions.opacityTexture != null)
            this.opacityTexture = colorOptions.opacityTexture;
        if (colorOptions.emissiveColor)
            this.emissiveColor = colorOptions.emissiveColor;
    }
    PreloadTextures() {
        if (this.diffuseTexture != null) {
            let texture = new BABYLON.Texture(this.diffuseTexture, null);
        }
        if (this.emissiveTexture != null) {
            let texture = new BABYLON.Texture(this.emissiveTexture, null);
        }
        if (this.opacityTexture != null) {
            let texture = new BABYLON.Texture(this.opacityTexture, null);
        }
    }
}
class GLMaterialDiffuser extends IGLMaterialDiffuser {
    CopyFrom(fromMat) {
        this.diffuseTexture = fromMat.diffuseTexture;
        this.uScaleTexture = fromMat.uScaleTexture;
        this.vScaleTexture = fromMat.vScaleTexture;
        this.emissiveTexture = fromMat.emissiveTexture;
        this.emissiveColor = fromMat.emissiveColor;
    }
}
class ColorRGBBabylon {
    static FromColorRGB(color) {
        return new BABYLON.Color3(color.r, color.g, color.b);
    }
}
class GLBabylonMaterialDiffuser extends GLMaterialDiffuser {
    constructor(glmaterial) {
        super({});
        this.glmaterial = glmaterial;
    }
    SetDiffuseTexture(strTexturePath, uScale, vScale) {
        if (strTexturePath != null) {
            this.glmaterial.diffuseTexture = new BABYLON.Texture(strTexturePath, null);
            if (uScale != null) {
                this.glmaterial.diffuseTexture.uScale = uScale;
            }
            else {
                this.glmaterial.diffuseTexture.uScale = 1;
            }
            if (vScale != null) {
                this.glmaterial.diffuseTexture.vScale = vScale;
            }
            else {
                this.glmaterial.diffuseTexture.vScale = 1;
            }
        }
        else {
            this.glmaterial.diffuseTexture = null;
        }
    }
    SetEmissiveTexture(strTexturePath, uScale, vScale) {
        if (strTexturePath != null) {
            this.glmaterial.emissiveTexture = new BABYLON.Texture(strTexturePath, null);
            if (uScale != null) {
                this.glmaterial.emissiveTexture.uScale = uScale;
            }
            else {
                this.glmaterial.emissiveTexture.uScale = 1;
            }
            if (vScale != null) {
                this.glmaterial.emissiveTexture.vScale = vScale;
            }
            else {
                this.glmaterial.emissiveTexture.vScale = 1;
            }
            this.glmaterial.emissiveTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
            this.glmaterial.emissiveTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
            this.glmaterial.emissiveTexture.vOffset = -20;
            this.glmaterial.emissiveTexture.uOffset = -20;
        }
        else {
            this.glmaterial.emissiveTexture = null;
        }
    }
    SetOpacityTexture(strTexturePath, uScale, vScale) {
        if (strTexturePath != null) {
            this.glmaterial.opacityTexture = new BABYLON.Texture(strTexturePath, null);
            if (uScale != null) {
                this.glmaterial.opacityTexture.uScale = uScale;
            }
            else {
                this.glmaterial.opacityTexture.uScale = 1;
            }
            if (vScale != null) {
                this.glmaterial.opacityTexture.vScale = vScale;
            }
            else {
                this.glmaterial.opacityTexture.vScale = 1;
            }
            this.glmaterial.opacityTexture.getAlphaFromRGB = true;
        }
        else {
            this.glmaterial.opacityTexture = null;
        }
    }
    ApplyColor() {
        if (this.emissiveColor) {
            this.glmaterial.emissiveColor = ColorRGBBabylon.FromColorRGB(this.emissiveColor);
        }
    }
}
class ActionCustomisableDiffuseSurfaceLight extends IInitialisable {
    constructor(surfaceLight, surfaceDiffuserMaterial, surfaceLightMaterial, _scene) {
        super();
        this._scene = _scene;
        this._surfaceLight = new GLBabylonLight(surfaceLight);
        this._surfaceDiffuserMaterial = new GLBabylonMaterialDiffuser(surfaceDiffuserMaterial);
        this._surfaceLightMaterial = new GLBabylonMaterial(surfaceLightMaterial);
        this._isNightMode = false;
        this._allowedProperties = new Map();
    }
    set AllowedProperties(value) {
        this._allowedProperties = value;
        this._allowedProperties.forEach((allowedPropertie) => {
            allowedPropertie._diffuserProperties.PreloadTextures();
        });
    }
    InitiliseCallback(eventOnActiveHandlerEndIn, sender) {
        this.eventOnActiveHandlerEnd = eventOnActiveHandlerEndIn;
        this.eventOnActiveHandlerEndSender = sender;
    }
    ApplyDefault() {
        this._setCustomisable(this._defaultKey);
        this._AnimatedSunToMoonLights(0, 0);
    }
    ApplyCustomisationHandler(...tests) {
        let buttonName = tests[1].target.name;
        this._setCustomisable(buttonName);
        if (this._isNightMode) {
            this._AnimatedSunToMoonLights(100, 100);
        }
    }
    _setCustomisable(strKey) {
        let selectedProperties = this._allowedProperties.get(strKey);
        if (selectedProperties != null) {
            this._surfaceDiffuserMaterial.CopyFrom(selectedProperties._diffuserProperties);
            this._surfaceDiffuserMaterial.SetDiffuseTexture(selectedProperties._diffuserProperties.diffuseTexture, selectedProperties._diffuserProperties.uScaleTexture, selectedProperties._diffuserProperties.vScaleTexture);
            this._surfaceDiffuserMaterial.SetEmissiveTexture(selectedProperties._diffuserProperties.emissiveTexture, selectedProperties._diffuserProperties.uScaleTexture, selectedProperties._diffuserProperties.vScaleTexture);
            this._surfaceDiffuserMaterial.SetOpacityTexture(selectedProperties._diffuserProperties.opacityTexture, selectedProperties._diffuserProperties.uScaleTexture, selectedProperties._diffuserProperties.vScaleTexture);
            this._surfaceDiffuserMaterial.ApplyColor();
            this._surfaceLightMaterial.emissive = selectedProperties._surfaceLightColor;
            this._surfaceLightMaterial.ApplyColors();
            this._surfaceLight.CopyFrom(selectedProperties._lightProperties);
            this._surfaceLight.ApplyProperties();
        }
    }
    ActionHandler(...tests) {
        MeetLogger.LogDebugObject(tests);
        if (this._isNightMode) {
            this._AnimatedMoonToSunLights();
            this._isNightMode = false;
        }
        else {
            this._AnimatedSunToMoonLights();
            this._isNightMode = true;
        }
    }
    eventOnActiveHandler() {
        this.ActionHandler();
    }
    eventOnDesactivateHandler() {
        this.ActionHandler();
    }
    _AnimatedSunToMoonLights(minFrame = 0, maxFrame = 100) {
        var animationSunToMoonLight = new BABYLON.Animation("animationSunToMoonLight", "intensity", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysSunToMoonLight = [];
        keysSunToMoonLight.push({
            frame: 0,
            value: 0,
        });
        keysSunToMoonLight.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME,
            value: this._surfaceLight.lightIntensity * 0.5
        });
        keysSunToMoonLight.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME + 5,
            value: this._surfaceLight.lightIntensity * 0.9
        });
        keysSunToMoonLight.push({
            frame: 100,
            value: this._surfaceLight.lightIntensity * 1.2
        });
        animationSunToMoonLight.setKeys(keysSunToMoonLight);
        this._surfaceLight._gllight.animations = [];
        this._surfaceLight._gllight.animations.push(animationSunToMoonLight);
        var animSunToMoonTissu = new BABYLON.Animation("animSunToMoonTissu", "emissiveColor", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
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
        this._surfaceDiffuserMaterial.glmaterial.animations = [];
        this._surfaceDiffuserMaterial.glmaterial.animations.push(animSunToMoonTissu);
        var animSunToMoonTissuTransparency = new BABYLON.Animation("animSunToMoonTissuTransparency", "alpha", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysSunToMoonTissuTrans = [];
        keysSunToMoonTissuTrans.push({
            frame: 0,
            value: 1.9,
        });
        keysSunToMoonTissuTrans.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME,
            value: 1.9,
        });
        keysSunToMoonTissuTrans.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME + 1,
            value: 1,
        });
        keysSunToMoonTissuTrans.push({
            frame: 100,
            value: 1
        });
        animSunToMoonTissuTransparency.setKeys(keysSunToMoonTissuTrans);
        this._surfaceDiffuserMaterial.glmaterial.animations.push(animSunToMoonTissuTransparency);
        if (this._surfaceDiffuserMaterial.glmaterial.emissiveTexture != null) {
            var animEmissivetextureVOffset = new BABYLON.Animation("animEmissivetextureVOffset", "vOffset", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            var animEmissivetextureUOffset = new BABYLON.Animation("animEmissivetextureUOffset", "uOffset", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            var keymissivetextureClampU = [];
            keymissivetextureClampU.push({
                frame: 0,
                value: -20,
            });
            keymissivetextureClampU.push({
                frame: MEET_ANIMATION_LIGHT_ON_FRAME,
                value: -20,
            });
            keymissivetextureClampU.push({
                frame: MEET_ANIMATION_LIGHT_ON_FRAME + 1,
                value: 0,
            });
            keymissivetextureClampU.push({
                frame: 100,
                value: 0
            });
            animEmissivetextureUOffset.setKeys(keymissivetextureClampU);
            var keymissivetextureClampV = [];
            keymissivetextureClampV.push({
                frame: 0,
                value: -20,
            });
            keymissivetextureClampV.push({
                frame: MEET_ANIMATION_LIGHT_ON_FRAME,
                value: -20,
            });
            keymissivetextureClampV.push({
                frame: MEET_ANIMATION_LIGHT_ON_FRAME + 1,
                value: -1,
            });
            keymissivetextureClampV.push({
                frame: 100,
                value: -1
            });
            animEmissivetextureVOffset.setKeys(keymissivetextureClampV);
            this._surfaceDiffuserMaterial.glmaterial.emissiveTexture.animations = [];
            this._surfaceDiffuserMaterial.glmaterial.emissiveTexture.animations.push(animEmissivetextureUOffset);
            this._surfaceDiffuserMaterial.glmaterial.emissiveTexture.animations.push(animEmissivetextureVOffset);
        }
        var animSunToMoonLightMesh = new BABYLON.Animation("animSunToMoonLightMesh", "emissiveColor", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
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
            frame: MEET_ANIMATION_LIGHT_ON_FRAME + 5,
            value: ColorRGBBabylon.FromColorRGB(this._surfaceLightMaterial.emissive)
        });
        keysSunToMoonLightMesh.push({
            frame: 100,
            value: ColorRGBBabylon.FromColorRGB(this._surfaceLightMaterial.emissive)
        });
        animSunToMoonLightMesh.setKeys(keysSunToMoonLightMesh);
        this._surfaceLightMaterial.glmaterial.animations = [];
        this._surfaceLightMaterial.glmaterial.animations.push(animSunToMoonLightMesh);
        this._scene.scene.beginAnimation(this._surfaceDiffuserMaterial.glmaterial, minFrame, maxFrame, true);
        this._scene.scene.beginAnimation(this._surfaceLightMaterial.glmaterial, minFrame, maxFrame, true);
        this._scene.scene.beginAnimation(this._surfaceLight._gllight, minFrame, maxFrame, false, 1.0, () => this.eventOnActiveHandlerEnd(this.eventOnActiveHandlerEndSender));
    }
    _AnimatedMoonToSunLights() {
        var animationMoonToSunLight = new BABYLON.Animation("animationMoonToSunLight", "intensity", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysMoonToSunLight = [];
        keysMoonToSunLight.push({
            frame: 0,
            value: this._surfaceLight.lightIntensity * 1.2,
        });
        keysMoonToSunLight.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME,
            value: this._surfaceLight.lightIntensity * 0.9
        });
        keysMoonToSunLight.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME + 5,
            value: this._surfaceLight.lightIntensity * 0.5
        });
        keysMoonToSunLight.push({
            frame: 100,
            value: 0
        });
        animationMoonToSunLight.setKeys(keysMoonToSunLight);
        this._surfaceLight._gllight.animations = [];
        this._surfaceLight._gllight.animations.push(animationMoonToSunLight);
        var animMoonToSunTissu = new BABYLON.Animation("animMoonToSunTissu", "emissiveColor", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysMoonToSunTissu = [];
        keysMoonToSunTissu.push({
            frame: 0,
            value: ColorRGBBabylon.FromColorRGB(this._surfaceDiffuserMaterial.emissiveColor)
        });
        keysMoonToSunTissu.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME,
            value: ColorRGBBabylon.FromColorRGB(this._surfaceDiffuserMaterial.emissiveColor)
        });
        keysMoonToSunTissu.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME + 5,
            value: BABYLON.Color3.Black
        });
        keysMoonToSunTissu.push({
            frame: 100,
            value: BABYLON.Color3.Black,
        });
        animMoonToSunTissu.setKeys(keysMoonToSunTissu);
        this._surfaceDiffuserMaterial.glmaterial.animations = [];
        this._surfaceDiffuserMaterial.glmaterial.animations.push(animMoonToSunTissu);
        if (this._surfaceDiffuserMaterial.glmaterial.emissiveTexture != null) {
            var animEmissivetextureVOffset = new BABYLON.Animation("animEmissivetextureVOffset", "vOffset", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            var animEmissivetextureUOffset = new BABYLON.Animation("animEmissivetextureUOffset", "uOffset", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            var keymissivetextureClampU = [];
            keymissivetextureClampU.push({
                frame: 0,
                value: 0,
            });
            keymissivetextureClampU.push({
                frame: MEET_ANIMATION_LIGHT_ON_FRAME,
                value: 0,
            });
            keymissivetextureClampU.push({
                frame: MEET_ANIMATION_LIGHT_ON_FRAME + 1,
                value: -20,
            });
            keymissivetextureClampU.push({
                frame: 100,
                value: -20
            });
            animEmissivetextureUOffset.setKeys(keymissivetextureClampU);
            var keymissivetextureClampV = [];
            keymissivetextureClampV.push({
                frame: 0,
                value: -1,
            });
            keymissivetextureClampV.push({
                frame: MEET_ANIMATION_LIGHT_ON_FRAME,
                value: -1,
            });
            keymissivetextureClampV.push({
                frame: MEET_ANIMATION_LIGHT_ON_FRAME + 1,
                value: -20,
            });
            keymissivetextureClampV.push({
                frame: 100,
                value: -20
            });
            animEmissivetextureVOffset.setKeys(keymissivetextureClampV);
            this._surfaceDiffuserMaterial.glmaterial.emissiveTexture.animations = [];
            this._surfaceDiffuserMaterial.glmaterial.emissiveTexture.animations.push(animEmissivetextureUOffset);
            this._surfaceDiffuserMaterial.glmaterial.emissiveTexture.animations.push(animEmissivetextureVOffset);
        }
        var animMoonToSunTissuTransparency = new BABYLON.Animation("animMoonToSunTissuTransparency", "alpha", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysMoonToSunTissuTrans = [];
        keysMoonToSunTissuTrans.push({
            frame: 0,
            value: 1,
        });
        keysMoonToSunTissuTrans.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME,
            value: 1,
        });
        keysMoonToSunTissuTrans.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME + 1,
            value: 1.9,
        });
        keysMoonToSunTissuTrans.push({
            frame: 100,
            value: 1.9,
        });
        animMoonToSunTissuTransparency.setKeys(keysMoonToSunTissuTrans);
        this._surfaceDiffuserMaterial.glmaterial.animations.push(animMoonToSunTissuTransparency);
        var animMoonToSunLightMesh = new BABYLON.Animation("animMoonToSunLightMesh", "emissiveColor", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var keysMoonToSunLightMesh = [];
        keysMoonToSunLightMesh.push({
            frame: 0,
            value: ColorRGBBabylon.FromColorRGB(this._surfaceLightMaterial.emissive)
        });
        keysMoonToSunLightMesh.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME,
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
        this._surfaceLightMaterial.glmaterial.animations = [];
        this._surfaceLightMaterial.glmaterial.animations.push(animMoonToSunLightMesh);
        this._scene.scene.beginAnimation(this._surfaceDiffuserMaterial.glmaterial, 0, 100, true);
        this._scene.scene.beginAnimation(this._surfaceLightMaterial.glmaterial, 0, 100, true);
        this._scene.scene.beginAnimation(this._surfaceLight._gllight, 0, 100, false, 1.0, () => this.eventOnActiveHandlerEnd(this.eventOnActiveHandlerEndSender));
    }
}
class AllowedColor {
    constructor(_defaultKey, _colorNames) {
        this._defaultKey = _defaultKey;
        this._colorNames = _colorNames;
    }
}
class AllowedTexture {
    constructor(strTexturePath, uScale, vScale) {
        this.strTexturePath = strTexturePath;
        this.uScale = uScale;
        this.vScale = vScale;
    }
}
class ConfigurationManager {
    constructor() {
        this._initialisables = new Set();
    }
    static instance() {
        if (this._instance == null) {
            this._instance = new ConfigurationManager();
        }
        return this._instance;
    }
    RegisterInitialisable(initialisable) {
        this._initialisables.add(initialisable);
    }
    UnregisterInitialisable(initialisable) {
        this._initialisables.delete(initialisable);
    }
    ApplyDefaults() {
        MeetLogger.LogInfoMessage("Configuration Manager : Apply Default");
        this._initialisables.forEach(initialisable => {
            initialisable.ApplyDefault();
        });
        MeetLogger.LogInfoMessage("Configuration Manager : Default Applied");
    }
}
ConfigurationManager._instance = null;
class ICustomisable {
}
class CustomisableMaterial extends IInitialisable {
    constructor(materials) {
        super();
        this._materials = materials;
        this._allowedColors = new Set();
    }
    AddMaterial(mat) {
        this._materials.add(mat);
    }
    ApplyDefault() {
        this._allowedColors.forEach(allowedColor => {
            if (allowedColor._colorNames.has(allowedColor._defaultKey)) {
                let defaultMaterial = allowedColor._colorNames.get(allowedColor._defaultKey);
                this._materials.forEach(material => {
                    material.CopyFrom(defaultMaterial);
                    material.ApplyColors();
                });
            }
        });
    }
    ApplyCustomisationHandler(...tests) {
        let buttonName = tests[1].target.name;
        this._allowedColors.forEach(setColors => {
            if (setColors._colorNames.has(buttonName)) {
                let expectedMaterial = setColors._colorNames.get(buttonName);
                this._materials.forEach((mat) => {
                    mat.CopyFrom(expectedMaterial);
                    mat.ApplyColors();
                });
            }
        });
    }
}
class CustomisableMaterialTexture extends IInitialisable {
    constructor(materials) {
        super();
        this.materials = materials;
        this._allowedTexture = new Map();
    }
    ApplyCustomisationHandler(...tests) {
        let buttonName = tests[1].target.name;
        this._setDiffuseFromKey(buttonName);
    }
    ApplyDefault() {
        this._setDiffuseFromKey(this._defaultKey);
    }
    _setDiffuseFromKey(strKey) {
        let selectedTexture = this._allowedTexture.get(strKey);
        if (selectedTexture != null) {
            this.materials.forEach((mat) => {
                mat.SetDiffuseTexture(selectedTexture.strTexturePath, selectedTexture.uScale, selectedTexture.vScale);
            });
        }
    }
}
class ISceneObjectLoaded {
    constructor(meetScene) {
        this._meetScene = meetScene;
        this._meshes = new Set();
    }
}
let g_SOLFromFile;
class ISceneObjectLoadedFromFile extends ISceneObjectLoaded {
    constructor(_meetScene) {
        super(_meetScene);
        g_SOLFromFile = this;
    }
    _loadBabylonFile(modelFolderPath, modelFileName, scene) {
        BABYLON.SceneLoader.ImportMesh("", modelFolderPath, modelFileName, scene, this._loadBabylonFileOnSucces);
    }
}
class IGLMaterial {
    constructor(colorOptions) {
        this.diffuse = null;
        this.specular = null;
        this.emissive = null;
        this.ambient = null;
        this.specularPower = null;
        this.diffuseTexture = null;
        if (colorOptions.diffuse)
            this.diffuse = colorOptions.diffuse;
        if (colorOptions.specular)
            this.specular = colorOptions.specular;
        if (colorOptions.emissive)
            this.emissive = colorOptions.emissive;
        if (colorOptions.ambient)
            this.ambient = colorOptions.ambient;
        if (colorOptions.specularPower)
            this.specularPower = colorOptions.specularPower;
        if (colorOptions.diffuseTexture != null)
            this.diffuseTexture = colorOptions.diffuseTexture;
    }
}
class GLMaterial extends IGLMaterial {
    CopyFrom(fromMat) {
        this.diffuse = fromMat.diffuse;
        this.emissive = fromMat.emissive;
        this.ambient = fromMat.ambient;
        this.specular = fromMat.specular;
        this.specularPower = fromMat.specularPower;
        this.diffuseTexture = fromMat.diffuseTexture;
    }
}
class GLBabylonMaterial extends GLMaterial {
    constructor(glmaterial) {
        super({});
        this.glmaterial = glmaterial;
    }
    SetDiffuseTexture(strTexturePath, uScale, vScale) {
        this.glmaterial.diffuseTexture = new BABYLON.Texture(strTexturePath, null);
        this.glmaterial.diffuseTexture.uScale = uScale;
        this.glmaterial.diffuseTexture.vScale = vScale;
    }
    ApplyColors() {
        if (this.diffuse) {
            this.glmaterial.diffuseColor = ColorRGBBabylon.FromColorRGB(this.diffuse);
        }
        if (this.emissive) {
            this.glmaterial.emissiveColor = ColorRGBBabylon.FromColorRGB(this.emissive);
        }
        if (this.ambient) {
            this.glmaterial.ambientColor = ColorRGBBabylon.FromColorRGB(this.ambient);
        }
        if (this.specular) {
            this.glmaterial.specularColor = ColorRGBBabylon.FromColorRGB(this.specular);
        }
        if (this.diffuseTexture != null) {
            if (this.diffuseTexture == "") {
                this.glmaterial.useAlphaFromDiffuseTexture = false;
                this.glmaterial.diffuseTexture = null;
                this.glmaterial.ambientTexture = null;
            }
            else {
                this.glmaterial.diffuseTexture = new BABYLON.Texture(this.diffuseTexture, null);
                this.glmaterial.ambientTexture = new BABYLON.Texture(this.diffuseTexture, null);
            }
        }
    }
}
class ColorRGB {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
class SOLSphere extends ISceneObjectLoaded {
    constructor(_meetScene) {
        super(_meetScene);
    }
    LoadObject() {
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 20 }, this._meetScene.scene);
        sphere.position.y = 10;
        let mat = new BABYLON.StandardMaterial("matSphere", this._meetScene.scene);
        mat.specularPower = 100;
        mat.diffuseColor = new BABYLON.Color3(1 / 255, 73 / 255, 155 / 255);
        mat.specularColor = new BABYLON.Color3(0, 0, 0);
        sphere.material = mat;
        this.customisableMaterial = new CustomisableMaterial(new Set().add(new GLBabylonMaterial(mat)));
        this.customisableMaterial._allowedColors.add(new AllowedColor("Vernis", new Map().set("Vernis", new IGLMaterial({ specular: new ColorRGB(1, 1, 1) }))
            .set("Brut", new IGLMaterial({ specular: new ColorRGB(0.01, 0.01, 0.01) }))));
        this.customisableMaterial._allowedColors.add(new AllowedColor("Bleu", new Map().set("Bleu", new IGLMaterial({ diffuse: new ColorRGB(1 / 255, 73 / 255, 155 / 255) }))
            .set("Noir", new IGLMaterial({ diffuse: new ColorRGB(20 / 255, 20 / 255, 24 / 255) }))
            .set("Rouge", new IGLMaterial({ diffuse: new ColorRGB(167 / 255, 4 / 255, 15 / 255) }))));
        this._meshes.add(sphere);
    }
}
class SOLVeilleuse extends ISceneObjectLoadedFromFile {
    constructor(_meetScene) {
        super(_meetScene);
        this.customisableMaterial = new CustomisableMaterial(new Set());
        this._mainLight = null;
    }
    LoadObject(onObjectLoaded, sender) {
        this._onObjectLoaded = onObjectLoaded;
        this._onObjectLoadedSender = sender;
        this._loadBabylonFile("assets/3D/", "lampe3.babylon", this._meetScene.scene);
    }
    _loadBabylonFileOnSucces(newMeshes) {
        var tissuLight = new BABYLON.SpotLight("tissuLight", new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, -1), Math.PI * 0.95, 0.04, g_SOLFromFile._meetScene.scene);
        let lightMesh = null;
        let tissuMesh = null;
        var gl = new BABYLON.GlowLayer("glow", g_SOLFromFile._meetScene.scene);
        newMeshes.forEach((mesh) => {
            g_SOLFromFile._meshes.add(mesh);
            mesh.position = new BABYLON.Vector3(mesh.position.x + 8.5, mesh.position.y + 0, mesh.position.z - 8.5);
            if (mesh.name == "ampoule") {
                lightMesh = mesh;
                mesh.material.subMaterials[0].emissiveColor = MEET_LIGHT_COLOR;
                mesh.material.emissiveTexture = null;
                tissuLight.position.x = 0;
                tissuLight.position.y = 8.5;
                tissuLight.position.z = -10;
                tissuLight.intensityMode = BABYLON.Light.INTENSITYMODE_LUMINOUSPOWER;
                tissuLight.diffuse = MEET_LIGHT_COLOR;
                tissuLight.intensity = MEET_LIGHT_INTENSITY;
                tissuLight.specular = new BABYLON.Color3(0, 0, 0);
            }
            else if (mesh.name == "tissu") {
                tissuMesh = mesh;
                let tissuMeshMat = mesh.material;
                tissuMeshMat.opacityTexture = new BABYLON.Texture("./assets/3D/tissuAlpha.png", g_SOLFromFile._meetScene.scene);
                tissuMeshMat.opacityTexture.getAlphaFromRGB = true;
                tissuMeshMat.emissiveColor = MEET_LIGHT_COLOR_TISSU;
                tissuMeshMat.emissiveTexture = new BABYLON.Texture("./assets/3D/tissu_savane_emissive.jpg", g_SOLFromFile._meetScene.scene);
                tissuMeshMat.emissiveTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
                tissuMeshMat.emissiveTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
                gl.intensity = 0.8;
                gl.blurKernelSize = 20;
            }
            else {
                g_SOLFromFile.customisableMaterial.AddMaterial(new GLBabylonMaterial(mesh.material));
                mesh.material.bumpTexture = new BABYLON.Texture("./assets/3D/AT_sayo_wood_NormalMap.png", g_SOLFromFile._meetScene.scene);
                mesh.material.invertNormalMapX = true;
                mesh.material.invertNormalMapY = true;
                mesh.material.specularTexture = null;
                mesh.material.specularPower = 7;
            }
        });
        g_SOLFromFile._mainLight = new ActionCustomisableDiffuseSurfaceLight(tissuLight, tissuMesh.material, lightMesh.material.subMaterials[0], g_SOLFromFile._meetScene);
        g_SOLFromFile._initialiseCustomisable();
        g_SOLFromFile._onObjectLoaded(g_SOLFromFile._onObjectLoadedSender);
    }
    _initialiseCustomisable() {
        this._meetScene.objectLoaded = g_SOLFromFile;
        this.customisableMaterial._allowedColors.add(new AllowedColor("Vernis", new Map()
            .set("Vernis", new IGLMaterial({ diffuse: new ColorRGB(1, 255 / 255, 255 / 255),
            specular: new ColorRGB(0.2, 0.2, 0.2), specularPower: 10,
            diffuseTexture: "./assets/3D/AT_sayo_wood_DIFF.jpg" }))
            .set("Brut", new IGLMaterial({ diffuse: new ColorRGB(1, 255 / 255, 255 / 255), specular: new ColorRGB(0.01, 0.01, 0.01),
            diffuseTexture: "./assets/3D/AT_sayo_wood_DIFF.jpg" }))
            .set("Violet", new IGLMaterial({ diffuse: new ColorRGB(90 / 255, 25 / 255, 59 / 255), specular: new ColorRGB(0.1, 0.1, 0.1), specularPower: 12,
            diffuseTexture: "" }))));
        let mainLight = this._mainLight;
        mainLight._defaultKey = "Savane";
        let allowedProperties = new Map().set("Savane", new AllowedDiffuseSurfaceProperty(new IGLMaterialDiffuser({
            diffuseTexture: "./assets/3D/tissu_savane.jpg",
            emissiveTexture: "./assets/3D/tissu_savane_emissive.jpg",
            opacityTexture: "./assets/3D/tissuAlpha.png",
            emissiveColor: MEET_LIGHT_COLOR_TISSU
        }), new IGLLight({ lightIntensity: MEET_LIGHT_INTENSITY, lightColor: MEET_LIGHT_COLOR }), MEET_LIGHT_COLOR_TISSU))
            .set("Rouge", new AllowedDiffuseSurfaceProperty(new IGLMaterialDiffuser({
            diffuseTexture: "./assets/textures/tissu_red.png",
            emissiveTexture: null,
            opacityTexture: "./assets/3D/tissuAlpha_red.png",
            emissiveColor: new ColorRGB(1 * 0.3, 0.1 * 0.3, 0)
        }), new IGLLight({ lightIntensity: MEET_LIGHT_INTENSITY, lightColor: new ColorRGB(1 * 0.3, 0.1 * 0.3, 0) }), new ColorRGB(1 * 0.3, 0.5 * 0.3, 0)))
            .set("Princesses", new AllowedDiffuseSurfaceProperty(new IGLMaterialDiffuser({
            diffuseTexture: "./assets/textures/tissu_frozen.jpg",
            emissiveTexture: "./assets/textures/tissu_frozen_emissive.jpg",
            opacityTexture: "./assets/3D/tissuAlpha.png",
            uScaleTexture: 0.8,
            vScaleTexture: 1,
            emissiveColor: MEET_LIGHT_COLOR_TISSU
        }), new IGLLight({ lightIntensity: MEET_LIGHT_INTENSITY, lightColor: MEET_LIGHT_COLOR }), MEET_LIGHT_COLOR_TISSU));
        mainLight.AllowedProperties = allowedProperties;
    }
}
class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class MeetLoadingScreen {
    constructor(_renderingCanvas, _loadingDivBackgroundColor = "black", defaultLogoUrl = "", defaultSpinnerUrl = "") {
        this._renderingCanvas = _renderingCanvas;
        this._loadingDivBackgroundColor = _loadingDivBackgroundColor;
        this.defaultLogoUrl = defaultLogoUrl;
        this.defaultSpinnerUrl = defaultSpinnerUrl;
        this._loadingText = "";
        this._resizeLoadingUI = () => {
            var canvasRect = this._renderingCanvas.getBoundingClientRect();
            var canvasPositioning = window.getComputedStyle(this._renderingCanvas).position;
            if (!this._loadingDiv) {
                return;
            }
            this._loadingDiv.style.position = (canvasPositioning === "fixed") ? "fixed" : "absolute";
            this._loadingDiv.style.left = canvasRect.left + "px";
            this._loadingDiv.style.top = canvasRect.top + "px";
            this._loadingDiv.style.width = canvasRect.width + "px";
            this._loadingDiv.style.height = canvasRect.height + "px";
        };
    }
    displayLoadingUI() {
        if (this._loadingDiv) {
            return;
        }
        this._loadingDiv = document.createElement("div");
        this._loadingDiv.id = "babylonjsLoadingDiv";
        this._loadingDiv.style.opacity = "0";
        this._loadingDiv.style.transition = "opacity 1.5s ease";
        this._loadingDiv.style.pointerEvents = "none";
        this._loadingTextDiv = document.createElement("div");
        this._loadingTextDiv.style.position = "absolute";
        this._loadingTextDiv.style.left = "0";
        this._loadingTextDiv.style.top = "50%";
        this._loadingTextDiv.style.marginTop = "80px";
        this._loadingTextDiv.style.width = "100%";
        this._loadingTextDiv.style.height = "20px";
        this._loadingTextDiv.style.fontFamily = "Arial";
        this._loadingTextDiv.style.fontSize = "14px";
        this._loadingTextDiv.style.color = "white";
        this._loadingTextDiv.style.textAlign = "center";
        this._loadingTextDiv.innerHTML = "Loading";
        this._loadingDiv.appendChild(this._loadingTextDiv);
        this._loadingTextDiv.innerHTML = this._loadingText;
        var style = document.createElement('style');
        style.type = 'text/css';
        var keyFrames = `@-webkit-keyframes spin1 {\
                    0% { -webkit-transform: rotate(0deg);}
                    100% { -webkit-transform: rotate(360deg);}
                }\
                @keyframes spin1 {\
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }`;
        style.innerHTML = keyFrames;
        document.getElementsByTagName('head')[0].appendChild(style);
        const svgSupport = !!window.SVGSVGElement;
        var imgBack = new Image();
        if (!this.defaultLogoUrl) {
            imgBack.src = !svgSupport ? "https://cdn.babylonjs.com/Assets/babylonLogo.png" : `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxODAuMTcgMjA4LjA0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6I2UwNjg0Yjt9LmNscy0ze2ZpbGw6I2JiNDY0Yjt9LmNscy00e2ZpbGw6I2UwZGVkODt9LmNscy01e2ZpbGw6I2Q1ZDJjYTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkJhYnlsb25Mb2dvPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iUGFnZV9FbGVtZW50cyIgZGF0YS1uYW1lPSJQYWdlIEVsZW1lbnRzIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik05MC4wOSwwLDAsNTJWMTU2bDkwLjA5LDUyLDkwLjA4LTUyVjUyWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxODAuMTcgNTIuMDEgMTUxLjk3IDM1LjczIDEyNC44NSA1MS4zOSAxNTMuMDUgNjcuNjcgMTgwLjE3IDUyLjAxIi8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjI3LjEyIDY3LjY3IDExNy4yMSAxNS42NiA5MC4wOCAwIDAgNTIuMDEgMjcuMTIgNjcuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iNjEuODkgMTIwLjMgOTAuMDggMTM2LjU4IDExOC4yOCAxMjAuMyA5MC4wOCAxMDQuMDIgNjEuODkgMTIwLjMiLz48cG9seWdvbiBjbGFzcz0iY2xzLTMiIHBvaW50cz0iMTUzLjA1IDY3LjY3IDE1My4wNSAxNDAuMzcgOTAuMDggMTc2LjcyIDI3LjEyIDE0MC4zNyAyNy4xMiA2Ny42NyAwIDUyLjAxIDAgMTU2LjAzIDkwLjA4IDIwOC4wNCAxODAuMTcgMTU2LjAzIDE4MC4xNyA1Mi4wMSAxNTMuMDUgNjcuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTMiIHBvaW50cz0iOTAuMDggNzEuNDYgNjEuODkgODcuNzQgNjEuODkgMTIwLjMgOTAuMDggMTA0LjAyIDExOC4yOCAxMjAuMyAxMTguMjggODcuNzQgOTAuMDggNzEuNDYiLz48cG9seWdvbiBjbGFzcz0iY2xzLTQiIHBvaW50cz0iMTUzLjA1IDY3LjY3IDExOC4yOCA4Ny43NCAxMTguMjggMTIwLjMgOTAuMDggMTM2LjU4IDkwLjA4IDE3Ni43MiAxNTMuMDUgMTQwLjM3IDE1My4wNSA2Ny42NyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtNSIgcG9pbnRzPSIyNy4xMiA2Ny42NyA2MS44OSA4Ny43NCA2MS44OSAxMjAuMyA5MC4wOCAxMzYuNTggOTAuMDggMTc2LjcyIDI3LjEyIDE0MC4zNyAyNy4xMiA2Ny42NyIvPjwvZz48L2c+PC9zdmc+`;
        }
        else {
            imgBack.src = this.defaultLogoUrl;
        }
        imgBack.style.position = "absolute";
        imgBack.style.left = "40%";
        imgBack.style.top = "40%";
        imgBack.style.width = "20%";
        imgBack.style.height = "20%";
        var imgSpinner = new Image();
        if (!this.defaultSpinnerUrl) {
            imgSpinner.src = !svgSupport ? "https://cdn.babylonjs.com/Assets/loadingIcon.png" :
                `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzOTIgMzkyIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2UwNjg0Yjt9LmNscy0ye2ZpbGw6bm9uZTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlNwaW5uZXJJY29uPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iU3Bpbm5lciI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDAuMjEsMTI2LjQzYzMuNy03LjMxLDcuNjctMTQuNDQsMTItMjEuMzJsMy4zNi01LjEsMy41Mi01YzEuMjMtMS42MywyLjQxLTMuMjksMy42NS00LjkxczIuNTMtMy4yMSwzLjgyLTQuNzlBMTg1LjIsMTg1LjIsMCwwLDEsODMuNCw2Ny40M2EyMDgsMjA4LDAsMCwxLDE5LTE1LjY2YzMuMzUtMi40MSw2Ljc0LTQuNzgsMTAuMjUtN3M3LjExLTQuMjgsMTAuNzUtNi4zMmM3LjI5LTQsMTQuNzMtOCwyMi41My0xMS40OSwzLjktMS43Miw3Ljg4LTMuMywxMi00LjY0YTEwNC4yMiwxMDQuMjIsMCwwLDEsMTIuNDQtMy4yMyw2Mi40NCw2Mi40NCwwLDAsMSwxMi43OC0xLjM5QTI1LjkyLDI1LjkyLDAsMCwxLDE5NiwyMS40NGE2LjU1LDYuNTUsMCwwLDEsMi4wNSw5LDYuNjYsNi42NiwwLDAsMS0xLjY0LDEuNzhsLS40MS4yOWEyMi4wNywyMi4wNywwLDAsMS01Ljc4LDMsMzAuNDIsMzAuNDIsMCwwLDEtNS42NywxLjYyLDM3LjgyLDM3LjgyLDAsMCwxLTUuNjkuNzFjLTEsMC0xLjkuMTgtMi44NS4yNmwtMi44NS4yNHEtNS43Mi41MS0xMS40OCwxLjFjLTMuODQuNC03LjcxLjgyLTExLjU4LDEuNGExMTIuMzQsMTEyLjM0LDAsMCwwLTIyLjk0LDUuNjFjLTMuNzIsMS4zNS03LjM0LDMtMTAuOTQsNC42NHMtNy4xNCwzLjUxLTEwLjYsNS41MUExNTEuNiwxNTEuNiwwLDAsMCw2OC41Niw4N0M2Ny4yMyw4OC40OCw2Niw5MCw2NC42NCw5MS41NnMtMi41MSwzLjE1LTMuNzUsNC43M2wtMy41NCw0LjljLTEuMTMsMS42Ni0yLjIzLDMuMzUtMy4zMyw1YTEyNywxMjcsMCwwLDAtMTAuOTMsMjEuNDksMS41OCwxLjU4LDAsMSwxLTMtMS4xNVM0MC4xOSwxMjYuNDcsNDAuMjEsMTI2LjQzWiIvPjxyZWN0IGNsYXNzPSJjbHMtMiIgd2lkdGg9IjM5MiIgaGVpZ2h0PSIzOTIiLz48L2c+PC9nPjwvc3ZnPg==`;
        }
        else {
            imgSpinner.src = this.defaultSpinnerUrl;
        }
        imgSpinner.style.position = "absolute";
        imgSpinner.style.left = "30%";
        imgSpinner.style.top = "30%";
        imgSpinner.style.width = "40%";
        imgSpinner.style.height = "40%";
        imgSpinner.style.animation = "spin1 0.75s infinite linear";
        imgSpinner.style.webkitAnimation = "spin1 0.75s infinite linear";
        imgSpinner.style.transformOrigin = "50% 50%";
        imgSpinner.style.webkitTransformOrigin = "50% 50%";
        const logoSize = { w: 16, h: 18.5 };
        const loadingSize = { w: 30, h: 30 };
        imgBack.style.width = `${logoSize.w}vh`;
        imgBack.style.height = `${logoSize.h}vh`;
        imgBack.style.left = `calc(50% - ${logoSize.w / 2}vh)`;
        imgBack.style.top = `calc(50% - ${logoSize.h / 2}vh)`;
        imgSpinner.style.width = `${loadingSize.w}vh`;
        imgSpinner.style.height = `${loadingSize.h}vh`;
        imgSpinner.style.left = `calc(50% - ${loadingSize.w / 2}vh)`;
        imgSpinner.style.top = `calc(50% - ${loadingSize.h / 2}vh)`;
        this._loadingDiv.appendChild(imgBack);
        this._loadingDiv.appendChild(imgSpinner);
        this._resizeLoadingUI();
        window.addEventListener("resize", this._resizeLoadingUI);
        this._loadingDiv.style.backgroundColor = this._loadingDivBackgroundColor;
        document.body.appendChild(this._loadingDiv);
        this._loadingDiv.style.opacity = "1";
    }
    hideLoadingUI() {
        if (!this._loadingDiv) {
            return;
        }
        var onTransitionEnd = () => {
            if (!this._loadingDiv) {
                return;
            }
            if (this._loadingDiv.parentElement) {
                this._loadingDiv.parentElement.removeChild(this._loadingDiv);
            }
            window.removeEventListener("resize", this._resizeLoadingUI);
            this._loadingDiv = null;
        };
        this._loadingDiv.style.opacity = "0";
        this._loadingDiv.addEventListener("transitionend", onTransitionEnd);
    }
    set loadingUIText(text) {
        this._loadingText = text;
        if (this._loadingTextDiv) {
            this._loadingTextDiv.innerHTML = this._loadingText;
        }
    }
    get loadingUIText() {
        return this._loadingText;
    }
    get loadingUIBackgroundColor() {
        return this._loadingDivBackgroundColor;
    }
    set loadingUIBackgroundColor(color) {
        this._loadingDivBackgroundColor = color;
        if (!this._loadingDiv) {
            return;
        }
        this._loadingDiv.style.backgroundColor = this._loadingDivBackgroundColor;
    }
}
class IButton {
    constructor(anchorMeshIn) {
        this.positionLocal = new Vector2D(0, 0);
        this.positionWorld = new Vector2D(0, 0);
        this.isClicked = false;
        this.anchorMesh = anchorMeshIn;
    }
    get isClicked() {
        return this._isClicked;
    }
    set isClicked(value) {
        this._isClicked = value;
        if (this.guiButton != null) {
            this.guiButton.DisplayIsClicked(this._isClicked);
        }
    }
    InitialiseButton() {
        GuiFactoryManager.Instance().GetCenterMenu(null).AddButton(this.guiButton);
        this.guiButton.SetAnchor(this.anchorMesh);
    }
    SetPosition(xLocal, yLocal, postionParent) {
        this.positionLocal = new Vector2D(xLocal, yLocal);
        this.positionWorld = new Vector2D(Math.floor(xLocal + postionParent.x), Math.floor(yLocal + postionParent.y));
        this.guiButton.SetPosition(this.positionWorld);
    }
}
class GuiFactoryManager {
    static Instance() {
        if (this._factory == null) {
            this._factory = new GuiFactoryBabylon();
        }
        return GuiFactoryManager._factory;
    }
}
GuiFactoryManager._factory = null;
class IButtonImg extends IButton {
    constructor(anchorMesh, strName, strTexturePath) {
        super(anchorMesh);
        this.strTexturePath = strTexturePath;
        this.guiButton = GuiFactoryManager.Instance().
            CreateGuiImageButton(strName, strTexturePath);
        super.InitialiseButton();
    }
}
class ActionButtonImg extends IButtonImg {
    constructor(anchorMesh, strName, strTexturePath, strTexturePathClicked, actionbtns) {
        super(anchorMesh, strName, strTexturePath);
        this.strTexturePathClicked = strTexturePathClicked;
        this.isClickedDone = true;
        this.actionSenders = actionbtns;
        this.guiButton.AddEventOnClick(this.OnClicked, this);
        actionbtns.forEach((actionbtn) => {
            actionbtn.InitiliseCallback(this.OnClickedDone, this);
        });
    }
    get isClicked() {
        return this._isClicked;
    }
    set isClicked(value) {
        this._isClicked = value;
        if (this.guiButton != null) {
            this.guiButton.DisplayIsClicked(this.isClickedDone == false);
        }
    }
    OnProgress(progressPercentage) {
        throw new Error("Method not implemented.");
    }
    OnClicked() {
        this.isClickedDone = false;
        if (this.isClicked) {
            this.isClicked = false;
            this.actionSenders.forEach(actionSender => {
                actionSender.eventOnActiveHandler();
            });
        }
        else {
            this.isClicked = true;
            this.actionSenders.forEach(actionSender => {
                actionSender.eventOnDesactivateHandler();
            });
        }
    }
    OnClickedDone(sender) {
        if (sender.isClicked) {
            sender.guiButton.ChangePicture(sender.strTexturePathClicked);
        }
        else {
            sender.guiButton.ChangePicture(sender.strTexturePath);
        }
        sender.isClickedDone = true;
        sender.isClicked = sender.isClicked;
    }
}
class ActionButtonText extends IButton {
    constructor(anchorMesh, strName, strLabel) {
        super(anchorMesh);
        this.guiButton = GuiFactoryManager.Instance().
            CreateGuiTextButton(strName, strLabel);
        super.InitialiseButton();
    }
    OnProgress(progressPercentage) {
        throw new Error("Method not implemented.");
    }
    OnClicked() {
        if (this.isClicked) {
            this.eventOnDesactivateHandler();
        }
        else {
            this.eventOnActiveHandler();
        }
    }
}
class ActionButtonTextRadio extends IButton {
    constructor(anchorMesh, strName, strLabel, strGroup, radioBtnLinkerIn, configurator, isChecked = false) {
        super(anchorMesh);
        this.guiButton = GuiFactoryManager.Instance().
            CreateGuiRadioButton(strName, strLabel, strGroup, isChecked, configurator);
        this.radioBtnLinker = radioBtnLinkerIn;
        super.InitialiseButton();
    }
    get isClicked() {
        return this._isClicked;
    }
    set isClicked(value) {
        this._isClicked = value;
    }
    OnProgress(progressPercentage) {
        throw new Error("Method not implemented.");
    }
    OnClicked() {
        throw new Error("Method not implemented.");
    }
}
class GuiButtonBabylon {
    constructor(newButton) {
        this.control = newButton;
        this.control.isFocusInvisible = false;
    }
    IsVisible(isVisible) {
        this.control.isVisible = isVisible;
        if (this.control.isVisible) {
            this.control.alpha = 1;
        }
        else {
            this.control.alpha = 0;
        }
    }
    AddEventOnClick(eventOnPointClicked, sender) {
        this.control.onPointerClickObservable.add(eventOnPointClicked);
        this.control.onPointerClickObservable.observers[0].scope = sender;
    }
    SetAnchor(anchorMesh) {
        this.control.linkWithMesh(anchorMesh);
    }
    SetPosition(position) {
        this.control.linkOffsetX = position.x;
        this.control.linkOffsetY = position.y;
    }
    DisplayIsClicked(isClicked) {
        if (isClicked) {
            ;
            this.control.background = "#ffffff66";
        }
        else {
            ;
            this.control.background = "white";
        }
    }
    ChangePicture(strPath) {
        ;
        this.control.image.source = strPath;
    }
}
class IGuiPanel {
}
class GuiScreenBabylon {
    constructor(screen) {
        this._screen = screen;
    }
    AddButton(control) {
        this._screen.addControl(control.control);
    }
}
class GuiPanelBabylon {
    constructor(panel) {
        this.control = panel;
    }
    SetPosition(position) {
        this.control.linkOffsetX = position.x;
        this.control.linkOffsetY = position.y;
    }
    SetAnchor(anchorMesh) {
        this.control.linkWithMesh(anchorMesh);
    }
    AddControl(control) {
        this.control.addControl(control.control);
    }
}
class GuiFactoryBabylon {
    constructor() {
        this._screenGui = null;
    }
    CreateGuiTextButton(strName, strLabel) {
        var button = BABYLON.GUI.Button.CreateSimpleButton("btn" + strName, strLabel);
        button.width = 0.2;
        button.height = "40px";
        button.cornerRadius = 20;
        button.color = "white";
        button.background = "green";
        button.color = "Orange";
        button.thickness = 4;
        button.background = "green";
        button.hoverCursor = "pointer";
        button.isPointerBlocker = true;
        let buttonBabylon = new GuiButtonBabylon(button);
        return buttonBabylon;
    }
    CreateGuiRadioButton(strName, strLabel, strGroup, isChecked, configurator) {
        var button = new BABYLON.GUI.RadioButton();
        button.name = strName;
        button.width = "24px";
        button.height = "24px";
        button.color = "#fd7e14ff";
        button.background = "#ffffff66";
        button.isChecked = isChecked;
        button.group = strGroup;
        if (configurator != null) {
            button.onPointerClickObservable.add(configurator.ApplyCustomisationHandler);
            button.onPointerClickObservable.observers[0].scope = configurator;
        }
        let header = BABYLON.GUI.Control.AddHeader(button, strLabel, "150px", { isHorizontal: true, controlFirst: true });
        header.height = "30px";
        header.paddingLeft = "30px";
        header.color = "white";
        let buttonBabylon = new GuiButtonBabylon(header);
        return buttonBabylon;
    }
    CreateGuiImageButton(strLabel, texturePath) {
        var button = BABYLON.GUI.Button.CreateImageOnlyButton(strLabel, texturePath);
        button.width = "32px";
        button.height = "32px";
        button.left = "10px";
        button.color = "white";
        button.cornerRadius = 20;
        button.background = "#ffffff66";
        button.hoverCursor = "pointer";
        let buttonBabylon = new GuiButtonBabylon(button);
        return buttonBabylon;
    }
    GetCenterMenu(scene) {
        if (this._screenGui == null) {
            this._screenGui = new GuiScreenBabylon(BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("centerMenu", true, scene));
        }
        return this._screenGui;
    }
    CreatePanel() {
        let panel = new GuiPanelBabylon(new BABYLON.GUI.StackPanel());
        return panel;
    }
}
class IGuiButton {
}
class GuiControlBabylon {
}
class IMenu extends IButtonImg {
    constructor(anchorMesh, strName, strTexturePath, displayVectorIn, subMenusIn) {
        super(anchorMesh, strName, strTexturePath);
        this.displayVector = displayVectorIn;
        this.subMenus = subMenusIn;
        this.Close();
        this.ComputeButtonPositions();
        this.guiButton.AddEventOnClick(this.OnClicked, this);
    }
    Open() {
        this.subMenus.forEach(x => {
            x.guiButton.IsVisible(true);
        });
        this.isClicked = true;
    }
    Close() {
        this.subMenus.forEach(x => {
            if (x instanceof IMenu) {
                x.Close();
            }
            x.guiButton.IsVisible(false);
            x.isClicked = false;
        });
        this.isClicked = false;
    }
    OnClicked() {
        if (this.isClicked) {
            this.Close();
        }
        else {
            this.Open();
        }
    }
    SetPosition(x, y, positionParent) {
        super.SetPosition(x, y, positionParent);
        this.ComputeButtonPositions();
    }
}
class RadioBtnLinker {
    constructor(panelIn) {
        this.radioButtons = new Set();
    }
    RegisterRadioBtn(radioBtn) {
        this.radioButtons.add(radioBtn);
    }
}
class MenuCircle extends IMenu {
    constructor(anchorMesh, strNameIn, strTexturePathIn, displayVectorIn, subMenusIn) {
        super(anchorMesh, strNameIn, strTexturePathIn, displayVectorIn, subMenusIn);
    }
    ComputeButtonPositions() {
        if (this.subMenus.length != 0) {
            let stepAngle = 2 * Math.PI / this.subMenus.length;
            let decalAngleFromDirection = Math.atan2(this.displayVector.y, this.displayVector.x);
            let normeSquare = this.displayVector.x * this.displayVector.x + this.displayVector.y * this.displayVector.y;
            let norme = 1;
            if (normeSquare != 0) {
                norme = Math.sqrt(normeSquare);
            }
            let x = 0, y = 0;
            for (let i = 0; i < this.subMenus.length; i++) {
                x = Math.cos(i * stepAngle + decalAngleFromDirection) * norme;
                y = Math.sin(i * stepAngle + decalAngleFromDirection) * norme;
                this.subMenus[i].SetPosition(x, y, this.positionWorld);
            }
        }
    }
    OnProgress(progressPercentage) {
        throw new Error("Method not implemented.");
    }
}
class MenuLine extends IMenu {
    constructor(anchorMesh, strNameIn, strTexturePathIn, displayVectorIn, subMenusIn) {
        super(anchorMesh, strNameIn, strTexturePathIn, displayVectorIn, subMenusIn);
    }
    ComputeButtonPositions() {
        if (this.subMenus.length != 0) {
            let x = 0, y = 0;
            for (let i = 0; i < this.subMenus.length; i++) {
                x = (i + 1) * this.displayVector.x;
                y = (i + 1) * this.displayVector.y;
                this.subMenus[i].SetPosition(x, y, this.positionWorld);
            }
        }
    }
    OnProgress(progressPercentage) {
        throw new Error("Method not implemented.");
    }
}
