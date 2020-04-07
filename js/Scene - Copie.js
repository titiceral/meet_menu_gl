
//@ts-check
var thisScene ;
Scene = function(renderer, onBabylonFileLoaded ) {
    // Appel des variables nécéssaires
    this.renderer = renderer;
    this.scene = renderer.scene;
    var _this = this;
    thisScene = this;
    thisScene.onBabylonFileLoaded = onBabylonFileLoaded;
  // ETS TMP uncomment this._loadBabylonFile("assets/3D/", "lampe2.babylon",onBabylonFileLoaded) ;
    //EST TMP
    this.sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter :20}, this.scene);
    this.sphere.position.y = 10 ;
    this.sphere.material = new BABYLON.StandardMaterial("matSphere", this.scene);
    this.sphere.material.specularPower = 100;
    this.sphere.material.diffuseColor = new BABYLON.Color3(1/255,73/255,155/255);
    this.sphere.material.specularColor =  new BABYLON.Color3(0,0,0);





   
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
    this._ambientLight =  this._loadAmbientLight();
   // SHADOW_GEN  ground.receiveShadows = true;

   
};
function typeOf(obj) {
    return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
  }
Scene.prototype = {
    // // Prototype d'initialisation de la scène
    // _initScene : function(engine) {
    //     var scene = new BABYLON.Scene(engine);
    //     scene.clearColor=new BABYLON.Color4(0,0,0,1);
    //     return scene;
    // },

    // _loadBabylonFileOnSucces : function(newMeshes)
    // {
        
    //     //var newMeshes = meshes;
    //         // SHADOW_GEN    var ampouleLight = new BABYLON.PointLight("ampouleLight", new BABYLON.Vector3(0,0,0), this.scene);
    //         var tissuLight = new BABYLON.SpotLight("tissuLight", new BABYLON.Vector3(0,0,0),new BABYLON.Vector3(0,0,-1),Math.PI *0.95  ,0.04, this.scene);
    //         thisScene._mainLight = tissuLight;
               
    //         // SHADOW_GEN    this.shadowGenerator = new BABYLON.ShadowGenerator(1024, ampouleLight);
   
    //            var gl = new BABYLON.GlowLayer("glow", this.scene);
    //             newMeshes.forEach( (mesh) => 
    //             {
    //                  // Convertit le mesh récupéré pour qu'il soit rendu en FlatShading
    //                // mesh.convertToFlatShadedMesh();
    //                 mesh.position = new BABYLON.Vector3(mesh.position.x + 8.5,mesh.position.y+ 0,mesh.position.z -8.5);
                   
    //                 if( mesh.name == "ampoule") // ampoule is a multimaterial
    //                 {
                      
    //               //     console.log( mesh.material.subMaterials() );
    //                     thisScene._lightMesh = mesh;
    //               // SHADOW_GEN      ampouleLight.position = mesh.position.clone();
    //              // SHADOW_GEN       ampouleLight.position.x = 0;
    //               // SHADOW_GEN      ampouleLight.position.y= 8.5;
    //               // SHADOW_GEN      ampouleLight.position.z= -3;
    //               // SHADOW_GEN      ampouleLight.diffuse = MEET_LIGHT_COLOR;
    //                // SHADOW_GEN     ampouleLight.intensity = 0.0;
    //                  mesh.material.subMaterials[0].emissiveColor =   MEET_LIGHT_COLOR;
    //                    mesh.material.emissiveTexture = null;
    //                    tissuLight.position.x = 0;
    //                    tissuLight.position.y= 8.5;
    //                    tissuLight.position.z= -10;
    //                    tissuLight.intensityMode = BABYLON.Light.INTENSITYMODE_LUMINOUSPOWER;
    //                    tissuLight.diffuse = MEET_LIGHT_COLOR;
    //                    tissuLight.intensity = MEET_LIGHT_INTENSITY;//ampouleLight.intensity ;//* 0.7;
    //                    tissuLight.specular = new BABYLON.Color3(0,0,0);
                       
   
    //                   // SHADOW_GEN  this.shadowGenerator.usePoissonSampling = true;
    //                    // SHADOW_GEN this.shadowGenerator.bias = 0.0005;
   
    //                 }
    //                 // gestion des ombres
    //               //  if(mesh.name == "main" || mesh.name == "back" || mesh.name == "front")// && mesh.name != "ampoule")
    //                // {
    //                // SHADOW_GEN    this.shadowGenerator.getShadowMap().renderList.push(mesh);
    //                 // SHADOW_GEN    mesh.receiveShadows = true;
                     
   
    //                 //}
    //                 if(mesh.name == "tissu")
    //                 {
    //                     thisScene._tissu = mesh;
    //                  //  mesh.material.alpha = 0.5;
    //                     mesh.material.opacityTexture = new BABYLON.Texture("./assets/3D/tissuAlpha.png",this.scene);
    //                     mesh.material.opacityTexture.getAlphaFromRGB = true;
                       
    //                     mesh.material.emissiveColor =   MEET_LIGHT_COLOR_TISSU;
    //                     mesh.material.emissiveTexture  =  new BABYLON.Texture("./assets/3D/tissu_savane_emissive.jpg", this.scene);
                        
    //                     gl.intensity = 0.8;
    //                     gl.blurKernelSize = 20;
                     
    //                 }
                   
    //             }); // rof each meshes
   
    //             // all loaded
    //             thisScene.onBabylonFileLoaded(thisScene._tissu);
           
    // },
    
    // _loadBabylonFile : function(modelFolderPath, modelFileName, onBabylonFileLoaded )
    // {
    //     BABYLON.SceneLoader.ImportMesh("", modelFolderPath, modelFileName, this.scene, this._loadBabylonFileOnSucces);

    // },


    // // load skybox from file of 6 cube textures
    // _loadManualSkybox : function (folderPath)
    // {
    //         var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, this.scene);
    //         var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
    //         skyboxMaterial.backFaceCulling = false;
         
    //         skybox.material = skyboxMaterial;
    //         skybox.infiniteDistance = true;
    //         skyboxMaterial.disableLighting = true

    //         skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(folderPath, this.scene);
    //         skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    //         skybox.renderingGroupId = 0;
    // },

    // // load ground 
    // _loadGround : function()
    // {
    //     var materialGround = new BABYLON.StandardMaterial("groundTexture", this.scene);
    //     materialGround.diffuseTexture = new BABYLON.Texture("./assets/images/brick.jpg", this.scene);
    //     materialGround.diffuseTexture.uScale = 4.0;
    //     materialGround.diffuseTexture.vScale = 4.0;
    //     materialGround.opacityTexture = new BABYLON.Texture("./assets/textures/groundAlpha.png",this.scene);
    //     materialGround.getAlphaFromRGB = true;
    //     materialGround.specularColor = new BABYLON.Color3(0.01,0.01,0.01);
    //      // Ajoutons un sol pour situer la sphere dans l'espace
    //     var ground = BABYLON.Mesh.CreateGround("ground1", 400, 400, 2, this.scene);
    //     ground.scaling = new BABYLON.Vector3(1,1,1);
    
    //     ground.material = materialGround;
    //     this.ground = ground;
       

    // },
    // _loadAmbientLight : function()
    // {
    //     var ambientLight =  new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(100,100,0),this.scene);
    //     ambientLight.diffuse = new BABYLON.Color3(1,1,1);
    //   //ETS TMP  ambientLight.specular = new BABYLON.Color3(0.001,0.001,0.001);
    //     ambientLight.specular = new BABYLON.Color3(1,1,1);
        
    //     ambientLight.intensityMode = BABYLON.Light.INTENSITYMODE_LUMINOUSPOWER;
    //     ambientLight.intensity = MEET_SKY_INTENSITY;
 

    //     return ambientLight;
    // },
    // _initialiseSunToMoonAmbient : function()
    // {
    //     // amibiante light -> passe du soleil de midi vers la lumiere de la lune avec un couché de soleil
    //     var animationSunToMoon = new BABYLON.Animation("animationSunToMoon", "diffuse", MEET_ANIMATION_SPEED,
    //     BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    //     var keysSunToMoon = [];
    //     keysSunToMoon.push({
    //         frame: 0,
    //         value: new BABYLON.Color3(1,1,1)
    //     });
   
    //     keysSunToMoon.push({
    //         frame: 50,
    //         value: new BABYLON.Color3(0.8,0.8,0.8)
    //     });
    //     var intensity = 0.5;
       
    //    keysSunToMoon.push({
    //     frame: 60,
    //     value: new BABYLON.Color3(201.0/255.0 * intensity,201.0/255.0 * intensity,201.0/255.0 * intensity)

    //     });
    //     intensity = 0.2;
    //    keysSunToMoon.push({
    //         frame: 100,
    //         value: new BABYLON.Color3(201.0/255.0 * intensity,201.0/255.0 * intensity,201.0/255.0 * intensity)

    //     });
    //     animationSunToMoon.setKeys(keysSunToMoon);
    //     this._ambientLight.animations = [];
    //     this._ambientLight.animations.push( animationSunToMoon);
    //     this.scene.beginAnimation(this._ambientLight, 0, 0,true);

 
    // },
    // _initialiseMoonToSunAmbient : function()
    // {
    //     // amibiante light -> passe du soleil de midi vers la lumiere de la lune avec un couché de soleil
    //     var animationSunToMoon = new BABYLON.Animation("animationSunToMoon", "diffuse", MEET_ANIMATION_SPEED,
    //     BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    //     var keysSunToMoon = [];
    //     var intensity = 0.2;
    //     keysSunToMoon.push({
    //         frame: 0,
    //         value: new BABYLON.Color3(201.0/255.0 * intensity,201.0/255.0 * intensity,201.0/255.0 * intensity)
    //     });
    //     intensity = 0.5;
    //     keysSunToMoon.push({
    //         frame: 50,
    //         value: new BABYLON.Color3(201.0/255.0 * intensity,201.0/255.0 * intensity,201.0/255.0 * intensity)
    //     });
      
       
    //    keysSunToMoon.push({
    //     frame: 60,
    //     value: new BABYLON.Color3(0.8,0.8,0.8)

    //     });
        
    //    keysSunToMoon.push({
    //         frame: 100,
    //         value: new BABYLON.Color3(1,1,1)

    //     });
    //     animationSunToMoon.setKeys(keysSunToMoon);
    //     this._ambientLight.animations = [];
    //     this._ambientLight.animations.push( animationSunToMoon);
    //    // this.scene.beginAnimation(this._ambientLight, 0, 0,true);

 
    // },
   
    // _initialiseSunToMoonLights : function()
    // {
    //     // intensité de la veilleuse -> allume la veilleuse
    //     var animationSunToMoonLight = new BABYLON.Animation("animationSunToMoonLight", "intensity", MEET_ANIMATION_SPEED,
    //     BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    //     var keysSunToMoonLight = [];

    //     keysSunToMoonLight.push({
    //         frame: 0,
    //         value: 0,
    //     });
    //     keysSunToMoonLight.push({
    //         frame: MEET_ANIMATION_LIGHT_ON_FRAME,
    //         value: MEET_LIGHT_INTENSITY *0.5
    //     });
    //     keysSunToMoonLight.push({
    //        frame: MEET_ANIMATION_LIGHT_ON_FRAME +5,
    //        value: MEET_LIGHT_INTENSITY *0.9
    //    });        
    //    keysSunToMoonLight.push({
    //         frame: 100,
    //         value: MEET_LIGHT_INTENSITY *1.2

    //     });
    //     animationSunToMoonLight.setKeys(keysSunToMoonLight);

        
    //     this._mainLight.animations = [];
    //     this._mainLight.animations.push( animationSunToMoonLight);

    //     // tissus
    //     // Light Tissu emissive color
    //     var animSunToMoonTissu = new BABYLON.Animation("animSunToMoonTissu", "emissiveColor",MEET_ANIMATION_SPEED,
    //     BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    //     var keysSunToMoonTissu = [];

    //     keysSunToMoonTissu.push({
    //         frame: 0,
    //         value: BABYLON.Color3.Black,
    //     });
    //     keysSunToMoonTissu.push({
    //         frame: MEET_ANIMATION_LIGHT_ON_FRAME,
    //         value: BABYLON.Color3.Black
    //     });
    //     keysSunToMoonTissu.push({
    //        frame: MEET_ANIMATION_LIGHT_ON_FRAME + 5,
    //        value: MEET_LIGHT_COLOR_TISSU
    //    });        
    //    keysSunToMoonTissu.push({
    //         frame: 100,
    //         value: MEET_LIGHT_COLOR_TISSU

    //     });
    //     animSunToMoonTissu.setKeys(keysSunToMoonTissu);
    //     this._tissu.material.animations = [];
    //     this._tissu.material.animations.push( animSunToMoonTissu);

    //     // transparence du tissu lorsque la lumière s'allume
    //     var animSunToMoonTissuTransparency = new BABYLON.Animation("animSunToMoonTissuTransparency", "alpha", MEET_ANIMATION_SPEED,
    //     BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    //     var keysSunToMoonTissuTrans = [];

    //     keysSunToMoonTissuTrans.push({
    //         frame: 0,
    //         value: 1.9,
    //     });
    //     keysSunToMoonTissuTrans.push({
    //         frame: MEET_ANIMATION_LIGHT_ON_FRAME ,
    //         value: 1.9,
    //     });
    //     keysSunToMoonTissuTrans.push({
    //        frame: MEET_ANIMATION_LIGHT_ON_FRAME +1,
    //        value: 1,
    //    });      
    //    keysSunToMoonTissuTrans.push({
    //         frame: 100,
    //         value: 1

    //     });
    //     animSunToMoonTissuTransparency.setKeys(keysSunToMoonTissuTrans);
        
    //     this._tissu.material.animations.push( animSunToMoonTissuTransparency);

    //     // _lightMesh -> 
    //     var animSunToMoonLightMesh = new BABYLON.Animation("animSunToMoonLightMesh", "emissiveColor",MEET_ANIMATION_SPEED,
    //     BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    //     var keysSunToMoonLightMesh = [];

    //     keysSunToMoonLightMesh.push({
    //         frame: 0,
    //         value: BABYLON.Color3.Black,
    //     });
    //     keysSunToMoonLightMesh.push({
    //         frame: MEET_ANIMATION_LIGHT_ON_FRAME,
    //         value: BABYLON.Color3.Black
    //     });
    //     keysSunToMoonLightMesh.push({
    //        frame: MEET_ANIMATION_LIGHT_ON_FRAME + 5 ,
    //        value: MEET_LIGHT_COLOR_TISSU
    //    });        
    //    keysSunToMoonLightMesh.push({
    //         frame: 100,
    //         value: MEET_LIGHT_COLOR_TISSU

    //     });
    //     animSunToMoonLightMesh.setKeys(keysSunToMoonLightMesh);
        

    //     this._lightMesh.material.subMaterials[0].animations = [];
    //     this._lightMesh.material.subMaterials[0].animations.push( animSunToMoonLightMesh);

    //     this.scene.beginAnimation(this._tissu.material, 0, 0,true);
    //     this.scene.beginAnimation(this._lightMesh.material.subMaterials[0], 0, 0,true);
    //     this.scene.beginAnimation(this._mainLight, 0, 0,true);
    // },
    // _initialiseMoonToSunLights : function()
    // {
    //     // intensité de la veilleuse -> allume la veilleuse
    //     var animationMoonToSunLight = new BABYLON.Animation("animationMoonToSunLight", "intensity", MEET_ANIMATION_SPEED,
    //     BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    //     var keysMoonToSunLight = [];

    //     keysMoonToSunLight.push({
    //         frame: 0,
    //         value: MEET_LIGHT_INTENSITY *1.2,
    //     });
    //     keysMoonToSunLight.push({
    //         frame: MEET_ANIMATION_LIGHT_ON_FRAME,
    //         value: MEET_LIGHT_INTENSITY *0.9
    //     });
    //     keysMoonToSunLight.push({
    //        frame: MEET_ANIMATION_LIGHT_ON_FRAME +5,
    //        value: MEET_LIGHT_INTENSITY *0.5
    //    });        
    //    keysMoonToSunLight.push({
    //         frame: 100,
    //         value: 0

    //     });
    //     animationMoonToSunLight.setKeys(keysMoonToSunLight);

        
    //     this._mainLight.animations = [];
    //     this._mainLight.animations.push( animationMoonToSunLight);

    //     // tissus
    //     // Light Tissu emissive color
    //    var animMoonToSunTissu = new BABYLON.Animation("animMoonToSunTissu", "emissiveColor",MEET_ANIMATION_SPEED,
    //     BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    //     var keysMoonToSunTissu = [];

        
    //    keysMoonToSunTissu.push({
    //         frame: 0,
    //         value: MEET_LIGHT_COLOR_TISSU

    //     });
    //     keysMoonToSunTissu.push({
    //        frame: MEET_ANIMATION_LIGHT_ON_FRAME ,
    //        value: MEET_LIGHT_COLOR_TISSU
    //    });
    //       keysMoonToSunTissu.push({
    //         frame: MEET_ANIMATION_LIGHT_ON_FRAME +5,
    //         value: BABYLON.Color3.Black
    //     });
    //          keysMoonToSunTissu.push({
    //         frame: 100,
    //         value: BABYLON.Color3.Black,
    //     });
       
    //     animMoonToSunTissu.setKeys(keysMoonToSunTissu);
    //     this._tissu.material.animations = [];
    //     this._tissu.material.animations.push( animMoonToSunTissu);

    //     // transparence du tissu lorsque la lumière s'allume
    //     var animMoonToSunTissuTransparency = new BABYLON.Animation("animMoonToSunTissuTransparency", "alpha", MEET_ANIMATION_SPEED,
    //     BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    //     var keysMoonToSunTissuTrans = [];

       
    //    keysMoonToSunTissuTrans.push({
    //         frame: 0,
    //         value: 1,

    //     });
    //     keysMoonToSunTissuTrans.push({
    //        frame: MEET_ANIMATION_LIGHT_ON_FRAME ,
    //        value: 1,
    //    }); 
    //     keysMoonToSunTissuTrans.push({
    //         frame: MEET_ANIMATION_LIGHT_ON_FRAME + 1 ,
    //         value: 1.9,
    //     });
    //          keysMoonToSunTissuTrans.push({
    //         frame: 100,
    //         value: 1.9,
    //     });
        
    //     animMoonToSunTissuTransparency.setKeys(keysMoonToSunTissuTrans);

    //     this._tissu.material.animations.push( animMoonToSunTissuTransparency);

    //     // _lightMesh -> 
    //     var animMoonToSunLightMesh = new BABYLON.Animation("animMoonToSunLightMesh", "emissiveColor",MEET_ANIMATION_SPEED,
    //     BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    //     var keysMoonToSunLightMesh = [];
    //     keysMoonToSunLightMesh.push({
    //         frame: 0,
    //         value: MEET_LIGHT_COLOR_TISSU

    //     });
    //     keysMoonToSunLightMesh.push({
    //         frame: MEET_ANIMATION_LIGHT_ON_FRAME  ,
    //         value: MEET_LIGHT_COLOR_TISSU
    //     });        
    //     keysMoonToSunLightMesh.push({
    //         frame: MEET_ANIMATION_LIGHT_ON_FRAME + 5,
    //         value: BABYLON.Color3.Black
    //     });
    //     keysMoonToSunLightMesh.push({
    //         frame: 100,
    //         value: BABYLON.Color3.Black,
    //     });
       
       
    //     animMoonToSunLightMesh.setKeys(keysMoonToSunLightMesh);
        

    //     this._lightMesh.material.subMaterials[0].animations = [];
    //     this._lightMesh.material.subMaterials[0].animations.push( animMoonToSunLightMesh);

    //    this.scene.beginAnimation(this._tissu.material, 0, 0,true);
    //     this.scene.beginAnimation(this._lightMesh.material.subMaterials[0], 0, 0,true);
    //     this.scene.beginAnimation(this._mainLight, 0, 0,true);
    // }
};