import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
function HeaderBar () {
    return(
        <View style={styles.container}>
            <Icon name="home" size={50} color="#900" />
            <Image
                source={require('../asset/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>CritiquO'Cine</Text>
            <Icon name="list" size={50} color="#900" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        backgroundColor: '#fff',
        padding: 10
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    text: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20
    }
});
export default HeaderBar