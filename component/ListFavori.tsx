import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";

const ListFavori = () => {

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text>LIST FAVORI</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 10,
        margin: 15
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 20,
        paddingLeft: 20
    }
})
export default ListFavori
