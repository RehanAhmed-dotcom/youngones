import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const SinglePost = ({item, navigation, extended}) => {
  return (
    <View
      style={{
        width: widthPercentageToDP(extended ? 90 : 80),
        // height: heightPercentageToDP(30),
        borderRadius: 10,
        // paddingTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginRight: extended ? 0 : 20,
        marginBottom: extended ? 20 : 0,
        backgroundColor: '#373A43',
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
              {item.userRole}
            </Text>
          </View>

          <Text style={{fontSize: 12, color: 'white', marginTop: 0}}>
            {item.postTime} ago
          </Text>
        </View>
      </TouchableOpacity>
      <Text
        style={{color: 'white', marginTop: 10, fontFamily: 'ArialCE'}}
        numberOfLines={item.postImage ? 2 : 3}>
        {item.postText}
      </Text>
      {item.postImage ? (
        <View
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            height: 150,
            width: '100%',
            marginTop: 10,
            // backgroundColor: 'red',
          }}>
          <Image source={item.postImage} style={{height: 150, width: '100%'}} />
        </View>
      ) : null}
      <View
        style={{
          alignItems: 'flex-end',
          paddingBottom: 10,

          borderBottomWidth: 1,
          borderBottomColor: 'white',
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'ArialCE',
            marginTop: 10,
            fontSize: 12,
          }}>
          {item.comments} comments
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <TouchableOpacity>
          <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SinglePost;
