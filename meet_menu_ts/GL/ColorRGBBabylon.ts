class ColorRGBBabylon
{
    static FromColorRGB(color : ColorRGB): BABYLON.Color3
    {
        return new BABYLON.Color3(color.r, color.g, color.b);
    }
}