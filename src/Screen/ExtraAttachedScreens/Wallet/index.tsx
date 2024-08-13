import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import styles from './style';
import CrossIcon from 'react-native-vector-icons/Entypo';
import {Formik} from 'formik';
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowBack from 'react-native-vector-icons/AntDesign';
import FillButton from '../../../Component/FillButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {sellerSignUpValidationSchema} from '../../../lib/ValidationSchemas';
import Loader from '../../../Component/Loader';
import HeaderComp from '../../../Component/HeaderComp';
import ExpertiseItem from '../../../Component/ExpertiseItem';
import InterestItem from '../../../Component/InterestItem';
import {
  singlePostPopularData,
  singlePostRecentData,
  suggestedPeoples,
} from '../../../Component/dummyData';
import SinglePost from '../../../Component/SinglePost';
import People from '../../../Component/People';
import {getApiwithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';

const Wallet = ({navigation}: {navigation: any}) => {
  const [showModal, setShowModal] = useState(false);
  const {user} = useSelector(state => state.user);
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        backgroundColor: '#373A43',
        marginBottom: 15,
        padding: 10,
        borderRadius: 15,
        flexDirection: 'row',
        elevation: 1,
        shadowColor: '#FAFAFA',
        // shadowColor: '#000', // Shadow color
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../../../Assets/Images/Facebook.png')}
          style={{height: 50, width: 50}}
        />
        <Text style={{color: 'white', marginLeft: 20, fontFamily: 'ArialMdm'}}>
          UI/UX Designer
        </Text>
      </View>
      <Text style={{color: '#FFBD00', fontFamily: 'ArialMdm'}}>$100</Text>
    </TouchableOpacity>
  );
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
              backgroundColor: '#2D2D35',
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
                color={'white'}
              />
            </View>
            <Text
              style={{
                color: 'white',
                marginTop: 50,
                fontSize: 16,
                fontFamily: 'Arial-Bold',
              }}>
              WithDraw Amount
            </Text>
            <View style={{width: '90%', marginTop: 30}}>
              <Input
                // value={withdraw}
                // onChangeText={text => setWithdraw(text)}
                placeholder="Enter Withdraw Amount"
                label="Withdraw Amount"
                type="Number"
              />
            </View>
            <View style={{width: '90%', marginVertical: 100}}>
              <FillButton
                Name="Withdraw"
                customColor="#FFBD00"
                customTextColor="white"
                onPress={() => {
                  // paymentApi();
                }}
              />
              <View style={{marginTop: 30}}>
                <FillButton
                  Name="Cancel"
                  customColor="#2D2D35"
                  customTextColor="white"
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
  const data = [1, 2, 3, 4];
  useEffect(() => {
    getApiwithToken({url: 'myWallet', token: user?.api_token}).then(res => {
      console.log('res of wallet', res);
    });
  }, []);
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        // leftIcon={<ArrowBack name="left" size={20} color={'white'} />}
        label="Wallet"
        // mid={
        //   <TouchableOpacity
        //     onPress={() => navigation.navigate('Account')}
        //     style={{flexDirection: 'row', alignItems: 'center'}}>
        //     <Image
        //       source={require('../../../Assets/Images/profile.png')}
        //       style={{height: 30, width: 30, borderRadius: 20}}
        //     />
        //     <Text style={{color: 'white', marginLeft: 5, fontSize: 16}}>
        //       John Travolta
        //     </Text>
        //   </TouchableOpacity>
        // }
        // rightIcon={
        //   <Image
        //     source={require('../../../Assets/Images/Notification.png')}
        //     style={{height: 20, width: 20}}
        //     resizeMode="contain"
        //   />
        // }
      />
      <ScrollView>
        <View style={styles.imageView}>
          <View style={{width: '90%'}}>
            <View
              style={{
                height: 100,
                width: '100%',
                overflow: 'hidden',
                borderRadius: 20,
                marginBottom: 20,
                // backgroundColor: 'red',
              }}>
              <ImageBackground
                source={require('../../../Assets/Images/gradient.png')}
                style={{height: 100, width: '100%', borderRadius: 20}}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    marginTop: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginLeft: 20,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,

                      fontFamily: 'ArialCE',
                    }}>
                    Current Balance
                  </Text>
                  <View
                    style={{
                      width: '30%',
                      top: 10,
                      position: 'absolute',
                      right: 15,
                    }}>
                    <FillButton
                      customColor="#FFBD00"
                      customTextColor="white"
                      Name="Withdraw"
                      onPress={() => setShowModal(true)}
                      midButton={true}
                    />
                  </View>
                </View>

                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'Arial-Bold',
                    marginTop: 20,
                    marginLeft: 20,
                  }}>
                  $8000.00
                </Text>
              </ImageBackground>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                Earned from jobs
              </Text>
              {/* <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text> */}
            </View>
            <FlatList
              data={data}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
            <View style={{height: 100}} />
          </View>
        </View>
      </ScrollView>
      {MyModal()}
    </View>
  );
};

export default Wallet;
