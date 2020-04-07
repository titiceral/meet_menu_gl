/// <reference path="IGLMaterial.ts" />
/// <reference path="ColorRGBBabylon.ts" />

class GLBabylonMaterial extends GLMaterial
{
    
    /*
    from constructor
    material : BABYLON.StandardMaterial;
*/
    /**
     *
     */
    constructor(public glmaterial : BABYLON.StandardMaterial) {
        super( { });
        
    }

    SetDiffuseTexture(strTexturePath: any,  uScale : number,  vScale : number): void {
        this.glmaterial.diffuseTexture = new BABYLON.Texture(strTexturePath, /*this.scene*/ null);
        (this.glmaterial.diffuseTexture as BABYLON.Texture).uScale = uScale;
        (this.glmaterial.diffuseTexture as BABYLON.Texture).vScale= vScale;
    }

    ApplyColors() {
     
        if( this.diffuse)
        {
            this.glmaterial.diffuseColor =  ColorRGBBabylon.FromColorRGB(this.diffuse);
        }
        if( this.emissive)
        {
            this.glmaterial.emissiveColor =  ColorRGBBabylon.FromColorRGB(this.emissive);
        }
        if( this.ambient)
        {
            this.glmaterial.ambientColor =  ColorRGBBabylon.FromColorRGB(this.ambient);
        }
        if( this.specular)
        {
            this.glmaterial.specularColor =  ColorRGBBabylon.FromColorRGB(this.specular);
        }
        if( this.diffuseTexture != null)
        {
            if( this.diffuseTexture == "")
            {
                this.glmaterial.useAlphaFromDiffuseTexture = false;
                this.glmaterial.diffuseTexture = null;
                this.glmaterial.ambientTexture = null;

            }
            else
            {

            this.glmaterial.diffuseTexture = new BABYLON.Texture(this.diffuseTexture, /*this.scene*/ null);
            this.glmaterial.ambientTexture = new BABYLON.Texture(this.diffuseTexture, /*this.scene*/ null);

            }
        }

    }
    
}