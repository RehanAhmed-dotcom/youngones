import React, {useState} from 'react';
import {
  Platform,
  Modal,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderComp from '../../../Component/HeaderComp';
import DocumentIcon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FillButton from '../../../Component/FillButton';
import CrossIcon from 'react-native-vector-icons/Entypo';
import Input from '../../../Component/Input';
import {useSelector} from 'react-redux';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
const PersonalBalance = ({navigation, route}) => {
  const {top, bottom} = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const [withdraw, setWithdraw] = useState('');
  const {user} = useSelector(state => state.user);
  const {price} = route.params;
  const paymentApi = () => {
    // setShowModal(true);
    const formdata = new FormData();
    formdata.append('email', user?.email);

    formdata.append('amount', withdraw);
    // formdata.append('bank_code', bankCode);
    // formdata.append('account_number', bankAccount);

    postApiWithFormDataWithToken(
      {url: 'withdraw', token: user?.api_token},
      formdata,
    )
      .then(res => {
        setShowModal(false);
        navigation.goBack();
        console.log('res of widthdraaw', res);
        if (res.status == 'success') {
          // navigation.navigate('PaystackWebview', {url: res.authorization_url});
        }
      })
      .catch(err => {
        setShowModal(false);
        console.log('err', err);
      });
  };
  const MyModal = () => {
    return (
      <Modal
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
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
          <View
            style={{
              // height: 50,
              width: '90%',
              // backgroundColor:"red",
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <View
              style={{
                alignItems: 'flex-end',
                width: '100%',
                marginRight: 10,
                marginTop: 10,
              }}>
              <CrossIcon
                name="circle-with-cross"
                onPress={() => setShowModal(false)}
                size={20}
                color={'black'}
              />
            </View>
            <Text
              style={{
                color: 'black',
                marginTop: 50,
                fontFamily: 'WorkSans-Medium',
              }}>
              WithDraw Amount
            </Text>
            <View style={{width: '90%', marginTop: 30}}>
              <Input
                value={withdraw}
                onChangeText={text => setWithdraw(text)}
                placeholder="Enter Withdraw Amount"
                label="Withdraw Amount"
                type="Number"
              />
            </View>
            <View style={{width: '90%', marginVertical: 100}}>
              <FillButton
                Name="Withdraw"
                customColor="#46A4DF"
                customTextColor="white"
                onPress={() => {
                  paymentApi();
                }}
              />
              <View style={{marginTop: 30}}>
                <FillButton
                  Name="Cancel"
                  customColor="#F6F7F9"
                  onPress={() => setShowModal(false)}
                />
              </View>
            </View>

            {/* <ActivityIndicator size="small" color={'#0F8BC2'} /> */}
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <View style={{flex: 1, paddingTop: Platform.OS == 'ios' ? top : 0}}>
      <HeaderComp
        label="Personal Balance"
        navigation={navigation}
        backIcon={false}
      />
      <View
        style={{
          width: '90%',
          //   backgroundColor: 'red',
          flex: 1,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'WorkSans-Medium',
            fontSize: 16,
            marginTop: 20,
            color: 'black',
          }}>
          Wallet
        </Text>
        <View
          style={{
            backgroundColor: '#E7F3F9',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            width: '100%',
            borderRadius: 5,
            marginTop: 20,
          }}>
          <View>
            <Text style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
              Total Earning
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'WorkSans-Medium',
                marginTop: 20,
                fontSize: 20,
              }}>
              ₦{price}
            </Text>
          </View>
          <View
            style={{
              height: 50,
              width: 100,
              borderRadius: 15,
              // backgroundColor: 'white',
              position: 'absolute',
              right: 10,
              bottom: 10,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FillButton
              Name="Withdraw"
              customColor="#46A4DF"
              customTextColor="white"
              onPress={() => setShowModal(true)}
            />
            {/* <DocumentIcon
              name="document-text-outline"
              size={20}
              color={'black'}
            /> */}
          </View>
        </View>
        <Text
          style={{
            color: 'black',
            marginTop: 10,
            lineHeight: 30,
            fontFamily: 'WorkSans-Regular',
          }}>
          Like to earn more? Refer people you know and everyone benefits
        </Text>
        {/* <View style={{backgroundColor: '#E7F3F9'}}>
          <Text
            style={{
              color: 'black',
              marginTop: 10,
              marginLeft: 10,
              fontFamily: 'WorkSans-Regular',
            }}>
            Invite Friends to earn{' '}
            <Text style={{color: '#077D45', fontFamily: 'WorkSans-SemiBold'}}>
              N50
            </Text>
          </Text>
          <Text
            style={{
              color: 'black',
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 10,
              fontFamily: 'WorkSans-Regular',
            }}>
            Send the link to your contacts.
          </Text>
        </View> */}
      </View>
      {MyModal()}
    </View>
  );
};

export default PersonalBalance;
