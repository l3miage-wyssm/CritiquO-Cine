import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import actorData from '../Data/acteurs.json'
import {useNavigation} from "@react-navigation/native";

function FilmCard (props: { image?: any; titre?: any; année?: any; note?: any; genre?: any; synopsis?: any; casting?: any; isDetailShow?: any; }) {
    const navigation = useNavigation();
    const {isDetailShow} = props
    const [isLiked, setIsLiked] = React.useState(false)
    const handleActorPress = (actorName: string) => {
        const actorInfo = actorData.find(actor => actor.nom === actorName);
        if (actorInfo) {
            // @ts-ignore
            navigation.navigate('Actor', {actorInfo})
        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.row, styles.spaceBetween]}>
                <View style={styles.column}>
                    <Image
                        source={{ uri: props.image }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.column}>
                    <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                        <Image
                            source={isLiked? require('../asset/bisou-clin-doeil-coeur.png'):require('../asset/bisou-clin-doeil-coeur-n.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Film', {props})}>
                    <Text style={styles.title}>{props.titre}</Text>
                    </TouchableOpacity>
                    <View style={styles.yearNote}>
                        <Text>{props.année}</Text>
                        <Text>{props.note}</Text>
                    </View>
                    {props.genre.map((g: string, index: any) => (
                        <Text>{g}</Text>
                    ))}
                </View>
            </View>
            {isDetailShow && (
                <>
                    <View style={styles.row}>
                        <Text style={styles.synopsis}>{props.synopsis}</Text>
                    </View>
                    <View style={styles.row}>
                        {props.casting.map((cast, index) => (
                            <View key={index} style={styles.column}>
                                <TouchableOpacity onPress={() => handleActorPress(cast.nom)}>
                                    <Text style={styles.actorName}>{cast.nom}</Text>
                                </TouchableOpacity>
                                <Text>interprète {cast.rôle}</Text>
                            </View>
                        ))}
                    </View>
                </>
            )}

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
        paddingLeft:20,
        marginRight: 15,
        width: 170,
        paddingRight:10
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        alignSelf:'flex-end',
    },
    title: {
        fontWeight: 'bold',
        color:'black',
        fontSize:20,
        alignItems:'center',
        justifyContent:'center'
    },
    yearNote :{
        paddingTop:15,
        paddingRight:20,
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    image:{
        width:130,
        height:200,
    },
    actorName:{
        color:'blue',
    },
    synopsis:{
        fontStyle:'italic'
    }
})

export default FilmCard