/// <reference path="./AllowedTexture.ts"/>
class CustomisableMaterialTexture extends IInitialisable implements ICustomisable
{
    _allowedTexture : Map<string, AllowedTexture>; // couple nom / texturePath
    _defaultKey : string;


  
    constructor(private materials : Set<GLMaterial>, ) {
        super();
        this._allowedTexture = new Map<string, AllowedTexture>();
        
    }

    //#region  Customisable
    ApplyCustomisationHandler(...tests): void {
        let buttonName = (tests[1].target as BABYLON.GUI.Button).name;
        this._setDiffuseFromKey(buttonName);
    }
    ApplyDefault(): void {
        //throw new Error("Method not implemented.");
        this._setDiffuseFromKey(this._defaultKey);
        
    }
    //#endregion

    private _setDiffuseFromKey(strKey : string)
    {
        let selectedTexture = this._allowedTexture.get(strKey);
        if( selectedTexture != null)
        {
            this.materials.forEach( (mat) =>
            {
                mat.SetDiffuseTexture( selectedTexture.strTexturePath, selectedTexture.uScale, selectedTexture.vScale);
            });
        }
    }
    
    
}