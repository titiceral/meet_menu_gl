/// <reference path="../Configurator/CustomisableMaterial.ts"/>
/// <reference path="d:/dev/js_reference/babylon.d.ts" />

abstract class ISceneObjectLoaded
{
    customisableMaterial : CustomisableMaterial ;

    _mainLight : IGLLight ;//BABYLON.Light;

    _meshes : Set<BABYLON.Mesh>;

     _onObjectLoaded: (sender) => void;
     _onObjectLoadedSender: any;

     _meetScene: MeetScene;
    /**
     *
     */
    constructor(meetScene: MeetScene) {
        this._meetScene = meetScene;
        this._meshes = new  Set<BABYLON.Mesh>();

    }

    abstract LoadObject( onObjectLoaded : (sender) => void, sender : any) : void;

    
  

    

}