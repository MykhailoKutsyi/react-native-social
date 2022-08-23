import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { View, Text, TouchableOpacity, Button } from 'react-native';

import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
// import Home from './src/screens/Home';

import PostsScreen from './src/screens/mainScreen/PostsScreen';
import CreatePostsScreen from './src/screens/mainScreen/CreatePostsScreen';
import ProfileScreen from './src/screens/mainScreen/ProfileScreen';
import {
  //   MaterialCommunityIcons,
  MaterialIcons,
  //   AntDesign,
  Feather,
} from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 17,
          color: '#212121',
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 84,
          paddingTop: 9,
          paddingBottom: 15,
        },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => console.log('logout button')}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),

          tabBarIcon: () => <Feather name="grid" size={24} color="#4D4D4D" />,
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          title: 'Create posts',

          tabBarIcon: () => (
            <View
              style={{
                backgroundColor: '#FF6C00',
                width: 70,
                height: 40,
                flex: 0,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}
            >
              <Feather name="plus" size={24} color="#fff" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Feather name="user" color="#4D4D4D" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}

export const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegisterScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MyTabs />
    // </MainTab.Navigator>
  );
};
