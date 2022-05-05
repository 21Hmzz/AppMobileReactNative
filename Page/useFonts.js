import * as Font from "expo-font";

export default useFonts = async () => {
    await Font.loadAsync({
        "QuickSand": require("./assets/fonts/Quicksand-VariableFont_wght.ttf"),
        // All other fonts here
    });
};