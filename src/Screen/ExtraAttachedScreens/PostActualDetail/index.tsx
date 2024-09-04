import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './style';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import HeaderComp from '../../../Component/HeaderComp';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import PopularJobItem from '../../../Component/PopularJobItem';
import FillButton from '../../../Component/FillButton';
import moment from 'moment';
import SendIcon from 'react-native-vector-icons/Feather';
import Videodetail from '../../../Component/Videodetail';
import ImgComp from '../../../Component/ImgComp';
import {useSelector} from 'react-redux';
import {
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
import OnlyImageModal from '../../../Component/ZoomImage';
import CommentLiked from '../../../Component/CommentLiked';
const PostActualDetail = ({navigation, route}) => {
  const item = route?.params.item;
  const id = route?.params?.id;
  const [expendModal, setExpendModal] = useState(false);
  const [indexs, setIndex] = useState(0);
  const [postData, setPostData] = useState({});
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [showonlyImage, setShowOnlyImage] = useState(false);
  const {user} = useSelector(state => state.user);
  const isVideo = (uri: string) => {
    // console.log('uri', uri);
    const videoExtensions = ['.mp4', '.bin', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => uri.endsWith(ext));
  };
  useEffect(() => {
    getApiwithToken({
      url: `postDetail/${id ? id : item.id}`,
      token: user?.api_token,
    }).then(res => {
      console.log('res of post detail api', res);
      setPostData(res.data);
    });
  }, []);
  useEffect(() => {
    const formData = new FormData();
    formData.append('post_id', item.id);
    postApiWithFormDataWithToken(
      {url: 'allComment', token: user?.api_token},
      formData,
    ).then(res => {
      console.log('res of message array', res);
      setMessages(res.data);
    });
  }, [rerender]);
  const handleSend = () => {
    setMessage('');
    const formData = new FormData();
    formData.append('post_id', item.id);
    formData.append('comment', message);
    postApiWithFormDataWithToken(
      {url: 'commentPost', token: user?.api_token},
      formData,
    ).then(res => {
      console.log('res of message', res);
      setRerender(!rerender);
    });
  };
  const hideModal = () => {
    setShowOnlyImage(!showonlyImage);
  };
  const refreshFunc = () => {
    setRerender(!rerender);
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        <CommentLiked item={item} refresh={refreshFunc} postId={item.id} />
      </>
    );
  };
  return (
    <View style={[styles.mainView]}>
      <HeaderComp
        leftIcon={
          <ArrowLeft
            name={'left'}
            size={20}
            onPress={() => navigation.goBack()}
            color={'white'}
          />
        }
        label="Post Detail"
      />
      {/* <Image
        source={
          item?.image
            ? {uri: item?.image}
            : require('../../../Assets/Images/UiUx.png')
        }
        style={{width: '100%', height: heightPercentageToDP(30)}}
      /> */}
      <ScrollView>
        {item ? (
          item?.images[0]?.image ? (
            <View style={{height: 250}}>
              <Swiper
                // autoplay
                loop={false}
                // onIndexChanged={() => setPause(true)}
                // showsPagination={true}
                paginationStyle={{bottom: 0}}
                activeDotColor="#FF4029"
                style={{
                  alignItems: 'center',
                  height: 250,
                  // backgroundColor: 'red',
                  justifyContent: 'center',
                }}
                showsButtons={false}>
                {item.images.map((items, index) => (
                  <View
                    style={{
                      //   height: '100%',
                      //
                      height: 250,
                      // backgroundColor: 'red',
                      width: '100%',
                    }}>
                    <TouchableOpacity activeOpacity={1}>
                      {isVideo(items.image) ? (
                        <>
                          <TouchableOpacity
                            // style={{height: 250, width: '100%'}}
                            onPress={() => {
                              setExpendModal(true);
                              setIndex(index);
                            }}>
                            <Videodetail
                              // onRef={ref => (parentReference = ref)}
                              // parentReference={parentMethod.bind(this)}
                              data={items}
                              // pause={pause}
                              touch={() => {
                                navigation.navigate('VideoMagnifier', {
                                  videoLink: items.image,
                                  poster: items.thumbnil,
                                  summary: items.summary,
                                });
                              }}
                              show={true}
                            />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <TouchableOpacity
                            onPress={() => {
                              setImage(items?.image);
                              setShowOnlyImage(!showonlyImage);
                            }}>
                            <ImgComp items={items} />
                          </TouchableOpacity>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                ))}
              </Swiper>
            </View>
          ) : (
            <View style={{height: 250}}>
              <Image
                source={require('../../../Assets/Images/ExpendedLogo.png')}
                style={{height: '100%', width: '100%'}}
              />
            </View>
          )
        ) : null}

        {/* <ScrollView> */}
        <View
          style={{
            width: '90%',
            flex: 1,
            //   backgroundColor: 'red',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserProfile', {users: item?.user})
            }
            //   onPress={() => navigation.navigate('PostDetail')}
            style={{
              backgroundColor: '#373A43',
              width: '100%',
              // height: 100,
              marginBottom: 20,
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <Image
                source={
                  item?.user?.image
                    ? {uri: item?.user?.image}
                    : require('../../../Assets/Images/girl.jpeg')
                }
                style={{height: 50, borderRadius: 30, width: 50}}
              />
              <View style={{marginLeft: 15, width: '70%'}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'ArialMdm',
                  }}>
                  {`${item?.user?.firstname} ${item?.user?.lastname}`}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    alignItems: 'center',
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{color: 'white', fontFamily: 'ArialCE'}}>
                    {item?.user?.expertise.map(item => (
                      <Text
                        style={{
                          fontSize: 10,
                          marginTop: 5,
                          marginLeft: 15,
                          fontFamily: 'ArialCE',
                          color: 'white',
                        }}>
                        {item}
                      </Text>
                    ))}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              {item?.user?.id != user?.id && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MessageScreen', {item: item?.user})
                  }
                  style={{
                    backgroundColor: '#FFBD00',
                    width: 30,
                    height: 30,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // bottom: 15,
                  }}>
                  <ChatIcon
                    name={'chatbubble-sharp'}
                    size={20}
                    color={'white'}
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>

          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text
                style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
                Post Description :
              </Text>
            </View>
            <Text
              style={{
                color: 'white',
                marginBottom: 20,
                fontSize: 14,
                fontFamily: 'ArialCE',
              }}>
              {item?.description}
            </Text>

            <View style={{flex: 1, paddingTop: 10, paddingHorizontal: 0}}>
              <Text
                style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
                Comments
              </Text>
              <FlatList data={messages} renderItem={renderItem} />
            </View>
          </>
        </View>
        {/* </ScrollView> */}
        <OnlyImageModal
          imgshow={showonlyImage}
          image={image}
          hideModal={hideModal}
        />
      </ScrollView>
      <View
        style={{
          // flexDirection: 'row',
          // alignItems: 'center',
          // justifyContent: 'space-between',
          // backgroundColor: '#787878',
          // paddingBottom: 20,
          borderRadius: 100,
          marginHorizontal: 0,
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
              style={{
                // backgroundColor: 'red',
                // borderWidth: 1,

                // borderColor: '#ccc',
                color: 'white',
                fontFamily: 'WorkSans-Regular',
                borderRadius: 10,
                paddingLeft: 10,
                height: 50,
                width: '85%',
              }}
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
    </View>
  );
};

export default PostActualDetail;
