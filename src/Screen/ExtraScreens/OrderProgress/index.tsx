import React, {useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import Notification from 'react-native-vector-icons/Ionicons';
import {OrderData, RequestData} from '../../../Component/ExtraData/PopularData';
import RequestRender from '../../../Component/RenderItems/RequestRender';
import OrderRender from '../../../Component/RenderItems/OrderRender';
import Icon from 'react-native-vector-icons/AntDesign';
import Envelop from 'react-native-vector-icons/FontAwesome';
import Tag from 'react-native-vector-icons/Ionicons';
import Location from 'react-native-vector-icons/EvilIcons';
import StepIndicator from 'react-native-step-indicator';
const OrderProgress = ({navigation}) => {
  const renderItem = ({item}) => (
    <OrderRender item={item} navigation={navigation} />
  );

  const steps = [
    {
      label: 'New Order',
      data: 'You have received an order',
      date: 'May 5, 2023-10:53am',
    },
    {
      label: 'You have Accepted Order',
      data: 'You have Accepted Order ID: #123',
      date: 'May 5, 2023-10:53am',
    },
    {
      label: 'The Buyer has made payment',
      data: 'Payment of order ID: #123 has been processed',
      date: 'May 5, 2023-10:53am',
    },
    {
      label: 'Busola cancelled the Order',
      data: 'The order has been canceled',
      date: 'May 5, 2023-10:53am',
    },
    {label: 'Step 4', data: 'Extra Data 4', date: 'May 5, 2023-10:53am'},
  ];
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
  const [currentPage, setCurrentPage] = useState(0);
  const onStepPress = position => {
    setCurrentPage(position);
  };
  const nextPage = () => {
    setCurrentPage(prevState => prevState + 1);
  };
  return (
    <View style={styles.mainView}>
      <View style={styles.middle}>
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
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Order
          </Text>
          {/* <Notification name="notifications" size={20} color={'black'} /> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'WorkSans-SemiBold',
            }}>
            Order Details
          </Text>
          <Text style={{color: '#0F8BC2', fontFamily: 'WorkSans-Regular'}}>
            ID: #123{' '}
          </Text>
        </View>
        <View style={{height: 550}}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPage}
            direction="vertical"
            labels={steps.map(step => step.label)}
            renderLabel={({position, stepStatus, label, currentPosition}) => (
              <TouchableOpacity
                onPress={() => nextPage()}
                style={{alignItems: 'flex-start', width: 250}}>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: 'WorkSans-Regular',
                    color: 'grey',
                  }}>
                  {steps[position].date}
                </Text>
                <Text style={{color: 'black', fontFamily: 'WorkSans-Medium'}}>
                  {label}
                </Text>
                <Text style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
                  {steps[position].data}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderProgress;
