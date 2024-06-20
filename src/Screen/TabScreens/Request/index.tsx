import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import styles from './style';
import Notification from 'react-native-vector-icons/Ionicons';
import {RequestData} from '../../../Component/ExtraData/PopularData';
import RequestRender from '../../../Component/RenderItems/RequestRender';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {getApiwithToken} from '../../../lib/Apis/api';
import {ActivityIndicator} from 'react-native';
const Request = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const renderItem = ({item}) => (
    <RequestRender item={item} alter={alter} navigation={navigation} />
  );
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const alter = () => {
    setRefetch(!refetch);
  };
  const [refetch, setRefetch] = useState(false);
  const {top, bottom} = useSafeAreaInsets();
  const {user} = useSelector(state => state.user);
  const [req, setReq] = useState([]);
  const [loading, setLoading] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate an API call to refresh data
    setTimeout(() => {
      getApiwithToken({url: 'myRequest', token: user?.api_token})
        .then(res => {
          console.log('resi', res);
          setReq(res.data);
          setLoading(false);
          setRefreshing(false);
        })
        .catch(err => {
          // console.log
          setLoading(false);
          setRefreshing(false);
        });

      // setData(refreshedData);
    }, 1500);
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getApiwithToken({url: 'myRequest', token: user?.api_token}).then(res => {
        console.log('resi', res);
        setReq(res.data);
      });
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  useEffect(() => {
    getApiwithToken({url: 'myRequest', token: user?.api_token}).then(res => {
      console.log('resi', res);
      setReq(res.data);
    });
  }, [refetch]);
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <View style={styles.middle}>
        <View style={styles.headerView}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
            Requests
          </Text>
          <Notification
            name="notifications"
            onPress={() => navigation.navigate('NotificationSeller')}
            size={20}
            color={'black'}
          />
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={req}
            renderItem={renderItem}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      </View>
    </View>
  );
};

export default Request;
