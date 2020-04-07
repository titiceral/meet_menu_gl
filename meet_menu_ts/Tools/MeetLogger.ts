class MeetLogger
{
    static LogInfoMessage( message : string )
    {
        console.log(`[Info] meet_menu : ${message}`);
    }

    static LogDebugMessage( message : string )
    {
        console.log(`[Debug] meet_menu : ${message}`);
    }
    static LogDebugObject( object : any )
    {
        console.log(`[Debug] meet_menu object :`);
        console.log(object);
    }
}