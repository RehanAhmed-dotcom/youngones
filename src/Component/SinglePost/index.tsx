import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
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
import {postApiWithFormDataWithToken} from '../../lib/Apis/api';
import {useSelector} from 'react-redux';
import Share from 'react-native-share';
import ThreeDots from 'react-native-vector-icons/Entypo';
import OnlyImageModal from '../ZoomImage';
import FillButton from '../FillButton';
// import {Animated} from 'react-native';
const SinglePost = ({item, refresh, scale, navigation, extended}) => {
  const [liked, setLiked] = useState(item.is_like);
  const [showonlyImage, setShowOnlyImage] = useState(false);
  const [mainImage, setImage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [myOption, setMyOption] = useState(false);
  const [reasonShow, setReasonShow] = useState(false);
  const [reason, setReason] = useState('');
  const hideModal = () => {
    setShowOnlyImage(!showonlyImage);
  };

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
      if (res.status == 'success') {
        Alert.alert('Success', 'Report posted to admin');
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
  const {user} = useSelector(state => state.user);
  const isVideo = (uri: string) => {
    // console.log('uri', uri);
    const videoExtensions = ['.mp4', '.bin', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => uri.endsWith(ext));
  };
  const renderItem = ({item}) => (
    <View
      // onPress={() => console.log('check', isVideo(item.image))}
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        height: 150,
        width: '100%',
        marginTop: 10,
        // backgroundColor: 'red',
      }}>
      {isVideo(item.image) ? (
        <Image
          source={require('../../Assets/Images/Thumb.png')}
          resizeMode="cover"
          style={{height: 150, width: widthPercentageToDP(70)}}
        />
      ) : (
        <Image
          source={{uri: item.image}}
          style={{height: 150, width: widthPercentageToDP(80)}}
        />
      )}
      {/* <Image
        source={
          !isVideo(item.image)
            ? {uri: item.image}
            : require('../../Assets/Images/Thumb.png')
        }
        style={{height: 150, width: '100%'}}
      /> */}
    </View>
  );
  const likeApi = (name: string) => {
    const form = new FormData();
    form.append('post_id', item.id);
    form.append('name', name);
    postApiWithFormDataWithToken(
      {url: 'likePost', token: user?.api_token},
      form,
    ).then(res => {
      console.log('res of  like api', res);
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setShowEmoji(false)}
      style={{
        width: widthPercentageToDP(extended ? 90 : 80),
        // height: heightPercentageToDP(30),
        borderRadius: 10,
        // paddingTop: 20,
        paddingHorizontal: 15,
        // transform: [{scale}],
        // paddingVertical: 20,
        height:
          item?.images[0]?.image && item.user_commented
            ? 370
            : item.user_liked && item?.images[0]?.image
            ? 370
            : item?.images[0]?.image
            ? 330
            : 180,
        marginRight: extended ? 0 : 20,
        marginBottom: extended ? 20 : 0,
        backgroundColor: '#373A43',
      }}>
      {item.user_liked ? (
        <View
          style={{
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginTop: 10,
            borderBottomColor: 'white',
          }}>
          <Text
            style={{
              fontSize: 12,
              marginTop: 5,
              // zIndex: -10,
              // marginLeft: 15,
              fontFamily: 'ArialCE',
              color: 'white',
            }}>
            <Text
              style={{
                fontSize: 16,
                marginTop: 5,
                // zIndex: -10,
                // marginLeft: 15,
                fontFamily: 'ArialMdm',
                color: 'white',
              }}>
              {' '}
              {`${item.user.firstname} ${item.user.lastname} `}
            </Text>
            liked this
          </Text>
        </View>
      ) : item.user_commented ? (
        <View
          style={{
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginTop: 10,
            borderBottomColor: 'white',
          }}>
          <Text
            style={{
              fontSize: 12,
              marginTop: 5,
              // zIndex: -10,
              // marginLeft: 15,
              fontFamily: 'ArialCE',
              color: 'white',
            }}>
            <Text
              style={{
                fontSize: 14,
                marginTop: 5,
                // zIndex: -10,
                // marginLeft: 15,
                fontFamily: 'ArialMdm',
                color: 'white',
              }}>
              {' '}
              {`${item.user.firstname} ${item.user.lastname} `}
            </Text>
            commented on this
          </Text>
        </View>
      ) : null}

      <TouchableOpacity
        // onPress={() => console.log('item', item?.user)}
        onPress={() => {
          // console.log('ite,', item);
          setShowEmoji(false);
          navigation.navigate('UserProfile', {users: item?.user});
        }}
        style={{
          flexDirection: 'row',
          zIndex: -10,
          marginTop: 15,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            // console.log('item', item);
            setShowEmoji(false);
            setImage(item?.user?.image);
            setShowOnlyImage(!showonlyImage);
          }}>
          <Image
            source={
              item?.user?.image
                ? {uri: item?.user?.image}
                : require('../../Assets/Images/girl.jpeg')
            }
            style={{height: 50, borderRadius: 50, width: 50}}
          />
        </TouchableOpacity>
        <View>
          <View
            style={{
              marginLeft: 15,
              // backgroundColor: 'red',
              width: '85%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{fontSize: 14, fontFamily: 'ArialMdm', color: 'white'}}>
                {item?.user?.firstname} {item?.user?.lastname}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: 'transparent',
                width: 30,
                height: 30,
                alignItems: 'flex-end',
                // bottom: 20,
                justifyContent: 'center',
              }}
              onPress={() => {
                setShowEmoji(false);
                setMyOption(!myOption);
              }}>
              <ThreeDots name="dots-three-vertical" color="white" size={20} />
              {myOption && (
                <>
                  <View
                    style={{
                      position: 'absolute',
                      width: 120,
                      flex: 1,
                      height: 30,

                      zIndex: 100,
                      // alignItems: 'center',
                      backgroundColor: 'transparent',
                      bottom: -30,
                      right: 10,
                    }}>
                    {Platform.OS == 'android' ? (
                      <>
                        <TouchableHighlight
                          style={{
                            backgroundColor: 'white',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            borderRadius: 5,
                            paddingLeft: 10,
                            borderBottomColor: 'black',
                            // borderBottomWidth: 1,
                          }}
                          onPress={() => {
                            setMyOption(false);
                            setShowEmoji(false);
                            item?.user_id == user?.id
                              ? Alert.alert(
                                  'Delete Post',
                                  'Are you sure you want to delete your post?',
                                  [
                                    {
                                      text: 'Cancel',
                                      onPress: () =>
                                        console.log('Cancel Pressed'),
                                      style: 'cancel',
                                    },
                                    {
                                      text: 'OK',
                                      onPress: () => {
                                        const formdata = new FormData();
                                        formdata.append('post_id', item?.id);
                                        // formdata.append('reason', reason);
                                        postApiWithFormDataWithToken(
                                          {
                                            url: 'deletePost',
                                            token: user?.api_token,
                                          },
                                          formdata,
                                        ).then(res => {
                                          console.log(
                                            'res of delete ppost',
                                            res,
                                          );
                                          if (res.status == 'success') {
                                            refresh();
                                          }
                                        });
                                      },
                                    },
                                  ],
                                )
                              : setReasonShow(true);
                          }}
                          // onPress={() => {
                          //   setMyOption(!myOption);
                          //   item.user_id == userData.user.id
                          //     ? Alert.alert(
                          //         i18n.language === 'en'
                          //           ? 'Delete'
                          //           : i18n.language === 'fr'
                          //           ? 'supprimer'
                          //           : i18n.language === 'zh'
                          //           ? '删除'
                          //           : i18n.language == 'pt'
                          //           ? 'Excluir'
                          //           : i18n.language == 'ja'
                          //           ? '消去'
                          //           : i18n.language === 'de'
                          //           ? 'Löschen'
                          //           : 'Borrar',
                          //         i18n.language === 'en'
                          //           ? 'Are you sure to delete this post?'
                          //           : i18n.language === 'fr'
                          //           ? 'Êtes-vous sûr de supprimer ce message ?'
                          //           : i18n.language === 'zh'
                          //           ? '您确定删除此帖子吗？'
                          //           : i18n.language == 'pt'
                          //           ? 'Tem certeza de que deseja excluir esta postagem?'
                          //           : i18n.language == 'ja'
                          //           ? 'この投稿を削除してもよろしいですか?'
                          //           : i18n.language === 'de'
                          //           ? 'Möchten Sie diesen Beitrag wirklich löschen?'
                          //           : '¿Estás seguro de eliminar esta publicación?',
                          //         [
                          //           {
                          //             text:
                          //               i18n.language === 'en'
                          //                 ? 'Cancel'
                          //                 : i18n.language === 'fr'
                          //                 ? 'Annuler'
                          //                 : i18n.language === 'zh'
                          //                 ? '取消'
                          //                 : i18n.language == 'pt'
                          //                 ? 'Cancelar'
                          //                 : i18n.language == 'ja'
                          //                 ? 'キャンセル'
                          //                 : i18n.language === 'de'
                          //                 ? 'Stornieren'
                          //                 : 'Cancelar',
                          //             onPress: () =>
                          //               console.log('Cancel Pressed'),
                          //             style: 'cancel',
                          //           },
                          //           {
                          //             text: 'OK',
                          //             onPress: () => {
                          //               deletePost({
                          //                 Auth: userData.token,
                          //                 id: item.id,
                          //               }).then(res => {
                          //                 console.log('res', res);
                          //                 toggle()(dispatch);
                          //               });
                          //             },
                          //           },
                          //         ],
                          //       )
                          //     : setReasonShow(true);
                          // }}

                          // onPress={() => console.log('id,', item.user_id)}
                        >
                          <Text style={{color: 'black'}}>
                            {item?.user_id == user?.id
                              ? 'Delete Post'
                              : 'Report Post'}
                          </Text>
                        </TouchableHighlight>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#FF4029',
                          width: '100%',
                          height: '100%',
                          justifyContent: 'center',
                          paddingLeft: 10,
                          borderBottomColor: 'black',
                          borderBottomWidth: 1,
                        }}
                        // onPress={() => {
                        //   setMyOption(!myOption);
                        //   item.user_id == userData.user.id
                        //     ? Alert.alert(
                        //         i18n.language === 'en'
                        //           ? 'Delete'
                        //           : i18n.language === 'fr'
                        //           ? 'Supprimer'
                        //           : i18n.language === 'zh'
                        //           ? '删除'
                        //           : i18n.language === 'pt'
                        //           ? 'Excluir'
                        //           : i18n.language === 'ja'
                        //           ? '消去'
                        //           : i18n.language === 'de'
                        //           ? 'Löschen'
                        //           : 'Borrar',
                        //         i18n.language === 'en'
                        //           ? 'Are you sure to delete this post?'
                        //           : i18n.language === 'pt'
                        //           ? 'Tem certeza de que deseja excluir esta postagem?'
                        //           : i18n.language === 'ja'
                        //           ? 'この投稿を削除してもよろしいですか?'
                        //           : i18n.language === 'fr'
                        //           ? 'Êtes-vous sûr de supprimer ce message ?'
                        //           : i18n.language === 'zh'
                        //           ? '您确定删除此帖子吗？'
                        //           : i18n.language === 'de'
                        //           ? 'Möchten Sie diesen Beitrag wirklich löschen?'
                        //           : '¿Estás seguro de eliminar esta publicación?',
                        //         [
                        //           {
                        //             text:
                        //               i18n.language === 'en'
                        //                 ? 'Cancel'
                        //                 : i18n.language === 'fr'
                        //                 ? 'Annuler'
                        //                 : i18n.language === 'pt'
                        //                 ? 'Cancelar'
                        //                 : i18n.language === 'ja'
                        //                 ? 'キャンセル'
                        //                 : i18n.language === 'zh'
                        //                 ? '取消'
                        //                 : i18n.language === 'de'
                        //                 ? 'Stornieren'
                        //                 : 'Cancelar',
                        //             onPress: () => console.log('Cancel Pressed'),
                        //             style: 'cancel',
                        //           },
                        //           {
                        //             text: 'OK',
                        //             onPress: () => {
                        //               deletePost({
                        //                 Auth: userData.token,
                        //                 id: item.id,
                        //               }).then(res => {
                        //                 console.log('res', res);
                        //                 toggle()(dispatch);
                        //               });
                        //             },
                        //           },
                        //         ],
                        //       )
                        //     : setReasonShow(true);
                        // }}

                        // onPress={() => console.log('id,', item.user_id)}
                      >
                        <Text style={{color: 'white'}}>
                          {item?.user_id == user?.id ? 'Delete' : 'Report'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {/* <View
                    style={{
                      position: 'absolute',
                      width: 120,
                      flex: 1,
                      height: 30,
                      zIndex: 100,

                      // alignItems: 'center',
                      backgroundColor: 'transparent',
                      bottom: 0,
                      right: 20,
                      top: 30,
                    }}>
                    {Platform.OS == 'android' ? (
                      <>
                        <TouchableHighlight
                          style={{
                            backgroundColor: '#FF4029',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            paddingLeft: 10,
                          }}
                          onPress={() => console.log('firing')}
                          // onPress={() => {
                          //   console.log('hellowi');
                          //   setMyOption(!myOption);
                          //   setTimeout(() => {
                          //     setShowUserArray(true);
                          //   }, 1000);
                          // }}

                          // onPress={() => console.log('id,', item.user_id)}
                        >
                          <Text style={{color: 'white'}}>Share Post</Text>
                        </TouchableHighlight>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#FF4029',
                          width: '100%',
                          height: '100%',
                          justifyContent: 'center',
                          paddingLeft: 10,
                        }}
                        // onPress={() => {
                        //   console.log('hellowi');
                        //   setMyOption(!myOption);
                        //   setTimeout(() => {
                        //     setShowUserArray(true);
                        //   }, 1000);
                        // }}

                        // onPress={() => console.log('id,', item.user_id)}
                      >
                        <Text style={{color: 'white'}}>Share Post</Text>
                      </TouchableOpacity>
                    )}
                  </View> */}
                </>
              )}
            </TouchableOpacity>
            {/* <Text style={{fontSize: 9, color: 'white', marginTop: 0}}>
              {moment(item.created_at).fromNow()}
            </Text> */}
          </View>
          <Text
            style={{
              fontSize: 10,
              marginTop: 5,
              zIndex: -10,
              marginLeft: 15,
              fontFamily: 'ArialCE',
              color: 'white',
            }}>
            {item?.user?.expertise[0]}
          </Text>
        </View>
        {/* <Text
          style={{
            fontSize: 10,
            marginTop: 5,
            fontFamily: 'ArialCE',
            color: 'white',
          }}>
          {item?.user?.expertise[0]}
        </Text> */}
      </TouchableOpacity>

      <Text
        style={{color: 'white', marginTop: 10, fontFamily: 'ArialCE'}}
        numberOfLines={1}>
        {item.description}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setShowEmoji(false);
          navigation.navigate('PostActualDetail', {item});
        }}>
        {item?.images ? (
          <View
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              height: item?.images[0]?.image ? 150 : 0,
              width: '100%',
              marginTop: 10,
              // backgroundColor: 'red',
            }}>
            <FlatList
              data={item?.images}
              horizontal
              nestedScrollEnabled
              renderItem={renderItem}
            />
          </View>
        ) : null}
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          paddingBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: 'white',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.likeImage && (
            <Image
              style={{width: 20, top: 3, height: 20}}
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
              color: 'white',
              fontFamily: 'ArialCE',
              marginTop: 10,
              marginLeft: item.likeImage ? 5 : 0,
              fontSize: 12,
            }}>
            {item.likes} Likes
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setShowEmoji(false);
            navigation.navigate('Comment', {id: item.id});
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'ArialCE',
              marginTop: 10,
              fontSize: 12,
            }}>
            {item.comments} Comments
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        {showEmoji && (
          <View
            style={{
              position: 'absolute',
              zIndex: 100,
              height: 60,
              width: '100%',
              borderRadius: 40,
              flexDirection: 'row',
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'black',
              bottom: 20,
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
                style={{width: '100%', borderRadius: 50, height: '100%'}}
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
                style={{width: '100%', borderRadius: 50, height: '100%'}}
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
                style={{width: '100%', borderRadius: 50, height: '100%'}}
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
                style={{width: '100%', borderRadius: 50, height: '100%'}}
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
                style={{width: '100%', borderRadius: 50, height: '100%'}}
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
                style={{width: '100%', borderRadius: 50, height: '100%'}}
              />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={{width: '20%'}}
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
        </TouchableOpacity>
        <TouchableOpacity
          // style={{width: '25%'}}
          onPress={() => {
            setShowEmoji(false);
            navigation.navigate('Comment', {id: item.id});
          }}>
          <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%'}}
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
              color: 'white',
              alignSelf: 'flex-end',
              fontFamily: 'ArialMdm',
            }}>
            Share
          </Text>
        </TouchableOpacity>
      </View>
      <OnlyImageModal
        imgshow={showonlyImage}
        image={mainImage}
        hideModal={hideModal}
      />
      {myModal3()}
    </TouchableOpacity>
  );
};

export default SinglePost;
