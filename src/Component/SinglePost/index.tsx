import moment from 'moment';
import React, {useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {postApiWithFormDataWithToken} from '../../lib/Apis/api';
import {useSelector} from 'react-redux';
import Share from 'react-native-share';
const SinglePost = ({item, navigation, extended}) => {
  const [liked, setLiked] = useState(item.is_like);

  const {user} = useSelector(state => state.user);
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
  const likeApi = () => {
    const form = new FormData();
    form.append('post_id', item.id);
    postApiWithFormDataWithToken(
      {url: 'likePost', token: user?.api_token},
      form,
    ).then(res => {
      console.log('res of  like api', res);
    });
  };
  return (
    <View
      // onPress={() => console.log('image', item?.user?.image)}
      style={{
        width: widthPercentageToDP(extended ? 90 : 80),
        // height: heightPercentageToDP(30),
        borderRadius: 10,
        // paddingTop: 20,
        paddingHorizontal: 15,

        // paddingVertical: 20,
        height: item?.images[0]?.image ? 330 : 180,
        marginRight: extended ? 0 : 20,
        marginBottom: extended ? 20 : 0,
        backgroundColor: '#373A43',
      }}>
      <TouchableOpacity
        // onPress={() => console.log('item', item?.user)}
        onPress={() => navigation.navigate('UserProfile', {users: item?.user})}
        style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
        <Image
          source={
            item?.user?.image
              ? {uri: item?.user?.image}
              : require('../../Assets/Images/profile.png')
          }
          style={{height: 50, borderRadius: 50, width: 50}}
        />
        <View>
          <View
            style={{
              marginLeft: 15,
              // backgroundColor: 'red',
              width: '85%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{fontSize: 14, fontFamily: 'ArialMdm', color: 'white'}}>
                {item?.user?.firstname} {item?.user?.lastname}
              </Text>
            </View>

            <Text style={{fontSize: 9, color: 'white', marginTop: 0}}>
              {moment(item.created_at).fromNow()}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 10,
              marginTop: 5,
              marginLeft: 15,
              fontFamily: 'ArialCE',
              color: 'white',
            }}>
            {item?.user?.expertise[0]}
          </Text>
        </View>
        {/* <Text
          style={{
            fontSize: 10,
            marginTop: 5,
            fontFamily: 'ArialCE',
            color: 'white',
          }}>
          {item?.user?.expertise[0]}
        </Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('PostActualDetail', {item})}>
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
          // marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            setLiked(!liked);
            likeApi();
          }}>
          <Text
            style={{
              color: liked ? '#FFBD00' : 'white',
              fontFamily: 'ArialMdm',
            }}>
            Like
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Comment', {id: item.id})}>
          <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const shareOptions = {
              title: `${item.title}`,
              message: `${item.description}`,
              url: 'https://example.com',
            };
            Share.open(shareOptions)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                err && console.log(err);
              });
          }}>
          <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SinglePost;
