//----KONFIGURACIJA----//
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//----TEME----//
import CurrentTheme from '../constants/CurrentTheme';

//----GLAVNA KOMPONENTA---//
const CircleProfilePicture = (props) => {
    // Prikaz kruga sa inicijalima korisnika
    return (
        <View style={{ ...circleStyle.circleElement, ...props.circleSize }}>
            <View style={{ ...circleStyle.letterCircle, ...props.imageSize }}>
                <Text
                    style={{ ...circleStyle.letterCircleText, ...props.textSize }}>
                    {props.firstName + props.lastName}</Text>
            </View>
        </View>
    )
};

//----STILOVI----//
const circleStyle = StyleSheet.create({
    circleElement: {
        padding: 0
    },
    letterCircle: {
        borderRadius: 50,
        backgroundColor: CurrentTheme.USER_DETAIL_PICTURE_COLOR,
        width: 0,
        height: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letterCircleText: {
        fontSize: 20,
        color: CurrentTheme.USER_DETAIL_INITIALS_COLOR
    },
});

export default CircleProfilePicture;