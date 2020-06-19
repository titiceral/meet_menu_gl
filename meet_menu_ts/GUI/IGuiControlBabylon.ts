abstract class GuiControlBabylon implements IGuiControl
{
    abstract SetAnchor(anchorMesh: any) ;
    abstract SetPosition(position: Vector2D) ;
    control : BABYLON.GUI.Control;
}