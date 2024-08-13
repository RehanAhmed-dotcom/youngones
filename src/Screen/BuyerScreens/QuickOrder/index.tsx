import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style';
import ImagePlaceholder from 'react-native-vector-icons/Ionicons';
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Formik} from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import FillButton from '../../../Component/FillButton';
import DropDown from '../../../Component/DropDown';
import HeaderComp from '../../../Component/HeaderComp';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
// import {useSelector} from 'react-redux';
import moment from 'moment';
import Loader from '../../../Component/Loader';
import LoginLoader from '../../../Component/LoginLoader';
const QuickOrder = ({navigation}: {navigation: any}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [bank, setBank] = useState('');

  const handleValueChange = (value: any) => {
    // console.log('Selected value:', value());
  };
  const handleWholeItem = (value: any) => {
    // console.log('item', value);
    setBank(value.id);
  };
  // const {user} = useSelector(state => state.user);
  // console.log('user', user);
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState(user?.address);
  const [Description, setDescription] = useState('');
  const [categoryArray, setCategoryArray] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [loadingModal, setLoadingModal] = useState(false);
  const alterModal = () => {
    setLoadingModal(!loadingModal);
  };

  useEffect(() => {
    getApiwithToken({url: 'buyerHome', token: user?.api_token}).then(res => {
      const arr = res.allServices;
      const dropdownArray = arr.map(item => {
        return {
          id: item.id,
          label: item.serviceName,
          value: item.serviceName,
        };
      });
      // console.log('hello', arr);
      setCategoryArray(dropdownArray);
    });
  }, []);
  const quickOrder = () => {
    setShowModal(true);
    const formData = new FormData();
    formData.append('seller_id', bank);
    formData.append('pay', amount);
    formData.append('date', moment().format('YYYY-MM-DD'));
    formData.append('time', moment().format('hh:mm A'));
    formData.append('address', address);
    formData.append('description', Description);
    postApiWithFormDataWithToken(
      {url: 'quickOrder', token: user?.api_token},
      formData,
    )
      .then(res => {
        setShowModal(false);
        console.log('res', res);
        if (res.status == 'success') {
          navigation.goBack();
        }
      })
      .catch(err => {
        setShowModal(false);
      });
  };
  const navigationFunc = () => {
    navigation.navigate('Signup');
    setLoadingModal(false);
  };
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <View style={styles.imageView}>
        <View style={{width: '100%'}}>
          <HeaderComp
            label="Quick Order"
            navigation={navigation}
            backIcon={false}
          />
        </View>
        <Wrapper behavior="padding" style={{flex: 1}}>
          <ScrollView
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View style={styles.contextView}>
              <View style={styles.loginContainer}>
                <View
                  style={[
                    styles.mainInputView,
                    {marginTop: 20, height: open ? 250 : 80},
                  ]}>
                  <DropDown
                    open={open}
                    value={value}
                    label="Services"
                    setOpen={setOpen}
                    setValue={setValue}
                    placeholder="Which Service"
                    items={categoryArray}
                    onChange={handleValueChange}
                    selectItem={handleWholeItem}
                    containerStyle={styles.dropdownContainer}
                    itemStyle={styles.dropdownItem}
                    dropDownStyle={styles.dropdown}
                  />
                </View>
                <View style={[styles.mainInputView, {marginTop: 10}]}>
                  <Input
                    label="How much do you want to pay?"
                    placeholder="1,000.00"
                    value={amount}
                    onChangeText={text => setAmount(text)}
                    type="Number"
                    //   onBlur={handleBlur('email')}
                    //   error={errors.email}
                    //   touched={touched.email}
                  />
                </View>
                <View style={[styles.mainInputView, {marginTop: 10}]}>
                  <Input
                    label="Address"
                    placeholder="Enter Address"
                    value={address}
                    onChangeText={text => setAddress(text)}
                    //   onBlur={handleBlur('email')}
                    //   error={errors.email}
                    //   touched={touched.email}
                  />
                </View>
                <View style={styles.mainInputView}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'WorkSans-Medium',
                      marginVertical: 20,
                    }}>
                    Description
                  </Text>
                  <TextInput
                    placeholder="Tell us about what you want."
                    placeholderTextColor={'grey'}
                    textAlignVertical="top"
                    multiline
                    value={Description}
                    onChangeText={text => setDescription(text)}
                    style={{
                      height: 150,
                      borderRadius: 10,
                      padding: 15,
                      color: 'white',
                      backgroundColor: '#F6F7F9',
                    }}
                  />
                </View>
                <View style={styles.forgotView}>
                  <View style={styles.bottomButtonView}>
                    <FillButton
                      //   disabled={!isValid}
                      customColor="#0F8BC2"
                      customTextColor="white"
                      Name="Post Order"
                      onPress={() =>
                        !user?.type ? setLoadingModal(true) : quickOrder()
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </Wrapper>
      </View>
      <LoginLoader
        show={loadingModal}
        hideModal={alterModal}
        navigationFunc={navigationFunc}
      />
      {/* {LoginLoader({show: loadingModal, hideModal: alterModal(), navigation})} */}
      {Loader({show: showModal})}
    </View>
  );
};

export default QuickOrder;
