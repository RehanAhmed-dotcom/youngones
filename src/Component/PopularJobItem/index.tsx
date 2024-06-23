import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Heart from 'react-native-vector-icons/AntDesign';
const PopularJobItem = ({item, navigation, checked}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostDetail')}
      style={{
        backgroundColor: '#373A43',
        width: '100%',
        // height: 100,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
        }}>
        <Image source={item.Image} style={{height: 50, width: 50}} />
        <View style={{marginLeft: 15}}>
          <Text style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
            {item.post}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontFamily: 'ArialCE'}}>
              ${item.amount}
            </Text>
            <Text
              style={{color: 'white', marginLeft: 20, fontFamily: 'ArialCE'}}>
              ${item.location}
            </Text>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 30,
            height: 30,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 15,
          }}>
          <Heart
            name={checked ? 'heart' : 'hearto'}
            color={'#4D00DE'}
            size={20}
          />
        </TouchableOpacity>
        <Text style={{color: '#FFBD00', fontSize: 12, fontFamily: 'ArialMdm'}}>
          {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobItem;
