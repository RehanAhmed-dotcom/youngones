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
} from 'react-native';
import styles from './style';
import database from '@react-native-firebase/database';
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
import {useSelector} from 'react-redux';

const Chat = ({navigation}: {navigation: any}) => {
  const data = ['1', '2', '3', '4', '5'];
  const {user} = useSelector(state => state.user);
  const [list, setList] = useState([]);
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        // console.log('item', item);
        const fullname = item?.user?.username;
        let firstName = '';
        let lastName = '';
        [firstName, lastName] = fullname.split(' ');

        const userData = {
          email: item?.user?.email,
          image: item?.user?.image,
          id: item?.user?.id,
          firstname: firstName,
          lastname: lastName,
        };
        navigation.navigate('MessageScreen', {item: userData});
      }}
      style={styles.chatItem1}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={
            item?.user?.image
              ? {uri: item?.user?.image}
              : require('../../../Assets/Images/profile.png')
          }
          style={[styles.image, {width: 40, height: 40, borderRadius: 30}]}
        />
        <View style={{marginLeft: 10, width: '60%'}}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'ArialMdm',
              fontSize: 14,
            }}>
            {item?.user?.username}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: 'white',
              fontFamily: 'ArialCE',
              marginTop: 5,
              fontSize: 14,
            }}>
            {item.latestMessage}
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text
          style={{
            color: '#C6C7CA',
            fontFamily: 'ArialCE',
            fontSize: 12,
          }}>
          12:32 Am
        </Text>
        {/* {item.counter ? ( */}
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: '#FBBC05',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          {/* <Text
            numberOfLines={1}
            style={{
              color: 'white',
              fontFamily: 'WorkSans-Regular',
              fontSize: 12,
            }}>
            1
          </Text> */}
        </View>
        {/* ) : null} */}
      </View>
    </TouchableOpacity>
  );
  const _usersList = useCallback(async () => {
    try {
      database()
        .ref('users/' + user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .on('value', dataSnapshot => {
          let users = [];
          dataSnapshot.forEach(child => {
            users.push(child.val());
          });

          // Sort the users based on timestamp in descending order
          users.sort((a, b) => b.timestamp - a.timestamp);

          setList(users);
          // console.log('user', users);
          // setSearchedList(users);
        });
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  }, [user?.email]);
  useEffect(() => {
    _usersList();
  }, []);
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        // leftIcon={
        //   <ArrowBack
        //     name="left"
        //     onPress={() => navigation.goBack()}
        //     size={20}
        //     color={'white'}
        //   />
        // }
        label="Chat"
        rightIcon={
          <ArrowBack
            name="search1"
            // onPress={() => navigation.goBack()}
            size={20}
            color={'#FFBD00'}
          />
        }
      />
      <View style={{width: '90%', paddingTop: 20, alignSelf: 'center'}}>
        <FlatList data={list} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default Chat;
