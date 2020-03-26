
class GuiFactoryManager
{
    private static  _factory: IGuiFactory = null;


    public static  Instance() : IGuiFactory
    {
        if ( this._factory == null)
        {
            this._factory = new GuiFactoryBabylon();
        }
        return GuiFactoryManager._factory;
    }
}
