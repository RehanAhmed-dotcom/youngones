import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const People = ({item}) => {
  return (
    <View
      style={{
        width: widthPercentageToDP(43),
        // height: heightPercentageToDP(30),
        borderRadius: 10,
        // paddingTop: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        paddingVertical: 20,
        marginRight: 10,
        backgroundColor: '#373A43',
      }}>
      <View style={{alignItems: 'flex-start'}}>
        <Image
          source={{uri: item.image}}
          resizeMode="cover"
          style={{height: 50, borderRadius: 50, width: 50}}
        />
        <View style={{marginLeft: 0}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'ArialMdm',
              marginVertical: 10,
              color: 'white',
            }}>
            {item.firstname} {item.lastname}
          </Text>
          {/* <Text style={{fontSize: 12, color: 'white'}}>{item.userRole}</Text>
          <Text style={{fontSize: 12, color: 'white', marginTop: 4}}>
            {item.postTime}
          </Text> */}
        </View>
      </View>
      <Text style={{color: '#D2D2D2', fontFamily: 'ArialCE'}} numberOfLines={4}>
        {item.about}
      </Text>
      <View style={{flexDirection: 'row', width: '80%', alignItems: 'center'}}>
        <Image
          resizeMode="contain"
          source={require('../../Assets/Images/location.png')}
          style={{height: 30, marginTop: 20, width: 30}}
        />
        <Text
          numberOfLines={2}
          style={{
            color: '#9B9CA1',
            fontFamily: 'ArialCE',
            marginLeft: 10,
            marginTop: 10,
          }}>
          {item.address}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: '85%',
          borderWidth: 1,
          borderColor: 'white',
          alignSelf: 'center',
          marginTop: 30,
          height: 30,
          alignItems: 'center',
          borderRadius: 30,
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontFamily: 'ArialCE'}}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
};

export default People;
