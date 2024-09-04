import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
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
import ThreeDots from 'react-native-vector-icons/Entypo';
import SendIcon from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {useSelector} from 'react-redux';
import {recieverMsg, senderMsg} from '../../../lib/MessageUtil';
import {FlatList} from 'react-native';
// import moment from 'moment';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
import moment from 'moment';
import FillButton from '../../../Component/FillButton';
import CommentLiked from '../../../Component/CommentLiked';
const Comment = ({navigation, route}) => {
  // const {user} = useSelector(state => state.user);
  const {id} = route.params;
  const textInputRef = useRef(null);
  const handleButtonPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };
  const [replyState, setReplyState] = useState(false);
  const [replyCommnetId, setReplyCommentId] = useState('');
  const [reasonShow, setReasonShow] = useState(false);
  const [reason, setReason] = useState('');
  const [commentId, setCommentId] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState('');
  // console.log('commentid', id);
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
  const handleIdChange = (id: string) => {
    setReplyCommentId(id);
  };
  const replyStateChange = () => {
    setReplyState(true);
  };
  console.log('reply', replyState, replyCommnetId);
  const reportReason = () => {
    setReasonShow(false);
    const formdata = new FormData();
    formdata.append('post_id', item?.id);
    formdata.append('reason', reason);
    postApiWithFormDataWithToken(
      {url: 'reportPost', token: user?.api_token},
      formdata,
    ).then(res => {
      console.log('res of report ppost', res);
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
            <Text style={{color: 'white'}}>Reason</Text>
            <TouchableOpacity onPress={() => setReasonShow(false)}>
              <ThreeDots name="circle-with-cross" size={20} />
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
  const handleReply = () => {
    setMessage('');
    const formData = new FormData();
    formData.append('comment_id', replyCommnetId);
    formData.append('reply', message);

    postApiWithFormDataWithToken(
      {url: 'replyComment', token: user?.api_token},
      formData,
    ).then(res => {
      console.log('res of message', res);
      setRerender(!rerender);
      setReplyCommentId('');
      setReplyState(false);
    });
  };
  const refreshFunc = () => {
    setRerender(!rerender);
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
        <CommentLiked
          item={item}
          refresh={refreshFunc}
          postId={id}
          focus={handleButtonPress}
          reply={replyStateChange}
          onIdChange={handleIdChange}
        />
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
                ref={textInputRef}
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
                    onPress={() => (replyState ? handleReply() : handleSend())}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Wrapper>
      {myModal3()}
    </View>
  );
};

export default Comment;
