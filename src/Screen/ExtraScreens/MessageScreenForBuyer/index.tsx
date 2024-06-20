import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './style';
import HeaderComp from '../../../Component/HeaderComp';
import Arrowleft from 'react-native-vector-icons/AntDesign';
import SendIcon from 'react-native-vector-icons/Feather';
const MessageScreenForBuyer = ({navigation}) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Arrowleft name="left" size={20} color={'white'} />
          <Image
            source={require('../../../Assets/Images/girl.jpeg')}
            style={{width: 30, height: 30, marginLeft: 10, borderRadius: 20}}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Arrowleft name="search1" size={20} color={'white'} />
          <TouchableOpacity onPress={() => navigation.navigate('QuickOrder')}>
            <Image
              source={require('../../../Assets/Images/order.png')}
              style={{width: 18, marginLeft: 10, height: 18}}
              tintColor={'white'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, paddingTop: 10, paddingHorizontal: 15}}>
        <View
          style={{
            backgroundColor: '#0F8BC2',
            maxWidth: 250,
            padding: 10,
            borderRadius: 10,
            alignSelf: 'flex-end',
            borderBottomRightRadius: 0,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'WorkSans-Regular',
              lineHeight: 25,
            }}>
            Good day, I would like to fix my diesel generator
          </Text>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 10,
                marginTop: 5,
                fontFamily: 'WorkSans-Regular',
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
            padding: 10,
            marginTop: 20,
            borderRadius: 10,
            alignSelf: 'flex-start',
            borderBottomLeftRadius: 0,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'WorkSans-Regular',
              lineHeight: 25,
            }}>
            Good day, I would like to fix my diesel generator
          </Text>
          <View>
            <Text
              style={{
                color: 'grey',
                fontSize: 10,
                marginTop: 5,
                fontFamily: 'WorkSans-Regular',
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
            padding: 10,
            marginTop: 20,
            borderRadius: 10,
            alignSelf: 'flex-end',
            borderBottomRightRadius: 0,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'WorkSans-Regular',
              lineHeight: 25,
            }}>
            Good day, I would like to fix my diesel generator
          </Text>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 10,
                marginTop: 5,
                fontFamily: 'WorkSans-Regular',
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
            padding: 5,
            marginBottom: 5,
            marginTop: 20,
            borderRadius: 10,
            alignSelf: 'flex-start',
            borderBottomLeftRadius: 0,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'WorkSans-Regular',
              lineHeight: 25,
            }}>
            Good day, I would like to fix my diesel generator
          </Text>
          <View>
            <Text
              style={{
                color: 'grey',
                fontSize: 10,
                marginTop: 5,
                fontFamily: 'WorkSans-Regular',
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
          backgroundColor: 'white',
          paddingBottom: 20,
          paddingHorizontal: 15,
          paddingTop: 10,
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

export default MessageScreenForBuyer;
