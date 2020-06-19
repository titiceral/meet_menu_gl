/// <reference path="IButton.ts" />
/// <reference path="./GuiFactoryManager.ts" />

abstract class IButtonImg extends IButton
{

    constructor(anchorMesh : any,  strName : string, protected strTexturePath : string )
    {
        
        super(anchorMesh);
        this.guiButton = GuiFactoryManager.Instance().
                            CreateGuiImageButton(strName, strTexturePath);
        super.InitialiseButton();
    }

}