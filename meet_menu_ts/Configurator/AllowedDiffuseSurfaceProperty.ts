/// <reference path="../GL/IGLLight.ts"/>
class AllowedDiffuseSurfaceProperty
{
    
    //_lightIntensity : ColorRGBBabylon; 
    //_lightColor : ColorRGBBabylon;

    /**
     *
     */
    constructor( public _diffuserProperties : IGLMaterialDiffuser,
        public  _lightProperties : IGLLight,
        public _surfaceLightColor: ColorRGB) {
        
        
    }
}