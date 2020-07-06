/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />
/// <reference path="meet_menu.js" />

//@ts-check
//https://unpkg.com/@fortawesome/fontawesome-free@5.7.2/svgs/solid/
// Définit l'interface 2D du rendu
// anchorMesh : Mesh servant de point d'ancrage de référence pour l'interface 2D
Gui = function (_MeetScene) {
  this._MeetScene = _MeetScene;

  // point d'acroche du GUI
  let anchorMesh = new BABYLON.Mesh("AnchorMesh");
  anchorMesh.position = new BABYLON.Vector3(-8, 25, -0);
  let subTissuRadioLinker = new RadioBtnLinker(
    GuiFactoryManager.Instance().CreatePanel()
  );
  let subTissuMenu = [];

  // load texture for gound from materail customizable
  /* configurator._scene._groundCustomisable._allowedTexture.forEach(
         (pairNameColorsValue, pairNameTextureKey) =>
    {
        subTissuMenu.push(new ActionButtonTextRadio(anchorMesh, pairNameTextureKey, pairNameTextureKey, "tissuRdoGrp", 
        subTissuRadioLinker,
        configurator._scene._groundCustomisable, 
        pairNameTextureKey == configurator._scene._groundCustomisable._defaultKey));

    }); // rof each pair*/

  this._MeetScene.objectLoaded._mainLight._allowedProperties.forEach(
    (pairNameColorsValue, pairNamePropKey) => {
      subTissuMenu.push(
        new ActionButtonTextRadio(
          anchorMesh,
          pairNamePropKey,
          pairNamePropKey,
          "tissuRdoGrp",
          subTissuRadioLinker,
          this._MeetScene.objectLoaded._mainLight,
          null,
          pairNamePropKey == this._MeetScene.objectLoaded._mainLight._defaultKey
        )
      );
    }
  ); // rof each pair

  // load material color actions from material customizable
  /* let subMaterialRadioLinker = new RadioBtnLinker(
    GuiFactoryManager.Instance().CreatePanel()
  );
  let subMaterialMenu = [];
  let iGroup = 0;
  this._MeetScene.objectLoaded.customisableMaterial._allowedColors.forEach(
    (allowedColors) => {
      allowedColors._colorNames.forEach(
        (pairNameColorsValue, pairNameColorsKey) => {
          subMaterialMenu.push(
            new ActionButtonTextRadio(
              anchorMesh,
              pairNameColorsKey,
              pairNameColorsKey,
              "radioColorGrp " + iGroup,
              subMaterialRadioLinker,
              this._MeetScene.objectLoaded.customisableMaterial,
              pairNameColorsKey == allowedColors._defaultKey
            )
          );
        }
      ); // rof each pair

      iGroup++;
    }
  ); // rof each sets*/

  let subMainMenu = [
    new ActionDoubleButtonImg(
      anchorMesh,
      "Night",
      "./assets/images/gui_moon.png",
      "./assets/images/gui_sun.png",
      [
        this._MeetScene._ambientLightCustom,
        this._MeetScene.objectLoaded._mainLight,
      ]
    ) /*
    new MenuLine(
      anchorMesh,
      "Material",
      "./assets/images/gui_brush.png",
      new Vector2D(0, 30),
      subMaterialMenu
    ),*/,
    new ActionButtonImgToUrl(
      anchorMesh,
      "PUrl",
      "./assets/images/gui_store.png",
      "https://www.etsy.com/fr/shop/SuboDesign?ref=seller-platform-mcnav"
    ),
    new MenuLine(
      anchorMesh,
      "Tissu",
      "./assets/images/gui_hypo.png",
      new Vector2D(0, 30),
      subTissuMenu
    ),
  ];

  let mainMenu = new MenuCircle(
    anchorMesh,
    "main",
    "./assets/images/gui_menu.png",
    new Vector2D(0, -75),
    subMainMenu
  );
  mainMenu.SetPosition(0, -0, new Vector2D(0, 0));
};
