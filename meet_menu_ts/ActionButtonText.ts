/// <reference path="./IButton.ts" />
/// <reference path="./IActionButton.ts" />
class ActionButtonText extends IButton implements IActionButton
{
    // interface redéfinition
    eventOnActiveHandler: () => void;
    eventOnDesactivateHandler: () => void;


    /**
     *
     */
   
    constructor(anchorMesh : any, strName : string, strLabel :string )
    {
        super(anchorMesh);

        this.guiButton = GuiFactoryManager.Instance().
                            CreateGuiTextButton(strName, strLabel);
        super.InitialiseButton();

                            
    }


    //#region Ibutton héritage
    OnProgress(progressPercentage: number): void {
        throw new Error("Method not implemented.");
    }   
     OnClicked(): void {
        if( this.isClicked)
        {
            this.eventOnDesactivateHandler();
        }
        else
        {
            this.eventOnActiveHandler();
        }
    }
    //#endregion IButton héritage

    


}