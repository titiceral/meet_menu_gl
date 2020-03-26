class IButton {
    /**
     *
     */
    constructor(anchorMeshIn) {
        this.positionLocal = new Vector2D(0, 0);
        this.positionWorld = new Vector2D(0, 0);
        this.isClicked = false;
        this.anchorMesh = anchorMeshIn;
    }
    get isClicked() {
        return this._isClicked;
    }
    // override
    set isClicked(value) {
        this._isClicked = value;
        if (this.guiButton != null) {
            this.guiButton.DisplayIsClicked(this._isClicked);
        }
    }
    InitialiseButton() {
        GuiFactoryManager.Instance().GetCenterMenu(null).AddButton(this.guiButton);
        this.guiButton.SetAnchor(this.anchorMesh);
    }
    SetPosition(xLocal, yLocal, postionParent) {
        this.positionLocal = new Vector2D(xLocal, yLocal);
        this.positionWorld = new Vector2D(Math.floor(xLocal + postionParent.x), Math.floor(yLocal + postionParent.y));
        this.guiButton.SetPosition(this.positionWorld);
    }
}
/// <reference path="IButton.ts" />
class IButtonImg extends IButton {
    constructor(anchorMesh, strName, strTexturePath) {
        super(anchorMesh);
        this.guiButton = GuiFactoryManager.Instance().
            CreateGuiImageButton(strName, strTexturePath);
        super.InitialiseButton();
    }
}
/// <reference path="./IButtonImg.ts" />
/// <reference path="./IActionButton.ts" />
class ActionButtonImg extends IButtonImg {
    /**
     *
     */
    constructor(anchorMesh, strName, strTexturePath) {
        super(anchorMesh, strName, strTexturePath);
    }
    OnProgress(progressPercentage) {
        throw new Error("Method not implemented.");
    }
    OnClicked() {
        if (this.isClicked) {
            this.eventOnActiveHandler();
        }
        else {
            this.eventOnDesactivateHandler();
        }
    }
}
/// <reference path="./IButton.ts" />
/// <reference path="./IActionButton.ts" />
class ActionButtonText extends IButton {
    /**
     *
     */
    constructor(anchorMesh, strName, strLabel) {
        super(anchorMesh);
        this.guiButton = GuiFactoryManager.Instance().
            CreateGuiTextButton(strName, strLabel);
        super.InitialiseButton();
    }
    //#region Ibutton héritage
    OnProgress(progressPercentage) {
        throw new Error("Method not implemented.");
    }
    OnClicked() {
        if (this.isClicked) {
            this.eventOnDesactivateHandler();
        }
        else {
            this.eventOnActiveHandler();
        }
    }
}
/// <reference path="./IRadioBtn.ts" />
/// <reference path="./IActionButton.ts" />
class ActionButtonTextRadio extends IButton {
    /**
     *
     */
    constructor(anchorMesh, strName, strLabel, strGroup, radioBtnLinkerIn, isChecked = false) {
        super(anchorMesh);
        this.guiButton = GuiFactoryManager.Instance().
            CreateGuiRadioButton(strName, strLabel, strGroup, isChecked);
        this.radioBtnLinker = radioBtnLinkerIn;
        super.InitialiseButton();
    }
    //override
    get isClicked() {
        return this._isClicked;
    }
    // override
    set isClicked(value) {
        this._isClicked = value;
    }
    //   header : IGuiControl ;
    OnProgress(progressPercentage) {
        throw new Error("Method not implemented.");
    }
    OnClicked() {
        throw new Error("Method not implemented.");
    }
}
/// <reference path="d:/dev/js_reference/babylon.d.ts" />
/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />
class GuiButtonBabylon {
    /**
     *
     */
    constructor(newButton) {
        this.control = newButton;
    }
    IsVisible(isVisible) {
        this.control.isVisible = isVisible;
    }
    AddEventOnClick(eventOnPointClicked, sender) {
        this.control.onPointerClickObservable.add(eventOnPointClicked);
        this.control.onPointerClickObservable.observers[0].scope = sender;
    }
    // permet de lier le boutton à un repère 3D et suit son mouvement
    SetAnchor(anchorMesh) {
        this.control.linkWithMesh(anchorMesh);
    }
    SetPosition(position) {
        this.control.linkOffsetX = position.x;
        this.control.linkOffsetY = position.y;
    }
    DisplayIsClicked(isClicked) {
        if (isClicked) {
            this.control.background = "#ffffff66";
        }
        else {
            this.control.background = "white";
        }
    }
}
/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />
class GuiFactoryBabylon {
    constructor() {
        this._screenGui = null;
    }
    CreateGuiTextButton(strName, strLabel) {
        var button = BABYLON.GUI.Button.CreateSimpleButton("btn" + strName, strLabel);
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
        let buttonBabylon = new GuiButtonBabylon(button);
        return buttonBabylon;
    }
    ;
    CreateGuiRadioButton(strName, strLabel, strGroup, isChecked) {
        var button = new BABYLON.GUI.RadioButton();
        button.width = "16px";
        button.height = "16px";
        button.color = "#fd7e14ff";
        button.background = "#ffffff66";
        button.isChecked = isChecked;
        button.group = strGroup;
        // ajout le label   
        let header = BABYLON.GUI.Control.AddHeader(button, strLabel, "100px", { isHorizontal: true, controlFirst: true });
        header.height = "30px";
        header.paddingLeft = "30px";
        header.color = "white";
        let buttonBabylon = new GuiButtonBabylon(header);
        return buttonBabylon;
    }
    CreateGuiImageButton(strLabel, texturePath) {
        var button = BABYLON.GUI.Button.CreateImageOnlyButton(strLabel, texturePath);
        button.width = "32px";
        button.height = "32px";
        button.color = "white";
        button.cornerRadius = 20;
        button.background = "#ffffff66";
        button.hoverCursor = "pointer";
        let buttonBabylon = new GuiButtonBabylon(button);
        return buttonBabylon;
    }
    ;
    GetCenterMenu(scene) {
        if (this._screenGui == null) {
            this._screenGui = new GuiScreenBabylon(BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("centerMenu", true, scene));
        }
        return this._screenGui;
    }
    CreatePanel() {
        let panel = new GuiPanelBabylon(new BABYLON.GUI.StackPanel);
        return panel;
    }
}
class GuiFactoryManager {
    static Instance() {
        if (this._factory == null) {
            this._factory = new GuiFactoryBabylon();
        }
        return GuiFactoryManager._factory;
    }
}
GuiFactoryManager._factory = null;
class GuiPanelBabylon {
    // _panel : BABYLON.GUI.StackPanel;
    constructor(panel) {
        this.control = panel;
    }
    SetPosition(position) {
        this.control.linkOffsetX = position.x;
        this.control.linkOffsetY = position.y;
    }
    SetAnchor(anchorMesh) {
        this.control.linkWithMesh(anchorMesh);
    }
    AddControl(control) {
        this.control.addControl(control.control);
    }
}
class GuiScreenBabylon {
    /**
     *
     */
    constructor(screen) {
        this._screen = screen;
    }
    AddButton(control) {
        this._screen.addControl(control.control);
    }
}
class IGuiButton {
}
class GuiControlBabylon {
}
class IGuiPanel {
}
class IMenu extends IButtonImg {
    constructor(anchorMesh, strName, strTexturePath, displayVectorIn, subMenusIn) {
        super(anchorMesh, strName, strTexturePath);
        this.displayVector = displayVectorIn;
        this.subMenus = subMenusIn;
        this.Close();
        this.ComputeButtonPositions();
        this.guiButton.AddEventOnClick(this.OnClicked, this);
    }
    // ouvre le menu en affichant les sous boutons
    Open() {
        this.subMenus.forEach(x => {
            x.guiButton.IsVisible(true);
        });
        this.isClicked = true;
    }
    // Ferme le menu et masquant les sous bouttons les éventuelles sous menu
    Close() {
        this.subMenus.forEach(x => {
            if (x instanceof IMenu) //  cascade close
             {
                x.Close();
            }
            x.guiButton.IsVisible(false);
            x.isClicked = false;
        }); //rof
        this.isClicked = false;
    }
    //#region  herited
    OnClicked() {
        if (this.isClicked) // isclicked state change into close/open fct
         {
            this.Close();
        }
        else {
            this.Open();
        }
    }
    SetPosition(x, y, positionParent) {
        super.SetPosition(x, y, positionParent);
        /* // recalcul la position des menu fils
         this.subMenus.forEach(element => {
             if( element instanceof  IMenu  )
             {
                (element as IMenu).ComputeButtonPositions();
             }
         });*/
        this.ComputeButtonPositions();
    }
}
class RadioBtnLinker {
    /**
     *
     */
    constructor(panelIn) {
        this.radioButtons = new Set();
    }
    RegisterRadioBtn(radioBtn) {
        this.radioButtons.add(radioBtn);
    }
}
class MenuCircle extends IMenu {
    constructor(anchorMesh, strNameIn, strTexturePathIn, displayVectorIn, subMenusIn) {
        super(anchorMesh, strNameIn, strTexturePathIn, displayVectorIn, subMenusIn);
    }
    /*  Open(): void {
          throw new Error("Method not implemented.");
      }
      Close(): void {
          throw new Error("Method not implemented.");
      }*/
    ComputeButtonPositions() {
        if (this.subMenus.length != 0) {
            let stepAngle = 2 * Math.PI / this.subMenus.length;
            let decalAngleFromDirection = Math.atan2(this.displayVector.y, this.displayVector.x);
            let normeSquare = this.displayVector.x * this.displayVector.x + this.displayVector.y * this.displayVector.y;
            let norme = 1;
            if (normeSquare != 0) {
                norme = Math.sqrt(normeSquare);
            }
            let x = 0, y = 0;
            for (let i = 0; i < this.subMenus.length; i++) {
                x = Math.cos(i * stepAngle + decalAngleFromDirection) * norme;
                y = Math.sin(i * stepAngle + decalAngleFromDirection) * norme;
                this.subMenus[i].SetPosition(x, y, this.positionWorld);
            }
        }
    }
    OnProgress(progressPercentage) {
        throw new Error("Method not implemented.");
    }
}
class MenuLine extends IMenu {
    /**
     *
     */
    constructor(anchorMesh, strNameIn, strTexturePathIn, displayVectorIn, subMenusIn) {
        super(anchorMesh, strNameIn, strTexturePathIn, displayVectorIn, subMenusIn);
    }
    ComputeButtonPositions() {
        if (this.subMenus.length != 0) {
            let x = 0, y = 0;
            for (let i = 0; i < this.subMenus.length; i++) {
                x = (i + 1) * this.displayVector.x; // i+1 -> start aside menu btn
                y = (i + 1) * this.displayVector.y;
                this.subMenus[i].SetPosition(x, y, this.positionWorld);
            }
        }
    }
    OnProgress(progressPercentage) {
        throw new Error("Method not implemented.");
    }
}
class Vector2D {
    //   x: number;
    //  y: number;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
