import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Platform, Text, View} from 'react-native';
import styles from './style';
import Notification from 'react-native-vector-icons/Ionicons';
import {OrderData, RequestData} from '../../../Component/ExtraData/PopularData';
import RequestRender from '../../../Component/RenderItems/RequestRender';
import OrderRender from '../../../Component/RenderItems/OrderRender';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getApiwithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
import BellIcon from 'react-native-vector-icons/FontAwesome';
import {ActivityIndicator} from 'react-native';
const Order = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const [OrderList, setOrderlist] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reget, setReget] = useState(false);
  const refreshOrder = () => {
    setReget(!reget);
  };
  useEffect(() => {
    getApiwithToken({
      url: user?.type == 'seller' ? 'myOrders' : 'myOrder',
      token: user?.api_token,
    })
      .then(res => {
        console.log('order data', res);
        setOrderlist(res.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, [reget]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getApiwithToken({
        url: user?.type == 'seller' ? 'myOrders' : 'myOrder',
        token: user?.api_token,
      })
        .then(res => {
          console.log('order data', res);
          setOrderlist(res.data);
        })
        .catch(err => {
          console.log('err', err);
        });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const renderItem = ({item, index}) => (
    <OrderRender
      item={item}
      index={index}
      navigation={navigation}
      refresh={refreshOrder}
    />
  );
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate an API call to refresh data
    setTimeout(() => {
      getApiwithToken({
        url: user?.type == 'seller' ? 'myOrders' : 'myOrder',
        token: user?.api_token,
      })
        .then(res => {
          console.log('order data', res);
          setOrderlist(res.data);
          setRefreshing(false);
          setLoading(false);
        })
        .catch(err => {
          console.log('err', err);
          setLoading(false);
        });
      // setData(refreshedData);
    }, 1500);
  }, []);
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <View style={styles.middle}>
        <View style={styles.headerView}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'WorkSans-Medium',
              fontSize: 16,
            }}>
            Orders
          </Text>
          <BellIcon
            name="bell"
            size={20}
            color={'black'}
            onPress={() =>
              navigation.navigate(
                user.type == 'seller' ? 'NotificationSeller' : 'Notifications',
              )
            }
          />
          {/* <Notification name="notifications" size={20} color={'black'} /> */}
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={OrderList}
            renderItem={renderItem}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      </View>
    </View>
  );
};

export default Order;
