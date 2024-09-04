import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import HeaderComp from '../../../Component/HeaderComp';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import CrossIcon from 'react-native-vector-icons/Entypo';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import PopularJobItem from '../../../Component/PopularJobItem';
import FillButton from '../../../Component/FillButton';
import InvoiceItems from '../../../Component/InvoiceItems';
import moment from 'moment';
import {
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
import Loader from '../../../Component/Loader';
import RNFetchBlob from 'rn-fetch-blob';
const PostDetailHours = ({navigation, route}) => {
  const {item} = route.params;
  const {user} = useSelector(state => state.user);
  // console.log('item', item);
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [weeklyData, setWeeklydata] = useState([]);
  const [showModal1, setShowModal1] = useState(false);
  const [showloader, setShowLoader] = useState(false);
  const [total, setTotal] = useState(0);
  const [contract, setContract] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const ShowInvoice = () => (
    <Modal
      animationType="slide"
      onRequestClose={() => setShowModal(!showModal)}
      transparent={true}
      visible={showModal}>
      <View
        style={{
          flex: 1,
          // height: hp(100),
          backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'center',

          zIndex: 200,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          // position: 'absolute',
        }}>
        <View>
          <View
            style={{
              width: widthPercentageToDP(90),
              // height: 300,
              // backgroundColor: 'red',
            }}>
            <View style={{alignItems: 'flex-end'}}>
              <CrossIcon
                name="cross"
                color={'white'}
                onPress={() => setShowModal(!showModal)}
                size={20}
              />
            </View>
            <View
              style={{
                marginTop: 30,
                width: widthPercentageToDP(90),
                // height: 20,
                borderRadius: 15,
                backgroundColor: '#373A43',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingTop: 20,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontFamily: 'Arial-Bold',
                    }}>
                    Job Invoice
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'ArialMdm',
                    }}>
                    UI/UX Designer
                  </Text>
                </View>
                <Icon name="briefcase-outline" size={30} color={'white'} />
              </View>
              <Image
                source={require('../../../Assets/Images/ExpendedLogo.png')}
                style={{height: 200, width: '100%', marginTop: 20}}
              />
              <View style={{backgroundColor: '#2D2D35', width: '100%'}}>
                <InvoiceItems
                  first={'Username'}
                  second={'John Travolta'}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Phone Number'}
                  second={'0333-XXXXXXX'}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Date'}
                  second={'24, Feburary, 2020'}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Working Hours'}
                  second={'3-5 hrs'}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Invoice ID'}
                  second={'IV93592'}
                  showBorder={true}
                />
                <InvoiceItems first={'Tax Fee'} second={'$100'} />
                <InvoiceItems first={'Servie Fee'} second={'$20'} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingTop: 20,
                  paddingBottom: 20,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Arial-Bold',
                  }}>
                  SubTotal
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Arial-Bold',
                  }}>
                  $120
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
  const FilterModal = () => (
    <Modal
      animationType="slide"
      onRequestClose={() => setShowModal1(!showModal1)}
      transparent={true}
      visible={showModal1}>
      <View
        style={{
          flex: 1,
          // height: hp(100),
          backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'flex-end',

          zIndex: 200,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          // position: 'absolute',
        }}>
        {/* <ScrollView
          nestedScrollEnabled
          contentContainerStyle={{
            paddingVertical: 20,
            alignItems: 'center',
          }}> */}
        <View
          style={{
            backgroundColor: '#2D2D35',
            width: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: heightPercentageToDP(90),
          }}>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                fontSize: 18,
                fontFamily: 'Arial-Bold',
                marginTop: 20,
              }}>
              Work Submission
            </Text>
            <Image
              resizeMode="contain"
              source={require('../../../Assets/Images/illustration.png')}
              style={{width: '100%', height: 250, marginTop: 40}}
            />
            <TouchableOpacity
              onPress={async () => {
                try {
                  const pickerResult = await DocumentPicker.pickSingle({
                    presentationStyle: 'fullScreen',
                    copyTo: 'cachesDirectory',
                  });
                  // setDocument(pickerResult);
                  console.log('pickerResult', pickerResult);
                  // setImages;
                } catch (e) {
                  console.log('error', e);
                }
              }}
              style={{
                backgroundColor: '#373A43',
                marginTop: 40,
                height: 150,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#9D97B5',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                tintColor={'#FFBD00'}
                source={require('../../../Assets/Images/upload.png')}
                style={{height: 50, tintColor: 'white', width: 50}}
              />
              <Text
                style={{color: 'white', fontFamily: 'ArialMdm', marginTop: 10}}>
                Upload CV/Resume
              </Text>
            </TouchableOpacity>
            <View style={{marginTop: 50}}>
              <FillButton
                customColor="#FFBD00"
                customTextColor="white"
                Name="Submit Work"
                onPress={() => {
                  setShowModal1(false);
                  setTimeout(() => {
                    setShowModal(true);
                  }, 500);
                }}
              />
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </Modal>
  );
  const getLastSegment = (url: string) => {
    const segments = url.split('/');
    return segments.pop(); // returns the last segment
  };
  const downloadDoc = (file: string) => {
    const {config, fs} = RNFetchBlob;
    const FileName = getLastSegment(file);
    console.log('file', FileName);
    const downloads = fs.dirs.DownloadDir;
    const filePath = `${downloads}/${FileName}`;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: true,

        path: filePath,
        description: 'Downloading Document.',
      },
    };
    config(options)
      .fetch('GET', file)
      .then(res => {
        // do some magic here
        console.log('res of download', res);
      })
      .catch(err => {
        console.log('err in download', err);
      });
  };
  const downloadContract = () => {
    const formdata = new FormData();
    formdata.append('jobId', item.id);
    postApiWithFormDataWithToken(
      {url: 'contractDownload', token: user?.api_token},
      formdata,
    ).then(res => {
      console.log('reso f download', res);
      if (res.status == 'success') {
        downloadDoc(res.file);
      }
    });
  };
  const source = {
    html: `
 ${contract}`,
  };
  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate an API call to refresh data
    setTimeout(() => {
      getApiwithToken({
        url: `jobDetail/${item.id}`,
        token: user?.api_token,
      }).then(res => {
        // console.log('res of detail', JSON.stringify(res));
        setDetail(res.data);
        setWeeklydata(res.weeklyData);
        const total = res.data.hours.reduce(
          (accumulator, currentItem) => accumulator + currentItem.totalHours,
          0,
        );
        setTotal(total);
      });

      setRefreshing(false);
    }, 1500);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getApiwithToken({
        url: `jobDetail/${item.id}`,
        token: user?.api_token,
      }).then(res => {
        // console.log('res of detail', JSON.stringify(res));
        setDetail(res.data);
        setContract(res.contractFile);
        setWeeklydata(res.weeklyData);
        const total = res.data.hours.reduce(
          (accumulator, currentItem) => accumulator + currentItem.totalHours,
          0,
        );
        setTotal(total);
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getApiwithToken({
      url: `jobDetail/${item.id}`,
      token: user?.api_token,
    }).then(res => {
      // console.log('res of detail', JSON.stringify(res));
      setDetail(res.data);
      setWeeklydata(res.weeklyData);
      const total = res.data.hours.reduce(
        (accumulator, currentItem) => accumulator + currentItem.totalHours,
        0,
      );
      setTotal(total);
    });
  }, [refresh]);
  const tagsStyles = {
    body: {
      color: 'white',
    },
  };
  const SubmitWork = () => {
    setShowLoader(true);
    const formdata = new FormData();
    detail?.hours?.map(item => formdata.append('ids[]', item.id));
    postApiWithFormDataWithToken(
      {url: 'submitWeeklyHours', token: user?.api_token},
      formdata,
    )
      .then(res => {
        Alert.alert('Success', 'Hours added successfully');
        console.log('res of hours submit', res);
        setShowLoader(false);
        setRefresh(!refresh);
      })
      .catch(err => {
        setShowLoader(false);
      });
  };
  const ContractOption = (type: string) => {
    const formdata = new FormData();
    formdata.append('job_id', item.id);
    postApiWithFormDataWithToken(
      {url: type, token: user?.api_token},
      formdata,
    ).then(res => {
      console.log('res of contract', res);
      if (res.status == 'success') {
        setRefresh(!refresh);
      }
    });
  };
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? 30 : 0}]}>
      <HeaderComp
        leftIcon={
          <ArrowLeft
            name={'left'}
            size={20}
            onPress={() => navigation.goBack()}
            color={'white'}
          />
        }
        label={item.title}
      />
      <Image
        source={
          item.image
            ? {uri: item.image}
            : require('../../../Assets/Images/ExpendedLogo.png')
        }
        style={{width: '100%', height: heightPercentageToDP(30)}}
      />
      <ScrollView
        // nestedScrollEnabled
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            width: '90%',
            flex: 1,
            //   backgroundColor: 'red',
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text
              style={{color: '#6A6A6A', fontSize: 12, fontFamily: 'ArialCE'}}>
              {item.location}
            </Text>
            <Text
              style={{color: '#6A6A6A', fontSize: 12, fontFamily: 'ArialCE'}}>
              {moment(item.updated_at).fromNow()}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MessageScreen', {item: item?.admin})
            }
            style={{
              backgroundColor: '#373A43',
              width: '100%',
              // height: 100,
              marginBottom: 20,
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
                source={require('../../../Assets/Images/girl.jpeg')}
                style={{height: 50, borderRadius: 30, width: 50}}
              />
              <View style={{marginLeft: 15, width: '70%'}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'ArialMdm',
                  }}>
                  Admin
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
                    Le Lorem Ipsum est simpl ement du faux texte employé dans
                    lae
                  </Text>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MessageScreen', {item: item?.admin})
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
                <ChatIcon name={'chatbubble-sharp'} size={20} color={'white'} />
                {/* <Heart name="hearto" color={'#4D00DE'} size={20} /> */}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
              Job type
            </Text>
            <Text style={{color: 'white', fontSize: 14, fontFamily: 'ArialCE'}}>
              {item.type}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
              Job duration
            </Text>
            <Text style={{color: 'white', fontSize: 14, fontFamily: 'ArialCE'}}>
              {item.duration}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
              Price
            </Text>
            <Text style={{color: 'white', fontSize: 14, fontFamily: 'ArialCE'}}>
              ${item.price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
              Skills
            </Text>
            <Text style={{color: 'white', fontSize: 14, fontFamily: 'ArialCE'}}>
              {item.skills}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
              Payment
            </Text>
            <Text style={{color: 'white', fontSize: 14, fontFamily: 'ArialCE'}}>
              {item.payment}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
              Number of Freelancers
            </Text>
            <Text
              style={{
                color: 'white',
                width: 150,
                fontSize: 14,
                fontFamily: 'ArialCE',
              }}>
              {detail?.totalApplicant == 0
                ? 'Be the first to apply on this job'
                : `${detail?.totalApplicant} out of ${detail?.no_freelancers}`}
            </Text>
          </View>
          {detail?.applyStatus == 'Accepted' && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text
                style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
                Contract
              </Text>
              <TouchableOpacity
                onPress={() => downloadContract()}
                style={{
                  backgroundColor: '#FFBD00',
                  borderRadius: 10,
                  padding: 10,
                }}>
                <ArrowLeft name="file1" size={20} color={'white'} />
              </TouchableOpacity>
            </View>
          )}

          {detail?.applyStatus == 'Accepted' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View
                  style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
                  <FillButton
                    customColor="#FFBD00"
                    customTextColor="white"
                    Name="View Task"
                    midButton={true}
                    onPress={() =>
                      navigation.navigate('ViewTask', {item: detail?.tasks})
                    }
                    // onPress={() => setShowModal1(!showModal1)}
                  />
                </View>
                <View
                  style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
                  <FillButton
                    customColor="#2D2D35"
                    customTextColor="white"
                    Name="Add Hours"
                    midButton={true}
                    onPress={() =>
                      detail?.btnStatus
                        ? Alert.alert(
                            'Error',
                            'You already submited working hours of this week',
                          )
                        : navigation.navigate('AddHours', {item})
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#FFBD00',
                  borderRadius: 10,
                  width: '100%',
                  // marginBottom: 10,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#FFBD00',
                      width: '48%',
                      height: 40,
                      borderTopLeftRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomRightRadius: 10,
                    }}>
                    <Text style={{color: 'black', fontFamily: 'ArialMdm'}}>
                      Additional Hours
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('History', {
                        item: weeklyData,
                        jobId: item.id,
                      })
                    }
                    style={{
                      backgroundColor: '#FFBD00',
                      width: '48%',
                      height: 40,
                      borderTopLeftRadius: 1,
                      borderTopRightRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomLeftRadius: 10,
                    }}>
                    <Text style={{color: 'black', fontFamily: 'ArialMdm'}}>
                      History
                    </Text>
                  </TouchableOpacity>
                </View>

                {detail?.hours?.map((item, index) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                      marginBottom: index === detail?.hours.length - 1 ? 40 : 0,
                      marginLeft: 15,
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white', fontFamily: 'ArialCE'}}>
                      {item.date}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        marginLeft: 40,
                        fontFamily: 'ArialCE',
                      }}>
                      {item.totalHours}hrs
                    </Text>
                    <Text
                      style={{
                        color: '#FFBD00',
                        marginLeft: 20,
                        fontFamily: 'ArialCE',
                        fontSize: 10,
                      }}>
                      {item.status}
                    </Text>
                  </View>
                ))}
                {/* <Text
              onPress={() => navigation.navigate('AddHours')}
              style={{color: '#FFBD00', marginTop: 10, marginLeft: 15}}>
              More+
            </Text> */}
                <View
                  style={{
                    // alignContent: 'flex-end',
                    flexDirection: 'row',

                    justifyContent: 'flex-end',
                    // backgroundColor: 'red',
                    // width: '100%',
                  }}>
                  <TouchableOpacity
                    // disabled={detail?.btnStatus}
                    onPress={() =>
                      // Alert.alert(
                      //   'Warning',
                      //   `You are adding ${detail?.hours.length} days working hours`,
                      // )
                      detail?.hours.length > 0
                        ? Alert.alert(
                            'Warning',
                            `You are adding ${detail?.hours.length} days working hours! You can only submit your work once in a week`,
                            [
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {text: 'OK', onPress: () => SubmitWork()},
                            ],
                          )
                        : detail?.btnStatus
                        ? Alert.alert(
                            'Error',
                            'You already submited working hours of this week',
                          )
                        : Alert.alert('Warning', 'Please add Hours')
                    }
                    // onPress={() =>
                    //   detail?.hours.length == 7
                    //     ? SubmitWork()
                    //     : Alert.alert(
                    //         'Warning',
                    //         `You added ${detail?.hours.length} days hours`,
                    //       )
                    // }
                    style={{
                      width: '40%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 50,
                      borderTopLeftRadius: 10,
                      backgroundColor: '#FFBD00',
                    }}>
                    <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                      Submit Hours
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    marginTop: 0,
                    borderTopWidth: 1,
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 15,
                    borderTopColor: '#FFBD00',
                  }}>
                  <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                    Total Hours:-
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      // marginLeft: 40,
                      fontFamily: 'ArialMdm',
                    }}>
                    {total} hrs
                  </Text>
                </View>
              </View>
            </>
          ) : detail?.applyStatus == 'In Progress' ? (
            <>
              <View style={{marginTop: 20}}>
                <ScrollView nestedScrollEnabled={true} style={{height: 450}}>
                  <View
                    style={{
                      backgroundColor: '#373A43',
                      borderRadius: 10,
                      paddingHorizontal: 10,
                    }}>
                    <RenderHtml
                      tagsStyles={tagsStyles}
                      // contentWidth={width} // Uncomment and define `width` if needed
                      source={source}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 50,
                        marginBottom: 20,
                        justifyContent: 'space-between',
                        width: '100%',
                        // backgroundColor: 'red',
                      }}>
                      <View
                        style={[
                          styles.mainInputView,
                          {marginTop: 0, width: '45%'},
                        ]}>
                        <FillButton
                          customColor="#FFBD00"
                          customTextColor="white"
                          Name="Accept"
                          midButton={true}
                          onPress={() => ContractOption('acceptContract')}
                        />
                      </View>
                      <View
                        style={[
                          styles.mainInputView,
                          {marginTop: 0, width: '45%'},
                        ]}>
                        <FillButton
                          customColor="#2D2D35"
                          customTextColor="white"
                          Name="Decline"
                          midButton={true}
                          onPress={() => ContractOption('rejectContract')}
                        />
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </>
          ) : (
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('MessageScreen', {item: item?.admin})
              // }
              style={{
                backgroundColor: '#373A43',
                width: '100%',
                // height: 100,
                marginBottom: 0,
                marginTop: 20,
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
                <View
                  style={{
                    marginLeft: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      alignItems: 'center',
                    }}>
                    <Text
                      numberOfLines={2}
                      style={{color: 'white', fontFamily: 'ArialCE'}}>
                      You've applied for this job! Wating for approval
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{alignItems: 'flex-end'}}></View>
            </TouchableOpacity>
            // <Text
            //   style={{
            //     color: '#D6D6D6',
            //     marginTop: 20,
            //     marginBottom: 30,
            //     fontFamily: 'ArialCE',
            //   }}>
            //   You've applied for this job
            // </Text>
          )}

          <View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'ArialMdm',
                marginTop: 30,
                marginBottom: 10,
              }}>
              About Job
            </Text>
            <Text
              style={{
                color: '#D6D6D6',
                marginBottom: 30,
                fontFamily: 'ArialCE',
              }}>
              {item.description}
            </Text>
          </View>
        </View>
      </ScrollView>
      {Loader({show: showloader})}
      {ShowInvoice()}
      {FilterModal()}
    </View>
  );
};

export default PostDetailHours;
