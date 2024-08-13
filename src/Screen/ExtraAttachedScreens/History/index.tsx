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
import {getApiwithToken} from '../../../lib/Apis/api';
import InvoiceItems from '../../../Component/InvoiceItems';
import moment from 'moment';

const History = ({navigation, route}: {navigation: any; route: any}) => {
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const {item} = route.params;
  const [showModal, setShowModal] = useState(false);
  const [hoursArray, setHoursArray] = useState([]);
  const [showHours, setShowHours] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const {user} = useSelector(state => state.user);
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
                <Icon name="briefcase-outline" size={30} color={'white'} />
              </View>
              <Image
                source={
                  invoiceData?.job?.image
                    ? {uri: invoiceData?.job?.image}
                    : require('../../../Assets/Images/UiUx.png')
                }
                style={{height: 200, width: '100%', marginTop: 20}}
              />
              <View style={{backgroundColor: '#2D2D35', width: '100%'}}>
                <InvoiceItems
                  first={'Username'}
                  second={`${invoiceData?.user?.firstname} ${invoiceData?.user?.lastname}`}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Phone Number'}
                  second={invoiceData?.user?.phone_no}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Start Week'}
                  second={moment(invoiceData?.week_start).format(
                    'DD, MMM YYYY',
                  )}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Working Hours'}
                  second={`${invoiceData?.total_hours}hrs /week`}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Invoice ID'}
                  second={invoiceData?.invoice?.invoiceID}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Fee Per Hours'}
                  second={`$${invoiceData?.job?.price}`}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Status'}
                  color={'red'}
                  second={invoiceData?.invoice?.status}
                  showBorder={true}
                />
                <InvoiceItems first={'Tax Fee'} second={'$10'} />
                <InvoiceItems
                  first={'Service Fee'}
                  second={`$ ${
                    parseInt(invoiceData?.job?.price) *
                    parseInt(invoiceData?.total_hours)
                  }`}
                />
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
                  {`$${
                    parseInt(invoiceData?.job?.price) *
                      parseInt(invoiceData?.total_hours) +
                    10
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
          <Text
            numberOfLines={1}
            style={{
              color: '#FFBD00',
              width: widthPercentageToDP(25),
              fontFamily: 'ArialCE',
              fontSize: 10,
            }}>
            {item.status}
          </Text>
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
                data={item}
                //   horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItemPopular}
              />
              {/* </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
      {ShowInvoice()}
      {ShowHours()}
    </View>
  );
};

export default History;
