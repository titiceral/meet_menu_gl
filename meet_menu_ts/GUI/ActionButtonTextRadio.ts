/// <reference path="./IRadioBtn.ts" />

class ActionButtonTextRadio extends IButton implements IRadioBtn {
  //override
  get isClicked(): boolean {
    return this._isClicked;
  }
  // override
  set isClicked(value: boolean) {
    this._isClicked = value;
  }

  //   header : IGuiControl ;
  OnProgress(progressPercentage: number): void {
    throw new Error("Method not implemented.");
  }
  OnClicked(...args): void {
    this.configurator.ApplyCustomisationHandler(args);
    if (this.eventOnClicked != null) {
      this.eventOnClicked;
    }
  }
  radioBtnLinker: RadioBtnLinker;

  /**
   *
   */
  constructor(
    anchorMesh: any,
    strName: string,
    strLabel: string,
    strGroup: string,
    radioBtnLinkerIn: RadioBtnLinker,
    private configurator: ICustomisable,
    private eventOnClicked: void = null,
    isChecked: boolean = false
  ) {
    super(anchorMesh, strName);

    //bind l'action dans la factory car cela depend du type de gui
    this.guiButton = GuiFactoryManager.Instance().CreateGuiRadioButton(
      strName,
      strLabel,
      strGroup,
      isChecked,
      this
    );

    this.radioBtnLinker = radioBtnLinkerIn;

    super.InitialiseButton();
  }
}
