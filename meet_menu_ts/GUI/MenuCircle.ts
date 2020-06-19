class MenuCircle extends IMenu
{
    constructor( anchorMesh : any, strNameIn : string, strTexturePathIn, 
        displayVectorIn : Vector2D, subMenusIn : IButton[])
    {
        super( anchorMesh, strNameIn, strTexturePathIn, 
                displayVectorIn, subMenusIn );
    }

  /*  Open(): void {
        throw new Error("Method not implemented.");
    }   
    Close(): void {
        throw new Error("Method not implemented.");
    }*/
   

    ComputeButtonPositions(): void {
        if (this.subMenus.length  != 0 )
        {
            let stepAngle = 2 * Math.PI / this.subMenus.length;
            let decalAngleFromDirection = Math.atan2(this.displayVector.y, this.displayVector.x);

            let normeSquare = this.displayVector.x * this.displayVector.x + this.displayVector.y * this.displayVector.y;
            let norme = 1;
            if( normeSquare != 0)
            {
                norme = Math.sqrt( normeSquare );
            }
            let x = 0, y = 0;
            for (let i =0; i < this.subMenus.length; i++ )
            {
                 x = Math.cos( i * stepAngle + decalAngleFromDirection ) * norme;
                 y  = Math.sin( i * stepAngle + decalAngleFromDirection ) * norme;
                 this.subMenus[i].SetPosition(x, y, this.positionWorld);


            }
        }
      
    }


    OnProgress(progressPercentage: number): void {
        throw new Error("Method not implemented.");
    }

    
}