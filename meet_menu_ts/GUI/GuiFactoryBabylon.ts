/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />
/// <reference path="../Configurator/ICustomisable.ts" />
/// <reference path="./IButtonImg.ts" />
/// <reference path="./GuiButtonBabylon.ts" />
/// <reference path="./IGUiScreen.ts" />
/// <reference path="./IGUiPanel.ts" />
/// <reference path="./GuiScreenBabylon.ts" />
/// <reference path="./GuiPanelBabylon.ts" />

class GuiFactoryBabylon implements IGuiFactory {
  CreateGuiTextButton(strName: string, strLabel: string): IGuiButton {
    var button = BABYLON.GUI.Button.CreateSimpleButton(
      "btn" + strName,
      strLabel
    );
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
    let buttonBabylon: GuiButtonBabylon = new GuiButtonBabylon(button);

    return buttonBabylon;
  }

  CreateGuiRadioButton(
    strName: string,
    strLabel: string,
    strGroup: string,
    isChecked: boolean,
    buttonAction: IButton
  ): IGuiButton {
    var button = new BABYLON.GUI.RadioButton();

    button.name = strName;
    button.width = "24px";
    button.height = "24px";
    button.color = "#fd7e14ff";
    button.background = "#ffffff66";
    button.isChecked = isChecked;
    button.group = strGroup;
    if (buttonAction != null) {
      button.onPointerClickObservable.add(
        buttonAction.OnClicked
        //configurator.ApplyCustomisationHandler
      );
      button.onPointerClickObservable.observers[0].scope = buttonAction; //configurator;
    }

    // ajout le label
    let header: BABYLON.GUI.StackPanel = BABYLON.GUI.Control.AddHeader(
      button,
      strLabel,
      "150px",
      { isHorizontal: true, controlFirst: true }
    );
    header.height = "30px";
    header.paddingLeft = "30px";

    header.color = "white";

    let buttonBabylon: GuiButtonBabylon = new GuiButtonBabylon(header);

    return buttonBabylon;
  }
  CreateGuiImageButton(strLabel: string, texturePath: string): IGuiButton {
    var button = BABYLON.GUI.Button.CreateImageOnlyButton(
      strLabel,
      texturePath
    );
    // style
    button.width = "32px";
    button.height = "32px";
    button.color = "white";
    button.cornerRadius = 20;
    button.background = "#ffffff66";
    button.hoverCursor = "pointer";

    let buttonBabylon: GuiButtonBabylon = new GuiButtonBabylon(button);

    return buttonBabylon;
  }

  _screenGui: IGuiSceen = null;

  GetCenterMenu(scene: any): IGuiSceen {
    if (this._screenGui == null) {
      this._screenGui = new GuiScreenBabylon(
        BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
          "centerMenu",
          true,
          scene
        )
      );
    }
    return this._screenGui;
  }

  CreatePanel(): IGuiPanel {
    let panel = new GuiPanelBabylon(new BABYLON.GUI.StackPanel());
    return panel;
  }
}
