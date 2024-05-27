import React from 'react';
import {
    Button,
    Image, SafeAreaView, ScrollView, StatusBar,
    StyleSheet,
    Text, TextInput, TouchableOpacity, useColorScheme,
    View,
} from 'react-native';
import {Colors} from "react-native/Libraries/NewAppScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from '@react-native-picker/picker';
import FilmCard from "./FilmCard.tsx";

function Home () {
    const isDarkMode = useColorScheme() === 'dark';  const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const [inputValue, setInputValue] = React.useState('')
    const [selectedValue, setSelectedValue] = React.useState("Par pertinance")
    return (

    <View style={styles.container}>
        <TextInput
            style={styles.textInput}
            value={inputValue}
            onChangeText={text => setInputValue(text)}
            placeholder="Veuillez saisir le nom du film ..."
        />
        <View style={styles.pickerIconRow}>
        <Icon name="filter-list" size={30} color="#900" />
        <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            style={styles.picker}
        >
            <Picker.Item label="Par pertinance" value="Par pertinance" />
            <Picker.Item label="par date" value="par date" />
            <Picker.Item label="par ordre alphabetique" value="par ordre alphabetique" />
        </Picker>
            </View>
        <View style={styles.card}>
        <FilmCard filmName="Film Name"/>
        </View>
    </View>

);

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    textInput: {
        height: 40,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        width: '100%',
    },
    picker: {
        flex: 0.6,
        height: 50,
    },
    pickerIconRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    icon: {
        width: 60,
        marginLeft: 10,
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});



export default Home