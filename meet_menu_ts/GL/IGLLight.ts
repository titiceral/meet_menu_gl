class IGLLight
{
    lightIntensity : number = null; 
    lightColor : ColorRGB = null;


    /**
     *
     */
    constructor(colorOptions : {lightIntensity? : number ,
        lightColor? : ColorRGB  }) 
    {
        if( colorOptions.lightIntensity)
        {
            this.lightIntensity = colorOptions.lightIntensity;
        }
        if( colorOptions.lightColor)
        {
            this.lightColor = colorOptions.lightColor;
        }
    
        
    }
}
abstract class GLLight extends IGLLight
{
    CopyFrom(fromLight : IGLLight) : void
    {
        this.lightColor = fromLight.lightColor;
        this.lightIntensity = fromLight.lightIntensity;

    }    
    abstract ApplyProperties() : void;

}