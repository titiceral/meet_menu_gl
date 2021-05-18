
/// <reference path="../constantes.ts" />
/// <reference path="d:/dev/js_reference/babylon.d.ts" />
/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />
class MeetScene
{
    objectLoaded : ISceneObjectLoaded;

    onFileLoaded : () => void;

    scene : BABYLON.Scene;


    renderer : any;


    /// 
    _ambientLightCustom : ActionAmbientLight ;
    _ground : BABYLON.Mesh;
    _groundCustomisable : CustomisableMaterialTexture;

    ///sphere : any;

    /**
     *
     */
    constructor(renderer : any, onBabylonFileLoaded : () => void ) {
        // Appel des variables nécéssaires
        this.renderer = renderer;
        this.scene = renderer.scene;

        this.objectLoaded = new SOLVeilleuse(this);

        this.onFileLoaded = onBabylonFileLoaded;
     ;
        //EST TMP
      //  this.objectLoaded = new SOLSphere();
        this.objectLoaded.LoadObject( onBabylonFileLoaded, this.renderer); 
    
    
       
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
    _initScene(engine : any) {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor=new BABYLON.Color4(0,0,0,1);
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


    // load skybox from file of 6 cube textures
    _loadManualSkybox (folderPath : string) : void
    {
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, this.scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
        skyboxMaterial.backFaceCulling = false;
        
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        skyboxMaterial.disableLighting = true

        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(folderPath, this.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skybox.renderingGroupId = 0;
    }

    // load ground  
    _loadGround() : void
    {
        var materialGround = new BABYLON.StandardMaterial("groundTexture", this.scene);
        materialGround.diffuseTexture = new BABYLON.Texture("./assets/images/brick.jpg", this.scene);
        (materialGround.diffuseTexture as BABYLON.Texture).uScale = 4.0;
        (materialGround.diffuseTexture as BABYLON.Texture).vScale = 4.0;

        materialGround.opacityTexture = new BABYLON.Texture("./assets/textures/groundAlpha.png",this.scene);
      //  materialGround.opacityTexture.getAlphaFromRGB = true;
        materialGround.specularColor = new BABYLON.Color3(0.01,0.01,0.01);
         // Ajoutons un sol pour situer la sphere dans l'espace
        var ground = BABYLON.Mesh.CreateGround("ground1", 400, 400, 2, this.scene);
        ground.scaling = new BABYLON.Vector3(1,1,1);
    
        ground.material = materialGround;

        this._ground = ground;
        // set customizable ground 
        this._groundCustomisable = new CustomisableMaterialTexture(new Set<GLMaterial>().add( new GLBabylonMaterial(materialGround)));
        this._groundCustomisable._defaultKey = "Brique";
        this._groundCustomisable._allowedTexture.set("Brique", new AllowedTexture("./assets/images/brick.jpg",4,4))
        this._groundCustomisable._allowedTexture.set("Sable", new AllowedTexture("./assets/textures/sable.jpg",2,2))
        this._groundCustomisable._allowedTexture.set("Bois", new AllowedTexture("./assets/3D/AT_sayo_wood_DIFF.jpg",6,4))
    }
    _loadAmbientLight() : void
    {
        var ambientLight =  new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(100,100,0),this.scene);
        ambientLight.diffuse = new BABYLON.Color3(1,1,1);
      //ETS TMP  ambientLight.specular = new BABYLON.Color3(0.001,0.001,0.001);
        ambientLight.specular = new BABYLON.Color3(1,1,1);
        
        ambientLight.intensityMode = BABYLON.Light.INTENSITYMODE_LUMINOUSPOWER;
        ambientLight.intensity = MEET_SKY_INTENSITY;
 

        this._ambientLightCustom = new ActionAmbientLight(ambientLight, this);



    }

   
  
    
}