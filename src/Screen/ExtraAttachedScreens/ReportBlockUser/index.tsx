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
  Modal,
  Dimensions,
  RefreshControl,
  Keyboard,
} from 'react-native';
import styles from './style';
import ThreeDots from 'react-native-vector-icons/Entypo';
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
  PopularJobs,
  RecentJobsData,
  singlePostPopularData,
  singlePostRecentData,
  suggestedPeoples,
} from '../../../Component/dummyData';
import ReportIcon from 'react-native-vector-icons/Octicons';

import SinglePost from '../../../Component/SinglePost';
import People from '../../../Component/People';
import RecentJobsItem from '../../../Component/RecentJobsItem';
import {PopularData} from '../../../Component/ExtraData/PopularData';
import PopularJobItem from '../../../Component/PopularJobItem';
import DropDown from '../../../Component/DropDown';
import {
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
import OnlyImageModal from '../../../Component/ZoomImage';

const ReportBlockUser = ({navigation}: {navigation: any}) => {
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const {user} = useSelector(state => state.user);
  const {height: windowHeight} = Dimensions.get('window');
  const data = ['New', 'Accepted', 'Cancelled', 'Completed'];
  const [saved, setSaved] = useState([]);
  const [mainImage, setImage] = useState('');
  const [showonlyImage, setShowOnlyImage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [reasonShow, setReasonShow] = useState(false);
  const [userId, setUserId] = useState('');
  const [reason, setReason] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const hideModal = () => {
    setShowOnlyImage(!showonlyImage);
  };
  const renderItem = ({item}) => (
    <RecentJobsItem item={item} navigation={navigation} />
  );
  const reportReason = () => {
    setReasonShow(false);
    const formdata = new FormData();
    formdata.append('report_id', userId);
    formdata.append('reason', reason);
    postApiWithFormDataWithToken(
      {url: 'reportUser', token: user?.api_token},
      formdata,
    ).then(res => {
      console.log('res of report ppost', res);
      if (res.status == 'success') {
        Alert.alert('Success', 'Report posted to admin');
      }
    });
  };
  const blockUser = () => {
    const formdata = new FormData();
    formdata.append('block_id', userId);
    // formdata.append('reason', reason);
    postApiWithFormDataWithToken(
      {url: 'blockUser', token: user?.api_token},
      formdata,
    ).then(res => {
      console.log('res of report ppost', res);
      if (res.status == 'success') {
        Alert.alert('Success', res.message);
        refreshApi();
      }
    });
  };
  const myModal3 = () => (
    <Modal animationType="slide" transparent={true} visible={reasonShow}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00000088',
        }}>
        <View
          style={{
            height: '50%',
            backgroundColor: '#2D2D35',
            width: '90%',
            borderRadius: 10,
          }}>
          <View
            style={{
              marginTop: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}>
            <View style={{width: 20}} />
            <Text style={{color: 'white'}}>Report Reason</Text>
            <TouchableOpacity onPress={() => setReasonShow(false)}>
              <ThreeDots name="circle-with-cross" size={20} color={'white'} />
            </TouchableOpacity>
          </View>
          <View style={{margin: 15}}>
            <TextInput
              placeholder={' Enter the reason'}
              placeholderTextColor="#ccc"
              value={reason}
              textAlignVertical="top"
              onChangeText={text => setReason(text)}
              multiline
              numberOfLines={5}
              style={{
                color: 'white',
                fontFamily: 'ArialCE',
                // paddingHorizontal: 10,
                paddingHorizontal: 10,
                borderWidth: 0.5,
                borderColor: '#ccc',
                borderRadius: 10,
                height: keyboardStatus == 'Keyboard Shown' ? '50%' : '70%',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 15,
            }}>
            <FillButton
              customColor="#2D2D35"
              customTextColor="white"
              Name="Submit"
              onPress={reportReason}
            />
            {/* <TouchableOpacity
              onPress={() => {
                // reportPost({
                //   Auth: userData.token,
                //   post_id: item.id,
                //   posted_by: item.user_id,
                //   reason,
                // }).then(res => {
                //   console.log('res', res);
                // });
              }}
              style={{
                width: '100%',
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',

                backgroundColor: '#FF4029',
              }}>
              <Text style={{color: 'white'}}>Submit</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => setReasonShow(false)}
              style={{
                width: '45%',
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0.5,
                borderColor: '#FF4029',
              }}>
              <Text style={{color: 'black'}}>Cancel</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </Modal>
  );
  const renderItemPopular = ({item}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#ccc',

        borderBottomWidth: 1,
        paddingVertical: 20,
        width: '100%',
        // backgroundColor: 'red',
      }}
      onPress={() => console.log('item', item)}>
      <TouchableOpacity
        // onPress={() => console.log('user', item)}
        onPress={() => navigation.navigate('UserProfile', {users: item})}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            setImage(item.image);
            setShowOnlyImage(!showonlyImage);
          }}>
          <Image
            source={{uri: item.image}}
            resizeMode="cover"
            style={{height: 50, borderRadius: 50, width: 50}}
          />
        </TouchableOpacity>

        <View style={{marginLeft: 0}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'ArialMdm',
              //   marginVertical: 10,
              marginLeft: 10,

              color: 'white',
            }}>
            {item.firstname} {item.lastname}
          </Text>
          {/* <Text style={{fontSize: 12, color: 'white'}}>{item.userRole}</Text>
          <Text style={{fontSize: 12, color: 'white', marginTop: 4}}>
            {item.postTime}
          </Text> */}
        </View>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            setUserId(item.id);
            setReasonShow(true);
          }}
          style={{
            // borderWidth: 1,
            borderColor: '#FFBD00',
            // width: 100,
            // height: 40,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ReportIcon name="report" size={20} color={'#FFBD00'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setUserId(item.id);
            item.is_block
              ? Alert.alert(
                  'Warning',
                  'Are you sure you want to unblock this user?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        blockUser();
                      },
                    },
                  ],
                )
              : Alert.alert(
                  'Warning',
                  'Are you sure you want to block this user?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        blockUser();
                      },
                    },
                  ],
                );
          }}
          style={{
            // borderWidth: 1,
            borderColor: '#FFBD00',
            width: 40,
            height: 40,
            // backgroundColor: 'red',
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {item.is_block ? (
            <CheckIcon name="block-helper" size={20} color={'red'} />
          ) : (
            <ReportIcon name="blocked" size={20} color={'#FFBD00'} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  const [refresh, setRefresh] = useState(false);
  const refreshApi = () => {
    setRefresh(!refresh);
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getApiwithToken({url: 'all_users', token: user?.api_token}).then(res => {
        console.log('res of savedd aapi', JSON.stringify(res));
        setSaved(res.data);
      });
      setRefreshing(false);
    }, 1500);
  };
  useEffect(() => {
    getApiwithToken({url: 'all_users', token: user?.api_token}).then(res => {
      console.log('res of savedd aapi', JSON.stringify(res));
      setSaved(res.data);
    });
  }, [refresh]);
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        leftIcon={
          <ArrowBack
            name={'left'}
            onPress={() => navigation.goBack()}
            size={20}
            color={'white'}
          />
        }
        label="Report & Block"
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.imageView}>
          <View style={{width: '90%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}></View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              {/* <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                Popular jobs
              </Text> */}
            </View>
            <View style={{marginBottom: 100}}>
              <FlatList
                data={saved}
                //   horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItemPopular}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* {FilterModal()} */}
      <OnlyImageModal
        imgshow={showonlyImage}
        image={mainImage}
        hideModal={hideModal}
      />
      {myModal3()}
    </View>
  );
};

export default ReportBlockUser;
