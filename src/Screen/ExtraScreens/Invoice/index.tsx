import React, {useEffect, useState} from 'react';
import {Platform, Text, View} from 'react-native';
import HeaderComp from '../../../Component/HeaderComp';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import FillButton from '../../../Component/FillButton';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';

const Invoice = ({navigation, route}) => {
  const {top} = useSafeAreaInsets();
  const {user} = useSelector(state => state.user);
  const [receiptData, setReceiptdata] = useState({});
  const {item} = route.params;
  const getReceiptData = () => {
    const formData = new FormData();
    formData.append('id', item.redirect);
    postApiWithFormDataWithToken(
      {url: 'seeInvoice', token: user.api_token},
      formData,
    ).then(res => {
      console.log('data of invoice', res);
      setReceiptdata(res.data);
    });
  };
  useEffect(() => {
    getReceiptData();
  }, []);
  return (
    <View style={{flex: 1, paddingTop: Platform.OS == 'ios' ? top : 0}}>
      <HeaderComp
        label="Receipt"
        navigation={navigation}
        showBellIcon={true}
        backIcon={false}
      />
      <View
        style={{
          width: '90%',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
          alignSelf: 'center',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',

            width: '100%',
          }}>
          <Text style={{color: 'black'}}>Seller Name</Text>
          <Text style={{color: 'black'}}>{user.fullname}</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            width: '100%',
          }}>
          <Text style={{color: 'black'}}>Bank Name</Text>
          <Text style={{color: 'black'}}>{receiptData?.bank_name}</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            width: '100%',
          }}>
          <Text style={{color: 'black'}}>Bank Code</Text>
          <Text style={{color: 'black'}}>{receiptData?.bank_code}</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            width: '100%',
          }}>
          <Text style={{color: 'black'}}>Account Number</Text>
          <Text style={{color: 'black'}}>{receiptData?.account_no}</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginTop: 20,
          }}>
          <Text style={{color: 'black'}}>Status</Text>
          <Text style={{color: 'black'}}>{receiptData?.status}</Text>
        </View>
      </View>
      <View
        style={{
          width: '90%',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
          marginTop: 30,
          alignSelf: 'center',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginTop: 0,
          }}>
          <Text style={{color: 'black'}}>Amount</Text>
          <Text style={{color: 'black'}}>₦{receiptData?.amount}</Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          alignSelf: 'center',
          marginTop: 50,
        }}>
        <FillButton
          Name="Close"
          customColor="#46A4DF"
          customTextColor="white"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default Invoice;
