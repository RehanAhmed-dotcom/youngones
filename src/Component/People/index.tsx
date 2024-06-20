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
        width: widthPercentageToDP(65),
        // height: heightPercentageToDP(30),
        borderRadius: 10,
        // paddingTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginRight: 20,
        backgroundColor: '#373A43',
      }}>
      <View style={{alignItems: 'flex-start'}}>
        <Image
          source={item.userImage}
          resizeMode="contain"
          style={{height: 50, width: 50}}
        />
        <View style={{marginLeft: 0}}>
          <Text style={{fontSize: 18, marginVertical: 10, color: 'white'}}>
            {item.userName}
          </Text>
          {/* <Text style={{fontSize: 12, color: 'white'}}>{item.userRole}</Text>
          <Text style={{fontSize: 12, color: 'white', marginTop: 4}}>
            {item.postTime}
          </Text> */}
        </View>
      </View>
      <Text style={{color: '#D2D2D2'}} numberOfLines={4}>
        {item.postText}
      </Text>
      <View style={{flexDirection: 'row', width: '80%', alignItems: 'center'}}>
        <Image
          resizeMode="contain"
          source={require('../../Assets/Images/location.png')}
          style={{height: 30, marginTop: 20, width: 30}}
        />
        <Text
          numberOfLines={2}
          style={{color: 'white', marginLeft: 10, marginTop: 10}}>
          {item.userCity}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: '80%',
          borderWidth: 1,
          borderColor: 'white',
          alignSelf: 'center',
          marginTop: 30,
          height: 40,
          alignItems: 'center',
          borderRadius: 30,
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white'}}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
};

export default People;
