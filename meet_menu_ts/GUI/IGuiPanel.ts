abstract class IGuiPanel implements IGuiControl
{
    abstract SetPosition(position: Vector2D) ;
    abstract AddControl(control : IGuiControl);

    abstract SetAnchor( anchorMesh : any);

}