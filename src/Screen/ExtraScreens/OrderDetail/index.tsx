import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import Notification from 'react-native-vector-icons/Ionicons';
import {OrderData, RequestData} from '../../../Component/ExtraData/PopularData';
import RequestRender from '../../../Component/RenderItems/RequestRender';
import OrderRender from '../../../Component/RenderItems/OrderRender';
import Icon from 'react-native-vector-icons/AntDesign';
import Envelop from 'react-native-vector-icons/FontAwesome';
import Tag from 'react-native-vector-icons/Foundation';
import Location from 'react-native-vector-icons/EvilIcons';
import StepIndicator from 'react-native-step-indicator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
import moment from 'moment';
import FillButton from '../../../Component/FillButton';

const OrderDetail = ({navigation, route}) => {
  const {user} = useSelector(state => state.user);
  const item = route.params.item;
  // console.log('item', item);
  const [orderData, setOrderData] = useState({});
  const [currentPage, setCurrentPage] = useState(
    orderData.work_status == 'Pending'
      ? 0
      : orderData.work_status == 'In Progress'
      ? 1
      : orderData.work_status == 'Waiting for Approval'
      ? 2
      : orderData.work_status == 'Cancelled'
      ? 3
      : 4,
  );
  console.log('renderItem', orderData);
  const OrderDetailFunc = () => {
    const formdata = new FormData();
    formdata.append('id', item.redirect ? item.redirect : item.id);
    postApiWithFormDataWithToken(
      {url: 'order_detail', token: user.api_token},
      formdata,
    ).then(res => {
      console.log('res of order detail', res);
      setOrderData(res.data);

      setCurrentPage(
        res.data.work_status == 'Pending'
          ? 0
          : res.data.work_status == 'In Progress'
          ? 1
          : res.data.work_status == 'Waiting for Approval'
          ? 2
          : res.data.work_status == 'Cancelled'
          ? 3
          : 4,
      );
    });
  };
  useEffect(() => {
    OrderDetailFunc();
  }, []);
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const [currentPosition, setCurrentPosition] = useState(0);

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#1381fe',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#1381fe',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#1381fe',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#1381fe',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#1381fe',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#1381fe',
  };
  const completeOrder = () => {
    const formdata = new FormData();
    formdata.append('order_id', item.id);
    postApiWithFormDataWithToken(
      {url: 'complete_req', token: user?.api_token},
      formdata,
    ).then(res => {
      console.log('order done', res);
      if (res.status == 'success') {
        navigation.goBack();
      }
    });
  };

  const onStepPress = position => {
    setCurrentPage(position);
  };
  const nextPage = () => {
    setCurrentPage(prevState => prevState + 1);
  };
  const steps = [
    {
      label: 'New Order',
      data: 'Your Order has been viewed and reviewed by the Seller',
      date: `${moment(OrderData.updated_at).format('MMM D, YYYY-hh:mm a')}`,
    },
    {
      label: 'Order Accepted',
      data: 'Your Order has been viewed and reviewed by the Seller',
      date: `${moment(OrderData.updated_at).format('MMM D, YYYY-hh:mm a')}`,
    },
    {
      label: 'Order payment processed',
      data: `Your payment for order has been processed for N ${orderData.pay}`,
      date: `${moment(OrderData.updated_at).format('MMM D, YYYY-hh:mm a')}`,
    },
    {
      label: `${orderData?.seller?.fullname} completed the Order`,
      data: 'The order has been canceled',
      date: `${moment(orderData.updated_at).format('MMM D, YYYY-hh:mm a')}`,
    },
    // {label: 'Rejected', data: 'Order Declined', date: 'May 5, 2023-10:53am'},
  ];
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <View style={styles.middle}>
        {/* <View>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            direction="vertical"
            onPress={pos => setCurrentPosition(pos)}
          />
        </View> */}
        <View
          style={[
            styles.headerView,
            {justifyContent: 'flex-start', paddingHorizontal: 10},
          ]}>
          <Icon
            name="left"
            size={20}
            onPress={() => navigation.goBack()}
            color={'black'}
          />
          <Text
            style={{
              color: 'black',
              marginLeft: 10,
              fontFamily: 'WorkSans-Medium',
              // fontWeight: 'bold',
              fontSize: 16,
            }}>
            Order Detail
          </Text>
          {/* <Notification name="notifications" size={20} color={'black'} /> */}
        </View>
        <ScrollView>
          <TouchableOpacity
            // onPress={() => navigation.navigate('OrderProgress')}
            style={{backgroundColor: '#F6F6F6', borderRadius: 10}}>
            <View
              style={{
                height: 58,
                paddingHorizontal: 20,
                backgroundColor: '#0F8BC2',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'white', fontFamily: 'WorkSans-Medium'}}>
                Details
              </Text>
              <Text style={{color: 'white', fontFamily: 'WorkSans-Regular'}}>
                ID: #{orderData?.id}
              </Text>
            </View>
            <View
              style={{
                //   height: 100,
                width: '80%',
                alignSelf: 'center',
                marginTop: 20,
                //   backgroundColor: 'red',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={
                    orderData?.seller?.image
                      ? {uri: orderData?.seller?.image}
                      : require('../../../Assets/Images/girl.jpeg')
                  }
                  style={{width: 50, height: 50, borderRadius: 30}}
                />
                <View style={{marginLeft: 20}}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'WorkSans-Medium',
                      fontSize: 14,
                    }}>
                    {orderData?.seller?.fullname}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    <Envelop name="envelope-o" size={13} color={'black'} />
                    <Text
                      style={{
                        color: '#3F494D',
                        fontFamily: 'WorkSans-Regular',
                        marginLeft: 10,
                      }}>
                      {orderData?.seller?.serviceName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    <Tag name="dollar-bill" size={15} color={'black'} />
                    <Text
                      style={{
                        color: '#3F494D',
                        fontFamily: 'WorkSans-Regular',
                        marginLeft: 10,
                      }}>
                      ₦ {orderData?.seller?.servicePrice}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    <Location name="location" size={20} color={'black'} />
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'WorkSans-Regular',
                        marginLeft: 10,
                      }}>
                      {orderData?.seller?.address
                        ? orderData?.seller?.address
                        : orderData?.seller?.serviceAddress}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 70,
                  borderBottomColor: '#E7F3F9',
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  width: '100%',
                }}>
                <View style={{marginLeft: 0}}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'WorkSans-Medium',
                      fontSize: 14,
                    }}>
                    Date
                  </Text>
                </View>
                {/* <View style={styles.pending}> */}
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'WorkSans-Regular',
                    color: 'black',
                  }}>
                  {moment(orderData.date).format('YYYY-MM-DD')}
                </Text>
                {/* </View> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  borderBottomColor: '#E7F3F9',
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <View style={{marginLeft: 0}}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'WorkSans-Medium',
                      fontSize: 14,
                    }}>
                    Time
                  </Text>
                </View>
                {/* <View style={styles.pending}> */}
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'WorkSans-Regular',
                    color: 'black',
                  }}>
                  {orderData.time}
                </Text>
                {/* </View> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  borderBottomColor: '#E7F3F9',
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <View
                  style={{
                    marginLeft: 0,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'WorkSans-Medium',
                      fontSize: 14,
                    }}>
                    Location
                  </Text>
                </View>
                {/* <View style={styles.pending}> */}
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'WorkSans-Regular',
                    color: 'black',
                  }}>
                  {orderData.address}
                </Text>
                {/* </View> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  borderBottomColor: '#E7F3F9',
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <View
                  style={{
                    marginLeft: 0,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'WorkSans-Medium',
                      fontSize: 14,
                    }}>
                    Work Status
                  </Text>
                </View>
                {/* <View style={styles.pending}> */}
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'WorkSans-Regular',
                    color: 'black',
                  }}>
                  {orderData.work_status}
                </Text>
                {/* </View> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  borderBottomColor: '#ccc',
                  // borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <View
                  style={{
                    marginLeft: 0,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'WorkSans-Medium',
                      fontSize: 14,
                    }}>
                    Payment Status
                  </Text>
                </View>
                {/* <View style={styles.pending}> */}
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'WorkSans-Regular',
                    color: 'black',
                  }}>
                  {orderData.payment_status}
                </Text>
                {/* </View> */}
              </View>
            </View>
          </TouchableOpacity>
          <View style={{height: 450, marginBottom: 30}}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPage}
              stepCount={4}
              direction="vertical"
              labels={steps.map(step => step.label)}
              renderLabel={({position, stepStatus, label, currentPosition}) => (
                <TouchableOpacity
                  // onPress={() => nextPage()}
                  style={{alignItems: 'flex-start', width: 250}}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: 'WorkSans-Regular',
                      color: '#4E5B60',
                      marginTop: 30,
                    }}>
                    {steps[position].date}
                  </Text>
                  <Text
                    style={{color: '#131617', fontFamily: 'WorkSans-Medium'}}>
                    {label}
                  </Text>
                  <Text
                    style={{color: '#4E5B60', fontFamily: 'WorkSans-Regular'}}>
                    {steps[position].data}
                  </Text>
                  {user?.type == 'buyer' &&
                    position == 2 &&
                    orderData.work_status == 'Waiting for Approval' && (
                      <View
                        style={{
                          width: '50%',
                          alignSelf: 'center',
                          marginTop: 10,
                        }}>
                        <FillButton
                          Name={
                            orderData.payment_status == 'Paid' ? 'Paid' : 'Pay'
                          }
                          customColor={
                            orderData.payment_status == 'Paid'
                              ? 'green'
                              : '#0E7DAF'
                          }
                          customTextColor="white"
                          onPress={() =>
                            orderData.payment_status != 'Paid' &&
                            navigation.navigate('PaymentScreen', {
                              item: orderData,
                            })
                          }
                        />
                      </View>
                    )}
                </TouchableOpacity>
              )}
            />
          </View>
          {user?.type == 'seller' && orderData.work_status == 'In Progress' && (
            <View style={{marginBottom: 30}}>
              <FillButton
                customColor="#0E7DAF"
                customTextColor="white"
                Name="Completed"
                onPress={() => completeOrder()}
              />
            </View>
          )}
        </ScrollView>
        {/* <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            // width: 200,
            // height: 200,
          }}> */}
        {/* <View style={{height: 550}}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            direction="vertical"
            labels={steps.map(step => step.label)}
            renderLabel={({position, stepStatus, label, currentPosition}) => (
              <View style={{alignItems: 'flex-start'}}>
                <Text style={{color: 'black'}}>{label}</Text>
                <Text style={{color: 'black'}}>{steps[position].data}</Text>
                <Text style={{color: 'black'}}>{label}</Text>
                <Text style={{color: 'black'}}>{steps[position].data}</Text>
                <Text style={{color: 'black'}}>{label}</Text>
                <Text style={{color: 'black'}}>{steps[position].data}</Text>
              </View>
            )}
          />
        </View> */}
        {/* <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            stepCount={labels.length}
            onPress={position => setCurrentPosition(position)}
          /> */}
        {/* </View> */}
      </View>
    </View>
  );
};

export default OrderDetail;
