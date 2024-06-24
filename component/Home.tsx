import React from 'react'
import {
    SafeAreaView, ScrollView, StatusBar,
    StyleSheet, TextInput,
    View,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import FilmCard from "./FilmCard.tsx"

function Home () {
    const [inputValue, setInputValue] = React.useState('')
    const [selectedValue, setSelectedValue] = React.useState("Par note")
    const [filmData, setFilmData] = React.useState([])
    const [filteredFilms, setFilteredFilms] = React.useState<Film[]>(filmData)
    const [sortedFilms, setSortedFilms] = React.useState(filteredFilms)

    const handleInputChange = (text: string) => {
        setInputValue(text)
        let films: Film[] = filmData
        if (text !== '') {
            films = filmData.filter((film:Film) =>
                film.titre.toLowerCase().includes(text.toLowerCase())
            )
        }
        setFilteredFilms(films)
        sortFilms(films)
    }

    const sortFilms = (films: Film[]) => {
        let sorted = [...films]
        if (selectedValue === 'par date') {
            sorted.sort((a, b) => a.année - b.année)
        } else if (selectedValue === 'par ordre alphabetique') {
            sorted.sort((a, b) => a.titre.localeCompare(b.titre))
        } else {
            sorted.sort((a, b) => {
                if (a.note === null && b.note === null) return 0
                if (a.note === null) return 1
                if (b.note === null) return -1
                return b.note - a.note
            })
        }
        setSortedFilms(sorted)
    }

    React.useEffect(() => {
        sortFilms(filteredFilms)
    }, [selectedValue])

    //GetAllFilms
    React.useEffect(() => {
        fetch('https://raw.githubusercontent.com/l3miage-xusi/PDM_API/main/films.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText)
                }
                return response.json()
            })
            .then((data) => {
                setFilmData(data)
                setFilteredFilms(data)
                setSortedFilms(data)
            })
            .catch((error) => {
                console.error('Error fetching film data:', error)
            })
    }, [])


    // @ts-ignore
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.cardContainer}>
                <TextInput
                    style={styles.textInput}
                    value={inputValue}
                    onChangeText={handleInputChange}
                    placeholder="Veuillez saisir le nom du film ..."
                    placeholderTextColor="#000000"
                />
                <View style={styles.pickerIconRow}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                        style={styles.picker}
                        dropdownIconColor='#000000'
                    >
                        <Picker.Item label="Par note" value="Par note" />
                        <Picker.Item label="par date" value="par date" />
                        <Picker.Item label="par ordre alphabetique" value="par ordre alphabetique" />
                    </Picker>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.card}>
                        {sortedFilms.map((film) =>
                            <FilmCard
                                key={film.titre}
                                titre={film.titre}
                                année={film.année}
                                casting={film.casting}
                                durée={film.durée}
                                // @ts-ignore
                                genre={film.genre}
                                // @ts-ignore
                                note={film.note}
                                synopsis={film.synopsis}
                                image={film.image}
                                isDetailShow={false}
                            />
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
)
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
        color:'black'
    },
    picker: {
        width: '40%',
        height: 50,
        color:'#000000',
    },
    pickerIconRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    icon: {
        width: 60,
        marginLeft: 10,
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Home