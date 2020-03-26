class  RadioBtnLinker
{
    radioButtons : Set<IRadioBtn>;

  
    /**
     *
     */
    constructor(panelIn : IGuiPanel) {
        
        this.radioButtons = new Set<IRadioBtn>();
       
    }

    RegisterRadioBtn(radioBtn :IRadioBtn) :void
    {
        this.radioButtons.add(radioBtn);
    }
}