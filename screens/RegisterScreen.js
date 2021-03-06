//----KONFIGURACIJA----//
import React, {
    useState
} from 'react';

import {
    StyleSheet,
    View,
    Alert,
    TouchableWithoutFeedback,   // "Tapkanje" po ekranu
    Keyboard,                   // Rad s tipkovnicom
} from 'react-native';

//----SERVISI----//
import signInService from '../services/signInService';

//----KOMPONENTE----//
import CustomizableButton from '../components/CustomizableButton';      // Komponenta za zamjenu klasičnog botuna u React Native
import GridCard from '../components/GridCard';                          // Prikaz kartice za registraciju (stilizacija)
import InputComponent from '../components/InputComponent';              // Komponenta za unos

//----TEME----//
import CurrentTheme from '../constants/CurrentTheme';

//----EKRAN----//
const RegisterScreen = (props) => {
    //----STANJA----//
    
    // Podaci potrebni za registraciju...
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");

    const checkFirstName = (data) => setFirstName(data);
    const checkLastName = (data) => setLastName(data);
    const checkEmail = (data) => setEmail(data);
    const checkPassword = (data) => setPassword(data);
    const checkPhoneNumber = (data) => setPhoneNumber(data);
    const checkLocation = (data) => setLocation(data);

    //----METODE---//

    // Registracija korisnika 
    const registerUser = async () => {
        /*  
            1. Pošalji zahtjev prema serveru
            2. Postavi stanja na prazno
            3. Prijeđi na novi ekran
            4. Ako ne uspije, prikaži grešku
        */
       
        try {
            const signedUp = await signInService.signUp({
                phoneNumber,
                email,
                pass,
                firstName,
                lastName,
                location
            });

            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setPhoneNumber('');
            setLocation('');

            props.navigation.replace("SignIn");

        } catch (err) {
            Alert.alert(`There was an error while signing up - ${err}`);
            console.log(err);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() =>
            /* Kada korisnik dotakne van tipkovnice */
            Keyboard.dismiss()}>

            <View style={registerStyle.container}>
                <GridCard>
                    <View style={registerStyle.section}>
                        <InputComponent
                            placeholder="First name..."
                            value={firstName}
                            inputStyle={registerStyle.input}
                            onChangeText={checkFirstName} />

                        <InputComponent
                            placeholder="Last name..."
                            value={lastName}
                            inputStyle={registerStyle.input}
                            onChangeText={checkLastName} />
                    </View>

                    <View style={registerStyle.section}>
                        <InputComponent
                            placeholder="Email address..."
                            value={email}
                            inputStyle={registerStyle.input}
                            onChangeText={checkEmail} />

                        <InputComponent
                            placeholder="Password..."
                            value={pass}
                            inputStyle={registerStyle.input}
                            onChangeText={checkPassword} />
                    </View>

                    <View style={registerStyle.section}>
                        <InputComponent
                            placeholder="Phone number..."
                            value={phoneNumber}
                            inputStyle={registerStyle.input}
                            onChangeText={checkPhoneNumber} />

                        <InputComponent
                            placeholder="Lives in..."
                            value={location}
                            inputStyle={registerStyle.input}
                            onChangeText={checkLocation} />
                    </View>

                    <CustomizableButton
                        button={registerStyle.button}
                        description={"Register"}
                        action={registerUser} />
                </GridCard>
            </View>

        </TouchableWithoutFeedback>
    );
}

//----STILOVI----//
const registerStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CurrentTheme.MAIN_SCREEN_COLOR
    },
    section: {
        marginBottom: 15
    },
    button: {
        backgroundColor: CurrentTheme.BUTTON_COLOR,
    },
    input: {
        backgroundColor: CurrentTheme.INPUT_COLOR,
        color: CurrentTheme.INPUT_TEXT_COLOR
    }
});

export default RegisterScreen;