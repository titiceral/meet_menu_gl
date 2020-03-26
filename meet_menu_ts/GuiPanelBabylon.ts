class GuiPanelBabylon implements IGuiPanel, GuiControlBabylon
{
    SetPosition(position: Vector2D) {
        this.control.linkOffsetX = position.x;
        this.control.linkOffsetY = position.y;
    }
    SetAnchor(anchorMesh: any) {
        this.control.linkWithMesh( anchorMesh);

    }
    control: BABYLON.GUI.StackPanel;
   // _panel : BABYLON.GUI.StackPanel;
    constructor(panel : BABYLON.GUI.StackPanel) {
    
        this.control = panel;
        
    }
 
    AddControl(control: IGuiControl) {
        this.control.addControl( (control as GuiControlBabylon).control);
    }
}