class IButton {
    /**
     *
     */
    constructor(anchorMeshIn) {
        this.positionLocal = new Vector2D(0, 0);
        this.positionWorld = new Vector2D(0, 0);
        this.isClicked = false;
        this.anchorMesh = anchorMeshIn;
    }
    get isClicked() {
        return this._isClicked;
    }
    // override
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
/// <reference path="IButton.ts" />
class IButtonImg extends IButton {
    constructor(anchorMesh, strName, strTexturePath) {
        super(anchorMesh);
        this.guiButton = GuiFactoryManager.Instance().
            CreateGuiImageButton(strName, strTexturePath);
        super.InitialiseButton();
    }
}
/// <reference path="./IButtonImg.ts" />
class ActionButtonImg extends IButtonImg //implements IActionButton
 {
    /**
     *
     */
    constructor(anchorMesh, strName, strTexturePath, actionbtns) {
        super(anchorMesh, strName, strTexturePath);
        this.actionSenders = actionbtns;
        this.guiButton.AddEventOnClick(this.OnClicked, this);
    }
    OnProgress(progressPercentage) {
        throw new Error("Method not implemented.");
    }
    OnClicked() {
        if (this.isClicked) {
            this.actionSenders.forEach(actionSender => {
                actionSender.eventOnActiveHandler();
            });
        }
        else {
            this.actionSenders.forEach(actionSender => {
                actionSender.eventOnDesactivateHandler();
            });
        }
    }
}
/// <reference path="./IButton.ts" />
class ActionButtonText extends IButton {
    /**
     *
     */
    constructor(anchorMesh, strName, strLabel) {
        super(anchorMesh);
        this.guiButton = GuiFactoryManager.Instance().
            CreateGuiTextButton(strName, strLabel);
        super.InitialiseButton();
    }
    //#region Ibutton héritage
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
/// <reference path="./IRadioBtn.ts" />
class ActionButtonTextRadio extends IButton {
    /**
     *
     */
    constructor(anchorMesh, strName, strLabel, strGroup, radioBtnLinkerIn, configurator, isChecked = false) {
        super(anchorMesh);
        this.guiButton = GuiFactoryManager.Instance().
            CreateGuiRadioButton(strName, strLabel, strGroup, isChecked, configurator);
        this.radioBtnLinker = radioBtnLinkerIn;
        super.InitialiseButton();
    }
    //override
    get isClicked() {
        return this._isClicked;
    }
    // override
    set isClicked(value) {
        this._isClicked = value;
    }
    //   header : IGuiControl ;
    OnProgress(progressPercentage) {
        throw new Error("Method not implemented.");
    }
    OnClicked() {
        throw new Error("Method not implemented.");
    }
}
/// <reference path="d:/dev/js_reference/babylon.d.ts" />
/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />
class GuiButtonBabylon {
    /**
     *
     */
    constructor(newButton) {
        this.control = newButton;
    }
    IsVisible(isVisible) {
        this.control.isVisible = isVisible;
    }
    AddEventOnClick(eventOnPointClicked, sender) {
        this.control.onPointerClickObservable.add(eventOnPointClicked);
        this.control.onPointerClickObservable.observers[0].scope = sender;
    }
    // permet de lier le boutton à un repère 3D et suit son mouvement
    SetAnchor(anchorMesh) {
        this.control.linkWithMesh(anchorMesh);
    }
    SetPosition(position) {
        this.control.linkOffsetX = position.x;
        this.control.linkOffsetY = position.y;
    }
    DisplayIsClicked(isClicked) {
        if (isClicked) {
            this.control.background = "#ffffff66";
        }
        else {
            this.control.background = "white";
        }
    }
}
class ICustomisable {
}
/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />
/// <reference path="./Configurator/ICustomisable.ts" />
/// <reference path="./IButtonImg.ts" />
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
    ;
    CreateGuiRadioButton(strName, strLabel, strGroup, isChecked, configurator) {
        var button = new BABYLON.GUI.RadioButton();
        button.name = strName;
        button.width = "16px";
        button.height = "16px";
        button.color = "#fd7e14ff";
        button.background = "#ffffff66";
        button.isChecked = isChecked;
        button.group = strGroup;
        if (configurator != null) {
            button.onPointerClickObservable.add(configurator.ApplyCustomisationHandler);
            button.onPointerClickObservable.observers[0].scope = configurator;
        }
        // ajout le label   
        let header = BABYLON.GUI.Control.AddHeader(button, strLabel, "100px", { isHorizontal: true, controlFirst: true });
        header.height = "30px";
        header.paddingLeft = "30px";
        header.color = "white";
        let buttonBabylon = new GuiButtonBabylon(header);
        return buttonBabylon;
    }
    CreateGuiImageButton(strLabel, texturePath) {
        var button = BABYLON.GUI.Button.CreateImageOnlyButton(strLabel, texturePath);
        // style
        button.width = "32px";
        button.height = "32px";
        button.color = "white";
        button.cornerRadius = 20;
        button.background = "#ffffff66";
        button.hoverCursor = "pointer";
        let buttonBabylon = new GuiButtonBabylon(button);
        return buttonBabylon;
    }
    ;
    GetCenterMenu(scene) {
        if (this._screenGui == null) {
            this._screenGui = new GuiScreenBabylon(BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("centerMenu", true, scene));
        }
        return this._screenGui;
    }
    CreatePanel() {
        let panel = new GuiPanelBabylon(new BABYLON.GUI.StackPanel);
        return panel;
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
class GuiPanelBabylon {
    // _panel : BABYLON.GUI.StackPanel;
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
class GuiScreenBabylon {
    /**
     *
     */
    constructor(screen) {
        this._screen = screen;
    }
    AddButton(control) {
        this._screen.addControl(control.control);
    }
}
class IGuiButton {
}
class GuiControlBabylon {
}
/// <reference path="Configurator/ICustomisable.ts" />
class IGuiPanel {
}
// drag and drop 
// https://www.babylonjs-playground.com/#CNT1E0#1
class IMenu extends IButtonImg {
    constructor(anchorMesh, strName, strTexturePath, displayVectorIn, subMenusIn) {
        super(anchorMesh, strName, strTexturePath);
        this.displayVector = displayVectorIn;
        this.subMenus = subMenusIn;
        this.Close();
        this.ComputeButtonPositions();
        this.guiButton.AddEventOnClick(this.OnClicked, this);
    }
    // ouvre le menu en affichant les sous boutons
    Open() {
        this.subMenus.forEach(x => {
            x.guiButton.IsVisible(true);
        });
        this.isClicked = true;
    }
    // Ferme le menu et masquant les sous bouttons les éventuelles sous menu
    Close() {
        this.subMenus.forEach(x => {
            if (x instanceof IMenu) //  cascade close
             {
                x.Close();
            }
            x.guiButton.IsVisible(false);
            x.isClicked = false;
        }); //rof
        this.isClicked = false;
    }
    //#region  herited
    OnClicked() {
        if (this.isClicked) // isclicked state change into close/open fct
         {
            this.Close();
        }
        else {
            this.Open();
        }
    }
    SetPosition(x, y, positionParent) {
        super.SetPosition(x, y, positionParent);
        /* // recalcul la position des menu fils
         this.subMenus.forEach(element => {
             if( element instanceof  IMenu  )
             {
                (element as IMenu).ComputeButtonPositions();
             }
         });*/
        this.ComputeButtonPositions();
    }
}
class RadioBtnLinker {
    /**
     *
     */
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
    /*  Open(): void {
          throw new Error("Method not implemented.");
      }
      Close(): void {
          throw new Error("Method not implemented.");
      }*/
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
    /**
     *
     */
    constructor(anchorMesh, strNameIn, strTexturePathIn, displayVectorIn, subMenusIn) {
        super(anchorMesh, strNameIn, strTexturePathIn, displayVectorIn, subMenusIn);
    }
    ComputeButtonPositions() {
        if (this.subMenus.length != 0) {
            let x = 0, y = 0;
            for (let i = 0; i < this.subMenus.length; i++) {
                x = (i + 1) * this.displayVector.x; // i+1 -> start aside menu btn
                y = (i + 1) * this.displayVector.y;
                this.subMenus[i].SetPosition(x, y, this.positionWorld);
            }
        }
    }
    OnProgress(progressPercentage) {
        throw new Error("Method not implemented.");
    }
}
class Vector2D {
    //   x: number;
    //  y: number;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
var MEET_LIGHT_COLOR = new BABYLON.Color3(1, 200.0 / 255.0, 120.0 / 255.0);
var MEET_LIGHT_COLOR_TISSU = new BABYLON.Color3(1 * 0.3, 200.0 / 255.0 * 0.3, 120.0 / 255.0 * 0.3);
var MEET_CAMERA_RADIUS = 65;
var MEET_LIGHT_INTENSITY = 10; //120;// in lumen
// full moon sky 1
// bright sun light 110000
// typical overcast day 1000
var MEET_SKY_INTENSITY = 1; // 500;// in lux 
var MEET_ANIMATION_SPEED = 30;
var MEET_ANIMATION_LIGHT_ON_FRAME = 50;
class ColorRGB {
    /**
     *
     */
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
class ColorRGBBabylon {
    static FromColorRGB(color) {
        return new BABYLON.Color3(color.r, color.g, color.b);
    }
}
class IGLMaterial {
    /**
     *
     */
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
class IGLLight {
    /**
     *
     */
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
///<reference path="IGLLight.ts" />
class GLBabylonLight extends GLLight {
    /**
     *
     */
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
class AllowedColor {
    /**
     *
     */
    constructor(_defaultKey, _colorNames) {
        this._defaultKey = _defaultKey;
        this._colorNames = _colorNames;
    }
}
class IInitialisable {
    constructor() {
        ConfigurationManager.instance().RegisterInitialisable(this);
    }
}
/// <reference path ="./ICustomisable.ts"/>
/// <reference path ="./IInitialisable.ts"/>
/// <reference path ="./AllowedColor.ts"/>
/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />
// Contient les propriétés de customisations d'un matériel
// Material le matérial concerné
// allowed color : les couleur pouvant être appliqué. Un set pour un radio, le nom du radio est dans la key de la map
class CustomisableMaterial extends IInitialisable {
    constructor(materials) {
        super();
        this._materials = materials;
        this._allowedColors = new Set();
    }
    /**
     *
     */
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
                }); // rof each material
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
/// <reference path="../constantes.ts" />
/// <reference path="d:/dev/js_reference/babylon.d.ts" />
/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />
class MeetScene {
    ///sphere : any;
    /**
     *
     */
    constructor(renderer, onBabylonFileLoaded) {
        // Appel des variables nécéssaires
        this.renderer = renderer;
        this.scene = renderer.scene;
        //  var _this = this;
        //   thisScene = this;
        this.objectLoaded = new SOLVeilleuse(this);
        this.onFileLoaded = onBabylonFileLoaded;
        //   this._loadBabylonFile("assets/3D/", "lampe2.babylon",onBabylonFileLoaded) ;
        //EST TMP
        //  this.objectLoaded = new SOLSphere();
        this.objectLoaded.LoadObject(onBabylonFileLoaded, this.renderer);
        // Création de notre lumière principale
        //var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        // Création de la carte d'environnement
        //var hdrTexture = new BABYLON.CubeTexture("assets/textures/SpecularHDR.dds", this.scene);
        //this.scene.createDefaultSkybox(hdrTexture, true, 1000);
        this._loadManualSkybox("assets/textures/skybox/skybox");
        // brouillard
        //FOG this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
        //FOG this.scene.fogDensity = 0.001;
        //FOG this.scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
        // Ajoutons un sol pour situer la sphere dans l'espace
        this._loadGround();
        this._loadAmbientLight();
        // SHADOW_GEN  ground.receiveShadows = true;
    }
    // Prototype d'initialisation de la scène
    _initScene(engine) {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
        return scene;
    }
    /*_loadBabylonFileOnSucces(newMeshes  : any)
    {
        
        //var newMeshes = meshes;
            // SHADOW_GEN    var ampouleLight = new BABYLON.PointLight("ampouleLight", new BABYLON.Vector3(0,0,0), this.scene);
            var tissuLight = new BABYLON.SpotLight("tissuLight", new BABYLON.Vector3(0,0,0),new BABYLON.Vector3(0,0,-1),Math.PI *0.95  ,0.04, this.scene);
            this.objectLoaded._mainLight = new GLBabylonLight(tissuLight);
               
            // SHADOW_GEN    this.shadowGenerator = new BABYLON.ShadowGenerator(1024, ampouleLight);
   
               var gl = new BABYLON.GlowLayer("glow", this.scene);
                newMeshes.forEach( (mesh) =>
                {
                     // Convertit le mesh récupéré pour qu'il soit rendu en FlatShading
                   // mesh.convertToFlatShadedMesh();
                    mesh.position = new BABYLON.Vector3(mesh.position.x + 8.5,mesh.position.y+ 0,mesh.position.z -8.5);
                   
                    if( mesh.name == "ampoule") // ampoule is a multimaterial
                    {
                      
                  //     console.log( mesh.material.subMaterials() );
                 //ETS TMP       _lightMesh = mesh;
                  // SHADOW_GEN      ampouleLight.position = mesh.position.clone();
                 // SHADOW_GEN       ampouleLight.position.x = 0;
                  // SHADOW_GEN      ampouleLight.position.y= 8.5;
                  // SHADOW_GEN      ampouleLight.position.z= -3;
                  // SHADOW_GEN      ampouleLight.diffuse = MEET_LIGHT_COLOR;
                   // SHADOW_GEN     ampouleLight.intensity = 0.0;
                     mesh.material.subMaterials[0].emissiveColor =   MEET_LIGHT_COLOR;
                       mesh.material.emissiveTexture = null;
                       tissuLight.position.x = 0;
                       tissuLight.position.y= 8.5;
                       tissuLight.position.z= -10;
                       tissuLight.intensityMode = BABYLON.Light.INTENSITYMODE_LUMINOUSPOWER;
                       tissuLight.diffuse = MEET_LIGHT_COLOR;
                       tissuLight.intensity = MEET_LIGHT_INTENSITY;//ampouleLight.intensity ;//* 0.7;
                       tissuLight.specular = new BABYLON.Color3(0,0,0);
                       
   
                      // SHADOW_GEN  this.shadowGenerator.usePoissonSampling = true;
                       // SHADOW_GEN this.shadowGenerator.bias = 0.0005;
   
                    }
                    // gestion des ombres
                  //  if(mesh.name == "main" || mesh.name == "back" || mesh.name == "front")// && mesh.name != "ampoule")
                   // {
                   // SHADOW_GEN    this.shadowGenerator.getShadowMap().renderList.push(mesh);
                    // SHADOW_GEN    mesh.receiveShadows = true;
                     
   
                    //}
                    if(mesh.name == "tissu")
                    {
                      // ETS TMP  _tissu = mesh;
                     //  mesh.material.alpha = 0.5;
                        mesh.material.opacityTexture = new BABYLON.Texture("./assets/3D/tissuAlpha.png",this.scene);
                        mesh.material.opacityTexture.getAlphaFromRGB = true;
                       
                        mesh.material.emissiveColor =   MEET_LIGHT_COLOR_TISSU;
                        mesh.material.emissiveTexture  =  new BABYLON.Texture("./assets/3D/tissu_savane_emissive.jpg", this.scene);
                        
                        gl.intensity = 0.8;
                        gl.blurKernelSize = 20;
                     
                    }
                   
                }); // rof each meshes
   
                // all loaded
                this.onFileLoaded();//thisScene._tissu);
           
    }*/
    /* _loadBabylonFile(modelFolderPath : any , modelFileName : any, onBabylonFileLoaded  : any )
     {
         BABYLON.SceneLoader.ImportMesh("", modelFolderPath, modelFileName, this.scene, this._loadBabylonFileOnSucces);
 
     }*/
    // load skybox from file of 6 cube textures
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
    // load ground  
    _loadGround() {
        var materialGround = new BABYLON.StandardMaterial("groundTexture", this.scene);
        materialGround.diffuseTexture = new BABYLON.Texture("./assets/images/brick.jpg", this.scene);
        materialGround.diffuseTexture.uScale = 4.0;
        materialGround.diffuseTexture.vScale = 4.0;
        materialGround.opacityTexture = new BABYLON.Texture("./assets/textures/groundAlpha.png", this.scene);
        //  materialGround.opacityTexture.getAlphaFromRGB = true;
        materialGround.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
        // Ajoutons un sol pour situer la sphere dans l'espace
        var ground = BABYLON.Mesh.CreateGround("ground1", 400, 400, 2, this.scene);
        ground.scaling = new BABYLON.Vector3(1, 1, 1);
        ground.material = materialGround;
        this._ground = ground;
        // set customizable ground 
        this._groundCustomisable = new CustomisableMaterialTexture(new Set().add(new GLBabylonMaterial(materialGround)));
        this._groundCustomisable._defaultKey = "Brique";
        this._groundCustomisable._allowedTexture.set("Brique", new AllowedTexture("./assets/images/brick.jpg", 4, 4));
        this._groundCustomisable._allowedTexture.set("Sable", new AllowedTexture("./assets/textures/sable.jpg", 2, 2));
        this._groundCustomisable._allowedTexture.set("Bois", new AllowedTexture("./assets/3D/AT_sayo_wood_DIFF.jpg", 6, 4));
    }
    _loadAmbientLight() {
        var ambientLight = new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(100, 100, 0), this.scene);
        ambientLight.diffuse = new BABYLON.Color3(1, 1, 1);
        //ETS TMP  ambientLight.specular = new BABYLON.Color3(0.001,0.001,0.001);
        ambientLight.specular = new BABYLON.Color3(1, 1, 1);
        ambientLight.intensityMode = BABYLON.Light.INTENSITYMODE_LUMINOUSPOWER;
        ambientLight.intensity = MEET_SKY_INTENSITY;
        this._ambientLightCustom = new ActionAmbientLight(ambientLight, this);
    }
    _initialiseSunToMoonLights() {
        // intensité de la veilleuse -> allume la veilleuse
        /* var animationSunToMoonLight = new BABYLON.Animation("animationSunToMoonLight", "intensity", MEET_ANIMATION_SPEED,
         BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
 
         var keysSunToMoonLight = [];
 
         keysSunToMoonLight.push({
             frame: 0,
             value: 0,
         });
         keysSunToMoonLight.push({
             frame: MEET_ANIMATION_LIGHT_ON_FRAME,
             value: MEET_LIGHT_INTENSITY *0.5
         });
         keysSunToMoonLight.push({
            frame: MEET_ANIMATION_LIGHT_ON_FRAME +5,
            value: MEET_LIGHT_INTENSITY *0.9
        });
        keysSunToMoonLight.push({
             frame: 100,
             value: MEET_LIGHT_INTENSITY *1.2
 
         });
         animationSunToMoonLight.setKeys(keysSunToMoonLight);
 
         
         this._mainLight.animations = [];
         this._mainLight.animations.push( animationSunToMoonLight);
 
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
            value: MEET_LIGHT_COLOR_TISSU
        });
        keysSunToMoonTissu.push({
             frame: 100,
             value: MEET_LIGHT_COLOR_TISSU
 
         });
         animSunToMoonTissu.setKeys(keysSunToMoonTissu);
         this._tissu.material.animations = [];
         this._tissu.material.animations.push( animSunToMoonTissu);
 
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
         
         this._tissu.material.animations.push( animSunToMoonTissuTransparency);
 
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
            value: MEET_LIGHT_COLOR_TISSU
        });
        keysSunToMoonLightMesh.push({
             frame: 100,
             value: MEET_LIGHT_COLOR_TISSU
 
         });
         animSunToMoonLightMesh.setKeys(keysSunToMoonLightMesh);
         
 
         this._lightMesh.material.subMaterials[0].animations = [];
         this._lightMesh.material.subMaterials[0].animations.push( animSunToMoonLightMesh);
 
         this.scene.beginAnimation(this._tissu.material, 0, 0,true);
         this.scene.beginAnimation(this._lightMesh.material.subMaterials[0], 0, 0,true);
         this.scene.beginAnimation(this._mainLight, 0, 0,true);*/
    }
    _initialiseMoonToSunLights() {
        /*    // intensité de la veilleuse -> allume la veilleuse
            var animationMoonToSunLight = new BABYLON.Animation("animationMoonToSunLight", "intensity", MEET_ANIMATION_SPEED,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    
            var keysMoonToSunLight = [];
    
            keysMoonToSunLight.push({
                frame: 0,
                value: MEET_LIGHT_INTENSITY *1.2,
            });
            keysMoonToSunLight.push({
                frame: MEET_ANIMATION_LIGHT_ON_FRAME,
                value: MEET_LIGHT_INTENSITY *0.9
            });
            keysMoonToSunLight.push({
               frame: MEET_ANIMATION_LIGHT_ON_FRAME +5,
               value: MEET_LIGHT_INTENSITY *0.5
           });
           keysMoonToSunLight.push({
                frame: 100,
                value: 0
    
            });
            animationMoonToSunLight.setKeys(keysMoonToSunLight);
    
            
            this._mainLight.animations = [];
            this._mainLight.animations.push( animationMoonToSunLight);
    
            // tissus
            // Light Tissu emissive color
           var animMoonToSunTissu = new BABYLON.Animation("animMoonToSunTissu", "emissiveColor",MEET_ANIMATION_SPEED,
            BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            var keysMoonToSunTissu = [];
    
            
           keysMoonToSunTissu.push({
                frame: 0,
                value: MEET_LIGHT_COLOR_TISSU
    
            });
            keysMoonToSunTissu.push({
               frame: MEET_ANIMATION_LIGHT_ON_FRAME ,
               value: MEET_LIGHT_COLOR_TISSU
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
            this._tissu.material.animations = [];
            this._tissu.material.animations.push( animMoonToSunTissu);
    
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
    
            this._tissu.material.animations.push( animMoonToSunTissuTransparency);
    
            // _lightMesh ->
            var animMoonToSunLightMesh = new BABYLON.Animation("animMoonToSunLightMesh", "emissiveColor",MEET_ANIMATION_SPEED,
            BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            var keysMoonToSunLightMesh = [];
            keysMoonToSunLightMesh.push({
                frame: 0,
                value: MEET_LIGHT_COLOR_TISSU
    
            });
            keysMoonToSunLightMesh.push({
                frame: MEET_ANIMATION_LIGHT_ON_FRAME  ,
                value: MEET_LIGHT_COLOR_TISSU
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
            
    
            this._lightMesh.material.subMaterials[0].animations = [];
            this._lightMesh.material.subMaterials[0].animations.push( animMoonToSunLightMesh);
    
           this.scene.beginAnimation(this._tissu.material, 0, 0,true);
            this.scene.beginAnimation(this._lightMesh.material.subMaterials[0], 0, 0,true);
            this.scene.beginAnimation(this._mainLight, 0, 0,true);*/
    }
}
/// <reference path="../tools/MeetLogger.ts"/>
/// <reference path="d:/dev/js_reference/babylon.d.ts" />
/// <reference path="../Scene/MeetScene.ts" />
/// <reference path="../IActionSender.ts"/>
class ActionAmbientLight extends IInitialisable {
    /**
     *
     */
    constructor(ambientLight, _scene) {
        super();
        this._scene = _scene;
        this._ambientLight = ambientLight;
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
        // amibiante light -> passe du soleil de midi vers la lumiere de la lune avec un couché de soleil
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
        // specular
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
        // light direction
        var animationSunToMoonDirection = new BABYLON.Animation("animationSunToMoonDirection", "direction", MEET_ANIMATION_SPEED, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keysSunToMoonDirection = [];
        intensity = 0.2;
        keysSunToMoonDirection.push({
            frame: 0,
            value: new BABYLON.Vector3(100, 100, 0)
        });
        intensity = 0.5;
        keysSunToMoonDirection.push({
            frame: 50,
            value: new BABYLON.Vector3(100, 20, 0)
        });
        keysSunToMoonDirection.push({
            frame: 60,
            value: new BABYLON.Vector3(100, 10, 0)
        });
        keysSunToMoonDirection.push({
            frame: 70,
            value: new BABYLON.Vector3(100, 100, 0)
        });
        keysSunToMoonDirection.push({
            frame: 100,
            value: new BABYLON.Vector3(100, 100, 0)
        });
        animationSunToMoonDirection.setKeys(keysSunToMoonDirection);
        // set animations
        this._ambientLight.animations = [];
        this._ambientLight.animations.push(animationSunToMoon);
        this._ambientLight.animations.push(animationSunToMoonSpecular);
        this._ambientLight.animations.push(animationSunToMoonDirection);
        this._scene.scene.beginAnimation(this._ambientLight, 0, lastFrame, false);
    }
    _AnimatedMoonToSunAmbient() {
        // amibiante light -> passe du soleil de midi vers la lumiere de la lune avec un couché de soleil
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
        // ambiente ligth : specular componante
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
/// <reference path="../GL/IGLLight.ts"/>
class AllowedDiffuseSurfaceProperty {
    //_lightIntensity : ColorRGBBabylon; 
    //_lightColor : ColorRGBBabylon;
    /**
     *
     */
    constructor(_diffuserProperties, _lightProperties, _surfaceLightColor) {
        this._diffuserProperties = _diffuserProperties;
        this._lightProperties = _lightProperties;
        this._surfaceLightColor = _surfaceLightColor;
    }
}
class IGLMaterialDiffuser {
    /**
     *
     */
    constructor(colorOptions) {
        this.diffuseTexture = null;
        this.emissiveTexture = null;
        // lightIntensity : number = null;
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
        if (colorOptions.emissiveColor)
            this.emissiveColor = colorOptions.emissiveColor;
    }
}
class GLMaterialDiffuser extends IGLMaterialDiffuser {
    CopyFrom(fromMat) {
        this.diffuseTexture = fromMat.diffuseTexture;
        this.uScaleTexture = fromMat.uScaleTexture;
        this.emissiveTexture = fromMat.emissiveTexture;
        this.emissiveColor = fromMat.emissiveColor;
    }
}
/// <reference path="GLMaterialDiffuser.ts" />
/// <reference path="ColorRGBBabylon.ts" />
class GLBabylonMaterialDiffuser extends GLMaterialDiffuser {
    /*
    from constructor
    material : BABYLON.StandardMaterial;
*/
    /**
     *
     */
    constructor(glmaterial) {
        super({});
        this.glmaterial = glmaterial;
    }
    SetDiffuseTexture(strTexturePath, uScale, vScale) {
        if (strTexturePath != null) {
            this.glmaterial.diffuseTexture = new BABYLON.Texture(strTexturePath, /*this.scene*/ null);
            this.glmaterial.diffuseTexture.uScale = uScale;
            this.glmaterial.diffuseTexture.vScale = vScale;
        }
    }
    SetEmissiveTexture(strTexturePath, uScale, vScale) {
        if (strTexturePath != null) {
            this.glmaterial.emissiveTexture = new BABYLON.Texture(strTexturePath, /*this.scene*/ null);
            this.glmaterial.emissiveTexture.uScale = uScale;
            this.glmaterial.emissiveTexture.vScale = vScale;
        }
    }
    ApplyColor() {
        if (this.emissiveColor) {
            this.glmaterial.emissiveColor = ColorRGBBabylon.FromColorRGB(this.emissiveColor);
        }
    }
}
/// <reference path="../tools/MeetLogger.ts"/>
/// <reference path="./AllowedDiffuseSurfaceProperty.ts"/>
/// <reference path="../GL/GLBabylonLight.ts"/>
/// <reference path="../GL/GLBabylonMaterialDiffuser.ts"/>
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
    // inherited
    ApplyDefault() {
        this._setCustomisable(this._defaultKey);
        this._AnimatedSunToMoonLights(0);
    }
    ApplyCustomisationHandler(...tests) {
        let buttonName = tests[1].target.name;
        this._setCustomisable(buttonName);
    }
    _setCustomisable(strKey) {
        let selectedProperties = this._allowedProperties.get(strKey);
        if (selectedProperties != null) {
            this._surfaceDiffuserMaterial.CopyFrom(selectedProperties._diffuserProperties);
            this._surfaceDiffuserMaterial.SetDiffuseTexture(selectedProperties._diffuserProperties.diffuseTexture, selectedProperties._diffuserProperties.uScaleTexture, selectedProperties._diffuserProperties.vScaleTexture);
            this._surfaceDiffuserMaterial.SetEmissiveTexture(selectedProperties._diffuserProperties.emissiveTexture, selectedProperties._diffuserProperties.uScaleTexture, selectedProperties._diffuserProperties.vScaleTexture);
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
    _AnimatedSunToMoonLights(maxFrame = 100) {
        // intensité de la veilleuse -> allume la veilleuse
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
        // tissus
        // Light Tissu emissive color
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
        // transparence du tissu lorsque la lumière s'allume
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
        // _lightMesh -> 
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
        /*  this._lightMesh.material.subMaterials[0].animations = [];
          this._lightMesh.material.subMaterials[0].animations.push( animSunToMoonLightMesh);
  */
        this._scene.scene.beginAnimation(this._surfaceDiffuserMaterial.glmaterial, 0, maxFrame, true);
        this._scene.scene.beginAnimation(this._surfaceLightMaterial.glmaterial, 0, maxFrame, true);
        this._scene.scene.beginAnimation(this._surfaceLight._gllight, 0, maxFrame, true);
    }
    _AnimatedMoonToSunLights() {
        // intensité de la veilleuse -> allume la veilleuse
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
        // tissus
        // Light Tissu emissive color
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
        // transparence du tissu lorsque la lumière s'allume
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
        // _lightMesh -> 
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
        this._scene.scene.beginAnimation(this._surfaceLight._gllight, 0, 100, true);
    }
}
class AllowedTexture {
    constructor(strTexturePath, uScale, vScale) {
        this.strTexturePath = strTexturePath;
        this.uScale = uScale;
        this.vScale = vScale;
    }
}
/// <reference path="../Tools/MeetLogger.ts"/>
/// <reference path="./IInitialisable.ts"/>
class ConfigurationManager {
    /**
     *
     */
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
/// <reference path="./AllowedTexture.ts"/>
class CustomisableMaterialTexture extends IInitialisable {
    constructor(materials) {
        super();
        this.materials = materials;
        this._allowedTexture = new Map();
    }
    //#region  Customisable
    ApplyCustomisationHandler(...tests) {
        let buttonName = tests[1].target.name;
        this._setDiffuseFromKey(buttonName);
    }
    ApplyDefault() {
        //throw new Error("Method not implemented.");
        this._setDiffuseFromKey(this._defaultKey);
    }
    //#endregion
    _setDiffuseFromKey(strKey) {
        let selectedTexture = this._allowedTexture.get(strKey);
        if (selectedTexture != null) {
            this.materials.forEach((mat) => {
                mat.SetDiffuseTexture(selectedTexture.strTexturePath, selectedTexture.uScale, selectedTexture.vScale);
            });
        }
    }
}
/// <reference path="../Configurator/CustomisableMaterial.ts"/>
/// <reference path="d:/dev/js_reference/babylon.d.ts" />
class ISceneObjectLoaded {
    /**
     *
     */
    constructor(meetScene) {
        this._meetScene = meetScene;
        this._meshes = new Set();
    }
}
let g_SOLFromFile;
class ISceneObjectLoadedFromFile extends ISceneObjectLoaded {
    /**
     *
     */
    constructor(_meetScene) {
        super(_meetScene);
        g_SOLFromFile = this;
    }
    _loadBabylonFile(modelFolderPath, modelFileName, scene) {
        BABYLON.SceneLoader.ImportMesh("", modelFolderPath, modelFileName, scene, this._loadBabylonFileOnSucces);
    }
}
/// <reference path="IGLMaterial.ts" />
/// <reference path="ColorRGBBabylon.ts" />
class GLBabylonMaterial extends GLMaterial {
    /*
    from constructor
    material : BABYLON.StandardMaterial;
*/
    /**
     *
     */
    constructor(glmaterial) {
        super({});
        this.glmaterial = glmaterial;
    }
    SetDiffuseTexture(strTexturePath, uScale, vScale) {
        this.glmaterial.diffuseTexture = new BABYLON.Texture(strTexturePath, /*this.scene*/ null);
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
                this.glmaterial.diffuseTexture = new BABYLON.Texture(this.diffuseTexture, /*this.scene*/ null);
                this.glmaterial.ambientTexture = new BABYLON.Texture(this.diffuseTexture, /*this.scene*/ null);
            }
        }
    }
}
/// <reference path= "../GL/GLBabylonMaterial.ts"/>
/// <reference path= "./ISceneObjectLoaded.ts"/>
/// <reference path= "../GL/ColorRGB.ts"/>
class SOLSphere extends ISceneObjectLoaded {
    /**
     *
     */
    constructor(_meetScene) {
        super(_meetScene);
    }
    LoadObject() {
        // Create object
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 20 }, this._meetScene.scene);
        sphere.position.y = 10;
        // create material
        let mat = new BABYLON.StandardMaterial("matSphere", this._meetScene.scene);
        mat.specularPower = 100;
        mat.diffuseColor = new BABYLON.Color3(1 / 255, 73 / 255, 155 / 255);
        mat.specularColor = new BABYLON.Color3(0, 0, 0);
        sphere.material = mat;
        // fill object
        this.customisableMaterial = new CustomisableMaterial(new Set().add(new GLBabylonMaterial(mat)));
        this.customisableMaterial._allowedColors.add(new AllowedColor("Vernis", new Map().set("Vernis", new IGLMaterial({ specular: new ColorRGB(1, 1, 1) }))
            .set("Brut", new IGLMaterial({ specular: new ColorRGB(0.01, 0.01, 0.01) }))));
        this.customisableMaterial._allowedColors.add(new AllowedColor("Bleu", new Map().set("Bleu", new IGLMaterial({ diffuse: new ColorRGB(1 / 255, 73 / 255, 155 / 255) }))
            .set("Noir", new IGLMaterial({ diffuse: new ColorRGB(20 / 255, 20 / 255, 24 / 255) }))
            .set("Rouge", new IGLMaterial({ diffuse: new ColorRGB(167 / 255, 4 / 255, 15 / 255) }))));
        this._meshes.add(sphere);
    }
}
/// <reference path= "./ISceneObjectLoaded.ts"/>
class SOLVeilleuse extends ISceneObjectLoadedFromFile {
    /**
     *
     */
    constructor(_meetScene) {
        super(_meetScene);
        this.customisableMaterial = new CustomisableMaterial(new Set());
        this._mainLight = null;
    }
    LoadObject(onObjectLoaded, sender) {
        this._onObjectLoaded = onObjectLoaded;
        this._onObjectLoadedSender = sender;
        this._loadBabylonFile("assets/3D/", "lampe2.babylon", this._meetScene.scene);
    }
    _loadBabylonFileOnSucces(newMeshes, ...tests) {
        console.log(tests);
        //var newMeshes = meshes;
        // SHADOW_GEN    var ampouleLight = new BABYLON.PointLight("ampouleLight", new BABYLON.Vector3(0,0,0), this.scene);
        var tissuLight = new BABYLON.SpotLight("tissuLight", new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, -1), Math.PI * 0.95, 0.04, g_SOLFromFile._meetScene.scene);
        let lightMesh = null;
        let tissuMesh = null;
        // SHADOW_GEN    this.shadowGenerator = new BABYLON.ShadowGenerator(1024, ampouleLight);
        var gl = new BABYLON.GlowLayer("glow", g_SOLFromFile._meetScene.scene);
        newMeshes.forEach((mesh) => {
            g_SOLFromFile._meshes.add(mesh);
            // Convertit le mesh récupéré pour qu'il soit rendu en FlatShading
            // mesh.convertToFlatShadedMesh();
            mesh.position = new BABYLON.Vector3(mesh.position.x + 8.5, mesh.position.y + 0, mesh.position.z - 8.5);
            if (mesh.name == "ampoule") // ampoule is a multimaterial
             {
                //     console.log( mesh.material.subMaterials() );
                lightMesh = mesh;
                // SHADOW_GEN      ampouleLight.position = mesh.position.clone();
                // SHADOW_GEN       ampouleLight.position.x = 0;
                // SHADOW_GEN      ampouleLight.position.y= 8.5;
                // SHADOW_GEN      ampouleLight.position.z= -3;
                // SHADOW_GEN      ampouleLight.diffuse = MEET_LIGHT_COLOR;
                // SHADOW_GEN     ampouleLight.intensity = 0.0;
                mesh.material.subMaterials[0].emissiveColor = MEET_LIGHT_COLOR;
                mesh.material.emissiveTexture = null;
                tissuLight.position.x = 0;
                tissuLight.position.y = 8.5;
                tissuLight.position.z = -10;
                tissuLight.intensityMode = BABYLON.Light.INTENSITYMODE_LUMINOUSPOWER;
                tissuLight.diffuse = MEET_LIGHT_COLOR;
                tissuLight.intensity = MEET_LIGHT_INTENSITY; //ampouleLight.intensity ;//* 0.7;
                tissuLight.specular = new BABYLON.Color3(0, 0, 0);
                // SHADOW_GEN  this.shadowGenerator.usePoissonSampling = true;
                // SHADOW_GEN this.shadowGenerator.bias = 0.0005;
            }
            // gestion des ombres
            //  if(mesh.name == "main" || mesh.name == "back" || mesh.name == "front")// && mesh.name != "ampoule")
            // {
            // SHADOW_GEN    this.shadowGenerator.getShadowMap().renderList.push(mesh);
            // SHADOW_GEN    mesh.receiveShadows = true;
            //}
            else if (mesh.name == "tissu") {
                tissuMesh = mesh;
                let tissuMeshMat = mesh.material;
                //  mesh.material.alpha = 0.5;
                tissuMeshMat.opacityTexture = new BABYLON.Texture("./assets/3D/tissuAlpha.png", g_SOLFromFile._meetScene.scene);
                tissuMeshMat.opacityTexture.getAlphaFromRGB = true;
                tissuMeshMat.emissiveColor = MEET_LIGHT_COLOR_TISSU;
                tissuMeshMat.emissiveTexture = new BABYLON.Texture("./assets/3D/tissu_savane_emissive.jpg", g_SOLFromFile._meetScene.scene);
                gl.intensity = 0.8;
                gl.blurKernelSize = 20;
            }
            else // autres meshs de la scene non ampoule et non tissu
             {
                // normalement bois de la veilleuse -> ajoute la possiblité de customisation
                g_SOLFromFile.customisableMaterial.AddMaterial(new GLBabylonMaterial(mesh.material));
                mesh.material.bumpTexture = new BABYLON.Texture("./assets/3D/AT_sayo_wood_NormalMap.png", g_SOLFromFile._meetScene.scene);
                mesh.material.invertNormalMapX = true;
                mesh.material.invertNormalMapY = true;
                mesh.material.specularTexture = null; //new BABYLON.Texture("./assets/3D/AT_sayo_wood_SPEC.jpg",
                // g_SOLFromFile._meetScene.scene);
                mesh.material.specularPower = 7;
            }
        }); // rof each meshes
        g_SOLFromFile._mainLight = new ActionCustomisableDiffuseSurfaceLight(tissuLight, tissuMesh.material, lightMesh.material.subMaterials[0], g_SOLFromFile._meetScene); // ampoule
        g_SOLFromFile._initialiseCustomisable();
        // all loaded
        g_SOLFromFile._onObjectLoaded(g_SOLFromFile._onObjectLoadedSender);
    }
    _initialiseCustomisable() {
        this._meetScene.objectLoaded = g_SOLFromFile;
        // fill object
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
        mainLight._allowedProperties.set("Savane", new AllowedDiffuseSurfaceProperty(new IGLMaterialDiffuser({ emissiveColor: MEET_LIGHT_COLOR_TISSU }), new IGLLight({ lightIntensity: MEET_LIGHT_INTENSITY }), MEET_LIGHT_COLOR_TISSU));
        /* this.customisableMaterial._allowedColors.add(new AllowedColor("Blanc", new Map<string, IGLMaterial>()
            // .set("Bleu", new IGLMaterial({ diffuse: new ColorRGB(1 / 255, 73 / 255, 155 / 255) }))
             .set("Blanc", new IGLMaterial({ diffuse: new ColorRGB(1 , 255 / 255, 255 / 255) }))
             .set("Noir", new IGLMaterial({ diffuse: new ColorRGB(20 / 255, 20 / 255, 24 / 255) }))
             .set("Rouge", new IGLMaterial({ diffuse: new ColorRGB(167 / 255, 4 / 255, 15 / 255) }))));
 */
    }
}
