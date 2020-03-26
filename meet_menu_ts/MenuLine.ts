class MenuLine extends IMenu
{
    /**
     *
     */
    constructor(anchorMesh : any, strNameIn : string, strTexturePathIn, 
        displayVectorIn : Vector2D, subMenusIn : IButton[])
    {
        super( anchorMesh, strNameIn, strTexturePathIn, 
                displayVectorIn, subMenusIn );
    }
    ComputeButtonPositions(): void {
        if (this.subMenus.length  != 0 )
        {
           
            let x = 0, y = 0;
            for (let i =0; i < this.subMenus.length; i++ )
            {
                 x =  (i+1) * this.displayVector.x;// i+1 -> start aside menu btn
                 y  = (i+1)*  this.displayVector.y; 
                 this.subMenus[i].SetPosition(x, y, this.positionWorld);


            }
        }
    }
    OnProgress(progressPercentage: number): void {
        throw new Error("Method not implemented.");
    }
 


    
}