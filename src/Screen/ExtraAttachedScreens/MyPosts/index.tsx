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
  RefreshControl,
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

const MyPosts = ({navigation}: {navigation: any}) => {
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const {user} = useSelector(state => state.user);
  const [post, setPost] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const refreshFunc = () => {
    setRefresh(!refresh);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate an API call to refresh data
    setTimeout(() => {
      getApiwithToken({url: 'myPosts', token: user?.api_token}).then(res => {
        console.log('res of my posts', res);
        setPost(res.data);
      });
      setRefreshing(false);
    }, 1500);
  };
  const renderItem = ({item}) => (
    <SinglePost
      item={item}
      refresh={refreshFunc}
      navigation={navigation}
      extended={true}
    />
  );

  const renderItemPopular = ({item}) => <SinglePost item={item} />;
  const renderItemSuggest = ({item}) => (
    <People item={item} navigation={navigation} />
  );
  useEffect(() => {
    getApiwithToken({url: 'myPosts', token: user?.api_token}).then(res => {
      console.log('res of my posts', res);
      setPost(res.data);
    });
  }, [refresh]);
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        leftIcon={
          <ArrowBack
            name="left"
            onPress={() => navigation.goBack()}
            size={20}
            color={'white'}
          />
        }
        label="My Posts"
        // mid={
        //   <View style={{flexDirection: 'row', alignItems: 'center'}}>
        //     <Image
        //       source={require('../../../Assets/Images/profile.png')}
        //       style={{height: 30, width: 30, borderRadius: 20}}
        //     />
        //     <Text style={{color: 'white', marginLeft: 5, fontSize: 16}}>
        //       John Travolta
        //     </Text>
        //   </View>
        // }
        // rightIcon={
        //   <Image
        //     source={require('../../../Assets/Images/Notification.png')}
        //     style={{height: 20, width: 20}}
        //     resizeMode="contain"
        //   />
        // }
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.imageView}>
          <View style={{width: '90%'}}>
            <FlatList
              data={post}
              // horizontal

              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />

            {/* <View style={{height: 100}} /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyPosts;
