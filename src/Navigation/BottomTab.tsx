import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screen/BottomTabScreens/Home';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Chat from '../Screen/BottomTabScreens/Chat';
import More from '../Screen/BottomTabScreens/More';
const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Icon
                name="home-outline"
                size={20}
                color={focused ? '#FFBD00' : 'white'}
              />
              <Text style={[{color: focused ? '#FFBD00' : '#B4B4B4'}]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Icon
                name="chatbox-outline"
                size={20}
                color={focused ? '#FFBD00' : 'white'}
              />
              <Text style={[{color: focused ? '#FFBD00' : 'white'}]}>Chat</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image source={require('../Assets/Images/More.png')} />
              <Text style={[{color: focused ? '#FFBD00' : 'white'}]}>More</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#373A43',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
});
