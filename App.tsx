import React, {PropsWithChildren} from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet, TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Home from "./component/Home.tsx";
import Profile from "./component/Profile.tsx";
import Icon from "react-native-vector-icons/MaterialIcons";
import {StackNavigationProp} from "@react-navigation/stack";

type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
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
                <HeaderBar />
                    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Profile" component={Profile} />
                    </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const HeaderBar = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return(
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Icon name="person" size={50} color="#900" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
                source={require('../CritiquOCine/asset/logoN.png')}
                style={styles.logo}
            />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="list" size={50} color="#900" />
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
});

export default App;
