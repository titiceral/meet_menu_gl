abstract class IInitialisable
{
    constructor() {
        
        ConfigurationManager.instance().RegisterInitialisable(this);
        
    }

    abstract ApplyDefault() :  void;


}