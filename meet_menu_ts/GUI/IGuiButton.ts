/// <reference path="./IGuiControl.ts" />

abstract class IGuiButton implements IGuiControl
{
    abstract SetAnchor( anchorMesh : any);

    abstract SetPosition( position : Vector2D);

    abstract AddEventOnClick(eventOnPointClicked : ( ) => void, sender : IButton) : void;

    abstract IsVisible(isVisible : boolean) : void;
    
    abstract DisplayIsClicked(isClicked : boolean) : void;

    abstract ChangePicture( strPath : string);
}