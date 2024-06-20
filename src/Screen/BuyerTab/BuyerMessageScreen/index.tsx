import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './style';
import HeaderComp from '../../../Component/HeaderComp';
import Arrowleft from 'react-native-vector-icons/AntDesign';
import SendIcon from 'react-native-vector-icons/Feather';
const BuyerMessageScreen = ({navigation}) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Arrowleft name="left" size={20} color={'white'} />
          <Image
            source={require('../../../Assets/Images/girl.jpeg')}
            style={{width: 40, height: 40, marginLeft: 10, borderRadius: 20}}
          />
        </TouchableOpacity>
        <Arrowleft name="search1" size={20} color={'white'} />
      </View>
      <View style={{flex: 1, paddingTop: 10, paddingHorizontal: 15}}>
        <View
          style={{
            backgroundColor: '#0F8BC2',
            maxWidth: 250,
            padding: 20,
            borderRadius: 10,
            alignSelf: 'flex-end',
            borderBottomRightRadius: 0,
          }}>
          <Text style={{color: 'white', lineHeight: 30}}>
            Good day, I would like to fix my diesel generator
          </Text>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                marginTop: 5,
                textAlign: 'right',
              }}>
              16.50 Read
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            maxWidth: 250,
            padding: 20,
            marginTop: 20,
            borderRadius: 10,
            alignSelf: 'flex-start',
            borderBottomLeftRadius: 0,
          }}>
          <Text style={{color: 'black', lineHeight: 30}}>
            Good day, I would like to fix my diesel generator
          </Text>
          <View>
            <Text
              style={{
                color: 'grey',
                fontSize: 12,
                marginTop: 5,
                textAlign: 'left',
              }}>
              16.50 Read
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#0F8BC2',
            maxWidth: 250,
            padding: 20,
            borderRadius: 10,
            alignSelf: 'flex-end',
            marginTop: 20,
            borderBottomRightRadius: 0,
          }}>
          <Text style={{color: 'white', lineHeight: 30}}>
            Good day, I would like to fix my diesel generator
          </Text>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                marginTop: 5,
                textAlign: 'right',
              }}>
              16.50 Read
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            maxWidth: 250,
            padding: 20,
            marginTop: 20,
            borderRadius: 10,
            alignSelf: 'flex-start',
            borderBottomLeftRadius: 0,
          }}>
          <Text style={{color: 'black', lineHeight: 30}}>
            Good day, I would like to fix my diesel generator
          </Text>
          <View>
            <Text
              style={{
                color: 'grey',
                fontSize: 12,
                marginTop: 5,
                textAlign: 'left',
              }}>
              16.50 Read
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 30,
          paddingHorizontal: 15,
        }}>
        <Arrowleft name="camerao" size={20} color={'black'} />
        <TextInput
          placeholder="Type Message"
          placeholderTextColor={'grey'}
          style={styles.input}
        />
        <SendIcon name="send" size={20} color={'black'} />
      </View>
    </View>
  );
};

export default BuyerMessageScreen;
