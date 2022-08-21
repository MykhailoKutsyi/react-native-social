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
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarStyle: {
          height: 84,
          paddingTop: 9,
          paddingBottom: 15,
        },
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 17,
          color: '#212121',
        },
      }}
      tabBarOptions={{ showLabel: false }}
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
          title: 'Create Posts',

          tabBarIcon: () => (
            <View
              style={{
                backgroundColor: '#FF6C00',
                width: 70,
                height: 40,
                flex: 1,
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

const AuthStack = createStackNavigator();

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

// function MyTabBar({ state, descriptors, navigation }) {
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//             key={route.key}
//           >
//             <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }
