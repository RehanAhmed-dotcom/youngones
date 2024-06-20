import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import Envelop from 'react-native-vector-icons/FontAwesome';
import Tag from 'react-native-vector-icons/Ionicons';
import Location from 'react-native-vector-icons/EvilIcons';
import {useSelector} from 'react-redux';
import {postApiWithFormDataWithToken} from '../../lib/Apis/api';
const RequestRender = ({item, alter, navigation}) => {
  // console.log('item', item);
  const {user} = useSelector(state => state.user);
  const reqFunc = (type: string) => {
    const formData = new FormData();
    formData.append('order_id', item.id);
    postApiWithFormDataWithToken(
      {url: type, token: user?.api_token},
      formData,
    ).then(res => {
      console.log('res of accept', res);
      alter();
    });
  };
  return (
    <TouchableOpacity style={styles.requestRender}>
      <View style={styles.renderRow}>
        <Image
          source={
            item?.buyer?.image
              ? {uri: item?.buyer?.image}
              : require('../../Assets/Images/girl.jpeg')
          }
          style={{width: 40, height: 40, borderRadius: 30}}
        />
        <View style={{marginLeft: 20}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'WorkSans-Medium',
              fontSize: 14,
            }}>
            {item?.buyer?.fullname}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              left: 2,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Envelop name="envelope-o" size={12} color={'#2F373A'} />
            <Text
              style={{
                color: '#2F373A',
                fontFamily: 'WorkSans-Regular',
                marginLeft: 10,
              }}>
              {user?.serviceName}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
            <Location name="tag" size={22} color={'#2F373A'} />
            <Text
              style={{
                color: '#2F373A',
                fontFamily: 'WorkSans-Regular',
                marginLeft: 10,
              }}>
              {item.pay}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
            <Location name="location" size={20} color={'#2F373A'} />
            <Text
              style={{
                color: '#2F373A',
                fontFamily: 'WorkSans-Regular',
                marginLeft: 10,
              }}>
              {item.address}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.acceptView}>
        <TouchableOpacity
          onPress={() => reqFunc('accept_req')}
          style={styles.accept}>
          <Text style={{color: 'white', fontFamily: 'WorkSans-SemiBold'}}>
            Accept
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => reqFunc('decline_req')}
          style={[styles.accept, {backgroundColor: 'white', marginRight: 0}]}>
          <Text style={{color: 'black', fontFamily: 'WorkSans-SemiBold'}}>
            Decline
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default RequestRender;
