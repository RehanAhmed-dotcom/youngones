import React, {useEffect} from 'react';
import {FlatList, Platform, Text, View} from 'react-native';
import styles from './style';
import Notification from 'react-native-vector-icons/Ionicons';
import {OrderData, RequestData} from '../../../Component/ExtraData/PopularData';
import RequestRender from '../../../Component/RenderItems/RequestRender';
import OrderRender from '../../../Component/RenderItems/OrderRender';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getApiwithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';

const TotalServices = ({navigation, route}) => {
  const {user} = useSelector(state => state.user);
  const {text} = route.params;
  const renderItem = ({item}) => (
    <OrderRender item={item} data={text} navigation={navigation} />
  );

  const {top} = useSafeAreaInsets();
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <View style={styles.middle}>
        <View style={styles.headerView}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'WorkSans-SemiBold',
              fontSize: 16,
            }}>
            Total Services
          </Text>
          {/* <Notification name="notifications" size={20} color={'black'} /> */}
        </View>
        <View style={{flex: 1}}>
          {/* <FlatList data={OrderData} renderItem={renderItem} /> */}
        </View>
      </View>
    </View>
  );
};

export default TotalServices;
