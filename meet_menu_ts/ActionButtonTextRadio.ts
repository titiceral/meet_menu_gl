/// <reference path="./IRadioBtn.ts" />
/// <reference path="./IActionButton.ts" />

class ActionButtonTextRadio extends IButton implements IActionButton, IRadioBtn
{
    //override
    get isClicked(): boolean
    {
        return this._isClicked;
    }
    // override
    set isClicked(value: boolean)
    {
        this._isClicked = value;
      
    }


 //   header : IGuiControl ;
    OnProgress(progressPercentage: number): void {
        throw new Error("Method not implemented.");
    }
    OnClicked(): void {
        throw new Error("Method not implemented.");
    }
    radioBtnLinker : RadioBtnLinker;
        // interface redéfinition
     eventOnActiveHandler: () => void;
     eventOnDesactivateHandler: () => void;
    /**
     *
     */
    constructor(anchorMesh : any, strName : string, strLabel :string , strGroup : string,
         radioBtnLinkerIn : RadioBtnLinker, isChecked : boolean = false)
    {
        super(anchorMesh);

       this.guiButton = GuiFactoryManager.Instance().
                            CreateGuiRadioButton(strName, strLabel,strGroup, isChecked);
       
                           
        this.radioBtnLinker = radioBtnLinkerIn;
       
        super.InitialiseButton();
    
    }




}