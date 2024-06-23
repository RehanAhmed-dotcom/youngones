import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const SinglePost = ({item, extended}) => {
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={item.userImage} style={{height: 50, width: 50}} />
        <View style={{marginLeft: 15}}>
          <Text style={{fontSize: 16, color: 'white'}}>{item.userName}</Text>
          <Text style={{fontSize: 12, color: 'white'}}>{item.userRole}</Text>
          <Text style={{fontSize: 12, color: 'white', marginTop: 4}}>
            {item.postTime}
          </Text>
        </View>
      </View>
      <Text style={{color: 'white'}} numberOfLines={item.postImage ? 2 : 3}>
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
        <Text style={{color: 'white', marginTop: 10, fontSize: 12}}>
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
          <Text style={{color: 'white'}}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: 'white'}}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: 'white'}}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SinglePost;
