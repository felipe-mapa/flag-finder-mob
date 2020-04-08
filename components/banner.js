import React, { useState, useEffect } from "react";
import { View, Keyboard } from "react-native";
import { AdMobBanner } from "expo-ads-admob";

const Banner = (props) => {
  const [showAd, setShowAd] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        setShowAd(false);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        setShowAd(true);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  });

  const bannerErrorHandler = (err) => {
    setShowAd(false);
  };
  const bannerLoadHandler = () => {
      if(!isKeyboardVisible){
          setShowAd(true);
      }
  };

  return (
    <View
      style={
        ({ ...props.style },
        { backgroundColor: "transparent" },
        showAd ? {} : { height: 0 })
      }
    >
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID="ca-app-pub-7939975839235598/2411991834"
        servePersonalizedAds
        onAdViewDidReceiveAd={bannerLoadHandler.bind()}
        onDidFailToReceiveAdWithError={bannerErrorHandler.bind()}
      />
    </View>
  );
};

export default Banner;
