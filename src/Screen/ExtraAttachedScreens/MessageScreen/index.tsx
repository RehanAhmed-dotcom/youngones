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
// import database from '@react-native-firebase/database';
import styles from './style';
import TrashIcon from 'react-native-vector-icons/Feather';
import ArrowBack from 'react-native-vector-icons/AntDesign';
import ImageCropPicker from 'react-native-image-crop-picker';
import HeaderComp from '../../../Component/HeaderComp';
import database from '@react-native-firebase/database';
import Arrowleft from 'react-native-vector-icons/AntDesign';
import SendIcon from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
// import {recieverMsg, senderMsg} from '../../../lib/MessageUtil';
import {FlatList} from 'react-native';
// import moment from 'moment';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
import {recieverMsg, senderMsg} from '../../../lib/MessageUtil';
import moment from 'moment';
const MessageScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.user);
  const {item} = route.params;
  // console.log('item', item);
  // const [message,setMessage] = useState('');
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [messages, setMessages] = useState([]);
  const guestData = {
    username: `${item.firstname} ${item.lastname}`,
    email: item.email,
    image: item.image,
    id: item.id,
  };
  console.log('guest', guestData);
  const myUser = {
    username: `${user?.firstname} ${user?.lastname}`,
    email: user?.email,
    image: user?.image,
    id: user?.id,
  };
  const deleteMessage = async id => {
    console.log('checking', id);
    database()
      .ref('messeges')
      .child(user.email.replace(/[^a-zA-Z0-9 ]/g, ''))
      .child(guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
      .child(id)
      .remove();
    database()
      .ref('messeges')
      .child(guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
      .child(user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
      .child(id)
      .remove();
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
            console.log('child', child);
            msgs.push({
              sendBy: child?.val()?.messege?.sender,
              image: child?.val()?.messege?.image,
              receivedBy: child?.val()?.messege?.reciever,
              msg: child?.val()?.messege?.msg,
              date: child?.val()?.messege?.date,
              id: child?.val()?.messege?._id,
            });
            return undefined;
          });
          // console.log('msgs', msgs);
          setMessages(msgs.reverse());
        });
    } catch (error) {}
  };
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

  const handleSend = async () => {
    setMessage('');
    const formdata = new FormData();
    formdata.append('userId', guestData.id);
    formdata.append('message', message);
    postApiWithFormDataWithToken(
      {url: 'sendNotify', token: user.api_token},
      formdata,
    ).then(res => {
      console.log('res of notififcation', res);
    });
    // const chatId = database().ref('messeges').push();
    const variabele = await database()
      .ref('messeges/' + user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
      .child(guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))

      .push();
    const childKey = variabele.key;
    senderMsg(
      message,
      // image,
      user?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      Date.now(),
      // chatId,
      childKey,
    );
    _chatUsers();

    recieverMsg(
      message,
      // image,
      user?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      Date.now(),
      // chatId,
      childKey,
    );
    _chatUsers();
  };
  useEffect(() => {
    _getMeesages();
    _updateChatCount();
  }, []);
  const checkUser = (emailCheck: string) => {
    const myEmail = user?.email.replace(/[^a-zA-Z0-9 ]/g, '');

    if (myEmail == emailCheck) {
      return true;
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        <View
          style={{
            alignItems: checkUser(item.sendBy) ? 'flex-end' : 'flex-start',
          }}>
          <Text
            style={{
              color: '#C8C9CC',
              fontSize: 10,
              marginTop: 5,
              fontFamily: 'WorkSans-Regular',
              textAlign: 'right',
            }}>
            {moment(item.date).format('hh:mm a')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: checkUser(item.sendBy) ? 'flex-end' : 'flex-start',
            alignItems: 'center',
          }}>
          {checkUser(item.sendBy) && (
            <TrashIcon
              name="trash"
              size={20}
              color={'white'}
              style={{margin: 10}}
              onPress={() => deleteMessage(item.id)}
            />
          )}

          <TouchableOpacity
            onPress={() => console.log('item', item)}
            style={{
              backgroundColor: checkUser(item.sendBy) ? '#FBBC05' : '#373A43',
              maxWidth: 350,
              // padding: 10,
              paddingVertical: 5,
              borderRadius: 30,
              paddingHorizontal: 20,
              // marginBottom: index == 0 ? 10 : 0,
              marginTop: 10,
              alignSelf: checkUser(item.sendBy) ? 'flex-end' : 'flex-start',
              borderBottomLeftRadius: !checkUser(item.sendBy) ? 0 : 30,
              borderBottomRightRadius: !checkUser(item.sendBy) ? 30 : 0,
            }}>
            {/* {item.image && (
          <Image
            source={{uri: item.image}}
            resizeMode="cover"
            style={{height: 100, width: 200}}
          />
        )} */}
            <Text
              style={{
                color: checkUser(item.sendBy) ? 'black' : 'white',
                fontFamily: 'WorkSans-Regular',
                // lineHeight: 2,
              }}>
              {item.msg}
            </Text>
          </TouchableOpacity>
          {/* {!checkUser(item.sendBy) && (
            <TrashIcon
              name="trash"
              size={20}
              color={'white'}
              style={{margin: 10}}
              onPress={() => deleteMessage(item.id)}
            />
          )} */}
        </View>
      </>
    );
  };
  return (
    <View
      style={[styles.mainView, {marginTop: Platform.OS == 'ios' ? top : 0}]}>
      <Wrapper behavior="padding" style={{flex: 1}}>
        <HeaderComp
          leftIcon={
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ArrowBack
                name="left"
                onPress={() => navigation.goBack()}
                size={20}
                color={'white'}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UserProfile', {users: guestData})
                }
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  alignItems: 'center',
                }}>
                <Image
                  source={
                    guestData.image
                      ? {uri: guestData.image}
                      : require('../../../Assets/Images/girl.jpeg')
                  }
                  style={[
                    styles.image,
                    {width: 40, height: 40, borderRadius: 30},
                  ]}
                />
                <View style={{marginLeft: 10, width: '60%'}}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'ArialMdm',
                      fontSize: 14,
                    }}>
                    {guestData.username}
                  </Text>
                  {/* <Text
                    numberOfLines={1}
                    style={{
                      color: 'white',
                      fontFamily: 'ArialCE',
                      marginTop: 5,
                      fontSize: 14,
                    }}>
                   
                  </Text> */}
                </View>
              </TouchableOpacity>
            </View>
          }
          // label="Chat"
        />
        <View style={{flex: 1, paddingTop: 10, paddingHorizontal: 15}}>
          <FlatList data={messages} inverted renderItem={renderItem} />
        </View>
        <View
          style={{
            // flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'space-between',
            // backgroundColor: '#787878',
            // paddingBottom: 20,
            borderRadius: 100,
            marginHorizontal: 15,
            paddingHorizontal: 5,

            // paddingTop: 10,
            paddingVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: '#404040',
              height: 70,
              width: '100%',
              borderRadius: 50,
              paddingHorizontal: 10,
              paddingRight: 10,
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 40,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#787878',
                width: '100%',
              }}>
              <TextInput
                placeholder="Chat here..."
                placeholderTextColor={'#ADADAD'}
                style={styles.input}
                value={message}
                onChangeText={text => setMessage(text)}
              />
              {message && (
                <TouchableOpacity
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#FFBD00',
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <SendIcon
                    name="send"
                    size={20}
                    color={'white'}
                    onPress={() => handleSend()}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Wrapper>
    </View>
  );
};

export default MessageScreen;
