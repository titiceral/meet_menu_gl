let g_SOLFromFile : ISceneObjectLoadedFromFile;
abstract class ISceneObjectLoadedFromFile extends ISceneObjectLoaded
{
    /**
     *
     */
    constructor(_meetScene: MeetScene) {
        super(_meetScene);
        g_SOLFromFile = this;
    }
    _loadBabylonFile( modelFolderPath : string, modelFileName : string, scene : BABYLON.Scene ) : void
    {
         BABYLON.SceneLoader.ImportMesh("", modelFolderPath, modelFileName, scene, this._loadBabylonFileOnSucces );
 
    }
    abstract _loadBabylonFileOnSucces(newMeshes : BABYLON.Mesh[]) : void
    abstract _initialiseCustomisable() : void
}