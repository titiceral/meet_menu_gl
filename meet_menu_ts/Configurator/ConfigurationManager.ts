/// <reference path="../Tools/MeetLogger.ts"/>
/// <reference path="./IInitialisable.ts"/>

class ConfigurationManager
{
    _initialisables : Set<IInitialisable>;

    /**
     *
     */
    constructor() {
        this._initialisables = new Set<IInitialisable>();
        
    }
    static _instance : ConfigurationManager = null;

    static instance(): ConfigurationManager
    {
        if (this._instance == null)
        {
            this._instance = new ConfigurationManager();
        }
        return this._instance;
    }

    RegisterInitialisable( initialisable : IInitialisable) : void
    {
        this._initialisables.add(initialisable);

    }

    UnregisterInitialisable( initialisable : IInitialisable) : void
    {
        this._initialisables.delete(initialisable);

    }

    ApplyDefaults(): void{
        MeetLogger.LogInfoMessage("Configuration Manager : Apply Default");
        this._initialisables.forEach ( initialisable => 
            {
                initialisable.ApplyDefault();
            });
        MeetLogger.LogInfoMessage("Configuration Manager : Default Applied");

    }


}