///<reference path="IGLLight.ts" />
class GLBabylonLight extends GLLight
{
  
   
    /**
     *
     */
    constructor(public _gllight : BABYLON.Light) {
        super({});
        
    }
    ApplyProperties(): void {

       if( this.lightColor )
       {
           this._gllight.diffuse = ColorRGBBabylon.FromColorRGB(this.lightColor);
           this._gllight.specular = ColorRGBBabylon.FromColorRGB(this.lightColor);

       }
    }

}