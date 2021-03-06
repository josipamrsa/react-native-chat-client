//----KONFIGURACIJA----//
import React from 'react';

import { 
    StyleSheet, 
    View 
} from 'react-native';

//----KOMPONENTE----//
import InputComponent from './InputComponent';
import CustomizableButton from './CustomizableButton';

//----TEME----//
import CurrentTheme from '../constants/CurrentTheme';

//----GLAVNA KOMPONENTA----//
const MessageInput = (props) => {
    //----METODE----//

    // Slanje podataka u roditeljsku komponentu chat ekrana
    const checkContent = (data) => props.setContent(data); 

    // Modul za slanje poruka
    return (
        <View style={inputStyle.area}>
            <InputComponent
                value={props.content}
                onChangeText={checkContent}
                placeholder="Write a message..."
                inputStyle={inputStyle.input}
                inputWidth={{ width: "80%", marginRight: 5 }} />

            <CustomizableButton
                button={inputStyle.sendButton}
                description={"Send"}
                action={props.sendMessage} />
        </View>
    )
};

//----STILOVI----//
const inputStyle = StyleSheet.create({
    area: {
        padding: 10,
        flexDirection: 'row',
        alignItems: "center",
    },
    sendButton: {
        backgroundColor: CurrentTheme.SECOND_BUTTON_COLOR,
        width: "20%"
    },
    input: {
        backgroundColor: CurrentTheme.INPUT_COLOR,
        color: CurrentTheme.INPUT_TEXT_COLOR
    }
});

export default MessageInput;