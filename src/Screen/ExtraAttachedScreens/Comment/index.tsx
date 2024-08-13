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
import ArrowBack from 'react-native-vector-icons/AntDesign';
import ImageCropPicker from 'react-native-image-crop-picker';
import HeaderComp from '../../../Component/HeaderComp';
import Arrowleft from 'react-native-vector-icons/AntDesign';
import SendIcon from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {useSelector} from 'react-redux';
import {recieverMsg, senderMsg} from '../../../lib/MessageUtil';
import {FlatList} from 'react-native';
// import moment from 'moment';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
import moment from 'moment';
const Comment = ({navigation, route}) => {
  // const {user} = useSelector(state => state.user);
  const {id} = route.params;
  // console.log('item', item);
  // const [message,setMessage] = useState('');
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const {user} = useSelector(state => state.user);
  const [rerender, setRerender] = useState(false);
  const [messages, setMessages] = useState([]);
  //   console.log('mess', messages);
  const handleSend = () => {
    setMessage('');
    const formData = new FormData();
    formData.append('post_id', id);
    formData.append('comment', message);
    postApiWithFormDataWithToken(
      {url: 'commentPost', token: user?.api_token},
      formData,
    ).then(res => {
      console.log('res of message', res);
      setRerender(!rerender);
    });
  };
  useEffect(() => {
    const formData = new FormData();
    formData.append('post_id', id);
    postApiWithFormDataWithToken(
      {url: 'allComment', token: user?.api_token},
      formData,
    ).then(res => {
      console.log('res of message array', res);
      setMessages(res.data);
    });
  }, [rerender]);
  const renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => console.log('item', item)}
          style={{
            // backgroundColor: '#373A43',
            maxWidth: 350,
            // padding: 10,
            // paddingVertical: 5,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 10,
            // borderRadius: 30,
            // paddingHorizontal: 10,
            // marginBottom: index == 0 ? 10 : 0,
            marginTop: 10,
            width: '100%',
            borderRadius: 10,
            alignSelf: 'flex-start',
            // borderTopLeftRadius: 30,
            flexDirection: 'row',
            // alignItems: 'center',
            // borderBottomRightRadius: 30,
          }}>
          <Image
            source={
              item?.user?.image
                ? {uri: item?.user?.image}
                : require('../../../Assets/Images/girl.jpeg')
            }
            style={{height: 50, width: 50, borderRadius: 40}}
          />
          <View style={{width: '85%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  marginLeft: 10,
                  color: 'white',
                  fontFamily: 'ArialMdm',
                  fontSize: 16,
                }}>
                {`${item?.user?.firstname} ${item?.user?.lastname}`}
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  color: 'white',
                  fontFamily: 'ArialMdm',
                  fontSize: 12,
                }}>
                {`${moment(item.created_at).fromNow()}`}
              </Text>
            </View>

            <Text
              style={{
                marginLeft: 10,
                color: 'white',
                fontFamily: 'ArialCN',
                fontSize: 12,
              }}>
              {item.comment}
            </Text>
          </View>
          {/* {item.image && (
          <Image
            source={{uri: item.image}}
            resizeMode="cover"
            style={{height: 100, width: 200}}
          />
        )} */}
          {/* <Text
            style={{
              color: item == 1 ? 'black' : 'white',
              fontFamily: 'WorkSans-Regular',
              lineHeight: 25,
            }}>
            Hey! How have you been?
          </Text> */}
        </TouchableOpacity>
        {/* <View style={{alignItems: 'flex-start'}}>
          <Text
            style={{
              color: '#C8C9CC',
              fontSize: 10,
              marginTop: 10,
              fontFamily: 'WorkSans-Regular',
              textAlign: 'right',
            }}>
            12:30 Am
          </Text>
        </View> */}
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
            </View>
          }
          mid={'Comments'}
          // label="Chat"
        />
        <View style={{flex: 1, paddingTop: 10, paddingHorizontal: 15}}>
          <FlatList data={messages} renderItem={renderItem} />
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
                placeholder="Comment here..."
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

export default Comment;
