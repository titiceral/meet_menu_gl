class IGLMaterialDiffuser {
  diffuseTexture: string = null;
  emissiveTexture: string = null;
  opacityTexture: string = null;
  // lightIntensity : number = null;
  uScaleTexture: number = null;
  vScaleTexture: number = null;
  emissiveColor: ColorRGB = null;
  uOffsetTexture: number = 0;
  // hack : clamp texture emissive pour ne pas l'afficher tant que la lampe n'est pas allumée
  vOffsetTexture: number = -1;
  /**
   *
   */
  constructor(colorOptions: {
    diffuseTexture?: string;
    uScaleTexture?: number;
    vScaleTexture?: number;
    uOffsetTexture?: number;
    vOffsetTexture?: number;
    emissiveTexture?: string;
    opacityTexture?: string;
    emissiveColor?: ColorRGB;
  }) {
    if (colorOptions.diffuseTexture != null)
      this.diffuseTexture = colorOptions.diffuseTexture;
    if (colorOptions.uScaleTexture)
      this.uScaleTexture = colorOptions.uScaleTexture;
    if (colorOptions.vScaleTexture)
      this.vScaleTexture = colorOptions.vScaleTexture;
    if (colorOptions.uOffsetTexture)
      this.uOffsetTexture = colorOptions.uOffsetTexture;
    if (colorOptions.vOffsetTexture)
      this.vOffsetTexture = colorOptions.vOffsetTexture;
    if (colorOptions.emissiveTexture != null)
      this.emissiveTexture = colorOptions.emissiveTexture;
    if (colorOptions.opacityTexture != null)
      this.opacityTexture = colorOptions.opacityTexture;
    if (colorOptions.emissiveColor)
      this.emissiveColor = colorOptions.emissiveColor;
  }

  // load texture in glmemory
  PreloadTextures(): void {
    if (this.diffuseTexture != null) {
      let texture = new BABYLON.Texture(this.diffuseTexture, null);
    }
    if (this.emissiveTexture != null) {
      let texture = new BABYLON.Texture(this.emissiveTexture, null);
    }
    if (this.opacityTexture != null) {
      let texture = new BABYLON.Texture(this.opacityTexture, null);
    }
  }
}
abstract class GLMaterialDiffuser extends IGLMaterialDiffuser {
  abstract SetDiffuseTexture(
    strTexturePath: string,
    uScale: number,
    vScale: number,
    uOffset: number,
    vOffset: number
  ): void;
  abstract SetEmissiveTexture(
    strTexturePath: string,
    uScale: number,
    vScale: number,
    uOffset: number,
    vOffset: number
  ): void;
  abstract SetOpacityTexture(
    strTexturePath: string,
    uScale: number,
    vScale: number,
    uOffset: number,
    vOffset: number
  ): void;

  abstract ApplyColor(): void;

  CopyFrom(fromMat: IGLMaterialDiffuser): void {
    this.diffuseTexture = fromMat.diffuseTexture;
    this.uScaleTexture = fromMat.uScaleTexture;
    this.vScaleTexture = fromMat.vScaleTexture;
    this.vOffsetTexture = fromMat.vOffsetTexture;
    this.uOffsetTexture = fromMat.uOffsetTexture;

    this.emissiveTexture = fromMat.emissiveTexture;
    this.emissiveColor = fromMat.emissiveColor;
  }
}
