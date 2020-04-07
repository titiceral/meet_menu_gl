interface IActionSender
{
        // action réalisé lorsque le bouton est clické
    eventOnActiveHandler : () => void ;
    eventOnDesactivateHandler : () => void;
        
    ActionHandler(...tests) : void;
}