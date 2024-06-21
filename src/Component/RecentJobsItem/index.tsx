import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const RecentJobsItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostDetail')}
      style={{
        height: heightPercentageToDP(25),
        width: widthPercentageToDP(80),
        borderRadius: 15,
        overflow: 'hidden',
        // backgroundColor: 'red',
        marginRight: 20,
      }}>
      <ImageBackground
        source={item.Image}
        style={{width: '100%', height: '100%'}}>
        <View
          style={{
            width: '90%',
            // height: '20%',

            alignSelf: 'center',
            backgroundColor: '#383838CC',
            position: 'absolute',
            bottom: 10,
            borderRadius: 10,
            // paddingHorizontal: 20,
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '70%'}}>
            <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
              {item.post}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                color: 'white',
                marginTop: 10,
                fontSize: 12,
                fontFamily: 'ArialCE',
              }}>
              {item.description}
            </Text>
          </View>
          <View>
            <Text
              numberOfLines={2}
              style={{
                color: 'white',
                marginTop: 10,
                fontSize: 12,
                fontFamily: 'ArialCE',
              }}>
              Per Hour
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginTop: 10,
                fontFamily: 'ArialMdm',
              }}>
              ${item.amount}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default RecentJobsItem;
