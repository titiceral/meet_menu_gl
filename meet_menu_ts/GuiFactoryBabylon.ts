
/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />

class GuiFactoryBabylon implements IGuiFactory
{
    CreateGuiTextButton( strName : string, strLabel :string) : IGuiButton {
       
        var button = BABYLON.GUI.Button.CreateSimpleButton("btn"+strName, strLabel);
        button.width = 0.2;
        button.height = "40px";
        button.cornerRadius = 20;

        button.color = "white";
        button.background = "green";
        button.color = "Orange";
        button.thickness = 4;
        button.background = "green";
        button.hoverCursor = "pointer";
        button.isPointerBlocker = true;
        let buttonBabylon : GuiButtonBabylon = new GuiButtonBabylon(button);
      
        return buttonBabylon;
    };

    CreateGuiRadioButton( strName : string, strLabel :string, strGroup : string, isChecked : boolean) : IGuiButton 
    {
        var button = new BABYLON.GUI.RadioButton();


        button.width = "16px";
        button.height = "16px";
        button.color = "#fd7e14ff";  
        button.background = "#ffffff66";  
        button.isChecked = isChecked;
        button.group = strGroup;
        // ajout le label   
        let header : BABYLON.GUI.StackPanel = BABYLON.GUI.Control.AddHeader(button, strLabel, "100px", { isHorizontal: true, controlFirst: true });
        header.height = "30px";
        header.paddingLeft = "30px";

        header.color = "white";
    

      
  
        let buttonBabylon : GuiButtonBabylon = new GuiButtonBabylon(header);
      
         return buttonBabylon;
    }
    CreateGuiImageButton(strLabel : string, texturePath : string): IGuiButton
    {
        var button = BABYLON.GUI.Button.CreateImageOnlyButton(strLabel, texturePath);
        button.width = "32px";
        button.height = "32px";
        button.color = "white";
        button.cornerRadius = 20;
        button.background = "#ffffff66";  
        button.hoverCursor = "pointer";

        let buttonBabylon : GuiButtonBabylon = new GuiButtonBabylon(button);
        return buttonBabylon;
    };

    _screenGui : IGuiSceen = null;
    
    GetCenterMenu(scene : any ) : IGuiSceen
    {

        if(this._screenGui == null)
        {

            this._screenGui =  new GuiScreenBabylon( BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("centerMenu", true, scene));
            
 
        }
        return this._screenGui;
    } 

    CreatePanel() : IGuiPanel
    {
        let panel = new GuiPanelBabylon( new BABYLON.GUI.StackPanel);
        return panel;

    }

    
}