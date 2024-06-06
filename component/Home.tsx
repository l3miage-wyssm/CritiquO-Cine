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
    const films = [  {
        "titre": "Hamtaro - Aventures à Ham-Ham Land",
        "année": 2003,
        "genre": ["Animation", "Aventure", "Famille"],
        "durée": 45,
        "casting": [
            {
                "nom": "Kurumi Mamiya",
                "role": "Hamtaro (voix japonaise)"
            },
            {
                "nom": "Chieko Honda",
                "role": "Laura Haruna (voix japonaise)"
            }
        ],
        "synopsis": "Hamtaro et ses amis hamsters se lancent dans une aventure magique pour trouver la légendaire Terre des Ham-Hams.",
        "note": 7.2
    },
        {
            "titre": "Princesse et la grenouille",
            "année": 2009,
            "genre": ["Animation", "Aventure", "Famille"],
            "durée": 97,
            "casting": [
                {
                    "nom": "Anika Noni Rose",
                    "role": "Tiana"
                },
                {
                    "nom": "Bruno Campos",
                    "role": "Prince Naveen"
                }
            ],
            "synopsis": "Une jeune serveuse, désireuse de réaliser son rêve d'ouvrir un restaurant, est transformée en grenouille par un prince transformé en grenouille après un baiser désespéré.",
            "note": 7.1
        },
        {
            "titre": "High School Musical",
            "année": 2006,
            "genre": ["Comédie musicale", "Romance"],
            "durée": 98,
            "casting": [
                {
                    "nom": "Zac Efron",
                    "role": "Troy Bolton"
                },
                {
                    "nom": "Vanessa Hudgens",
                    "role": "Gabriella Montez"
                }
            ],
            "synopsis": "Un capitaine de l'équipe de basketball de son lycée et une nouvelle élève timide découvrent leur amour commun pour le chant.",
            "note": 5.4
        }]

    return (
/*
    <View style={styles.container}>
        <SafeAreaView style={styles.cardContainer}>
        <ScrollView style={styles.scrollView}>
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
        
            {films.map((film, index) =>
                <FilmCard
                key={index}
                titre={film.titre}
                          année={film.année}
                          casting={film.casting}
                          durée={film.durée}
                          genre={film.genre}
                          note={film.note}
                          synopsis={film.synopsis}/>
            )}
   
        </View>
        </ScrollView>
        </SafeAreaView>
    </View>
*/
<View style={styles.container}>
    <SafeAreaView style={styles.cardContainer}>
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
        <ScrollView style={styles.scrollView}>
            <View style={styles.card}>
                {films.map((film, index) =>
                    <FilmCard
                        key={index}
                        titre={film.titre}
                        année={film.année}
                        casting={film.casting}
                        durée={film.durée}
                        genre={film.genre}
                        note={film.note}
                        synopsis={film.synopsis}/>
                )}
            </View>
        </ScrollView>
    </SafeAreaView>
</View>
);

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    cardContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 10,
        height: 500
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