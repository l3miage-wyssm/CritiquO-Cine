import React from 'react';
import {StyleSheet, Text, View} from "react-native";

function FilmCard (props: { filmName: string; }) {
    return (
        <View style={styles.container}>
            <Text> {props.filmName}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 350,
        backgroundColor: '#fff',
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#FFC1E7'
    },
})
export default FilmCard