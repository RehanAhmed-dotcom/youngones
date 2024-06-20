import React from 'react';
import {FlatList, Text, View} from 'react-native';
import styles from './style';
import Notification from 'react-native-vector-icons/Ionicons';
import {RequestData} from '../../../Component/ExtraData/PopularData';
import RequestRender from '../../../Component/RenderItems/RequestRender';
const BuyerRequest = ({navigation}) => {
  const renderItem = ({item}) => (
    <RequestRender item={item} navigation={navigation} />
  );
  return (
    <View style={styles.mainView}>
      <View style={styles.middle}>
        <View style={styles.headerView}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'WorkSans-SemiBold',
              fontSize: 16,
            }}>
            Requests
          </Text>
          <Notification name="notifications" size={20} color={'black'} />
        </View>
        <View>
          <FlatList data={RequestData} renderItem={renderItem} />
        </View>
      </View>
    </View>
  );
};

export default BuyerRequest;
