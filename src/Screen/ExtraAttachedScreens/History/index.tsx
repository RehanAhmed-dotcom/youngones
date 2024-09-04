import React, {useEffect, useState} from 'react';
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
  Modal,
  Dimensions,
} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/Ionicons';
import CrossIcon from 'react-native-vector-icons/Entypo';
import InvoiceIcon from 'react-native-vector-icons/FontAwesome6';
import styles from './style';
import {Formik} from 'formik';
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowBack from 'react-native-vector-icons/AntDesign';
import FillButton from '../../../Component/FillButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {sellerSignUpValidationSchema} from '../../../lib/ValidationSchemas';
import Loader from '../../../Component/Loader';
import HeaderComp from '../../../Component/HeaderComp';
import ExpertiseItem from '../../../Component/ExpertiseItem';
import InterestItem from '../../../Component/InterestItem';
import {
  PopularJobs,
  RecentJobsData,
  singlePostPopularData,
  singlePostRecentData,
  suggestedPeoples,
} from '../../../Component/dummyData';
import SinglePost from '../../../Component/SinglePost';
import People from '../../../Component/People';
import RecentJobsItem from '../../../Component/RecentJobsItem';
import {PopularData} from '../../../Component/ExtraData/PopularData';
import PopularJobItem from '../../../Component/PopularJobItem';
import DropDown from '../../../Component/DropDown';
import {useSelector} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
import InvoiceItems from '../../../Component/InvoiceItems';
import moment from 'moment';

