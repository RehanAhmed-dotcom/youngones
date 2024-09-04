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
} from 'react-native';
import styles from './style';
import database from '@react-native-firebase/database';
import {Formik} from 'formik';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
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
import OnlyImageModal from '../../../Component/ZoomImage';

const Chat = ({navigation}: {navigation: any}) => {
  const data = ['1', '2', '3', '4', '5'];
  const {user} = useSelector(state => state.user);
  const [list, setList] = useState([]);
  const [listSearch, setListSearch] = useState([]);
  const [showonlyImage, setShowOnlyImage] = useState(false);
  const [mainImage, setImage] = useState('');
  const hideModal = () => {
    setShowOnlyImage(!showonlyImage);
  };
  const deleteConversation = number => {
    database()
      .ref('users/' + user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
      .child(number.replace(/[^a-zA-Z0-9 ]/g, ''))
      .remove();
    database()
      .ref('users/' + number.replace(/[^a-zA-Z0-9 ]/g, ''))
      .child(user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
      .remove();
    database()
      .ref('messeges/' + user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
      .child(number.replace(/[^a-zA-Z0-9 ]/g, ''))
      .remove();
    database()
      .ref('messeges/' + number.replace(/[^a-zA-Z0-9 ]/g, ''))
      .child(user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
      .remove();
  };
  const renderItem = ({item}) => (
    <GestureHandlerRootView>
      <Swipeable
        overshootLeft={false}
        friction={2}
        renderRightActions={(progress, dragX) => {
          const val = dragX.interpolate({
            inputRange: [0, 40],
            outputRange: [1, 1.15],
          });
          return (
            <View
              style={{
                backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 10,
                // padding: 20,
                top: 10,
                marginBottom: 20,
                // bottom: 40,
              }}>
              <TouchableOpacity
                onPress={() =>
                  // deleteConversation(item.key, item.user.Number)
                  deleteConversation(item.user.email)
                }>
                <Animated.Text
                  style={[
                    {color: 'white', fontWeight: '600'},
                    {transform: [{scale: val}]},
                  ]}>
                  Delete
                </Animated.Text>
              </TouchableOpacity>
            </View>
          );
        }}>
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
            <TouchableOpacity
              onPress={() => {
                setImage(item?.user?.image);
                setShowOnlyImage(!showonlyImage);
              }}>
              <Image
                source={
                  item?.user?.image
                    ? {uri: item?.user?.image}
                    : require('../../../Assets/Images/girl.jpeg')
                }
                style={[
                  styles.image,
                  {width: 40, height: 40, borderRadius: 30},
                ]}
              />
            </TouchableOpacity>
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
            {item.counter ? (
              <View
                style={{
                  width: 20,
                  height: 20,
                  padding: 2,
                  backgroundColor: '#FBBC05',
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Text style={{color: 'white', bottom: 2}}>{item.counter}</Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
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
          setListSearch(users);
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
        <View></View>
        <FlatList data={list} renderItem={renderItem} />
      </View>
      <OnlyImageModal
        imgshow={showonlyImage}
        image={mainImage}
        hideModal={hideModal}
      />
    </View>
  );
};

export default Chat;
