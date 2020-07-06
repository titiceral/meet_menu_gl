/// <reference path="./IButtonImg.ts" />
/// <reference path="../Configurator/IActionSender.ts" />

class ActionButtonImgToUrl extends IButtonImg {
  //implements IActionButton {
  isClickedDone = true;
  // override
  get isClicked(): boolean {
    return this._isClicked;
  }
  set isClicked(value: boolean) {
    this._isClicked = value;
  }

  /**
   *
   */
  constructor(
    anchorMesh: any,
    strName: string,
    strTexturePath: string,
    public actionToUrl: string
  ) {
    super(anchorMesh, strName, strTexturePath);
    this._isClicked = false;

    this.guiButton.AddEventOnClick(this.OnClicked, this);
    if (this.guiButton != null) {
      this.guiButton.DisplayIsClicked(false); // clicked untill action done
    }
  }

  OnProgress(progressPercentage: number): void {
    throw new Error("Method not implemented.");
  }
  OnClicked(): void {
    //window.location.href = this.actionToUrl;
    window.open(this.actionToUrl, "_blank");
  }
}
