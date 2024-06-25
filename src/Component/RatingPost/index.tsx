import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import StartIcon from 'react-native-vector-icons/AntDesign';
const RatingPost = ({item, navigation, extended}) => {
  return (
    <View
      style={{
        width: widthPercentageToDP(extended ? 90 : 80),
        // height: heightPercentageToDP(30),
        // borderRadius: 10,
        // paddingTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginRight: extended ? 0 : 20,
        borderRightColor: '#454545',
        borderRightWidth: 1,
        marginBottom: extended ? 20 : 0,
        // backgroundColor: '#373A43',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('UserProfile')}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={item.userImage} style={{height: 50, width: 50}} />
        <View
          style={{
            marginLeft: 15,
            // backgroundColor: 'red',
            width: '78%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{fontSize: 14, fontFamily: 'ArialMdm', color: 'white'}}>
              {item.userName}
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 5,
                fontFamily: 'ArialCE',
                color: 'white',
              }}>
              @leo
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={{fontSize: 12, color: 'white', marginTop: 0}}>
              25 Jan
            </Text>
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'flex-end',
              }}>
              <StartIcon name={'star'} size={10} color={'#FFBD00'} />
              <StartIcon name={'star'} size={10} color={'#FFBD00'} />
              <StartIcon name={'star'} size={10} color={'#FFBD00'} />
              <StartIcon name={'star'} size={10} color={'#FFBD00'} />
              <StartIcon name={'star'} size={10} color={'#FFBD00'} />
              <Text style={{color: '#BDBDBD', marginLeft: 5, fontSize: 12}}>
                4.5
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Text
        style={{color: 'white', marginTop: 10, fontFamily: 'ArialCE'}}
        numberOfLines={2}>
        {item.postText}
      </Text>
    </View>
  );
};

export default RatingPost;
