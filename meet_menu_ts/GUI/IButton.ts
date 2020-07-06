abstract class IButton {
  positionLocal: Vector2D;
  positionWorld: Vector2D;

  guiButton: IGuiButton;

  anchorMesh: AnimationPlayState;

  protected _isClicked: boolean;

  get isClicked(): boolean {
    return this._isClicked;
  }
  // override
  set isClicked(value: boolean) {
    this._isClicked = value;
    if (this.guiButton != null) {
      this.guiButton.DisplayIsClicked(this._isClicked);
    }
  }

  /**
   *
   */
  constructor(anchorMeshIn: any, public strName) {
    this.positionLocal = new Vector2D(0, 0);
    this.positionWorld = new Vector2D(0, 0);
    this.isClicked = false;
    this.anchorMesh = anchorMeshIn;
  }

  InitialiseButton() {
    GuiFactoryManager.Instance().GetCenterMenu(null).AddButton(this.guiButton);
    this.guiButton.SetAnchor(this.anchorMesh);
  }

  SetPosition(xLocal: number, yLocal: number, postionParent: Vector2D) {
    this.positionLocal = new Vector2D(xLocal, yLocal);
    this.positionWorld = new Vector2D(
      Math.floor(xLocal + postionParent.x),
      Math.floor(yLocal + postionParent.y)
    );
    this.guiButton.SetPosition(this.positionWorld);
  }

  /**
     * onProgress
  :     */
  abstract OnProgress(progressPercentage: number): void;

  abstract OnClicked(): void;
}
