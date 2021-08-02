import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Alert, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserDetails from '../components/UserDetails';
import useWebSockets from '../hooks/useWebSockets';
import authService from '../services/authService';

const DashboardScreen = (props) => {
    const loggedUser = props.navigation.getParam("user");
    const [userList, setUserList] = useState([]);

    const {
        userVerified,
        connectToUser,
        notification
    } = useWebSockets();

    const storeUserData = async (key, value) => {
        try {
            await AsyncStorage.setItem(`@${key}`, JSON.stringify(value));
        } catch (err) { }
    }

    useEffect(() => {
        // TODO - update za micanje korisnika iz ove liste nakon slanja prve poruke
        authService.setToken(loggedUser.token);
        authService.fetchUserData(loggedUser.phone)
            .then((response) => {
                setUserList(response.notChatted);
                storeUserData("JuniorChat_user", loggedUser); // TODO - spremiti pod Constants ove stringove
                const socket = userVerified();
                authService.setOnlineStatus(loggedUser.phone, { socket, onlineTag: true })
                    .then((response) => {
                        storeUserData("JuniorChat_userDetail", response);
                    });
            })
            .catch((err) => {
                //console.log(err.response)
            });
    }, [notification, loggedUser]);

    const showUsers = (user) => {
        return (<UserDetails
            firstName={user.item.firstName}
            lastName={user.item.lastName}
            email={user.item.email}
            residence={user.item.currentResidence}
            phoneNumber={user.item.phoneNumber}
            onlineStatus={user.item.activeConnection}
            startChat={() => {
                props.navigation.navigate({
                    routeName: "ChatWindow",
                    params: {
                        conversationExists: false,
                        loggedPhone: loggedUser.phone,
                        phoneNumber: user.item.phoneNumber,
                        activeConnection: user.item.activeConnection,
                        userFullName: `${user.item.firstName} ${user.item.lastName}`,
                        sendNewMessage: (participant, message) => connectToUser(participant, message) 
                    }
                })
            }}
        />);
    }

    return (
        <FlatList
            data={userList}
            renderItem={showUsers} />
    );
};

const dashStyle = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%"
    }
});

export default DashboardScreen;