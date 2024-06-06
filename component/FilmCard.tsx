import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";


function FilmCard (props: Film) {
    return (
        <View style={styles.container}>
            <View style={[styles.row, styles.spaceBetween]}>

                <View style={styles.column}>
                    <Image
                        source={require('./../asset/camera-movie.png')}
                        style={styles.icon}
                    />
                </View>
                <View style={styles.column}>
                    <Text style={styles.title}>{props.titre}</Text>
                    <View style={styles.rowS}>
                    <Text>{props.année}</Text>
                        <Text>{props.note}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <Text>{props.synopsis}</Text>
            </View>
            <View style={styles.row}>
                {props.casting.map((cast, index) => (
                    <View key={index} style={styles.column}>
                        <Text>{cast.nom}</Text>
                        <Text>{cast.role}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
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
        marginRight: 10,
        width: 120,
    },
    spaceBetween: {
        //justifyContent: 'space-between',
    },
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    title: {
        fontWeight: 'bold',
    },
    rowS :{
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
})

export default FilmCard