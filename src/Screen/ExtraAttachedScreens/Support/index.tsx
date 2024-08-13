import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Platform, Text, TextInput, View} from 'react-native';
import styles from './style';
import Notification from 'react-native-vector-icons/Ionicons';
import {OrderData, RequestData} from '../../../Component/ExtraData/PopularData';
import RequestRender from '../../../Component/RenderItems/RequestRender';
import OrderRender from '../../../Component/RenderItems/OrderRender';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
import ArrowBack from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import BellIcon from 'react-native-vector-icons/FontAwesome';
import HeaderComp from '../../../Component/HeaderComp';
import FillButton from '../../../Component/FillButton';
const Support = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const [desc, setDesc] = useState('');
  const {top, bottom} = useSafeAreaInsets();
  const sendSupportMessage = () => {
    setDesc('');
    const formdata = new FormData();
    formdata.append('message', desc);
    postApiWithFormDataWithToken(
      {url: 'support', token: user.api_token},
      formdata,
    ).then(res => {
      console.log('res of support', res);
      if (res.status == 'success') {
        navigation.goBack();
        Alert.alert('Success', 'Message sent to Admin');
      }
    });
  };
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <View style={styles.middle}>
        <HeaderComp
          label="Support"
          leftIcon={
            <ArrowBack
              onPress={() => navigation.goBack()}
              name="left"
              size={20}
              color={'white'}
            />
          }
        />
        {/* <View style={styles.headerView}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'WorkSans-Medium',
              fontSize: 16,
            }}>
            Support
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
         
        </View> */}
        <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
          <Text style={{color: 'white', fontFamily: 'ArialMdm', marginTop: 20}}>
            Support
          </Text>
          <TextInput
            placeholder="Write here..."
            placeholderTextColor={'white'}
            textAlignVertical="top"
            value={desc}
            onChangeText={text => setDesc(text)}
            style={{
              backgroundColor: '#373A43',
              borderRadius: 20,
              padding: 20,
              fontFamily: 'ArialCE',
              marginTop: 10,
              height: 200,
            }}
          />

          <View style={{marginVertical: 40}}>
            <FillButton
              customColor="#FFBD00"
              customTextColor="white"
              Name="Upload Post"
              onPress={() => sendSupportMessage()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Support;
