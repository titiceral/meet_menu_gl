/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />
/// <reference path="meet_menu.js" />

//@ts-check
//https://unpkg.com/@fortawesome/fontawesome-free@5.7.2/svgs/solid/
// Définit l'interface 2D du rendu
// anchorMesh : Mesh servant de point d'ancrage de référence pour l'interface 2D
Gui =  function( _scene, configurator)
{
    this._configurator = configurator;
  //  var centerMenu = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("centerMenu", true, _scene);
 
    // render menu
   //var rect1 = this._createSubMenuImage("Nuit", "./assets/images/gui_moon.png", "SunToMoon");

  //  centerMenu.addControl(rect1);
   // centerMenu.addControl(button);

   let matSphere =  configurator._scene.objectLoaded.customisableMaterial._material;
  //  
 //Remplaced   rect1.linkWithMesh(anchorMesh);   
 //Remplaced   rect1.linkOffsetY = -150;
 let anchorMesh = new BABYLON.Mesh("AnchorMesh");
 anchorMesh.position = new BABYLON.Vector3(12, 20, -0);
    let subTissuRadioLinker = new RadioBtnLinker(GuiFactoryManager.Instance().CreatePanel());
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
    console.log("toto");
    console.log(configurator._scene.objectLoaded);
   // if (configurator._scene.objectLoaded._mainLight instanceof ICustomisable)
    {
      //  if( configurator._scene.objectLoaded._mainLight instanceof ActionCustomisableDiffuseSurfaceLight)
        {
            configurator._scene.objectLoaded._mainLight._allowedProperties.forEach(
                (pairNameColorsValue, pairNamePropKey) =>
            {
                subTissuMenu.push(new ActionButtonTextRadio(anchorMesh, pairNamePropKey, pairNamePropKey, "tissuRdoGrp", 
                subTissuRadioLinker,
                configurator._scene.objectLoaded._mainLight, 
                pairNamePropKey == configurator._scene.objectLoaded._mainLight._defaultKey));

            }); // rof each pair
        }// fi ActionCustomisableDiffuseSurfaceLight type
    }// fi ICustomizable
    

    // load material color actions from material customizable
    let subMaterialRadioLinker = new RadioBtnLinker(GuiFactoryManager.Instance().CreatePanel());
    let subMaterialMenu = [];
    let iGroup = 0;
    configurator._scene.objectLoaded.customisableMaterial._allowedColors.forEach( allowedColors =>
    {
        
        
        allowedColors._colorNames.forEach( (pairNameColorsValue, pairNameColorsKey) =>
        {
            subMaterialMenu.push(new ActionButtonTextRadio(anchorMesh, pairNameColorsKey, pairNameColorsKey, "radioColorGrp "+ iGroup, subMaterialRadioLinker,
            configurator._scene.objectLoaded.customisableMaterial,pairNameColorsKey == allowedColors._defaultKey));
    
        }); // rof each pair
    
        iGroup++;
     } ); // rof each sets

     
    

    let subMainMenu = [
        new ActionButtonImg(anchorMesh, "Night", "./assets/images/gui_moon.png",
            [configurator._scene._ambientLightCustom, configurator._scene.objectLoaded._mainLight])
        ,new MenuLine(anchorMesh, "Material","./assets/images/gui_brush.png",new Vector2D(0, 30), subMaterialMenu)
        ,new MenuLine(anchorMesh, "Tissu","./assets/images/gui_hypo.png",new Vector2D(0, 30), subTissuMenu)


    
    ];
    let mainMenu = new MenuCircle(anchorMesh ,"main","./assets/images/gui_menu.png", new Vector2D(0, -75),
          subMainMenu);
    mainMenu.SetPosition(0,-0, new Vector2D(0,0));

       


};

Gui.prototype = {

    _createSubMenuText : function( strLabel)
    {
       
        var button = BABYLON.GUI.Button.CreateSimpleButton("btn"+strLabel, strLabel);
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
        

  
        return button;
    },
    _createSubMenuImage : function(strLabel, texturePath, stateTo)
    {
        var button = BABYLON.GUI.Button.CreateImageOnlyButton(strLabel, texturePath);
        button.width = "32px";
        button.height = "32px";
        button.color = "white";
        button.cornerRadius = 20;
        button.hoverCursor = "pointer";

        // evenement au click
        var configurator = this._configurator;
        button.onPointerClickObservable.add(function()
        {
        console.log(button.background);
         
            configurator.intialiseState(button,stateTo);
        })
       

    //    button.background = "green";
 
       
        return button;
    },
    lockButton : function(button)
    {
         //  sender.isPointerBlocker = false; // lock button
         button.hoverCursor = "wait";
         console.log ("button.background " + button.background );
         button.background = "black";
         // remove actions
        var observers = button.onPointerClickObservable.observers;
        observers.forEach(element => {
            button.onPointerClickObservable.remove(element);
            
        });
    },

    SunToMoonEnd : function(button)
    {
        button.hoverCursor = "pointer";
        button.background = "";
        console.log("suntomoonEnd" );
        button.image.source ="./assets/images/gui_sun.png";
        
        var configurator = this._configurator;
        var observers = button.onPointerClickObservable.observers;
        observers.forEach(element => {
            button.onPointerClickObservable.remove(element);
            
        });
        
        button.onPointerClickObservable.add(function()
        {
         
            configurator.intialiseState(button,"MoonToSun");
        })

    },
    MoonToSunEnd : function(button)
    {
        button.cusor = "pointer";
        button.hoverCursor = "pointer";
        button.background = "";
        console.log("MoonToSunEnd" );
        button.image.source = "./assets/images/gui_moon.png";
        var configurator = this._configurator;
        var observers = button.onPointerClickObservable.observers;
        observers.forEach(element => {
            button.onPointerClickObservable.remove(element);
            
        });
        button.onPointerClickObservable.add(function()
        {
         
            configurator.intialiseState(button,"SunToMoon");
        })

    }
    
    // progress bar
    //https://doc.babylonjs.com/snippets/sector
}