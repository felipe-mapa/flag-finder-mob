import { useEffect, useState } from "react";
import * as Font from "expo-font";

type UseLoadFontSignature = () => {
    isFontLoaded: boolean;
};
const useLoadFont: UseLoadFontSignature = () => {
    const [isFontLoaded, setIsFontLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                await Font.loadAsync({
                    comfortaa: require("../assets/fonts/Comfortaa-Regular.ttf"),
                    "comfortaa-bold": require("../assets/fonts/Comfortaa-Bold.ttf"),
                    "comfortaa-light": require("../assets/fonts/Comfortaa-Light.ttf"),
                });

                if (mounted) {
                    setIsFontLoaded(true);
                }
            } catch (err) {
                console.log(err);
                if (mounted) {
                    setIsFontLoaded(true);
                }
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    return {
        isFontLoaded,
    };
};

export default useLoadFont;
