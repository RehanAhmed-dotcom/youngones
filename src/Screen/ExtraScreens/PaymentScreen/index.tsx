import React, {Component, useState} from 'react';
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
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
const PaymentScreen = ({navigation, route}) => {
  const {top} = useSafeAreaInsets();
  const {item} = route.params;
  const [cardNo, setCardNo] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [showModal, setShowModal] = useState(false);
  const {user} = useSelector(state => state.user);
  //   console.log('item', item);
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  const paymentApi = () => {
    setShowModal(true);
    const formdata = new FormData();
    formdata.append('email', user?.email);
    formdata.append('amount', item.pay);
    formdata.append('seller_email', item?.seller?.email);
    formdata.append('card_number', cardNo);
    formdata.append('cvv', cvc);
    formdata.append('expiry_month', month);
    formdata.append('expiry_year', year);
    formdata.append('order_id', item.id);
    postApiWithFormDataWithToken({url: 'pay', token: user?.api_token}, formdata)
      .then(res => {
        setShowModal(false);
        console.log('res', res);
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
        label="Payment"
        // backIcon={true}
        navigation={navigation}
        showBellIcon={true}
      />
      <Wrapper behavior="padding" style={{flex: 1}}>
        <ScrollView>
          <View
            style={{width: '90%', alignSelf: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../../Assets/Images/Card.png')}
              resizeMode="contain"
              style={{
                height: 300,
                width: 300,
                marginTop: heightPercentageToDP(5),
              }}
            />
            <Input
              label="Card Number"
              placeholder="Enter Card"
              type="Number"
              showBorder={true}
              value={cardNo}
              onChangeText={text => setCardNo(text)}
              //   onBlur={handleBlur('refer')}
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
              <View style={{width: '45%'}}>
                <Input
                  label="Expiry Month"
                  placeholder="Enter Month"
                  type="Number"
                  showBorder={true}
                  value={month}
                  onChangeText={text => setMonth(text)}
                  //   onBlur={handleBlur('refer')}
                  //   error={errors.refer}
                  //   touched={touched.refer}
                />
              </View>
              <View style={{width: '45%'}}>
                <Input
                  label="Expiry Year"
                  placeholder="Enter Year"
                  showBorder={true}
                  type="Number"
                  value={year}
                  onChangeText={text => setYear(text)}
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
              <View style={{width: '45%'}}>
                <Input
                  label="CVV"
                  placeholder="Enter cvv"
                  showBorder={true}
                  type="Number"
                  value={cvc}
                  onChangeText={text => setCvc(text)}
                  //   onBlur={handleBlur('refer')}
                  //   error={errors.refer}
                  //   touched={touched.refer}
                />
              </View>
            </View>
            <View style={{width: '100%', marginVertical: 30}}>
              <FillButton
                customColor="#0E7DAF"
                Name="Pay Now"
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

export default PaymentScreen;
