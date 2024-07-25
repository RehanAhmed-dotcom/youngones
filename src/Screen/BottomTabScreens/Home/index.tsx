import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import styles from './style';
import {Formik} from 'formik';
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowBack from 'react-native-vector-icons/AntDesign';
import FillButton from '../../../Component/FillButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
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
import {getApiwithToken} from '../../../lib/Apis/api';

const Home = ({navigation}: {navigation: any}) => {
  const {user} = useSelector(state => state.user);
  const [recentPost, setRecentPost] = useState([]);
  const [popularPost, setPopularPost] = useState([]);
  const [people, setPeople] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getApiwithToken({url: 'home', token: user.api_token}).then(res => {
        // console.log('res of home', JSON.stringify(res));
        setPeople(res.people);
        setRecentPost(res.recentPost);
        setPopularPost(res.popularPost);
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  // console.log('user', user);
  // const {user} = useSelector(state => state.user);
  const renderItem = ({item}) => (
    <SinglePost navigation={navigation} item={item} />
  );
  const renderItemPopular = ({item}) => (
    <SinglePost navigation={navigation} item={item} />
  );
  const renderItemSuggest = ({item}) => <People item={item} />;

  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
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
                user.image
                  ? {uri: user.image}
                  : require('../../../Assets/Images/Ava.png')
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
                {user.firstname} {user.lastname}
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
      <ScrollView nestedScrollEnabled>
        <View style={styles.imageView}>
          <View style={{width: '90%'}}>
            <FillButton
              Name="Post Something Here"
              onPress={() => navigation.navigate('AddPost')}
              customTextColor="white"
              customColor="black"
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
                Recently added
              </Text>
              <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text>
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
              <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text>
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
              <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text>
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
              renderItem={renderItemSuggest}
            />
            <View style={{height: 100}} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
