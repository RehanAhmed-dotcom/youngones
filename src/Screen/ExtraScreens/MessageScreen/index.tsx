import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import database from '@react-native-firebase/database';
import styles from './style';
import ImageCropPicker from 'react-native-image-crop-picker';
import HeaderComp from '../../../Component/HeaderComp';
import Arrowleft from 'react-native-vector-icons/AntDesign';
import SendIcon from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {recieverMsg, senderMsg} from '../../../lib/MessageUtil';
import {FlatList} from 'react-native';
import moment from 'moment';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
const MessageScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.user);
  const item = route?.params?.item;
  // console.log('item', item);
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [messages, setMessages] = useState([]);
  console.log('mess', messages);
  const guestData = {
    username: item.username,
    email: item.email,
    image: item.image,
    id: item.id,
  };
  const myUser = {
    username: user?.fullname,
    email: user?.email,
    image: user?.image,
    id: user?.id,
  };
  const imagePick = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const formdata = new FormData();
      formdata.append('image', {
        uri: image.path,
        type: 'image/jpeg',
        name: `image${new Date()}.jpg`,
      });
      postApiWithFormDataWithToken(
        {url: 'upload_Image', token: user.api_token},
        formdata,
      ).then(res => {
        console.log('image', res);
        setImage(res.path);
      });
      // setImage(image.path);
      // setFieldValue('image', image.path);
    });
  };
  useEffect(() => {
    _getMeesages();
    _updateChatCount();
  }, []);

  useEffect(() => {
    _getMeesages();
    _updateChatCount();
  }, []);

  const _chatUsers = () => {
    try {
      database()
        .ref('users/' + user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .set({
          latestMessage: message,
          timestamp: database.ServerValue.TIMESTAMP,
          counter: 0,
          user: guestData,
        });

      database()
        .ref('users/' + guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .once('value', snapshot => {
          const counts = snapshot?.val()?.counter;
          database()
            .ref('users/' + guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
            .child(user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
            .set({
              latestMessage: message,
              timestamp: database.ServerValue.TIMESTAMP,
              counter: counts ? counts + 1 : 1,
              user: myUser,
            });
        });
    } catch (error) {
      console.log('error in crate chat', error);
    }
  };

  const _updateChatCount = async () => {
    try {
      database()
        .ref('users/' + user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))

        .once('value', snapshot => {
          if (snapshot.val() != null) {
            database()
              .ref('users/' + user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
              .child(guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
              .update({
                counter: 0,
              });
          }
        });
    } catch (error) {}
  };

  const _getMeesages = async () => {
    try {
      database()
        .ref('messeges')
        .child(user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .on('value', dataSnapshot => {
          let msgs = [];
          dataSnapshot.forEach(child => {
            console.log('child', child.val().mess);
            msgs.push({
              sendBy: child?.val()?.messege?.sender,
              image: child?.val()?.messege?.image,
              receivedBy: child?.val()?.messege?.reciever,
              msg: child?.val()?.messege?.msg,
              date: child?.val()?.messege?.date,
            });
            return undefined;
          });
          // console.log('msgs', msgs);
          setMessages(msgs.reverse());
        });
    } catch (error) {}
  };

  const handleSend = () => {
    setMessage('');
    setImage('');
    const formdata = new FormData();
    formdata.append('id', guestData.id);
    formdata.append('message', message);
    postApiWithFormDataWithToken(
      {url: 'sendNotify', token: user.api_token},
      formdata,
    ).then(res => {
      console.log('res of notififcation', res);
    });
    senderMsg(
      message,
      image,
      user?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      Date.now(),
    );
    _chatUsers();

    recieverMsg(
      message,
      image,
      user?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      Date.now(),
    );
    _chatUsers();
    //  else if (message) {
    //   senderMsg(
    //     message,
    //     image,
    //     user?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
    //     guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
    //     Date.now(),
    //   );
    //   _chatUsers();

    //   recieverMsg(
    //     message,
    //     image,
    //     user?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
    //     guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
    //     Date.now(),
    //   );
    //   _chatUsers();
    //   // Send_notifi();
    // }
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => console.log('item', item)}
        style={{
          backgroundColor:
            item.sendBy == user?.email.replace(/[^a-zA-Z0-9 ]/g, '')
              ? '#0F8BC2'
              : 'white',
          maxWidth: 250,
          padding: 10,
          borderRadius: 10,
          marginBottom: index == 0 ? 10 : 0,
          marginTop: 10,
          alignSelf:
            item.sendBy == user?.email.replace(/[^a-zA-Z0-9 ]/g, '')
              ? 'flex-end'
              : 'flex-start',
          borderBottomRightRadius:
            item.sendBy == user?.email.replace(/[^a-zA-Z0-9 ]/g, '') ? 0 : 10,
          borderBottomLeftRadius:
            item.sendBy == user?.email.replace(/[^a-zA-Z0-9 ]/g, '') ? 10 : 0,
        }}>
        {item.image && (
          <Image
            source={{uri: item.image}}
            resizeMode="cover"
            style={{height: 100, width: 200}}
          />
        )}
        <Text
          style={{
            color:
              item.sendBy == user?.email.replace(/[^a-zA-Z0-9 ]/g, '')
                ? 'white'
                : 'black',
            fontFamily: 'WorkSans-Regular',
            lineHeight: 25,
          }}>
          {item.msg}
        </Text>
        <View>
          <Text
            style={{
              color:
                item.sendBy == user?.email.replace(/[^a-zA-Z0-9 ]/g, '')
                  ? 'white'
                  : 'black',
              fontSize: 10,
              marginTop: 5,
              fontFamily: 'WorkSans-Regular',
              textAlign: 'right',
            }}>
            {moment(item.date).format('hh:MM a')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={[styles.mainView, {marginTop: Platform.OS == 'ios' ? top : 0}]}>
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Arrowleft name="left" size={20} color={'white'} />
          <Image
            source={
              guestData.image
                ? {uri: guestData.image}
                : require('../../../Assets/Images/girl.jpeg')
            }
            style={{width: 30, height: 30, marginLeft: 10, borderRadius: 20}}
          />
          <Text
            style={{
              fontFamily: 'WorkSans-Medium',
              fontSize: 16,
              color: 'white',
              marginLeft: 10,
            }}>
            {guestData.username}{' '}
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Arrowleft name="search1" size={20} color={'white'} /> */}
          {/* <TouchableOpacity onPress={() => navigation.navigate('QuickOrder')}>
            <Image
              source={require('../../../Assets/Images/order.png')}
              style={{width: 18, marginLeft: 10, height: 18}}
              tintColor={'white'}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <Wrapper behavior="padding" style={{flex: 1}}>
        <View style={{flex: 1, paddingTop: 10, paddingHorizontal: 15}}>
          <FlatList data={messages} inverted renderItem={renderItem} />
        </View>
        <View
          style={{
            // flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'space-between',
            backgroundColor: 'white',
            paddingBottom: 20,
            paddingHorizontal: 15,

            paddingTop: 10,
          }}>
          {image && (
            <View>
              <Image
                source={{uri: image}}
                style={{
                  width: 100,
                  height: 100,
                  marginLeft: 40,
                  marginBottom: 10,
                }}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Arrowleft
              name="camerao"
              onPress={() => imagePick()}
              size={20}
              color={'black'}
            />
            <TextInput
              placeholder="Type Message"
              placeholderTextColor={'grey'}
              style={styles.input}
              value={message}
              onChangeText={text => setMessage(text)}
            />
            <SendIcon
              name="send"
              size={20}
              color={'black'}
              onPress={() => handleSend()}
            />
          </View>
        </View>
      </Wrapper>
    </View>
  );
};

export default MessageScreen;
