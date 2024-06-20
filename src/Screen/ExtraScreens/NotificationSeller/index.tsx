import React, {useEffect, useState} from 'react';
import {FlatList, Platform, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {getApiwithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import moment from 'moment';
const NotificationSeller = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const [notifications, setNotifications] = useState([]);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // console.log('item', item);
          item.type == 'amount'
            ? navigation.navigate('Invoice', {item})
            : item.type == 'booking'
            ? navigation.navigate('Request')
            : navigation.navigate('OrderDetail', {item});
        }}
        style={{
          width: '97%',
          padding: 10,
          backgroundColor: '#F6F6F6',
          borderRadius: 10,
          shadowColor: '#000',
          marginBottom: 10,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.5,
          shadowRadius: 1,
          marginHorizontal: 4,

          marginRight: 10,
          elevation: 1,
        }}>
        <Text
          style={{color: 'black', fontFamily: 'WorkSans-Medium', fontSize: 14}}>
          {item.title}
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'WorkSans-Regular',
            fontSize: 12,
          }}>
          {item.message}
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'WorkSans-Regular',
            fontSize: 12,
          }}>
          {moment(item.time).format('YYYY-MM-DD HH:MM a')}
        </Text>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    getApiwithToken({url: 'viewAllNotification', token: user?.api_token}).then(
      res => {
        console.log('res of not', res);
        setNotifications(res.data.reverse());
      },
    );
  }, []);
  const {top} = useSafeAreaInsets();
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <View style={styles.middle}>
        <View style={styles.headerView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ArrowLeft
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={20}
              color={'black'}
            />

            <Text
              style={{
                color: 'black',
                fontFamily: 'WorkSans-Medium',
                fontSize: 16,
                marginLeft: 10,
              }}>
              Notifications
            </Text>
          </View>
          {/* <Notification name="notifications" size={20} color={'black'} /> */}
        </View>
        <View style={{flex: 1}}>
          <FlatList data={notifications} renderItem={renderItem} />
        </View>
      </View>
    </View>
  );
};

export default NotificationSeller;
