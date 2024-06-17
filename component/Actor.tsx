import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import filmData from '../Data/films.json';
import {useNavigation} from "@react-navigation/native";
// @ts-ignore
function Actor({route}) {
    const actor = route.params;
    const navigation = useNavigation();
    const [movies, setMovies] = React.useState([]);
    React.useEffect(() => {
        const filteredMovies = filmData.filter(film =>
            film.casting.some(cast => cast.nom === actor.actorInfo.nom)
        );
        setMovies(filteredMovies);
    }, [actor.actorInfo]);

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
            <Text>Films</Text>
            <ScrollView style={styles.row}>
                {movies.map((movie, index) => (
                    <View key={index} style={styles.movieContainer}>
                        <Image
                            source={{ uri: movie.image }}
                            style={styles.image}
                        />
                        <TouchableOpacity onPress={() =>  navigation.navigate('Film', {movie})}>
                        <Text style={styles.secondTitle}>{movie.titre}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
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
        padding: 10,
        width: 380,
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,

    },
    column: {
        flexDirection: 'column',
        paddingLeft:20,
        marginRight: 15,
        width: 170,
        paddingRight:10
    },
    image:{
        width:130,
        height:200,
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'bold',
        color:'black',
        fontSize:20,
        alignItems:'center',
        justifyContent:'center'
    },
    secondTitle: {
        fontWeight: 'bold',
        color:'black',
        fontSize:14,
        alignItems:'center',
        justifyContent:'center'
    },
    movieContainer: {

        padding: 10,
        width: 380,
        marginBottom: 15,
    },
});

export default Actor;
