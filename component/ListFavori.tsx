import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FilmCard from "./FilmCard.tsx";

// @ts-ignore
const ListFavori = ({route}) => {
   const [list, setList] = useState(route.params.listFavorite)
    const handleIsLiked = (filmTitre: string) => {
        const newList = list.filter((film:Film) => film.titre !== filmTitre)
        setList(newList)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ma liste favori</Text>
            <ScrollView style={styles.scrollView}>
                <View style={styles.card}>
                    {list.map((film: Film) =>
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
                            isLiked={true}
                            onLike={() => handleIsLiked(film.titre)}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        paddingTop: 10,
        margin: 15
    },
    title: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#FFC1E7',
        padding: 10,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 20,
        fontSize: 15,
        color: 'black',
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        marginHorizontal: 10,
        height: 700,
    }
})

export default ListFavori;
