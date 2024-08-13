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
import Person from 'react-native-vector-icons/Entypo';
import ArrowBack from 'react-native-vector-icons/AntDesign';
import CommentIcon from 'react-native-vector-icons/EvilIcons';

import FillButton from '../../../Component/FillButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {sellerSignUpValidationSchema} from '../../../lib/ValidationSchemas';
import Loader from '../../../Component/Loader';
import HeaderComp from '../../../Component/HeaderComp';
import ExpertiseItem from '../../../Component/ExpertiseItem';
import InterestItem from '../../../Component/InterestItem';
import {getApiwithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
import moment from 'moment';

const Notifications = ({navigation}: {navigation: any}) => {
  const [notificationList, setNotificationList] = useState([]);
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        item.type == 'message'
          ? item.client
            ? navigation.navigate('MessageScreen', {item: item.client})
            : item.admin
            ? navigation.navigate('MessageScreen', {item: item.admin})
            : navigation.navigate('MessageScreen', {item: item.user})
          : item.type == 'like'
          ? navigation.navigate('PostActualDetail', {item: item.post})
          : item.type == 'comment'
          ? navigation.navigate('Comment', {id: item.post.id})
          : item.type == 'invite'
          ? navigation.navigate(
              item.job.is_apply ? 'PostDetailHours' : 'PostDetail',
              {
                item: item.job,
              },
            )
          : item.type == 'approve_hours'
          ? navigation.navigate('PostDetailHours', {item: item.job})
          : item.type == 'follow'
          ? navigation.navigate('UserProfile', {users: item.user})
          : console.log('hello', item);
      }}
      style={{backgroundColor: '#FFBD00', borderRadius: 10, marginBottom: 15}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#373A43',
          left: 3,
          padding: 10,
          borderRadius: 10,
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 50,
            width: 50,

            backgroundColor: '#FFBD00',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {item.type == 'message' ? (
            <ArrowBack color={'white'} size={20} name={'message1'} />
          ) : item.type == 'like' ? (
            <ArrowBack color={'white'} size={20} name={'like2'} />
          ) : item.type == 'comment' ? (
            <CommentIcon color={'white'} size={25} name={'comment'} />
          ) : item.type == 'invite' ? (
            <CheckIcon color={'white'} size={20} name={'email-newsletter'} />
          ) : item.type == 'approve_hours' ? (
            <CheckIcon color={'white'} size={20} name={'email-newsletter'} />
          ) : item.type == 'follow' ? (
            <Person color={'white'} size={20} name={'user'} />
          ) : null}
        </View>

        <View style={{marginLeft: 15, width: '75%'}}>
          <View
            style={{
              // backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 10,
                marginRight: 4,
                color: 'white',
                fontFamily: 'ArialCE',
              }}>
              {moment(item.time).format('DD-MM-YYYY')}
            </Text>
          </View>
          <Text
            style={{
              color: 'white',
              width: '100%',
              marginTop: 5,
              // backgroundColor: 'red',
              fontSize: 12,
              fontFamily: 'ArialCE',
              lineHeight: 20,
            }}>
            {item.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const {user} = useSelector(state => state.user);
  useEffect(() => {
    getApiwithToken({url: 'viewAllNotification', token: user?.api_token}).then(
      res => {
        console.log('res of notification', JSON.stringify(res));
        setNotificationList(res.data);
      },
    );
  }, []);
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        label="Notifications"
        leftIcon={
          <ArrowBack
            size={20}
            onPress={() => navigation.goBack()}
            color={'white'}
            name={'left'}
          />
        }
      />
      <View style={{width: '90%', paddingTop: 20, alignSelf: 'center'}}>
        <FlatList data={notificationList} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default Notifications;
