import React from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet, TouchableOpacity,
    useColorScheme,
    DrawerLayoutAndroid,
    View,
    Text, GestureResponderEvent,
} from 'react-native';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from "./component/Home.tsx";
import Profile from "./component/Profile.tsx";
import Icon from "react-native-vector-icons/MaterialIcons";
import {StackNavigationProp} from "@react-navigation/stack";
import ListFavori from "./component/ListFavori.tsx";

type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
    Favori: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
    const drawer = React.useRef<DrawerLayoutAndroid>(null);
    const isDarkMode = useColorScheme();
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={[styles.container, backgroundStyle]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
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
                    </Stack.Navigator>
                </DrawerLayoutAndroid>
            </NavigationContainer>
        </SafeAreaView>
    );
}

// @ts-ignore
const NavigationView = ({drawerRef}) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <View style={[styles.container, styles.navigationContainer]}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Favori');
                if (drawerRef) {
                    drawerRef.current?.closeDrawer();
                }
            }}>
                <Text style={styles.paragraph}>Ma liste favori</Text>
            </TouchableOpacity>
        </View>
    );
};
const HeaderBar = (props: { onPress: ((event: GestureResponderEvent) => void) | undefined; }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return(
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={props.onPress}>
                <Icon name="menu" size={30} color="#900" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
                source={require('../CritiquOCine/asset/logoN.png')}
                style={styles.logo}
            />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Icon name="person" size={50} color="#900" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 100,
        backgroundColor: '#FFC1E7',
        padding: 10
    },
    logo: {
        width: 250,
        resizeMode: 'contain'
    },
    picker: {
        flex: 0.6,
        height: 50,
    },
    dropdown: {
        width: 200,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10
    },
    navigationContainer: {
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
    },
});

export default App;
