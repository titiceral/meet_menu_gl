/// <reference path= "./ISceneObjectLoaded.ts"/>


class SOLVeilleuse extends ISceneObjectLoadedFromFile {
  
   

    /**
     *
     */
    constructor(_meetScene: MeetScene) {
        super(_meetScene);
        this.customisableMaterial = new CustomisableMaterial(new Set<GLMaterial>());
        this._mainLight = null;

    }
    LoadObject( onObjectLoaded: (sender) => void, sender: any): void {

        this._onObjectLoaded = onObjectLoaded;
        this._onObjectLoadedSender = sender;
       
        this._loadBabylonFile("assets/3D/", "lampe2.babylon", this._meetScene.scene);

    }

    _loadBabylonFileOnSucces(newMeshes: BABYLON.Mesh[], ...tests): void {

        console.log(tests);
        //var newMeshes = meshes;
        // SHADOW_GEN    var ampouleLight = new BABYLON.PointLight("ampouleLight", new BABYLON.Vector3(0,0,0), this.scene);
        var tissuLight = new BABYLON.SpotLight("tissuLight",
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, 0, -1),
            Math.PI * 0.95, 0.04, g_SOLFromFile._meetScene.scene);

        let lightMesh: BABYLON.Mesh = null;
        let tissuMesh: BABYLON.Mesh = null;



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
                ((mesh.material as BABYLON.MultiMaterial).subMaterials[0] as BABYLON.StandardMaterial).emissiveColor = MEET_LIGHT_COLOR;
                (mesh.material as BABYLON.StandardMaterial).emissiveTexture = null;
                tissuLight.position.x = 0;
                tissuLight.position.y = 8.5;
                tissuLight.position.z = -10;
                tissuLight.intensityMode = BABYLON.Light.INTENSITYMODE_LUMINOUSPOWER;
                tissuLight.diffuse = MEET_LIGHT_COLOR;
                tissuLight.intensity = MEET_LIGHT_INTENSITY;//ampouleLight.intensity ;//* 0.7;
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
                let tissuMeshMat: BABYLON.StandardMaterial = mesh.material as BABYLON.StandardMaterial;
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
                g_SOLFromFile.customisableMaterial.AddMaterial(new GLBabylonMaterial(mesh.material as BABYLON.StandardMaterial));
                (mesh.material as BABYLON.StandardMaterial).bumpTexture =  new BABYLON.Texture("./assets/3D/AT_sayo_wood_NormalMap.png",
                                                                             g_SOLFromFile._meetScene.scene);
                                                                             (mesh.material as BABYLON.StandardMaterial).invertNormalMapX = true;
                                                                             (mesh.material as BABYLON.StandardMaterial).invertNormalMapY = true;
                       
               (mesh.material as BABYLON.StandardMaterial).specularTexture =  null;//new BABYLON.Texture("./assets/3D/AT_sayo_wood_SPEC.jpg",
                                                                           // g_SOLFromFile._meetScene.scene);
                (mesh.material as BABYLON.StandardMaterial).specularPower = 7;
            }

        }); // rof each meshes


        g_SOLFromFile._mainLight = new ActionCustomisableDiffuseSurfaceLight(tissuLight
            , tissuMesh.material
            , (lightMesh.material as BABYLON.MultiMaterial).subMaterials[0]
            , g_SOLFromFile._meetScene); // ampoule

        g_SOLFromFile._initialiseCustomisable();

        // all loaded
        g_SOLFromFile._onObjectLoaded(g_SOLFromFile._onObjectLoadedSender);
    }


    _initialiseCustomisable(): void {

        this._meetScene.objectLoaded = g_SOLFromFile;
        // fill object
        this.customisableMaterial._allowedColors.add(new AllowedColor("Vernis", new Map<string, IGLMaterial>()
            .set("Vernis", new IGLMaterial({diffuse: new ColorRGB(1 , 255 / 255, 255 / 255), 
                specular: new ColorRGB(0.2, 0.2, 0.2), specularPower : 10 ,
                diffuseTexture :  "./assets/3D/AT_sayo_wood_DIFF.jpg" }))
            .set("Brut", new IGLMaterial({diffuse: new ColorRGB(1 , 255 / 255, 255 / 255), specular: new ColorRGB(0.01, 0.01, 0.01) 
                ,diffuseTexture :  "./assets/3D/AT_sayo_wood_DIFF.jpg" }))
                
            .set("Violet", new IGLMaterial({diffuse: new ColorRGB(90/255 , 25 / 255, 59 / 255), specular: new ColorRGB(0.1, 0.1, 0.1), specularPower : 12,
                        diffuseTexture : ""}))));

        let mainLight = this._mainLight as ActionCustomisableDiffuseSurfaceLight;
        mainLight._defaultKey = "Savane";

        mainLight._allowedProperties.set("Savane", new AllowedDiffuseSurfaceProperty( new IGLMaterialDiffuser({ emissiveColor : MEET_LIGHT_COLOR_TISSU })
        , new IGLLight({lightIntensity : MEET_LIGHT_INTENSITY})
        , MEET_LIGHT_COLOR_TISSU ));
        
       /* this.customisableMaterial._allowedColors.add(new AllowedColor("Blanc", new Map<string, IGLMaterial>()
           // .set("Bleu", new IGLMaterial({ diffuse: new ColorRGB(1 / 255, 73 / 255, 155 / 255) }))
            .set("Blanc", new IGLMaterial({ diffuse: new ColorRGB(1 , 255 / 255, 255 / 255) }))
            .set("Noir", new IGLMaterial({ diffuse: new ColorRGB(20 / 255, 20 / 255, 24 / 255) }))
            .set("Rouge", new IGLMaterial({ diffuse: new ColorRGB(167 / 255, 4 / 255, 15 / 255) }))));
*/


    }



}