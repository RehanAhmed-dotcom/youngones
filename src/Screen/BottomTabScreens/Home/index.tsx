import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Animated,
  RefreshControl,
  // Animated,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import styles from './style';
import {Formik} from 'formik';
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowBack from 'react-native-vector-icons/AntDesign';
import FillButton from '../../../Component/FillButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {sellerSignUpValidationSchema} from '../../../lib/ValidationSchemas';
import Loader from '../../../Component/Loader';
import HeaderComp from '../../../Component/HeaderComp';
import ExpertiseItem from '../../../Component/ExpertiseItem';
import InterestItem from '../../../Component/InterestItem';
import {
  singlePostPopularData,
  singlePostRecentData,
  suggestedPeoples,
} from '../../../Component/dummyData';
import SinglePost from '../../../Component/SinglePost';
import People from '../../../Component/People';
import {useSelector} from 'react-redux';
import {
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';

const Home = ({navigation}: {navigation: any}) => {
  const {user} = useSelector(state => state.user);
  const [recentPost, setRecentPost] = useState([]);
  const [popularPost, setPopularPost] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [people, setPeople] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    // console.log('saad api called agaian');
    getApiwithToken({url: 'home', token: user?.api_token}).then(res => {
      // console.log('res of home after saad hit like', JSON.stringify(res));
      setPeople(res.getFollowerUserPosts);
      setRecentPost(res.recentPost);
      setPopularPost(res.popularPost);
    });
  }, [refresh]);
  const refreshFunc = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getApiwithToken({url: 'home', token: user?.api_token}).then(res => {
        // console.log('res of home', JSON.stringify(res));
        setPeople(res.getFollowerUserPosts);
        setRecentPost(res.recentPost);
        setPopularPost(res.popularPost);
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate an API call to refresh data
    setTimeout(() => {
      getApiwithToken({url: 'home', token: user?.api_token}).then(res => {
        // console.log('res of home', JSON.stringify(res));
        setPeople(res.getFollowerUserPosts);
        setRecentPost(res.recentPost);
        setPopularPost(res.popularPost);
      });

      setRefreshing(false);
    }, 1500);
  }, []);
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  // console.log('user', user);
  // const {user} = useSelector(state => state.user);
  const renderItem = ({item}) => (
    <SinglePost navigation={navigation} refresh={refreshFunc} item={item} />
  );
  const renderItemPopular = ({item}) => (
    <SinglePost navigation={navigation} refresh={refreshFunc} item={item} />
  );
  // const scrollY = new Animated.Value(0);

  // const scrollX = new Animated.Value(0);
  // const renderItemPopular = ({item, index}) => {
  //   const inputRange = [-1, 0, index * 100, (index + 1) * 100];
  //   const scale = scrollX.interpolate({
  //     inputRange,
  //     outputRange: [1, 1, 1.5, 1],
  //   });

  //   return (
  //     <View style={{transform: [{scale}]}}>
  //       <View
  //         style={{
  //           width: 300,
  //           height: 100,
  //           marginRight: 20,

  //           backgroundColor: 'red',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}>
  //         <Text>abcd</Text>
  //       </View>
  //     </View>
  //   );
  // };
  // const scrollX = React.useRef(new Animated.Value(0)).current; // Use React.useRef to keep the value stable
  // scrollX.addListener(({value}) => {
  //   console.log('scrollX value:', value); // This should show the current scroll position
  // });
  // const renderItemPopular = ({item, index}) => {
  //   // Adjust inputRange and outputRange to see if the error persists
  //   const inputRange = [
  //     (index - 1) * 120, // Index - 1
  //     index * 100, // Index
  //     (index + 1) * 100, // Index + 1
  //   ];
  //   const scale = scrollX.interpolate({
  //     inputRange,
  //     outputRange: [1, 1.5, 1], // Basic scaling values
  //     extrapolate: 'clamp', // Prevent values from going out of range
  //   });

  //   return (
  //     <Animated.View
  //       style={{
  //         transform: [{scale}],
  //         // width: widthPercentageToDP(80),
  //         // backgroundColor: 'red',
  //       }}>
  //       <SinglePost navigation={navigation} item={item} />
  //     {/* </Animated.View> */}
  //   );
  // };

  // const renderItemSuggest = ({item}) => (
  //   <People item={item} navigation={navigation} />
  // );
  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    const formData = new FormData();
    formData.append('fcm_token', fcmToken);
    postApiWithFormDataWithToken(
      {
        url: 'update-fcm',
        token: user?.api_token,
      },
      formData,
    )
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('error in update', err);
      });
    messaging().onTokenRefresh(token => {
      const formData = new FormData();
      formData.append('fcm_token', token);
      postApiWithFormDataWithToken(
        {
          url: 'update-fcm',

          token: user?.api_token,
        },
        formData,
      )
        .then(res => {})
        .catch(err => {});
    });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getToken();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddPost')}
        style={{
          width: 50,
          height: 50,
          backgroundColor: '#FFBD00',
          position: 'absolute',
          borderRadius: 50,
          bottom: 100,
          right: 30,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}>
        <ArrowBack
          name="plus"
          size={25}
          onPress={() => navigation.navigate('AddPost')}
          color={'white'}
        />
      </TouchableOpacity>
      <HeaderComp
        leftIcon={
          <TouchableOpacity onPress={() => navigation.navigate('AIassistant')}>
            <Image
              source={require('../../../Assets/Images/ChatGpt1.png')}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        }
        backGround={true}
        // label="Home"
        mid={
          <TouchableOpacity
            onPress={() => navigation.navigate('Account')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={
                user?.image
                  ? {uri: user?.image}
                  : require('../../../Assets/Images/girl.jpeg')
              }
              style={{height: 30, width: 30, borderRadius: 20}}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Arial-Bold',
                  top: 8,
                  fontSize: 16,
                }}>
                {user?.firstname} {user?.lastname}
              </Text>
              <Image
                resizeMode="contain"
                source={require('../../../Assets/Images/nameBottom.png')}
                style={{height: 20, marginLeft: 5, width: 20}}
              />
            </View>
          </TouchableOpacity>
        }
        rightIcon={
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <Image
              source={require('../../../Assets/Images/Notification1.png')}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        nestedScrollEnabled>
        <View style={styles.imageView}>
          <View style={{width: '90%'}}>
            {/* <FillButton
              Name="Post Something Here"
              onPress={() => navigation.navigate('AddPost')}
              customTextColor="white"
              customColor="#2D2D35"
            /> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                Recently added
              </Text>
              {/* <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text> */}
            </View>
            <FlatList
              data={recentPost}
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
            <View
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
              {/* <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text> */}
            </View>
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
            <FlatList
              data={popularPost}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItemPopular}
            />
            {/* <FlatList
              data={popularPost}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItemPopular}
              ho 
              // scrollEventThrottle={16}
              // onScroll={Animated.event(
              //   [{nativeEvent: {contentOffset: {x: scrollX}}}],
              //   {useNativeDriver: true},
              // )}
            // />*/}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                Follow For More Jobs
              </Text>
              {/* <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text> */}
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <Text style={{color: 'white'}}>Follow For More Jobs</Text>
              <Text style={{color: '#6A6A6A'}}>Show All</Text>
            </View> */}

            <FlatList
              data={people}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItemPopular}
            />
            <View style={{height: 100}} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
