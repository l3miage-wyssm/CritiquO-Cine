import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native'
import {useNavigation} from "@react-navigation/native"

// @ts-ignore
function Actor({route}) {
    const actor = route.params
    const navigation = useNavigation()
    const [movies, setMovies] = React.useState([])
    const [filmData, setFilmData] = React.useState([])

    //GetAllFilmsByActor
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
                const filteredMovies = data.filter((film: Film) =>
                    film.casting.some(cast => cast.nom === actor.actorInfo.nom)
                )
                setMovies(filteredMovies)
            })
            .catch((error) => {
                console.error('Error fetching film data:', error)
            })
    }, [actor.actorInfo])

    return (
        <View style={styles.container}>
            <View style={[styles.row, styles.spaceBetween]}>
                <View style={styles.column}>
                    <Image
                        source={{ uri: actor.actorInfo.image }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.column}>
                    <Text style={styles.title}>{actor.actorInfo.nom}</Text>
                </View>
            </View>
            <Text style={styles.title}>Films</Text>
            <ScrollView style={styles.scrollView}>
                <View style={styles.movieContainer}>
                {movies.map((movie: Film, index) => (
                    <View key={index} style={styles.movie}>
                        <Image
                            source={{ uri: movie.image }}
                            style={styles.image}
                        />
                        <TouchableOpacity onPress={() =>
                            // @ts-ignore
                            navigation.navigate('Film', {movie})}>
                        <Text style={styles.secondTitle}>{movie.titre}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#FFC1E7',
        width: 380,
        margin: 15,
        padding: 15
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    column: {
        flexDirection: 'column',
        width: 170,
        paddingRight: 10
    },
    image: {
        width: 130,
        height: 200,
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    secondTitle: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    movieContainer: {
        width: '50%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5
    },
    scrollView: {
        marginHorizontal: 10,
        height: '60%',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    movie: {
        marginLeft: 60,
        marginBottom:10
    }
});

export default Actor;
