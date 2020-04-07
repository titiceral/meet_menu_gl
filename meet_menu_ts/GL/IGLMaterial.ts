class IGLMaterial
{
    diffuse : ColorRGB = null;
    specular : ColorRGB = null;
    emissive : ColorRGB = null;
    ambient : ColorRGB = null;
    specularPower : number = null;
    diffuseTexture :  string = null;

    /**
     *
     */
    constructor( colorOptions : {diffuse? : ColorRGB ,
        specular? : ColorRGB ,
        emissive? : ColorRGB ,
        ambient? : ColorRGB,
        specularPower? : number,
        diffuseTexture? :  string 
    } ) 
    {
        if( colorOptions.diffuse)
            this.diffuse = colorOptions.diffuse;
        if( colorOptions.specular)
            this.specular = colorOptions.specular;
        if( colorOptions.emissive)
            this.emissive = colorOptions.emissive;
        if( colorOptions.ambient)
            this.ambient = colorOptions.ambient;
        if( colorOptions.specularPower)
            this.specularPower = colorOptions.specularPower;
        if( colorOptions.diffuseTexture != null)
            this.diffuseTexture = colorOptions.diffuseTexture;
        
    }
}

abstract class GLMaterial extends IGLMaterial
{
 

     
    abstract SetDiffuseTexture(strTexturePath: string, uScale : number,  vScale : number) : void;

    abstract ApplyColors() : void;

     CopyFrom(fromMat : IGLMaterial) : void
    {
        this.diffuse = fromMat.diffuse;
        this.emissive = fromMat.emissive;

        this.ambient = fromMat.ambient;
        this.specular = fromMat.specular;
        this.specularPower = fromMat.specularPower;
        this.diffuseTexture = fromMat.diffuseTexture;
    }

}