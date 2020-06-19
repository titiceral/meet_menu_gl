interface IActionSender
{
        // action réalisé lorsque le bouton est clické
    eventOnActiveHandler : () => void ;
    eventOnDesactivateHandler : () => void;
    eventOnActiveHandlerEnd: (sender : any) => void;

        
    ActionHandler(...tests) : void;

    InitiliseCallback( eventOnActiveHandlerEndIn : (sender : any) => void
    ,sender : any) : void;

}