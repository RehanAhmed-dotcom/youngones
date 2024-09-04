import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Animated,
  FlatList,
  Image,
  Keyboard,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import {postApiWithFormDataWithToken} from '../../lib/Apis/api';
import {useSelector} from 'react-redux';
import Share from 'react-native-share';
import ThreeDots from 'react-native-vector-icons/Entypo';
import OnlyImageModal from '../ZoomImage';
import FillButton from '../FillButton';
// import {Animated} from 'react-native';
const CommentLiked = ({item, refresh, postId, focus, reply, onIdChange}) => {
  const [liked, setLiked] = useState(item.is_like);
  const [showonlyImage, setShowOnlyImage] = useState(false);
  const [mainImage, setImage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [myOption, setMyOption] = useState(false);
  const [reasonShow, setReasonShow] = useState(false);
  const [reason, setReason] = useState('');
  const [showReplys, setShowReplys] = useState(false);
  const hideModal = () => {
    setShowOnlyImage(!showonlyImage);
  };

  const [keyboardStatus, setKeyboardStatus] = useState('');
  const sendIdToParent = () => {
    onIdChange(item.id);
  };
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
  const reportReason = () => {
    setReasonShow(false);
    setReason('');
    const formdata = new FormData();
    formdata.append('post_id', postId);
    formdata.append('comment_id', item.id);
    formdata.append('reason', reason);
    postApiWithFormDataWithToken(
      {url: 'reportComment', token: user?.api_token},
      formdata,
    ).then(res => {
      if (res.status == 'success') {
        Alert.alert('Success', 'Report posted to admin');
      }
      console.log('res of report ppost', res);
    });
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setShowEmoji(false)}
      style={{
        // backgroundColor: '#373A43',
        maxWidth: 350,
        // padding: 10,
        zIndex: -10,
        // paddingVertical: 5,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        paddingTop: 10,
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
            : require('../../Assets/Images/girl.jpeg')
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
          {item.reply}
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
  );
  const {user} = useSelector(state => state.user);

  const likeApi = (name: string) => {
    const form = new FormData();
    form.append('post_id', postId);
    form.append('comment_id', item.id);
    form.append('name', name);
    postApiWithFormDataWithToken(
      {url: 'likeComment', token: user?.api_token},
      form,
    ).then(res => {
      console.log('res of  like api', res);
    });
  };
  const deleteComment = () => {
    const form = new FormData();
    // form.append('post_id', postId);
    form.append('comment_id', item.id);
    postApiWithFormDataWithToken(
      {url: 'deleteComment', token: user?.api_token},
      form,
    ).then(res => {
      console.log('res of  delete  api', res);
      if (res.status == 'success') {
        refresh();
      }
    });
  };
  return (
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
                onPress={
                  () =>
                    // deleteConversation(item.key, item.user.Number)
                    deleteComment()
                  // console.log('heelo')
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
          activeOpacity={1}
          onPress={() => setShowEmoji(false)}
          style={{
            // backgroundColor: '#373A43',
            maxWidth: 350,
            // padding: 10,
            zIndex: -10,
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
                : require('../../Assets/Images/girl.jpeg')
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setShowEmoji(false)}
                style={
                  {
                    // width: widthPercentageToDP(extended ? 90 : 80),
                    // height: heightPercentageToDP(30),
                    // borderRadius: 10,
                    // paddingTop: 20,
                    // paddingHorizontal: 15,
                    // transform: [{scale}],
                    // paddingVertical: 20,
                  }
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    // marginBottom: 20,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginLeft: 10,
                    marginTop: 10,
                  }}>
                  {showEmoji && (
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 100,
                        height: 60,
                        width: widthPercentageToDP(75),
                        borderRadius: 40,
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'black',

                        bottom: 0,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setShowEmoji(!showEmoji);
                          setLiked(true);
                          likeApi('like');
                          refresh();
                        }}
                        style={{height: 40, width: 40}}>
                        <Image
                          source={require('../../Assets/Images/like.png')}
                          style={{
                            width: '100%',
                            borderRadius: 50,
                            height: '100%',
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setShowEmoji(!showEmoji);
                          setLiked(true);
                          likeApi('celebrate');
                          refresh();
                        }}
                        style={{height: 40, width: 40}}>
                        <Image
                          source={require('../../Assets/Images/Clap.png')}
                          style={{
                            width: '100%',
                            borderRadius: 50,
                            height: '100%',
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setShowEmoji(!showEmoji);
                          setLiked(true);
                          likeApi('support');
                          refresh();
                        }}
                        style={{height: 40, width: 40}}>
                        <Image
                          source={require('../../Assets/Images/GiveHeart.png')}
                          style={{
                            width: '100%',
                            borderRadius: 50,
                            height: '100%',
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setShowEmoji(!showEmoji);
                          setLiked(true);
                          likeApi('love');
                          refresh();
                        }}
                        style={{height: 40, width: 40}}>
                        <Image
                          source={require('../../Assets/Images/heart.png')}
                          style={{
                            width: '100%',
                            borderRadius: 50,
                            height: '100%',
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setShowEmoji(!showEmoji);
                          setLiked(true);
                          likeApi('Insight');
                          refresh();
                        }}
                        style={{height: 40, width: 40}}>
                        <Image
                          source={require('../../Assets/Images/Light.png')}
                          style={{
                            width: '100%',
                            borderRadius: 50,
                            height: '100%',
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setShowEmoji(!showEmoji);
                          setLiked(true);
                          likeApi('funny');
                          refresh();
                        }}
                        style={{height: 40, width: 40}}>
                        <Image
                          source={require('../../Assets/Images/Laugh.png')}
                          style={{
                            width: '100%',
                            borderRadius: 50,
                            height: '100%',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  )}

                  <TouchableOpacity
                    onLongPress={() => {
                      setShowEmoji(!showEmoji);
                    }}
                    onPress={() => {
                      setLiked(!liked);
                      setShowEmoji(false);
                      !showEmoji && likeApi('like');
                      refresh();
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {item.likeImage && (
                        <Image
                          style={{width: 20, top: 0, height: 20}}
                          source={
                            item.likeImage == 'like'
                              ? require('../../Assets/Images/like.png')
                              : item.likeImage == 'celebrate'
                              ? require('../../Assets/Images/Clap.png')
                              : item.likeImage == 'support'
                              ? require('../../Assets/Images/GiveHeart.png')
                              : item.likeImage == 'love'
                              ? require('../../Assets/Images/heart.png')
                              : item.likeImage == 'Insight'
                              ? require('../../Assets/Images/Light.png')
                              : item.likeImage == 'funny'
                              ? require('../../Assets/Images/Laugh.png')
                              : null
                          }
                        />
                      )}

                      <Text
                        style={{
                          color: item.is_like ? '#FFBD00' : 'white',
                          fontFamily: 'ArialCE',
                          marginTop: 0,
                          marginLeft: item.likeImage ? 5 : 0,
                          fontSize: 12,
                        }}>
                        {item.likes} Likes
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                // style={{width: '20%'}}
                onLongPress={() => {
                  setShowEmoji(!showEmoji);
                }}
                onPress={() => {
                  setLiked(!liked);
                  setShowEmoji(false);
                  !showEmoji && likeApi('like');
                  refresh();
                }}>
                <Text
                  style={{
                    color: item.is_like ? '#FFBD00' : 'white',
                    fontFamily: 'ArialMdm',
                  }}>
                  Like
                </Text>
              </TouchableOpacity> */}
                </View>
              </TouchableOpacity>
              {!showEmoji && (
                <TouchableOpacity
                  onPress={() => {
                    focus();
                    reply();
                    sendIdToParent();
                    //   setCommentId(item.id);
                  }}>
                  <Text
                    style={{
                      color: '#ccc',
                      zIndex: -10,
                      fontSize: 12,
                      marginTop: 10,

                      marginLeft: 20,
                    }}>
                    Reply
                  </Text>
                </TouchableOpacity>
              )}
              {!showEmoji && (
                <TouchableOpacity
                  onPress={() => {
                    setReasonShow(!reasonShow);
                    //   setCommentId(item.id);
                  }}>
                  <Text
                    style={{
                      color: '#ccc',
                      zIndex: -10,
                      fontSize: 12,
                      marginTop: 10,

                      marginLeft: 20,
                    }}>
                    Report
                  </Text>
                </TouchableOpacity>
              )}
              {!showEmoji && (
                <TouchableOpacity
                  onPress={() => {
                    setShowEmoji(false);
                    const shareOptions = {
                      title: `${item.title}`,
                      message: `${item.description}`,
                      url: 'https://example.com',
                    };
                    Share.open(shareOptions)
                      .then(res => {
                        console.log(res);
                      })
                      .catch(err => {
                        err && console.log(err);
                      });
                  }}>
                  <Text
                    style={{
                      color: '#ccc',
                      zIndex: -10,
                      fontSize: 12,
                      marginTop: 10,

                      marginLeft: 20,
                    }}>
                    Share
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View>
              {!showReplys ? (
                <TouchableOpacity onPress={() => setShowReplys(true)}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'ArialCN',
                      fontSize: 12,
                      marginTop: 10,
                      marginLeft: 10,
                    }}>
                    View Replies
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{marginTop: 10}}>
                  <FlatList data={item.replies} renderItem={renderItem} />
                </View>
              )}
            </View>
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
          {myModal3()}
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default CommentLiked;
