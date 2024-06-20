import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style';
import CalenderIcon from 'react-native-vector-icons/Entypo';
import Input from '../../../Component/Input';
import FillButton from '../../../Component/FillButton';
import DropDown from '../../../Component/DropDown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import {sellerBVNValidationSchema} from '../../../lib/ValidationSchemas';
// import {useDispatch, useSelector} from 'react-redux';
import {
  getApiwithOutToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
import {setUser, setVerification} from '../../../ReduxToolkit/MyUserSlice';
import Loader from '../../../Component/Loader';
import {heightPercentageToDP} from 'react-native-responsive-screen';
const BVNVerificationSeller = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const item = route?.params?.item;
  // console.log('item hello', item);
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [bankArray, setBankArray] = useState([]);
  const [code, setCode] = useState('');
  const items = [
    {id: 1, label: 'Apple', value: 'apple'},
    {id: 2, label: 'Banana', value: 'banana'},
    {id: 3, label: 'Cherry', value: 'cherry'},
  ];
  const handleValueChange = (value: any) => {
    // console.log('Selected value:', value());
  };
  const handleWholeItem = (value: any) => {
    // console.log('item', value);
  };
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const items1 = [
    {id: 1, label: 'Male', value: 'Maale'},
    {id: 2, label: 'Female', value: 'Female'},
  ];
  const handleValueChange1 = (value: any) => {
    // console.log('Selected value:', value());
  };
  const handleWholeItem1 = (value: any) => {
    // console.log('item', value);
  };

  const [email, setEmail] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    // console.warn('A date has been picked: ', date);
    setDate(moment(date).format('DD-MM-YYYY'));

    hideDatePicker();
  };
  useEffect(() => {
    getApiwithOutToken({url: 'all_bank'}).then(res => {
      const arr = res.data;
      // console.log('resof bank', res);
      const dropdownArray = arr.map(item => {
        return {
          id: item.id,
          label: item.name,
          value: item.name,
          code: item.code,
        };
      });
      // console.log('hello', dropdownArray);
      setBankArray(dropdownArray);
    });
  }, []);
  // console.log(bankArray.length);
  // const {user} = useSelector(state => state.user);
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const bvnAdd = (
    fulname: string,
    bankName: string,
    bankDetail: string,
    bvnNumber: string,
    gender: string,
    dob: string,
  ) => {
    setShowModal(true);
    const formdata = new FormData();
    const formdata1 = new FormData();
    formdata1.append('subAccountName', user.fullname);
    formdata1.append('bankName', bankName);
    formdata1.append('bankCode', code);
    formdata1.append('account_no', bankDetail);
    // formdata.append('fullname', fulname);
    formdata.append('bank_name', bankName);
    formdata.append('account_no', bankDetail);
    formdata.append('bvn_no', bvnNumber);
    formdata.append('gender', gender);
    formdata.append('dob', dob);
    postApiWithFormDataWithToken(
      {url: 'create-sub-account', token: user?.api_token},
      formdata1,
    ).then(res => {
      console.log('res of sub', res);
    });
    postApiWithFormDataWithToken(
      {url: 'edit', token: user?.api_token},
      formdata,
    )
      .then(res => {
        setShowModal(false);
        if (res.status == 'success') {
          // dispatch(setUser(res.userdata));
          // navigation.navigate('SellerBottomTab');
          dispatch(setUser(res.userdata));
          //   dispatch(setVerification(true));
          navigation.goBack();
          console.log('res of edit', res);
        }
      })
      .catch(err => {
        setShowModal(false);
        console.log('err in login', err);
      });
  };
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  return (
    <Formik
      initialValues={{
        fullName: user?.fullname,
        bankName: user?.bank_name,
        bankDetails: user?.account_no,
        bvnNumber: user?.bvn_no,
        gender: user?.gender,
        dob: user?.dob,
      }}
      validateOnMount={true}
      onSubmit={values => {
        bvnAdd(
          values.fullName,
          values.bankName,
          values.bankDetails,
          values.bvnNumber,
          values.gender,
          values.dob,
        );
        // navigation.navigate('SellerBottomTab');
        // console.log('hello', values);
      }}
      validationSchema={sellerBVNValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
        setFieldValue,
      }) => (
        <View
          style={[
            styles.mainView,
            {paddingTop: Platform.OS == 'ios' ? top : 0},
          ]}>
          <View style={styles.imageView}>
            <Wrapper behavior="padding" style={{flex: 1}}>
              <ScrollView
                style={{
                  width: '100%',
                  height: '100%',
                }}>
                <View style={styles.contextView}>
                  <View style={styles.loginContainer}>
                    <Text style={styles.signIn}>BVN Verification</Text>
                    <Text style={styles.nameText}>
                      Complete setting up your account
                    </Text>
                    <View style={{height: 30}} />
                    <View style={styles.mainInputView}>
                      <Input
                        label="Full Name"
                        placeholder="Alexander Tobi"
                        // value={email}
                        // onChangeText={(text: any) => setEmail(text)}
                        showBorder={true}
                        value={values.fullName}
                        nonEditable={true}
                        onChangeText={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                        error={errors.fullName}
                        touched={touched.fullName}
                        //   onBlur={handleBlur('email')}
                        //   error={errors.email}
                        //   touched={touched.email}
                      />
                    </View>
                    {errors.fullName && touched.fullName && (
                      <Text style={styles.errors}>{errors.fullName}</Text>
                    )}
                    <View
                      style={[
                        styles.mainInputView,
                        {marginTop: 20, height: !open ? 80 : 250},
                      ]}>
                      <DropDown
                        open={open}
                        value={values.bankName}
                        label="Bank Name"
                        placeholder="Name of Bank"
                        setOpen={setOpen}
                        setValue={setValue}
                        items={bankArray}
                        onChange={handleValueChange}
                        selectItem={value => {
                          setFieldValue('bankName', value.value);
                          setCode(value.code);
                        }}
                        containerStyle={styles.dropdownContainer}
                        itemStyle={styles.dropdownItem}
                        dropDownStyle={styles.dropdown}
                      />
                    </View>
                    {errors.bankName && touched.bankName && (
                      <Text style={styles.errors}>{errors.bankName}</Text>
                    )}
                    <View style={{height: 10}} />
                    <View style={styles.mainInputView}>
                      <Input
                        label="Bank Details"
                        placeholder="Account No"
                        showBorder={true}
                        type="Number"
                        value={values.bankDetails}
                        onChangeText={handleChange('bankDetails')}
                        onBlur={handleBlur('bankDetails')}
                        error={errors.bankDetails}
                        touched={touched.bankDetails}
                        // value={email}
                        // onChangeText={(text: any) => setEmail(text)}
                        //   onBlur={handleBlur('email')}
                        //   error={errors.email}
                        //   touched={touched.email}
                      />
                    </View>
                    {errors.bankDetails && touched.bankDetails && (
                      <Text style={styles.errors}>{errors.bankDetails}</Text>
                    )}
                    <View style={{height: 10}} />
                    <View style={styles.mainInputView}>
                      <Input
                        label="BVN Number"
                        placeholder="BVN"
                        showBorder={true}
                        value={values.bvnNumber}
                        type="Number"
                        onChangeText={handleChange('bvnNumber')}
                        onBlur={handleBlur('bvnNumber')}
                        error={errors.bvnNumber}
                        touched={touched.bvnNumber}
                        // value={email}
                        // onChangeText={(text: any) => setEmail(text)}
                        //   onBlur={handleBlur('email')}
                        //   error={errors.email}
                        //   touched={touched.email}
                      />
                    </View>
                    {errors.bvnNumber && touched.bvnNumber && (
                      <Text style={styles.errors}>{errors.bvnNumber}</Text>
                    )}
                    <View
                      style={[
                        styles.mainInputView,
                        {marginTop: 20, height: !open1 ? 80 : 200},
                      ]}>
                      <DropDown
                        open={open1}
                        value={values.gender}
                        label="Gender"
                        placeholder="Gender"
                        setOpen={setOpen1}
                        setValue={setValue1}
                        items={items1}
                        onChange={handleValueChange1}
                        selectItem={value => {
                          setFieldValue('gender', value.value);
                        }}
                        containerStyle={styles.dropdownContainer}
                        itemStyle={styles.dropdownItem}
                        dropDownStyle={styles.dropdown}
                      />
                    </View>
                    {errors.gender && touched.gender && (
                      <Text style={styles.errors}>{errors.gender}</Text>
                    )}
                    <View style={{height: 10}} />
                    <TouchableOpacity
                      onPress={() => showDatePicker()}
                      style={styles.mainInputView}>
                      <Input
                        label="Date of Birth"
                        placeholder="Select date"
                        nonEditable={true}
                        showBorder={true}
                        value={values.dob}
                        // onChangeText={(text: any) => setEmail(text)}
                        image2={
                          // <Image
                          //   style={styles.secureEye}
                          //   resizeMode="contain"
                          //   source={require('../../../Assets/Images/show.png')}
                          // />
                          <CalenderIcon
                            name="calendar"
                            color={'#131617'}
                            size={20}
                          />
                        }

                        //   onBlur={handleBlur('email')}
                        //   error={errors.email}
                        //   touched={touched.email}
                      />
                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={date => {
                          setFieldValue(
                            'dob',
                            moment(date).format('DD-MM-YYYY'),
                          );
                          hideDatePicker();
                        }}
                        onCancel={hideDatePicker}
                      />
                    </TouchableOpacity>
                    {errors.dob && touched.dob && (
                      <Text style={styles.errors}>{errors.dob}</Text>
                    )}
                    <View style={styles.forgotView}>
                      <View style={styles.bottomButtonView}>
                        <FillButton
                          //   disabled={!isValid}
                          customColor="#0F8BC2"
                          customTextColor="white"
                          Name="Proceed"
                          onPress={() => handleSubmit()}
                        />
                      </View>
                      <View
                        style={[
                          styles.bottomButtonView,
                          {
                            marginBottom: heightPercentageToDP(5),
                            marginVertical: 0,
                          },
                        ]}>
                        {/* <FillButton
                          //   disabled={!isValid}
                          // customColor="#0F8BC2"
                          // customTextColor="white"
                          customColor="#ccc"
                          customTextColor="white"
                          Name="Skip"
                          onPress={() => {
                            dispatch(setUser(item.userdata));
                            dispatch(setVerification(true));
                          }}
                        /> */}
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </Wrapper>
          </View>
          {Loader({show: showModal})}
        </View>
      )}
    </Formik>
  );
};

export default BVNVerificationSeller;
