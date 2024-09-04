import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screen/BottomTabScreens/Home';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Chat from '../Screen/BottomTabScreens/Chat';
import More from '../Screen/BottomTabScreens/More';
import Jobs from '../Screen/BottomTabScreens/Jobs';
import Briefcase from 'react-native-vector-icons/FontAwesome';
import Notifications from '../Screen/BottomTabScreens/Notifications';
import Wallet from '../Screen/ExtraAttachedScreens/Wallet';
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
              <Text
                style={[
                  {
                    color: focused ? '#FFBD00' : 'white',
                    fontFamily: focused ? 'ArialMdm' : 'ArialCE',
                    fontSize: 12,
                  },
                ]}>
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
              <Text
                style={[
                  {
                    color: focused ? '#FFBD00' : 'white',
                    fontFamily: focused ? 'ArialMdm' : 'ArialCE',
                    fontSize: 12,
                  },
                ]}>
                Chat
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Icon
                name="briefcase-outline"
                size={20}
                color={focused ? '#FFBD00' : 'white'}
              />
              <Text
                style={[
                  {
                    color: focused ? '#FFBD00' : 'white',
                    fontFamily: focused ? 'ArialMdm' : 'ArialCE',
                    fontSize: 12,
                  },
                ]}>
                Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Icon
                name="wallet-outline"
                size={20}
                color={focused ? '#FFBD00' : 'white'}
              />
              <Text
                style={[
                  {
                    color: focused ? '#FFBD00' : 'white',
                    fontFamily: focused ? 'ArialMdm' : 'ArialCE',
                    fontSize: 12,
                    marginTop: 3,
                  },
                ]}>
                Wallet
              </Text>
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
              <Image
                source={require('../Assets/Images/MoreClear.png')}
                tintColor={focused ? '#FFBD00' : 'white'}
                style={{width: 22, height: 22}}
              />
              <Text
                style={[
                  {
                    color: focused ? '#FFBD00' : 'white',
                    fontFamily: focused ? 'ArialMdm' : 'ArialCE',
                    fontSize: 12,
                    marginTop: 3,
                  },
                ]}>
                More
              </Text>
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

    // marginTop: 20,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#373A43',
    // elevation: 1,
    // shadowColor: '#FAFAFA',
    // shadowColor: '#000', // Shadow color
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.5,
    // shadowRadius: 1,
    borderTopWidth: 0, // Ensure there's no border at the top
    overflow: 'hidden',
  },
});
