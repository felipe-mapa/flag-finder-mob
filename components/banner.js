import React, { useState } from 'react';
import { View, Text } from 'react-native'
import { AdMobBanner } from 'expo-ads-admob';

const Banner = (props) => {
    const [showAd, setShowAd] = useState(true)
    const bannerErrorHandler = (err) => {
        setShowAd(false)
    }
    const bannerLoadHandler = () => {
        setShowAd(true)
    }

    return (
        <View style={{...props.style}, {backgroundColor: 'transparent'}, showAd ? {} : { height: 0 }}>
            <AdMobBanner
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-7939975839235598/2411991834"
                servePersonalizedAds
                onAdViewDidReceiveAd={bannerLoadHandler.bind()}
                onDidFailToReceiveAdWithError={bannerErrorHandler.bind()} />
        </View>
    )
}

export default Banner