import React, {useEffect, useState} from 'react';
import {Image, Modal, Platform, Text, View} from 'react-native';
import HeaderComp from '../../../Component/HeaderComp';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import CrossIcon from 'react-native-vector-icons/Entypo';
import FillButton from '../../../Component/FillButton';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import InvoiceItems from '../../../Component/InvoiceItems';
const Invoice = ({navigation, route}) => {
  const {top} = useSafeAreaInsets();
  const {user} = useSelector(state => state.user);
  const [receiptData, setReceiptdata] = useState({});
  const [showModal, setShowModal] = useState(false);
  const {item} = route.params;
  const ShowInvoice = () => (
    <Modal
      animationType="slide"
      onRequestClose={() => setShowModal(!showModal)}
      transparent={true}
      visible={showModal}>
      <View
        style={{
          flex: 1,
          // height: hp(100),
          backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'center',

          zIndex: 200,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          // position: 'absolute',
        }}>
        <View>
          <View
            style={{
              width: widthPercentageToDP(90),
              // height: 300,
              // backgroundColor: 'red',
            }}>
            <View style={{alignItems: 'flex-end'}}>
              <CrossIcon
                name="cross"
                color={'white'}
                onPress={() => setShowModal(!showModal)}
                size={20}
              />
            </View>
            <View
              style={{
                marginTop: 30,
                width: widthPercentageToDP(90),
                // height: 20,
                borderRadius: 15,
                backgroundColor: '#373A43',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingTop: 20,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontFamily: 'Arial-Bold',
                    }}>
                    Job Invoice
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'ArialMdm',
                    }}>
                    UI/UX Designer
                  </Text>
                </View>
                <Icon name="briefcase-outline" size={30} color={'white'} />
              </View>
              <Image
                source={require('../../../Assets/Images/UiUx.png')}
                style={{height: 200, width: '100%', marginTop: 20}}
              />
              <View style={{backgroundColor: '#2D2D35', width: '100%'}}>
                <InvoiceItems
                  first={'Username'}
                  second={'John Travolta'}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Phone Number'}
                  second={'0333-XXXXXXX'}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Date'}
                  second={'24, Feburary, 2020'}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Working Hours'}
                  second={'3-5 hrs'}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Invoice ID'}
                  second={'IV93592'}
                  showBorder={true}
                />
                <InvoiceItems first={'Tax Fee'} second={'$100'} />
                <InvoiceItems first={'Servie Fee'} second={'$20'} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingTop: 20,
                  paddingBottom: 20,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Arial-Bold',
                  }}>
                  SubTotal
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Arial-Bold',
                  }}>
                  $120
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
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
      {ShowInvoice()}
    </View>
  );
};

export default Invoice;
