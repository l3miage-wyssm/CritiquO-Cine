import React from 'react'
import {
    Image,
    StatusBar,
    StyleSheet, TouchableOpacity,
    DrawerLayoutAndroid,
    View,
    Text, GestureResponderEvent,
} from 'react-native'
import {NavigationContainer, useNavigation} from "@react-navigation/native"
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from "./component/Home.tsx"
import Profile from "./component/Profile.tsx"
import {StackNavigationProp} from "@react-navigation/stack"
import ListFavori from "./component/ListFavori.tsx"
import Actor from "./component/Actor.tsx"
import Film from "./component/Film.tsx"
import Connecxion from "./component/Connecxion.tsx"

type RootStackParamList = {
    Home: undefined
    Profile: undefined
    Favori: undefined
    Actor: undefined
    Film: undefined
    Connecxion: undefined
};
const Stack = createNativeStackNavigator<RootStackParamList>()

const App = (): React.JSX.Element => {
    const drawer = React.useRef<DrawerLayoutAndroid>(null)
    return (
            <NavigationContainer>
                <DrawerLayoutAndroid
                    ref={drawer}
                    drawerWidth={300}
                    drawerPosition={'left'}
                    renderNavigationView={() => <NavigationView drawerRef={drawer} />}
                >
                    <HeaderBar onPress={() => drawer.current?.openDrawer()}/>
                    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Home" component={Home}/>
                        <Stack.Screen name="Profile" component={Profile}/>
                        <Stack.Screen name="Favori" component={ListFavori}/>
                        <Stack.Screen name="Actor" component={Actor}/>
                        <Stack.Screen name="Film" component={Film}/>
                        <Stack.Screen name="Connecxion" component={Connecxion} />
                    </Stack.Navigator>
                </DrawerLayoutAndroid>
            </NavigationContainer>
    )
}

//menu latéral du page d'accueil
// @ts-ignore
const NavigationView = ({drawerRef}) => {
    const navigation = useNavigation()
    const [listFavorite, setListFavorite] = React.useState([])

    React.useEffect(() => {
        fetch('https://raw.githubusercontent.com/l3miage-xusi/PDM_API/main/user.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json()
            })
            .then((data) => {
                setListFavorite(data[0].listFavorite)
            })
    }, [])

    return (
        <View style={[styles.container, styles.navigationContainer]}>
            <Image
                source={require('../CritiquOCine/asset/logo.png')}
                style={styles.logoSmall}
            />
            <TouchableOpacity onPress={() => {
                // @ts-ignore
                navigation.navigate('Favori', {listFavorite})
                if (drawerRef) {
                    drawerRef.current?.closeDrawer()
                }
            }}>
                <View style={styles.col}>
                <Image
                    source={require('../CritiquOCine/asset/coeur.png')}
                    style={styles.icon}
                />
                <Text style={styles.paragraph}>Ma liste favori</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                // @ts-ignore
                navigation.navigate('Home');
                if (drawerRef) {
                    drawerRef.current?.closeDrawer();
                }
            }}>
                <View style={styles.col}>
                    <Image
                        source={require('../CritiquOCine/asset/maison.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.paragraph}>Accueil</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                // @ts-ignore
                navigation.navigate('Connecxion');
                if (drawerRef) {
                    drawerRef.current?.closeDrawer();
                }
            }}>
                <View style={styles.col}>
                    <Image
                        source={require('../CritiquOCine/asset/connexion-alt.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.paragraph}>Déconnecter</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const HeaderBar = (props: { onPress: ((event: GestureResponderEvent) => void) | undefined; }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return(
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={props.onPress}>
                <Image
                    source={require('../CritiquOCine/asset/liste.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
                source={require('../CritiquOCine/asset/logoN.png')}
                style={styles.logo}
            />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image
                    source={require('../CritiquOCine/asset/tete-de-femme.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    content: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '10%',
        backgroundColor: '#FFC1E7',
        padding: '5%'
    },
    logo: {
        marginTop:30,
        width: 250,
        resizeMode: 'contain'
    },
    picker: {
        flex: 0.6,
        height: 50,
    },
    navigationContainer: {
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        padding: 16,
        fontSize: 20,
        color:'black',
    },
    icon: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    col: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1%',
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 2,
        flex: 1,
    },
    logoSmall : {
        height:240,
        width:240,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:20
    }
})

export default App
