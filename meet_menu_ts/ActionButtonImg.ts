/// <reference path="./IButtonImg.ts" />



class ActionButtonImg extends IButtonImg  //implements IActionButton
{


    actionSenders : IActionSender[];
    /**
     *
     */
    constructor(anchorMesh  : any,  strName : string, strTexturePath : string,
        actionbtns : IActionSender[] ) {
        super(anchorMesh, strName, strTexturePath);
        this.actionSenders = actionbtns;

        this.guiButton.AddEventOnClick(this.OnClicked, this);
    }

    OnProgress(progressPercentage: number): void {
        throw new Error("Method not implemented.");
    }
    OnClicked(): void {
        if( this.isClicked)
        {
            this.actionSenders.forEach(actionSender => 
                {
                    actionSender.eventOnActiveHandler();
                });
        }
        else{
            this.actionSenders.forEach(actionSender => 
                {
                    actionSender.eventOnDesactivateHandler();
                });

        }
    }
   


}