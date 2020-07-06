/// <reference path="GLMaterialDiffuser.ts" />
/// <reference path="ColorRGBBabylon.ts" />

class GLBabylonMaterialDiffuser extends GLMaterialDiffuser {
  /*
    from constructor
    material : BABYLON.StandardMaterial;
*/
  /**
   *
   */
  constructor(public glmaterial: BABYLON.StandardMaterial) {
    super({});
  }

  SetDiffuseTexture(
    strTexturePath: any,
    uScale: number,
    vScale: number,
    uOffset: number,
    vOffset: number
  ): void {
    if (strTexturePath != null) {
      this.glmaterial.diffuseTexture = new BABYLON.Texture(
        strTexturePath,

        /*this.scene*/ null
      );
      if (uScale != null) {
        (this.glmaterial.diffuseTexture as BABYLON.Texture).uScale = uScale;
      } else {
        (this.glmaterial.diffuseTexture as BABYLON.Texture).uScale = 1;
      }
      if (vScale != null) {
        (this.glmaterial.diffuseTexture as BABYLON.Texture).vScale = vScale;
      } else {
        (this.glmaterial.diffuseTexture as BABYLON.Texture).vScale = 1;
      }
    } else {
      this.glmaterial.diffuseTexture = null;
    }

    this.glmaterial.diffuseTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
    this.glmaterial.diffuseTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
    (this.glmaterial.diffuseTexture as BABYLON.Texture).vOffset = vOffset;
    (this.glmaterial.diffuseTexture as BABYLON.Texture).uOffset = uOffset;
  }

  SetEmissiveTexture(
    strTexturePath: any,
    uScale: number,
    vScale: number,
    uOffset: number,
    vOffset: number
  ): void {
    if (strTexturePath != null) {
      this.glmaterial.emissiveTexture = new BABYLON.Texture(
        strTexturePath,
        null
      );
      if (uScale != null) {
        (this.glmaterial.emissiveTexture as BABYLON.Texture).uScale = uScale;
      } else {
        (this.glmaterial.emissiveTexture as BABYLON.Texture).uScale = 1;
      }
      if (vScale != null) {
        (this.glmaterial.emissiveTexture as BABYLON.Texture).vScale = vScale;
      } else {
        (this.glmaterial.emissiveTexture as BABYLON.Texture).vScale = 1;
      }

      // hack : clamp texture emissive pour ne pas l'afficher tant que la lampe n'est pas allumée
      this.glmaterial.emissiveTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE; //
      this.glmaterial.emissiveTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
      (this.glmaterial.emissiveTexture as BABYLON.Texture).vOffset = vOffset;
      (this.glmaterial.emissiveTexture as BABYLON.Texture).uOffset = uOffset;
    } else {
      this.glmaterial.emissiveTexture = null;
    }
  }
  SetOpacityTexture(strTexturePath: any, uScale: number, vScale: number): void {
    if (strTexturePath != null) {
      this.glmaterial.opacityTexture = new BABYLON.Texture(
        strTexturePath,
        /*this.scene*/ null
      );
      if (uScale != null) {
        (this.glmaterial.opacityTexture as BABYLON.Texture).uScale = uScale;
      } else {
        (this.glmaterial.opacityTexture as BABYLON.Texture).uScale = 1;
      }
      if (vScale != null) {
        (this.glmaterial.opacityTexture as BABYLON.Texture).vScale = vScale;
      } else {
        (this.glmaterial.opacityTexture as BABYLON.Texture).vScale = 1;
      }
      this.glmaterial.opacityTexture.getAlphaFromRGB = true;
    } else {
      this.glmaterial.opacityTexture = null;
    }
  }

  ApplyColor(): void {
    if (this.emissiveColor) {
      this.glmaterial.emissiveColor = ColorRGBBabylon.FromColorRGB(
        this.emissiveColor
      );
    }
  }
}
