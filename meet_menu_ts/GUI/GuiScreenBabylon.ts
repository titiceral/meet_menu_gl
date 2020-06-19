
class GuiScreenBabylon  implements IGuiSceen
{
    _screen : BABYLON.GUI.AdvancedDynamicTexture;
    /**
     *
     */
    constructor(screen : BABYLON.GUI.AdvancedDynamicTexture) {
    
        this._screen = screen;
        
    }
    AddButton(control: IGuiControl) {
        this._screen.addControl( (control as GuiControlBabylon).control);
    }
  
}