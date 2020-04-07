/// <reference path="GLMaterialDiffuser.ts" />
/// <reference path="ColorRGBBabylon.ts" />

class GLBabylonMaterialDiffuser extends GLMaterialDiffuser
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
        if( strTexturePath != null)
        {
            this.glmaterial.diffuseTexture = new BABYLON.Texture(strTexturePath, /*this.scene*/ null);
            (this.glmaterial.diffuseTexture as BABYLON.Texture).uScale = uScale;
            (this.glmaterial.diffuseTexture as BABYLON.Texture).vScale= vScale;
        }
    }

    SetEmissiveTexture(strTexturePath: any,  uScale : number,  vScale : number): void {
        if( strTexturePath != null)
        {
        this.glmaterial.emissiveTexture = new BABYLON.Texture(strTexturePath, /*this.scene*/ null);
        (this.glmaterial.emissiveTexture as BABYLON.Texture).uScale = uScale;
        (this.glmaterial.emissiveTexture as BABYLON.Texture).vScale= vScale;
        }
    }

    
    ApplyColor() : void {
     
        if( this.emissiveColor)
        {
            this.glmaterial.emissiveColor =  ColorRGBBabylon.FromColorRGB(this.emissiveColor);
        }
    }
  
    
    
}