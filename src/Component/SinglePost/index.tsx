import moment from 'moment';
import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const SinglePost = ({item, navigation, extended}) => {
  const isVideo = (uri: string) => {
    // console.log('uri', uri);
    const videoExtensions = ['.mp4', '.bin', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => uri.endsWith(ext));
  };
  const renderItem = ({item}) => (
    <View
      // onPress={() => console.log('check', isVideo(item.image))}
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        height: 150,
        width: '100%',
        marginTop: 10,
        // backgroundColor: 'red',
      }}>
      {isVideo(item.image) ? (
        <Image
          source={require('../../Assets/Images/Thumb.png')}
          resizeMode="cover"
          style={{height: 150, width: widthPercentageToDP(70)}}
        />
      ) : (
        <Image
          source={{uri: item.image}}
          style={{height: 150, width: widthPercentageToDP(80)}}
        />
      )}
      {/* <Image
        source={
          !isVideo(item.image)
            ? {uri: item.image}
            : require('../../Assets/Images/Thumb.png')
        }
        style={{height: 150, width: '100%'}}
      /> */}
    </View>
  );

  return (
    <View
      // onPress={() => console.log('image', item?.user?.image)}
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
        onPress={() => navigation.navigate('UserProfile', {users: item?.user})}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={
            item?.user?.image
              ? {uri: item?.user?.image}
              : require('../../Assets/Images/profile.png')
          }
          style={{height: 50, borderRadius: 50, width: 50}}
        />
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
              {item?.user?.firstname} {item?.user?.lastname}
            </Text>
            <Text
              style={{
                fontSize: 10,
                marginTop: 5,
                fontFamily: 'ArialCE',
                color: 'white',
              }}>
              {item?.user?.expertise[0]}
            </Text>
          </View>

          <Text style={{fontSize: 9, color: 'white', marginTop: 0}}>
            {moment(item.created_at).fromNow()}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PostDetail')}>
        <Text
          style={{color: 'white', marginTop: 10, fontFamily: 'ArialCE'}}
          numberOfLines={1}>
          {item.description}
        </Text>
        {item?.images ? (
          <View
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              height: item?.images[0]?.image ? 150 : 0,
              width: '100%',
              marginTop: 10,
              // backgroundColor: 'red',
            }}>
            <FlatList
              data={item?.images}
              horizontal
              nestedScrollEnabled
              renderItem={renderItem}
            />
          </View>
        ) : null}
      </TouchableOpacity>
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
