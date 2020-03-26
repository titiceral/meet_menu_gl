/// <reference path="IButton.ts" />

abstract class IButtonImg extends IButton
{

    constructor(anchorMesh : any,  strName : string, strTexturePath : string )
    {
        
        super(anchorMesh);
        this.guiButton = GuiFactoryManager.Instance().
                            CreateGuiImageButton(strName, strTexturePath);
        super.InitialiseButton();
    }

}