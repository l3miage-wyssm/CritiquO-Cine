import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

function Comment(props: { comment: string, userName?: string}) {
    const [isLiked, setIsLiked] = React.useState(false)
    const [isDisliked, setIsDisliked]= React.useState(false)
    const [user, setUser] = React.useState(null)

    //FindUserByName
    React.useEffect(() => {
        fetch('https://raw.githubusercontent.com/l3miage-xusi/PDM_API/main/user.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText)
                }
                return response.text()
            })
            .then(text => {
                return JSON.parse(text)
            })
            .then((data) => {
                const user = data.find((user: { name: string }) => user.name === props.userName)
                setUser(user)
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {user &&
                    <Image
                        // @ts-ignore
                        source={{ uri: user.image }}
                        style={styles.image}
                    />}
                <Text style={styles.userName}>{props.userName}</Text>
            </View>
            <Text style={styles.commentText}>{props.comment}</Text>
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                    <Image
                        source={isLiked ? require('../asset/pouces-vers-le-haut-r.png') : require('../asset/pouces-vers-le-haut.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsDisliked(!isDisliked)}>
                    <Image
                        source={isDisliked ? require('../asset/fissure-cardiaque.png') : require('../asset/pouces-vers-le-bas.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        minHeight: 100,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userName: {
        marginLeft: 10,
        fontSize: 16,
        color: '#5E17EB',
    },
    commentText: {
        marginBottom: 10,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        color: 'black',
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        marginRight: 20,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
})

export default Comment
