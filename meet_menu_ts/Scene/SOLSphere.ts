/// <reference path= "../GL/GLBabylonMaterial.ts"/>
/// <reference path= "./ISceneObjectLoaded.ts"/>
/// <reference path= "../GL/ColorRGB.ts"/>


class SOLSphere extends ISceneObjectLoaded
{
 
    
    /**
     *
     */
    constructor(_meetScene : MeetScene) {
        super(_meetScene);
        
    }

    LoadObject(): void {
        // Create object
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter :20}, this._meetScene.scene);
        sphere.position.y = 10 ;
    
        // create material
        let mat = new BABYLON.StandardMaterial("matSphere", this._meetScene.scene);
        mat.specularPower = 100;
        mat.diffuseColor = new BABYLON.Color3(1/255,73/255,155/255);
        mat.specularColor =  new BABYLON.Color3(0,0,0);
        sphere.material = mat;

        // fill object
        this.customisableMaterial = new CustomisableMaterial( new Set<GLBabylonMaterial>().add(
            new GLBabylonMaterial(mat)));

        this.customisableMaterial._allowedColors.add( new AllowedColor("Vernis", new Map<string, IGLMaterial>().set("Vernis", new IGLMaterial( {specular : new ColorRGB(1,1,1) }))
                                            .set("Brut",  new IGLMaterial( {specular : new ColorRGB(0.01,0.01,0.01) }))));
                         
        this.customisableMaterial._allowedColors.add( new AllowedColor("Bleu", new Map<string, IGLMaterial>().set("Bleu", new IGLMaterial( {diffuse : new ColorRGB(1/255,73/255,155/255)  }))
                                            .set("Noir",  new IGLMaterial( {diffuse : new ColorRGB(20/255,20/255,24/255)}))
                                            .set("Rouge", new IGLMaterial( {diffuse : new ColorRGB(167/255,4/255,15/255)}))));                   


        this._meshes.add(sphere);
    
    
    }
}