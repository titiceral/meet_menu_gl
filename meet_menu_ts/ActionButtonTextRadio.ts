/// <reference path="./IRadioBtn.ts" />


class ActionButtonTextRadio extends IButton implements  IRadioBtn
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
    
    /**
     *
     */
    constructor(anchorMesh : any, strName : string, strLabel :string , strGroup : string,
         radioBtnLinkerIn : RadioBtnLinker, configurator : ICustomisable ,isChecked : boolean = false)
    {
        super(anchorMesh);

       this.guiButton = GuiFactoryManager.Instance().
                            CreateGuiRadioButton(strName, strLabel,strGroup,
                                 isChecked, configurator);
       
                           
        this.radioBtnLinker = radioBtnLinkerIn;
       
        super.InitialiseButton();
    
    }




}