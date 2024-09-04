import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import HeaderComp from '../../../Component/HeaderComp';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import PopularJobItem from '../../../Component/PopularJobItem';
import FillButton from '../../../Component/FillButton';
import {
  accountData,
  singlePostPopularData,
  singlePostRecentData,
} from '../../../Component/dummyData';
import RatingPost from '../../../Component/RatingPost';
import SinglePost from '../../../Component/SinglePost';
import {useSelector} from 'react-redux';
import {
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
const UserProfile = ({navigation, route}) => {
  const {users} = route.params;

  const [userDetails, setUsersDetails] = useState({});
  const {user} = useSelector(state => state.user);
  const [followingUser, setFollowingUser] = useState(userDetails?.is_follow);
  const [rerender, setRerender] = useState(false);
  const followApi = () => {
    const form = new FormData();
    form.append('followUserId', userDetails?.id);
    postApiWithFormDataWithToken(
      {url: 'follow', token: user?.api_token},
      form,
    ).then(res => {
      console.log('res of  like api', res);
      if (res.status == 'success') {
        refreshFunc();
      }
    });
  };
  useEffect(() => {
    getApiwithToken({
      url: `userDetail/${users.id}`,
      token: user?.api_token,
    }).then(res => {
      console.log('user', res);
      setUsersDetails(res.data);
      // setUsersList(name == 'Followers' ? res.followers : res.followings);
    });
  }, [rerender]);
  const refreshFunc = () => {
    setRerender(!rerender);
  };
  const renderItem = ({item}) => (
    <RatingPost navigation={navigation} item={item} />
  );
  const renderItemPopular = ({item}) => (
    <SinglePost navigation={navigation} item={item} />
  );
  // console.log('user', users);
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      {/* <HeaderComp
        leftIcon={
          <ArrowLeft
            name={'left'}
            size={20}
            onPress={() => navigation.goBack()}
            color={'white'}
          />
        }
        label="UI/UX Designer"
      /> */}
      <View style={{width: '100%', height: heightPercentageToDP(30)}}>
        <Image
          source={
            userDetails?.cover_image
              ? {uri: userDetails?.cover_image}
              : require('../../../Assets/Images/ExpendedLogo.png')
          }
          style={{width: '100%', height: heightPercentageToDP(30)}}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', zIndex: 20, left: 20, top: 20}}>
          <ArrowLeft name={'left'} size={20} color={'white'} />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            // backgroundColor: 'red',
            zIndex: 20,
            width: '100%',
            alignItems: 'center',
            bottom: -30,
          }}>
          <Image
            source={
              userDetails?.image
                ? {uri: userDetails?.image}
                : require('../../../Assets/Images/girl.jpeg')
            }
            style={{height: 80, borderRadius: 50, width: 80}}
          />
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            width: '90%',
            flex: 1,
            paddingBottom: 20,
            //   backgroundColor: 'red',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontFamily: 'ArialMdm',
              marginTop: 40,
              fontSize: 18,
            }}>
            {userDetails?.firstname} {userDetails?.lastname}
          </Text>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontFamily: 'ArialCE',
              marginTop: 5,
              fontSize: 14,
            }}>
            {userDetails?.address}
          </Text>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontFamily: 'ArialCE',
              marginTop: 10,
              fontSize: 12,
            }}>
            {userDetails?.t_followers} Followers
          </Text>
          {user?.id != users.id && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View
                style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
                <FillButton
                  customColor="#FFBD00"
                  customTextColor="white"
                  Name={userDetails?.is_follow ? 'Following' : 'Follow'}
                  midButton={true}
                  onPress={
                    () => {
                      setFollowingUser(!followingUser);
                      followApi();
                    } // navigation.navigate('Followers', {name: users})
                  }
                />
              </View>
              <View
                style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
                <FillButton
                  customColor="#2D2D35"
                  customTextColor="white"
                  Name="Chat"
                  midButton={true}
                  onPress={() =>
                    navigation.navigate('MessageScreen', {item: users})
                  }
                />
              </View>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
              marginBottom: 10,
            }}>
            <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
              About Job
            </Text>
          </View>
          <Text style={{color: '#D6D6D6', fontFamily: 'ArialCE'}}>
            {userDetails?.about}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
              marginBottom: 10,
            }}>
            <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
              Recent Posts
            </Text>
            {/* <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text> */}
          </View>
          <FlatList
            data={userDetails?.posts}
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderItemPopular}
          />
          {/* <View style={{marginVertical: 30}}> */}
          {/* <FlatList
            data={singlePostRecentData}
            horizontal
            renderItem={renderItem}
          /> */}
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
              marginBottom: 10,
            }}>
            <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
              Popular posts
            </Text>
            <Text
              style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
              Show All
            </Text>
          </View> */}
          {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <Text style={{color: 'white'}}>Popular posts</Text>
              <Text style={{color: '#6A6A6A'}}>Show All</Text>
            </View> */}
          {/* <FlatList
            data={singlePostPopularData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItemPopular}
          /> */}
          {/* </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfile;
