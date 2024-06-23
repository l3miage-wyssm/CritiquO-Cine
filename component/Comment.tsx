import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

function Comment(props: { comment: string}) {
    const [isLiked, setIsLiked] = React.useState(false)
    const [isDisliked, setIsDisliked]= React.useState(false)
    return (
        <View style={styles.container}>
           <Text style={styles.commentText}>{props.comment}</Text>
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                    <Image
                        source={isLiked?require('../asset/pouces-vers-le-haut-r.png'):require('../asset/pouces-vers-le-haut.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsDisliked(!isDisliked)}>
                    <Image
                        source={isDisliked? require('../asset/fissure-cardiaque.png'): require('../asset/pouces-vers-le-bas.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        minHeight: 100,
    },
    commentText: {
        marginBottom: 10,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        color:'black',
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
});

export default Comment;
