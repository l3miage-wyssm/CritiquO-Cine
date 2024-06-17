import React from 'react';
import {
    Button,
    Image, SafeAreaView, ScrollView, StatusBar,
    StyleSheet,
    Text, TextInput, TouchableOpacity, useColorScheme,
    View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from "react-native/Libraries/NewAppScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from '@react-native-picker/picker';
import FilmCard from "./FilmCard.tsx";
import filmData from '../Data/films.json';

function Home () {

    const isDarkMode = useColorScheme() === 'dark';  const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const [inputValue, setInputValue] = React.useState('')
    const [selectedValue, setSelectedValue] = React.useState("Par note")
    const [filteredFilms, setFilteredFilms] = React.useState<Film[]>(filmData);
    const [sortedFilms, setSortedFilms] = React.useState(filteredFilms);

    const getAllGenres = (films: any[]) => {
        const allGenres = new Set();

        films.forEach(film => {
            film.genre.forEach(genre => {
                allGenres.add(genre);
            });
        });

        return Array.from(allGenres);
    };

    const uniqueGenres = getAllGenres(filmData)

    const handleInputChange = (text: string) => {
        setInputValue(text);
        let films = filmData;
        if (text !== '') {
            films = filmData.filter((film) =>
                film.titre.toLowerCase().includes(text.toLowerCase())
            );
        }
        setFilteredFilms(films);
        sortFilms(films);
    }

    const sortFilms = (films) => {
        let sorted = [...films];
        if (selectedValue === 'par date') {
            sorted.sort((a, b) => a.année - b.année);
        } else if (selectedValue === 'par ordre alphabetique') {
            sorted.sort((a, b) => a.titre.localeCompare(b.titre));
        } else {
            sorted.sort((a, b) => {
                if (a.note === null && b.note === null) return 0;
                if (a.note === null) return 1;
                if (b.note === null) return -1;
                return b.note - a.note;
            });
        }
        setSortedFilms(sorted);
    };

    React.useEffect(() => {
        sortFilms(filteredFilms);
    }, [selectedValue])

    return (
<View style={styles.container}>
    <SafeAreaView style={styles.cardContainer}>
        <TextInput
            style={styles.textInput}
            value={inputValue}
            onChangeText={handleInputChange}
            placeholder="Veuillez saisir le nom du film ..."
        />
        <View style={styles.pickerIconRow}>
            <Icon name="filter-list" size={30} color="#900" />
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Par note" value="Par note" />
                <Picker.Item label="par date" value="par date" />
                <Picker.Item label="par ordre alphabetique" value="par ordre alphabetique" />
            </Picker>
        </View>
        <ScrollView style={styles.scrollView}>
            <View style={styles.card}>
                {sortedFilms.map((film, index) =>
                    <FilmCard
                        key={index}
                        titre={film.titre}
                        année={film.année}
                        casting={film.casting}
                        durée={film.durée}
                        genre={film.genre}
                        note={film.note}
                        synopsis={film.synopsis}
                        image={film.image}
                        comment={film.comment}
                        isDetailShow={false}
                    />
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