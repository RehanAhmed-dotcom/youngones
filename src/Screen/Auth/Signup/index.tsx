import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import styles from './style';
import Input from '../../../Component/Input';

import {Formik} from 'formik';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Formik} from 'formik';
import FillButton from '../../../Component/FillButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {signUpValidationSchema} from '../../../lib/ValidationSchemas';
import {postApiwithFormData} from '../../../lib/Apis/api';
import Loader from '../../../Component/Loader';
// import {setPermanatEmail, setUser} from '../../../ReduxToolkit/MyUserSlice';
// import {useDispatch} from 'react-redux';
import {removeLandingPage, setUser} from '../../../ReduxToolkit/MyUserSlice';
// import Loader from '../../../Components/Loader';
// import {postApiWithSimplePayload} from '../../../Lib/api';
// import {loginValidationSchema} from '../../../Lib/ValidationSchemas';
const Signup = ({navigation}: {navigation: any}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  // const dispatch = useDispatch();
  const SignUp = (
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    refer: string,
  ) => {
    setShowModal(true);
    const formdata = new FormData();
    formdata.append('fullname', name);
    formdata.append('email', email);
    formdata.append('phone_no', phoneNumber);
    formdata.append('password', password);
    formdata.append('password_confirmation', password);
    formdata.append('type', 'buyer');
    postApiwithFormData({url: 'register'}, formdata)
      .then(res => {
        setShowModal(false);
        if (res.status == 'success') {
          navigation.navigate('BuyerVerification', {email});
          // navigation.navigate('MapScreen');
        } else {
          if (res.message.email) {
            Alert.alert('Error', res.message.email[0]);
          }
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
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        refer: '',
        remember: false,
      }}
      validateOnMount={true}
      onSubmit={values => {
        SignUp(
          values.name,
          values.email,
          values.phoneNumber,
          values.password,
          values.refer,
        );
      }}
      validationSchema={signUpValidationSchema}>
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
        <View style={styles.mainView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SellerSignup')}
            style={{
              width: '20%',
              height: 40,
              alignItems: 'center',
              backgroundColor: '#0E7DAF',
              justifyContent: 'center',
              borderRadius: 10,
              position: 'absolute',
              zIndex: 50,
              top: Platform.OS == 'ios' ? 30 : 10,
              right: 10,
            }}>
            <Text style={{color: 'white', fontFamily: 'WorkSans-Regular'}}>
              Seller
            </Text>
          </TouchableOpacity>
          <View style={styles.imageView}>
            <Wrapper behavior="padding" style={{flex: 1}}>
              <ScrollView
                style={{
                  width: '100%',
                  height: '100%',
                  // backgroundColor: 'red',
                }}>
                <View
                  style={[
                    styles.contextView,
                    {
                      marginTop:
                        Platform.OS == 'ios'
                          ? heightPercentageToDP(10)
                          : heightPercentageToDP(5),
                    },
                  ]}>
                  <View style={styles.loginContainer}>
                    <Text style={styles.signIn}>Hello!!!</Text>
                    <Text style={styles.nameText}>
                      SignUp to continue enjoying the service
                    </Text>
                    <View style={[styles.mainInputView, {marginTop: 30}]}>
                      <Input
                        label="Name"
                        placeholder="Full Name"
                        // value={email}
                        showBorder={true}
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        error={errors.name}
                        touched={touched.name}
                      />
                    </View>
                    {errors.name && touched.name && (
                      <Text style={styles.errors}>{errors.name}</Text>
                    )}
                    <View style={{height: 10}} />
                    <View style={styles.mainInputView}>
                      <Input
                        label="Email Address"
                        placeholder="Email"
                        // value={email}
                        showBorder={true}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={errors.email}
                        touched={touched.email}
                      />
                    </View>

                    {errors.email && touched.email && (
                      <Text style={styles.errors}>{errors.email}</Text>
                    )}
                    <View style={{height: 10}} />
                    <View style={styles.mainInputView}>
                      <Input
                        label="Phone Number"
                        placeholder="Contact Number"
                        // value={email}
                        showBorder={true}
                        type="Number"
                        value={values.phoneNumber}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        error={errors.phoneNumber}
                        touched={touched.phoneNumber}
                      />
                    </View>
                    {errors.phoneNumber && touched.phoneNumber && (
                      <Text style={styles.errors}>{errors.phoneNumber}</Text>
                    )}
                    <View style={{height: 10}} />
                    <Input
                      label="Password"
                      placeholder="Password"
                      value={values.password}
                      onBlur={handleBlur('password')}
                      secureText={!showPassword}
                      error={errors.password}
                      onChangeText={handleChange('password')}
                      touched={touched.password}
                      // onBlur={handleBlur('password')}
                      // secureText={!showPassword}
                      showBorder={true}
                      // error={errors.password}

                      // touched={touched.password}
                      secureToggle={() => setShowPassword(!showPassword)}
                      // image1={
                      //   <Image
                      //     source={require('../../../Assets/Images/password.png')}
                      //     style={styles.passwordImage}
                      //     resizeMode="contain"
                      //   />
                      // }
                      // image2={
                      //   showPassword ? (
                      //     <Image
                      //       source={require('../../../Assets/Images/show.png')}
                      //       style={styles.secureEye}
                      //       resizeMode="contain"
                      //       tintColor={'black'}
                      //     />
                      //   ) : (
                      //     <Image
                      //       source={require('../../../Assets/Images/dontShow.png')}
                      //       style={styles.secureEye}
                      //       resizeMode="contain"
                      //       tintColor={'black'}
                      //     />
                      //   )
                      // }
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errors}>{errors.password}</Text>
                    )}
                    <View style={{height: 10}} />
                    <View style={styles.mainInputView}>
                      <Input
                        label="Refer"
                        placeholder="Referral Number (optional)"
                        showBorder={true}
                        value={values.refer}
                        onChangeText={handleChange('refer')}
                        onBlur={handleBlur('refer')}
                        error={errors.refer}
                        touched={touched.refer}
                      />
                    </View>
                    {errors.refer && touched.refer && (
                      <Text style={styles.errors}>{errors.refer}</Text>
                    )}
                    {/* {errors.email && touched.email && (
                    <Text style={styles.errors}>{errors.email}</Text>
                  )} */}

                    <View style={styles.row}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',

                          alignItems: 'center',
                        }}
                        onPress={() =>
                          setFieldValue(
                            'remember',
                            !values.remember ? true : false,
                          )
                        }>
                        <CheckIcon
                          name={
                            !values.remember
                              ? 'checkbox-blank-outline'
                              : 'checkbox-marked'
                          }
                          size={20}
                          color={!values.remember ? 'grey' : '#10CE5C'}
                        />
                        <Text
                          style={{
                            color: 'grey',
                            fontFamily: 'WorkSans-Regular',
                            marginLeft: 5,
                          }}>
                          Remember me
                        </Text>
                      </TouchableOpacity>
                      {/* <Text style={{color: 'grey'}}>Forgot password?</Text> */}
                    </View>

                    <View style={styles.forgotView}>
                      {/* <Text
                  onPress={() => navigation.navigate('Signup')}
                  style={styles.forgotText}>
                  Don't have an account?{' '}
                  <Text style={styles.boldLastText}>Sign Up.</Text>
                </Text> */}
                      <View style={styles.bottomButtonView}>
                        <FillButton
                          //   disabled={!isValid}
                          customColor="#0F8BC2"
                          customTextColor="white"
                          Name="SignUp"
                          onPress={() => handleSubmit()}
                        />
                        <TouchableOpacity
                          onPress={() => navigation.navigate('Login')}>
                          <Text
                            onPress={() => navigation.navigate('Login')}
                            style={styles.boldLastText}>
                            Already have an account?
                            <Text style={styles.bold}> Sign In</Text>
                          </Text>
                        </TouchableOpacity>
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

export default Signup;
