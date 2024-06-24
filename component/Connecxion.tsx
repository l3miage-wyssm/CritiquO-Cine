import React from 'react'
import {View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity} from 'react-native'
import {useNavigation} from "@react-navigation/native"

function Connecxion() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Veuillez connecter votre compte</Text>
            <Text style={styles.label}>Nom d'utilisateur</Text>
            <TextInput style={styles.input} placeholder="nom" placeholderTextColor='grey' />
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput style={styles.input} placeholder="mot de passe" placeholderTextColor='grey' secureTextEntry={true} />
            <Button title="Connecter" onPress={() =>
                // @ts-ignore
                navigation.navigate('Profile')}/>
            <Text style={styles.orText}>OU</Text>
            <TouchableOpacity  onPress={() =>
                // @ts-ignore
                navigation.navigate('Profile')}>
            <Image
                source={require('../asset/google.png')}
                style={styles.icon}
            />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        margin: 15,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#FFC1E7',
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#5E17EB',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color:'black'
    },
    input: {
        width: '90%',
        fontSize: 14,
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#D3D3D3',
        color:'black'
    },
    orText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 20,
        color:'grey'
    },
    divider: {
        width: '90%',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    icon: {
        width: 40,
        height: 40,
        marginBottom: 20,
    }
})
export default Connecxion
