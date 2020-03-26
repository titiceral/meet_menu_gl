/// <reference path="./IButtonImg.ts" />
/// <reference path="./IActionButton.ts" />


class ActionButtonImg extends IButtonImg  implements IActionButton
{
    eventOnActiveHandler: () => void;
    eventOnDesactivateHandler: () => void;
    /**
     *
     */
    constructor(anchorMesh  : any,  strName : string, strTexturePath : string ) {
        super(anchorMesh, strName, strTexturePath);
        
    }

    OnProgress(progressPercentage: number): void {
        throw new Error("Method not implemented.");
    }
    OnClicked(): void {
        if( this.isClicked)
        {
            this.eventOnActiveHandler();
        }
        else{
            this.eventOnDesactivateHandler();

        }
    }
   


}