import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {useNavigation} from "@react-navigation/native"

function FilmCard (props: {
    isLiked?: boolean;onLike?: Function
    image?: string; titre?: string; année?: number; note?: number; genre?: string; synopsis?: string; casting?: Actor[]; isDetailShow?: boolean; }) {
    const navigation = useNavigation()
    const {isDetailShow} = props
    const [actors, setActors] = React.useState([])
    const [isLiked, setIsLiked] = React.useState(props.isLiked || false)
    const handleLikeClick = () => {
        if (props.isLiked === null || props.isLiked === undefined) {
            setIsLiked(!isLiked);
        } else {
            // @ts-ignore
            props.onLike(props.titre);
        }
    }

    //GetActorByName
    const handleActorPress = (actorName: string) => {
        const actorInfo = actors.find((actor: Actor) => actor.nom === actorName)
        if (actorInfo) {
            // @ts-ignore
            navigation.navigate('Actor', {actorInfo})
        }
    }

    //GetAllActors
    React.useEffect(() => {
        fetch('https://raw.githubusercontent.com/l3miage-xusi/PDM_API/main/acteurs.json', {
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
                setActors(data)
            })
            .catch((error) => {
                console.error('Error fetching actors data:', error)
            })
    }, [])

    // @ts-ignore
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
                    <TouchableOpacity onPress={handleLikeClick}>
                        <Image
                            source={isLiked? require('../asset/bisou-clin-doeil-coeur.png'):require('../asset/bisou-clin-doeil-coeur-n.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>
                        // @ts-ignore
                        navigation.navigate('Film', {props})}>
                    <Text style={styles.title}>{props.titre}</Text>
                    </TouchableOpacity>
                    <View style={styles.yearNote}>
                        <Text style={styles.text}>{props.année}</Text>
                        <Text style={styles.text}>{props.note}</Text>
                    </View>
                    {
                        // @ts-ignore
                        props.genre.map((g: string, index: any) => (
                        <Text key={index}>{g}</Text>
                    ))}
                </View>
            </View>
            {isDetailShow && (
                <>
                    <View style={styles.row}>
                        <Text style={styles.synopsis}>{props.synopsis}</Text>
                    </View>
                    <View style={styles.row}>
                        {
                            // @ts-ignore
                            props.casting.map((cast, index) => (
                            <View key={index} style={styles.column}>
                                <TouchableOpacity onPress={() => handleActorPress(cast.nom)}>
                                    <Text style={styles.actorName}>{cast.nom}</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>interprète {cast.rôle}</Text>
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
        width: '100%',
        marginBottom: '5%',
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        padding:'2%',
        width: '50%',
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
        paddingTop:'5%',
        paddingRight:'5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color:'black',
    },
    image:{
        width:'90%',
        height:200
    },
    actorName:{
        color:'blue',
    },
    synopsis:{
        fontStyle:'italic',
        color:'black',
    },
    text: {
        color:'black',
    }
})

export default FilmCard
