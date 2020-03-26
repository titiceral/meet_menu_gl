/// <reference path="d:/dev/js_reference/babylon.d.ts" />
/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />

class GuiButtonBabylon   implements IGuiButton
{
    IsVisible(isVisible : boolean): void {
        this.control.isVisible = isVisible;
    }
    AddEventOnClick( eventOnPointClicked : ()  => void , sender : IButton) : void {
      this.control.onPointerClickObservable.add(eventOnPointClicked );
      this.control.onPointerClickObservable.observers[0].scope = sender;
    }
  

    control : BABYLON.GUI.Control;
    /**
     *
     */
    constructor(newButton : BABYLON.GUI.Control ) {
        
         this.control = newButton;
        
    }
    // permet de lier le boutton à un repère 3D et suit son mouvement
    SetAnchor(anchorMesh: any) {
        this.control.linkWithMesh(anchorMesh);
    }
    
    SetPosition(position: Vector2D) {
        this.control.linkOffsetX = position.x;
        this.control.linkOffsetY = position.y;
        
    }

    DisplayIsClicked(isClicked : boolean) : void
    {
        if( isClicked)
        {
            (this.control as BABYLON.GUI.Button).background =  "#ffffff66";
        }
        else
        {
            (this.control as BABYLON.GUI.Button).background =  "white";

        }
    }


}