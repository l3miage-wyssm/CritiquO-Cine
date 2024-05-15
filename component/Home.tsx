import React from 'react';
import {
    Button,
    Image, SafeAreaView, ScrollView, StatusBar,
    StyleSheet,
    Text, TextInput, TouchableOpacity, useColorScheme,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Colors} from "react-native/Libraries/NewAppScreen";

function Home () {
    const [nom, setNom] = React.useState('Jérome')
    const navigation = useNavigation();
    const isDarkMode = useColorScheme() === 'dark';  const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    return (

    <View style={styles.container}>
<Text>Home page</Text>
    </View>

);

}
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#f28500',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default Home