
class IGLMaterialDiffuser
{
  
    diffuseTexture :  string = null;
    emissiveTexture :  string = null;
   // lightIntensity : number = null;
    uScaleTexture : number = null;
    vScaleTexture : number = null;
    emissiveColor : ColorRGB = null;
    /**
     *
     */
    constructor( colorOptions : {diffuseTexture? : string ,
        uScaleTexture? : number, vScaleTexture? : number;
        emissiveTexture? : string ,
        emissiveColor? : ColorRGB
    } ) 
    {
        if( colorOptions.diffuseTexture != null)
            this.diffuseTexture = colorOptions.diffuseTexture;
            if( colorOptions.uScaleTexture)
            this.uScaleTexture = colorOptions.uScaleTexture;
        if( colorOptions.vScaleTexture)
            this.vScaleTexture = colorOptions.vScaleTexture;

        if( colorOptions.emissiveTexture != null)
            this.emissiveTexture = colorOptions.emissiveTexture;
        if( colorOptions.emissiveColor)
            this.emissiveColor = colorOptions.emissiveColor;
  
        
    }
}
abstract class GLMaterialDiffuser extends IGLMaterialDiffuser
{
      
    abstract SetDiffuseTexture(strTexturePath: string, uScale : number,  vScale : number) : void;
    abstract SetEmissiveTexture(strTexturePath: string, uScale : number,  vScale : number) : void;
    abstract ApplyColor() : void;

     CopyFrom(fromMat : IGLMaterialDiffuser) : void
    {
        this.diffuseTexture = fromMat.diffuseTexture;
        this.uScaleTexture = fromMat.uScaleTexture;

        this.emissiveTexture = fromMat.emissiveTexture;
        this.emissiveColor = fromMat.emissiveColor;

    }

}