abstract class IMenu extends IButtonImg
{
    // vector non normalisé indiquant comment afficher les sous menu
    displayVector : Vector2D;

    // liste des butons ou sous menu du menu
    subMenus : IButton[];

    // allow compilation for onlicke callback
    scope: IMenu;

 
    // ouvre le menu en affichant les sous boutons
    Open() : void
    {
        this.subMenus.forEach( x => {
            x.guiButton.IsVisible( true );
          
        }
        )
        this.isClicked = true;
    

    }

    // Ferme le menu et masquant les sous bouttons les éventuelles sous menu
    Close() : void
    {
        this.subMenus.forEach( x =>
            {
                if( x instanceof IMenu) //  cascade close
                {
                    x.Close();
                }
                x.guiButton.IsVisible( false);
                x.isClicked = false;

        }
        )//rof
        this.isClicked = false;
   


    }

    // Détermine les emplacements des sous bouttons en fonction du type de manu
    abstract ComputeButtonPositions() : void;


    constructor( anchorMesh : any, strName : string, strTexturePath, 
        displayVectorIn : Vector2D, subMenusIn : IButton[])
    {
        super( anchorMesh, strName, strTexturePath);
        this.displayVector =  displayVectorIn;
        this.subMenus =  subMenusIn;
        this.Close();

        this.ComputeButtonPositions();

        this.guiButton.AddEventOnClick(this.OnClicked, this);

    }

    //#region  herited
     OnClicked() : void
     {
      
         if (this.isClicked) // isclicked state change into close/open fct
         {

             this.Close();

         }
         else
         {
         
             this.Open();
         }



     }

     SetPosition(x : number, y : number, positionParent : Vector2D)
     {
         super.SetPosition(x, y, positionParent);
        /* // recalcul la position des menu fils
         this.subMenus.forEach(element => {
             if( element instanceof  IMenu  )
             {
                (element as IMenu).ComputeButtonPositions();
             }
         });*/
         this.ComputeButtonPositions();
     }
     //#endregion

}