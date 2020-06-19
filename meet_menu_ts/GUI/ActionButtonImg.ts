/// <reference path="./IButtonImg.ts" />
/// <reference path="../Configurator/IActionSender.ts" />



class ActionButtonImg extends IButtonImg  //implements IActionButton
{
    isClickedDone = true;
  // override
  get isClicked(): boolean
  {
      return this._isClicked;
  }
  set isClicked(value: boolean)
  {
      this._isClicked = value;
      if( this.guiButton != null  )
      {
          this.guiButton.DisplayIsClicked(this.isClickedDone == false); // clicked untill action done
      }
    
  }


    actionSenders : IActionSender[];
    /**
     *
     */
    constructor(anchorMesh  : any,  strName : string, strTexturePath : string, private strTexturePathClicked : string,
        actionbtns : IActionSender[] ) {
        super(anchorMesh, strName, strTexturePath);
        this.actionSenders = actionbtns;

        this.guiButton.AddEventOnClick(this.OnClicked, this);


        actionbtns.forEach((actionbtn) => 
        {
            actionbtn.InitiliseCallback(this.OnClickedDone, this);
        });
    }

    OnProgress(progressPercentage: number): void {
        throw new Error("Method not implemented.");
    }
    OnClicked(): void {

        this.isClickedDone = false;

        if( this.isClicked)
        {
            this.isClicked = false;
            this.actionSenders.forEach(actionSender => 
                {
                    actionSender.eventOnActiveHandler();
                });
        }
        else{
            this.isClicked = true;

            this.actionSenders.forEach(actionSender => 
                {
                    actionSender.eventOnDesactivateHandler();
                });

        }
    }

    // callback
    OnClickedDone(sender : ActionButtonImg ): void { // ActionButtonImg should be this
        if( sender.isClicked)
        {
            sender.guiButton.ChangePicture(sender.strTexturePathClicked) ;

        }
        else{
            sender.guiButton.ChangePicture(sender.strTexturePath) ;


        }
        
        sender.isClickedDone = true;
        sender.isClicked = sender.isClicked; // update buton background



    }
   


}