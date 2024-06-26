import React, { useState } from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import Comment from "./Comment.tsx"
import {useNavigation} from "@react-navigation/native"

function Profile() {
    const navigation = useNavigation()
    const [userData, setUserData] = React.useState(null)
    const [name, setName] = useState('')
    const [comments, setComments] = React.useState([])
    const [editMode, setEditMode] = useState(false)
    const [isCommentShow,setIsCommentsShow] = React.useState(false)
    const [listFavorite,setListFavorite] = React.useState([])
    const handleNameChange = (newName: string) => {
        setName(newName)
    }

    const handleNameSubmit = () => {
        setEditMode(false)
    }

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
            .then(data => {
                setUserData(data[0])
                setName(data[0].name)
                setComments(data[0].comments)
                setListFavorite(data[0].listFavorite)
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }, [])

    return (
          <View style={styles.container}>
              <View style={styles.infoContainer}>
                  <Image
                      source={require('../asset/femme.png')}
                      style={styles.image}
                  />
                  {userData && <View style={styles.textContainer}>
                      {editMode ? (
                          <TextInput
                              style={styles.input}
                              onChangeText={handleNameChange}
                              defaultValue={name}
                              autoFocus={true}
                              onBlur={() => setEditMode(false)}
                              onSubmitEditing={handleNameSubmit}
                              returnKeyType="done"
                          />
                      ) : (
                          <View style={styles.nameContainer}>
                              <Text style={styles.name}>{name}</Text>
                              <TouchableOpacity onPress={() => setEditMode(true)}>
                                  <Image
                                      source={require('../asset/crayon.png')}
                                      style={styles.icon}
                                  />
                              </TouchableOpacity>
                          </View>
                      )}
                      <Text style={styles.label}>Compte ID :</Text>
                      <Text style={styles.value}>
                          {// @ts-ignore
                              userData.id
                          }</Text>
                      <Text style={styles.label}>Date de naissance :</Text>
                      <Text style={styles.value}>{
                          // @ts-ignore
                          userData.birthDay
                      }</Text>
                      <View style={styles.coinBorder}>
                          <Image
                              source={require('../asset/femme_icon.png')}
                              style={styles.icon}
                          />
                      </View>
                  </View>}
              </View>
              <View style={styles.secondTitle}>
                  <Image
                      source={require('../asset/coeur.png')}
                      style={styles.icon}
                  />
                  <TouchableOpacity onPress={() =>
                      // @ts-ignore
                      navigation.navigate('Favori', {listFavorite}) }>
                    <Text style={styles.commentText}>Ma liste Favori</Text>
                  </TouchableOpacity>
              </View>
              <View style={styles.secondTitle}>
                  <Image
                      source={require('../asset/commentaire.png')}
                      style={styles.icon}
                  />
                  <Text style={styles.commentText}>Commentaires envoyées : {comments.length}</Text>
                  <TouchableOpacity onPress={() => setIsCommentsShow(!isCommentShow)}>
                      <Image
                          source={isCommentShow? require('../asset/caret-cercle-bas.png') :require('../asset/caret-cercle-vers-le-haut.png')}
                          style={styles.icon}
                      />
                  </TouchableOpacity>
              </View>
              <ScrollView style={styles.scrollView}>
                  <View>
                      {
                          isCommentShow && comments.map((comment, index) => (
                              <Comment key={index} comment={comment}/>
                          ))
                      }
                  </View>
              </ScrollView>
          </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 10,
        margin: 15,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#FFC1E7',
        backgroundColor: '#fff',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 25,
        marginRight: 10,
        color:'black'
    },
    label: {
        fontSize: 15,
        color: 'grey'
    },
    value: {
        fontSize: 15,
        color: 'black',
        marginBottom: 10
    },
    icon: {
        width: 20,
        height: 20,
    },
    coinBorder: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderStyle: 'solid',
        borderColor: '#5E17EB',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    input: {
        fontSize: 25,
        fontWeight: 'bold',
        borderStyle: 'solid',
        borderWidth:1,
        borderRadius: 4,
        borderColor: '#FFC1E7',
        marginRight:20,
        color:'black'
    },
    scrollView: {
        flex: 1,
        width: '100%',
        height:300
    },
    secondTitle:{
        margin:10,
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#FFC1E7',
        backgroundColor: '#FFC1E7',
        padding:10,
        flexDirection:'row'
    },
    commentText: {
        fontSize: 15,
        color: 'black',
        marginLeft:15,
        marginRight:15
    }
})

export default Profile
