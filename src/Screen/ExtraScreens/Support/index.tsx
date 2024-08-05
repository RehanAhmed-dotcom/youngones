import React, {useEffect, useState} from 'react';
import {FlatList, Platform, Text, TextInput, View} from 'react-native';
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
import {useSelector} from 'react-redux';
import BellIcon from 'react-native-vector-icons/FontAwesome';
import HeaderComp from '../../../Component/HeaderComp';
import FillButton from '../../../Component/FillButton';
const Support = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const [Description, setDescription] = useState('');
  const {top, bottom} = useSafeAreaInsets();
  const sendSupportMessage = () => {
    setDescription('');
    const formdata = new FormData();
    formdata.append('message', Description);
    postApiWithFormDataWithToken(
      {url: 'support', token: user?.api_token},
      formdata,
    ).then(res => {
      console.log('res of support', res);
      if (res.status == 'success') {
        navigation.goBack();
      }
    });
  };
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <View style={styles.middle}>
        <HeaderComp
          label="Support"
          backIcon={false}
          navigation={navigation}
          showBellIcon={true}
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
        <View style={{flex: 1}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'WorkSans-Medium',
              marginVertical: 20,
            }}>
            Support Message
          </Text>
          <TextInput
            placeholder="Tell us about your issue."
            placeholderTextColor={'grey'}
            textAlignVertical="top"
            value={Description}
            onChangeText={text => setDescription(text)}
            style={{
              height: 150,
              borderRadius: 10,
              padding: 15,
              marginBottom: 30,
              //   textAlignVertical: 'top',
              color: 'black',
              backgroundColor: '#F6F7F9',
            }}
          />
          <FillButton
            Name="Send Message"
            customColor="#46A4DF"
            customTextColor="white"
            onPress={() => sendSupportMessage()}
          />
        </View>
      </View>
    </View>
  );
};

export default Support;
