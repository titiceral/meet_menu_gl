/// <reference path="../Configurator/ICustomisable.ts" />

interface IGuiFactory
{
    // créé un bouton sous forme de texte
    CreateGuiTextButton(strName : string, strLabel : string) : IGuiButton;
    
    // créé un bouton sous forme d'image
    CreateGuiImageButton(strLabel : string, texturePath : string): IGuiButton;

    // créé un radio button
    CreateGuiRadioButton(strName : string, strLabel : string, strgroup : string, isChecked : boolean, 
        configurator : ICustomisable) : IGuiButton;

    // Créé le panneau recevant les boutons
    GetCenterMenu(scene : any) : IGuiSceen;

    CreatePanel() : IGuiPanel
}