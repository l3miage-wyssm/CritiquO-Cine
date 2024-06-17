import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Button} from 'react-native';
import CommentsData from '../Data/comments.json';
import FilmCard from "./FilmCard.tsx";
import Comment from "./Comment.tsx";

// @ts-ignore
function Film({route}) {
    const film = route.params.props || route.params.movie;
    const commentsData = CommentsData.find(comments => comments.film === film.titre);
    const comments = commentsData ? commentsData.comments : [];
    const [isAddingNewComment, setIsAddingNewComment] = React.useState(false);
    const [newComment, setNewComment] = React.useState('');

    const handleAddComment = () => {
        if (newComment) {
            comments.push(newComment);
            setNewComment('');
            setIsAddingNewComment(false);
        }
    };
    return (
        <View style={styles.container}>
            <FilmCard
                titre={film.titre}
                année={film.année}
                casting={film.casting}
                durée={film.durée}
                genre={film.genre}
                note={film.note}
                synopsis={film.synopsis}
                image={film.image}
                isDetailShow={true}
            />

            <View style={styles.commentHeader}>
                <Text style={styles.text}>Commentaires</Text>
                <TouchableOpacity onPress={() => setIsAddingNewComment(!isAddingNewComment)}>
                    <Image
                        source={require('../asset/plusieurs.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            {isAddingNewComment && (
                <View style={styles.newCommentContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ajouter un commentaire..."
                        value={newComment}
                        onChangeText={setNewComment}
                        multiline
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Ajouter"
                            onPress={handleAddComment}
                            color="#000"
                        />
                    </View>
                </View>
            )}

            <ScrollView style={styles.scrollView}>
            <View>
                    {comments.map((comment, index) => (
                        <Comment key={index} comment={comment} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        alignSelf:'flex-end',
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,

    },
    text:{
        fontWeight:'bold',
        fontSize: 20
    },
    newCommentContainer: {
        padding: 10,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    input: {
        minHeight: 50,
        padding: 8,
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        width: 80,
        borderRadius: 5,
        overflow: 'hidden',
        alignSelf: 'flex-end',
    },
    button: {
        height: 40,
        justifyContent: 'center'
    },
    scrollView: {
        marginHorizontal: 10,
        height: 500
    },
});

export default Film;