const History = ({navigation, route}: {navigation: any; route: any}) => {
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const {item, jobId} = route.params;
  // console.log('item of job', item);
  const [reasonShow, setReasonShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hoursArray, setHoursArray] = useState([]);
  const [showHours, setShowHours] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [reason, setReason] = useState('');
  const [weeklyData, setWeeklyData] = useState();
  const {user} = useSelector(state => state.user);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const SubmitWork = () => {
    // setShowLoader(true);
    const formdata = new FormData();
    formdata.append('job_id', jobId);
    formdata.append('startDate', start);
    formdata.append('endDate', end);
    postApiWithFormDataWithToken(
      {url: 'jobWeeklyData', token: user?.api_token},
      formdata,
    )
      .then(res => {
        // console.log('res of hours submit', res);
        setWeeklyData(res.weeklyData);
      })
      .catch(err => {});
  };
  useEffect(() => {
    SubmitWork();
  }, []);
  useEffect(() => {
    if (start && end) {
      SubmitWork();
    }
  }, [start, end]);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    setStart(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = date => {
    console.warn('A date has been picked: ', date);
    setEnd(moment(date).format('YYYY-MM-DD'));
    hideDatePicker1();
  };

  // console.log('hours', invoiceData);
  // console.log('ite', JSONitem);
  const ShowHours = () => (
    <Modal
      animationType="slide"
      onRequestClose={() => setShowHours(!showHours)}
      transparent={true}
      visible={showHours}>
      <View
        style={{
          flex: 1,
          // height: hp(100),
          backgroundColor: '#2D2D35',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',

          zIndex: 200,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          // position: 'absolute',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginTop: 20,
            // right: 20,
            // marginRight: 20,
            // backgroundColor: 'red',
            justifyContent: 'space-between',
          }}>
          <View style={{width: 30}} />
          <Text style={{color: 'white', fontSize: 18, fontFamily: 'ArialMdm'}}>
            Daily Hours
          </Text>
          <CrossIcon
            onPress={() => setShowHours(!showHours)}
            name={'cross'}
            size={30}
            style={{right: 10}}
            color={'white'}
          />
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 15,
            width: '80%',
            alignItems: 'center',
            // justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'white',
              width: 80,
              // backgroundColor: 'red',
              fontFamily: 'ArialCE',
            }}>
            Date
          </Text>
          <Text
            style={{
              color: 'white',
              marginLeft: 13,
              width: 70,
              // backgroundColor: 'blue',
              fontFamily: 'ArialCE',
            }}>
            Start time
          </Text>
          <Text
            style={{
              color: 'white',
              marginLeft: 10,
              width: 80,
              fontFamily: 'ArialCE',
            }}>
            End time
          </Text>
          <Text
            onPress={() => {
              // setShowHours(true);
              // setHoursArray(item);
            }}
            style={{
              color: 'white',
              marginLeft: 0,
              fontFamily: 'ArialCE',
            }}>
            hrs
          </Text>
          
        </View> */}
        <FlatList data={hoursArray.datas} renderItem={renderItemHours} />
      </View>
    </Modal>
  );
  const getLastSegment = (url: string) => {
    const segments = url.split('/');
    return segments.pop(); // returns the last segment
  };
  const reportReason = () => {
    setReasonShow(false);
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
            height: '40%',
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
              <CrossIcon name="circle-with-cross" size={20} color={'white'} />
            </TouchableOpacity>
          </View>
          <View style={{margin: 15}}>
            <TextInput
              placeholder={' Enter the reason'}
              placeholderTextColor="#ccc"
              value={reason}
              textAlignVertical="top"
              // onChangeText={text => setReason(text)}
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
                height: '90%',
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
            {/* <FillButton
              customColor="#2D2D35"
              customTextColor="white"
              Name="Submit"
              onPress={reportReason}
            /> */}
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
  const downloadApi = () => {
    const formdata = new FormData();
    formdata.append('invoiceId', invoiceData?.invoice?.id);
    postApiWithFormDataWithToken(
      {url: 'invoiceDownload', token: user?.api_token},
      formdata,
    )
      .then(res => {
        downloadDoc(res.file);
      })
      .catch(err => {
        console.log('err in download', err);
      });
  };
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
                size={25}
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
                    {invoiceData?.job?.title}
                  </Text>
                </View>
                <CrossIcon
                  onPress={() => downloadApi()}
                  name="download"
                  size={30}
                  color={'white'}
                />
              </View>
              <Image
                source={
                  invoiceData?.job?.image
                    ? {uri: invoiceData?.job?.image}
                    : require('../../../Assets/Images/ExpendedLogo.png')
                }
                style={{height: 200, width: '100%', marginTop: 20}}
              />
              <View style={{backgroundColor: '#2D2D35', width: '100%'}}>
                <InvoiceItems
                  first={'Credit Invoice Number'}
                  second={`${invoiceData?.invoice?.invoiceID} ${invoiceData?.user?.lastname}`}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Date of Credit Invoice'}
                  second={moment(invoiceData?.invoice?.created_at).format(
                    'DD, MMM YYYY',
                  )}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Reference to Submitted Hours'}
                  second={`${invoiceData?.total_hours}hrs /week`}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Amount Excluding VAT'}
                  second={`$ ${
                    parseInt(invoiceData?.job?.price) *
                    parseInt(invoiceData?.total_hours)
                  }`}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Applied VAT Rate'}
                  second={'5%'}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'VAT Amount'}
                  second={`$${
                    parseInt(invoiceData?.job?.price) *
                    parseInt(invoiceData?.total_hours) *
                    0.05
                  }`}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Status'}
                  color={'red'}
                  second={invoiceData?.invoice?.status}
                  showBorder={false}
                />
                {/* <InvoiceItems first={'Tax Fee'} second={'$10'} />
                <InvoiceItems
                  first={'Service Fee'}
                  second={`$ ${
                    parseInt(invoiceData?.job?.price) *
                    parseInt(invoiceData?.total_hours)
                  }`}
                /> */}
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
                  Total Amount Including VAT
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Arial-Bold',
                  }}>
                  {`$${
                    parseInt(invoiceData?.job?.price) *
                      parseInt(invoiceData?.total_hours) +
                    parseInt(invoiceData?.job?.price) *
                      parseInt(invoiceData?.total_hours) *
                      0.05
                  }`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
  const renderItemPopular = ({item, index}) => (
    <>
      {index == 0 && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 10,
            // marginLeft: 15,
            // backgroundColor: 'red',
            width: widthPercentageToDP(100),
            alignItems: 'center',
            // justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'white',
              width: widthPercentageToDP(25),
              // backgroundColor: 'red',
              fontFamily: 'ArialCE',
            }}>
            Start Date
          </Text>
          <Text
            style={{
              color: 'white',
              // marginLeft: 13,
              width: widthPercentageToDP(25),
              // backgroundColor: 'blue',
              fontFamily: 'ArialCE',
            }}>
            End Date
          </Text>
          <Text
            style={{
              color: 'white',
              width: widthPercentageToDP(20),
              fontFamily: 'ArialCE',
            }}>
            Hours
          </Text>
          <Text
            onPress={() => {
              // setShowHours(true);
              // setHoursArray(item);
            }}
            style={{
              color: 'white',
              width: widthPercentageToDP(25),
              fontFamily: 'ArialCE',
            }}>
            Status
          </Text>
          {/* <Text
        style={{
          color: '#FFBD00',
          marginLeft: 20,
          fontFamily: 'ArialCE',
          fontSize: 10,
        }}>
        {item.status}
      </Text> */}
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          marginBottom: 10,
          // marginLeft: 15,
          width: widthPercentageToDP(100),
          // backgroundColor: 'red',
          paddingVertical: 10,
          // paddingLeft: 5,
          borderRadius: 5,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            width: widthPercentageToDP(25),
            fontFamily: 'ArialCE',
          }}>
          {item.week_start}
        </Text>
        <Text
          style={{
            color: 'white',
            width: widthPercentageToDP(25),
            fontFamily: 'ArialCE',
          }}>
          {item.week_end}
        </Text>
        <Text
          onPress={() => {
            setShowHours(true);
            setHoursArray(item);
          }}
          style={{
            color: 'white',
            width: widthPercentageToDP(20),
            fontFamily: 'ArialCE',
          }}>
          {item.total_hours}hrs
        </Text>
        {/* <Text
        style={{
          color: '#FFBD00',
          marginLeft: 20,
          fontFamily: 'ArialCE',
          fontSize: 10,
        }}>
        {item.status}
      </Text> */}
        {item.status == 'Approved' ? (
          <View style={{width: widthPercentageToDP(25)}}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
                setInvoiceData(item);
              }}
              style={{
                width: 50,
                // height: 30,
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: 'orange',
                // backgroundColor: 'orange',
                borderRadius: 10,
                // marginLeft: 20,
              }}>
              <InvoiceIcon
                name={'file-invoice-dollar'}
                size={20}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {item.status == 'Rejected' && (
              <TouchableOpacity
                onPress={() => {
                  console.log('item', item);
                  setReason(item.reason);
                  setReasonShow(!reasonShow);
                }}>
                <ArrowBack name="eye" size={20} color={'white'} />
              </TouchableOpacity>
            )}
            <Text
              numberOfLines={1}
              style={{
                color: item.status == 'Rejected' ? 'red' : '#FFBD00',
                width: widthPercentageToDP(25),
                marginLeft: 10,
                fontFamily: 'ArialCE',
                fontSize: 12,
              }}>
              {item.status}
            </Text>
          </View>
        )}
      </View>
    </>
  );
  const renderItemHours = ({item, index}) => (
    <>
      {index == 0 && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            marginBottom: 10,
            marginLeft: 15,
            width: '80%',
            alignItems: 'center',
            // justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'white',
              width: widthPercentageToDP(28),
              // backgroundColor: 'red',
              fontFamily: 'ArialCE',
            }}>
            Date
          </Text>
          <Text
            style={{
              color: 'white',

              width: widthPercentageToDP(28),
              // backgroundColor: 'blue',
              fontFamily: 'ArialCE',
            }}>
            Start time
          </Text>
          <Text
            style={{
              color: 'white',
              // marginLeft: 35,
              width: widthPercentageToDP(28),
              fontFamily: 'ArialCE',
            }}>
            End time
          </Text>
          <Text
            onPress={() => {
              // setShowHours(true);
              // setHoursArray(item);
            }}
            style={{
              color: 'white',
              width: widthPercentageToDP(28),
              // marginLeft: 25,
              fontFamily: 'ArialCE',
            }}>
            hrs
          </Text>
          {/* <Text
        style={{
          color: '#FFBD00',
          marginLeft: 20,
          fontFamily: 'ArialCE',
          fontSize: 10,
        }}>
        {item.status}
      </Text> */}
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          marginBottom: 10,
          width: widthPercentageToDP(100),
          paddingRight: 35,
          // backgroundColor: 'red',
          marginLeft: 15,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            width: widthPercentageToDP(28),
            fontFamily: 'ArialCE',
          }}>
          {item.date}
        </Text>
        <Text
          style={{
            color: 'white',
            width: widthPercentageToDP(28),
            fontFamily: 'ArialCE',
          }}>
          {item.start_time}
        </Text>
        <Text
          style={{
            color: 'white',
            width: widthPercentageToDP(28),
            fontFamily: 'ArialCE',
          }}>
          {item.end_time}
        </Text>
        <Text
          onPress={() => {
            // setShowHours(true);
            // setHoursArray(item);
          }}
          style={{
            color: 'white',
            width: widthPercentageToDP(28),
            fontFamily: 'ArialCE',
          }}>
          {item.totalHours} hrs
        </Text>
        {/* <Text
        style={{
          color: '#FFBD00',
          marginLeft: 20,
          fontFamily: 'ArialCE',
          fontSize: 10,
        }}>
        {item.status}
      </Text> */}
      </View>
    </>
  );

  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        leftIcon={
          <ArrowBack
            name="left"
            onPress={() => navigation.goBack()}
            size={20}
            color={'white'}
          />
        }
        label="History"
      />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => showDatePicker()}
          style={{
            width: '47%',
            borderWidth: 1,
            borderColor: '#FFBD00',
            borderRadius: 10,
            justifyContent: 'center',
            paddingHorizontal: 10,
            height: 50,
            backgroundColor: '#2D2D35',
          }}>
          <Text
            style={{
              color: 'white',
              // marginLeft: 13,
              width: widthPercentageToDP(25),
              // backgroundColor: 'blue',
              fontFamily: 'ArialCE',
            }}>
            {start ? start : 'Start Date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showDatePicker1()}
          style={{
            width: '47%',
            height: 50,
            borderRadius: 10,
            borderWidth: 1,
            justifyContent: 'center',
            paddingHorizontal: 10,
            borderColor: '#FFBD00',
            backgroundColor: '#2D2D35',
          }}>
          <Text
            style={{
              color: 'white',
              // marginLeft: 13,
              width: widthPercentageToDP(25),
              // backgroundColor: 'blue',
              fontFamily: 'ArialCE',
            }}>
            {end ? end : 'End Date'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.imageView}>
          <View style={{width: '90%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}></View>

            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                Popular Jobs
              </Text>
              <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text>
            </View> */}
            <View style={{marginBottom: 100}}>
              {/* <View style={{backgroundColor: 'grey'}}> */}
              <FlatList
                data={weeklyData}
                //   horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItemPopular}
              />
              {/* </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible1}
        mode="date"
        onConfirm={handleConfirm1}
        onCancel={hideDatePicker1}
      />
      {ShowInvoice()}
      {ShowHours()}
      {myModal3()}
    </View>
  );
};

export default History;
