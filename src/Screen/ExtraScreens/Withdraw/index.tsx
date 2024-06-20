import React, {Component, useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import HeaderComp from '../../../Component/HeaderComp';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Input from '../../../Component/Input';
import FillButton from '../../../Component/FillButton';
import Loader from '../../../Component/Loader';
import {
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
const Withdraw = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  //   const {item} = route.params;
  const [data, setData] = useState({});
  const [bankAccount, setBankAccount] = useState(data.account_no);
  const [bankCode, setBankCode] = useState(data.bankCode);
  const [bankName, setBankName] = useState(data.bankName);
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const {user} = useSelector(state => state.user);
  useEffect(() => {
    getApiwithToken({url: 'subAccountDetail', token: user?.api_token}).then(
      res => {
        console.log('res of sub', res);
        setData(res.data);
      },
    );
  }, []);

  //   console.log('item', item);
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  const paymentApi = () => {
    setShowModal(true);
    const formdata = new FormData();
    formdata.append('email', user?.email);

    formdata.append('amount', amount);
    // formdata.append('bank_code', bankCode);
    // formdata.append('account_number', bankAccount);

    postApiWithFormDataWithToken(
      {url: 'withdraw', token: user?.api_token},
      formdata,
    )
      .then(res => {
        setShowModal(false);
        console.log('res of widthdraaw', res);
        if (res.status == 'success') {
          navigation.navigate('PaystackWebview', {url: res.authorization_url});
        }
      })
      .catch(err => {
        setShowModal(false);
        console.log('err', err);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS == 'ios' ? top : 0,
        backgroundColor: 'white',
      }}>
      <HeaderComp
        label="Withdraw"
        // backIcon={true}
        navigation={navigation}
        showBellIcon={true}
      />
      <Wrapper behavior="padding" style={{flex: 1}}>
        <ScrollView>
          <View
            style={{width: '90%', alignSelf: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../../Assets/Images/Transfer.png')}
              resizeMode="contain"
              style={{
                height: 300,
                width: 300,
                marginTop: heightPercentageToDP(5),
              }}
            />
            <Input
              label="Bank Account Number"
              placeholder="Enter Account"
              type="Number"
              showBorder={true}
              value={data.account_no}
              onChangeText={text => setBankAccount(text)}
              //   onBlur={handleBlur('refer')}
              nonEditable={true}
              //   error={errors.refer}
              //   touched={touched.refer}
            />
            <View style={{height: 10}} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '100%'}}>
                <Input
                  label="Enter Bank Name"
                  placeholder="Enter Bank Name"
                  type="Number"
                  showBorder={true}
                  value={data.bankName}
                  nonEditable={true}
                  onChangeText={text => setBankCode(text)}
                  //   onBlur={handleBlur('refer')}
                  //   error={errors.refer}
                  //   touched={touched.refer}
                />
              </View>
            </View>
            <View style={{height: 10}} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '100%'}}>
                <Input
                  label="Enter Bank Code"
                  placeholder="Enter Code"
                  type="Number"
                  showBorder={true}
                  value={data.bankCode}
                  onChangeText={text => setBankCode(text)}
                  //   onBlur={handleBlur('refer')}
                  nonEditable={true}
                  //   error={errors.refer}
                  //   touched={touched.refer}
                />
              </View>
            </View>
            <View style={{height: 10}} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '100%'}}>
                <Input
                  label="Amount"
                  placeholder="Enter amount"
                  showBorder={true}
                  type="Number"
                  value={amount}
                  onChangeText={text => setAmount(text)}
                  //   onBlur={handleBlur('refer')}
                  //   error={errors.refer}
                  //   touched={touched.refer}
                />
              </View>
            </View>
            <View style={{width: '100%', marginVertical: 30}}>
              <FillButton
                customColor="#0E7DAF"
                Name="Withdraw"
                customTextColor="white"
                onPress={() => paymentApi()}
              />
            </View>
          </View>
        </ScrollView>
      </Wrapper>
      {Loader({show: showModal})}
    </View>
  );
};

export default Withdraw;
