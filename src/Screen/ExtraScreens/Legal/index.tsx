import React, {useEffect, useState} from 'react';
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
import HeaderComp from '../../../Component/HeaderComp';
const Legal = ({navigation}) => {
  const {user} = useSelector(state => state.user);

  const {top, bottom} = useSafeAreaInsets();
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <View style={styles.middle}>
        <HeaderComp
          label="Community And Legal"
          backIcon={false}
          navigation={navigation}
          showBellIcon={true}
        />
        <View style={{flex: 1}}>
          <Text style={{fontFamily: 'WorkSans-Medium', color: 'black'}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Legal;
