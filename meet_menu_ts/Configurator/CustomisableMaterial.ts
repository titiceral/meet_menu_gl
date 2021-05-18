/// <reference path ="./ICustomisable.ts"/>
/// <reference path ="./IInitialisable.ts"/>
/// <reference path ="./AllowedColor.ts"/>
/// <reference path="d:/dev/js_reference/babylon.gui.d.ts" />

// Contient les propriétés de customisations d'un matériel
// Material le matérial concerné
// allowed color : les couleur pouvant être appliqué. Un set pour un radio, le nom du radio est dans la key de la map
class CustomisableMaterial extends IInitialisable implements ICustomisable
{
   
   
    _allowedColors : Set<AllowedColor>;

    _materials : Set<GLMaterial>;
    /**
     *
     */
    AddMaterial(mat :GLMaterial) : void
    {
        
        this._materials.add(mat);
    }
    
    constructor( materials : Set<GLMaterial>)
    {
        super();
        this._materials = materials;
        this._allowedColors = new Set<AllowedColor >();
    }

    ApplyDefault(): void {
        this._allowedColors.forEach( allowedColor => 
            {
                if(allowedColor._colorNames.has(allowedColor._defaultKey) )
                {
                     let defaultMaterial = allowedColor._colorNames.get(allowedColor._defaultKey);
                     this._materials.forEach( material => 
                    {

                        material.CopyFrom(defaultMaterial);
    
                        material.ApplyColors();
                 }); // rof each material
             }

            });
    }

    ApplyCustomisationHandler(...args): void {
      
        let buttonName = (args[1].target as BABYLON.GUI.Button).name;
        this._allowedColors.forEach( setColors => 
        {
            if( setColors._colorNames.has(buttonName ) )
            {
                let expectedMaterial = setColors._colorNames.get(buttonName);
                this._materials.forEach( (mat) =>
                {
                    mat.CopyFrom(expectedMaterial);

                    mat.ApplyColors();
                    
                });
            }
        });
    }
}