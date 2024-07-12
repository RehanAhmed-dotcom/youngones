import React, {useState} from 'react';
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
} from 'react-native';
import styles from './style';
import {Formik} from 'formik';
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Formik} from 'formik';
import FillButton from '../../../Component/FillButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  sellerSignUpValidationSchema,
  signUpValidationSchema,
} from '../../../lib/ValidationSchemas';
// import {postApiwithFormData} from '../../../lib/Apis/api';

// import {setPermanatEmail, setUser} from '../../../ReduxToolkit/MyUserSlice';
// import {useDispatch} from 'react-redux';
// import {setUser} from '../../../ReduxToolkit/MyUserSlice';
import Loader from '../../../Component/Loader';
import HeaderComp from '../../../Component/HeaderComp';
import {postApiwithFormData} from '../../../lib/Apis/api';
// import Loader from '../../../Components/Loader';
// import {postApiWithSimplePayload} from '../../../Lib/api';
// import {loginValidationSchema} from '../../../Lib/ValidationSchemas';
const SellerSignup = ({navigation}: {navigation: any}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  // const dispatch = useDispatch();

  const [showPasswordCon, setShowPasswordCon] = useState(false);
  const [check, setCheck] = useState(false);
  const SignUp = (
    name: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
  ) => {
    setShowModal(true);
    const formdata = new FormData();
    formdata.append('firstname', name);
    formdata.append('lastname', lastName);
    formdata.append('email', email);
    formdata.append('phone_no', phoneNumber);
    formdata.append('password', password);
    formdata.append('password_confirmation', confirmPassword);
    // formdata.append('type', 'seller');
    // console.log('hello');
    //
    postApiwithFormData({url: 'register'}, formdata)
      .then(res => {
        console.log('redd', res);
        setShowModal(false);
        if (res.status == 'success') {
          // dispatch(setUser(res.userdata));
          //  console.log("res ")
          navigation.navigate('EnterValidationChoice');
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
  const ErrorAlert = () => {
    Alert.alert('Error', 'Please check Terms and conditions');
  };
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  return (
    <Formik
      initialValues={{
        name: '',
        lastname: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
      }}
      validateOnMount={true}
      onSubmit={values => {
        // navigation.navigate('SellerVerification');
        SignUp(
          values.name,
          values.lastname,
          values.email,
          values.phoneNumber,
          values.password,
          values.confirmPassword,
        );
        // console.log('hello', values);
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
        <View
          style={[
            styles.mainView,
            {paddingTop: Platform.OS == 'ios' ? top : 0},
          ]}>
          <HeaderComp label="Sign Up" />
          <View style={styles.imageView}>
            <Wrapper behavior="padding" style={{flex: 1}}>
              <ScrollView
                style={{
                  width: '100%',
                  height: '100%',
                  flex: 1,
                }}>
                <View style={styles.contextView}>
                  <View style={styles.loginContainer}>
                    <Text style={styles.signIn}>
                      Hello, welcome back to our account
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <View
                        style={[
                          styles.mainInputView,
                          {marginTop: 30, width: '45%'},
                        ]}>
                        <Input
                          label="First Name"
                          placeholder="Enter Name"
                          // value={email}
                          // onChangeText={text => setEmail(text)}
                          showBorder={true}
                          value={values.name}
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          error={errors.name}
                          touched={touched.name}
                          //   onBlur={handleBlur('email')}
                          //   error={errors.email}
                          //   touched={touched.email}
                        />
                      </View>
                      <View
                        style={[
                          styles.mainInputView,
                          {marginTop: 30, width: '45%'},
                        ]}>
                        <Input
                          label="Last Name"
                          placeholder="Enter Name"
                          // value={email}
                          // onChangeText={text => setEmail(text)}
                          showBorder={true}
                          value={values.lastname}
                          onChangeText={handleChange('lastname')}
                          onBlur={handleBlur('lastname')}
                          error={errors.lastname}
                          touched={touched.lastname}
                          //   onBlur={handleBlur('email')}
                          //   error={errors.email}
                          //   touched={touched.email}
                        />
                      </View>
                    </View>

                    {errors.name && touched.name && (
                      <Text style={styles.errors}>{errors.name}</Text>
                    )}
                    {errors.lastname && touched.lastname && (
                      <Text style={styles.errors}>{errors.lastname}</Text>
                    )}
                    <View style={{height: 10}} />
                    <View style={styles.mainInputView}>
                      <Input
                        label="Email"
                        placeholder="Enter Email"
                        showBorder={true}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={errors.email}
                        touched={touched.email}
                        // image1={
                        //   <Image
                        //     source={require('../../../Assets/Images/emailImage.png')}
                        //     style={styles.passwordImage}
                        //     resizeMode="contain"
                        //   />
                        // }
                      />
                    </View>
                    {errors.email && touched.email && (
                      <Text style={styles.errors}>{errors.email}</Text>
                    )}
                    <View style={{height: 10}} />
                    <View style={styles.mainInputView}>
                      <Input
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                        // value={emails}
                        type="Number"
                        // onChangeText={text => setEmails(text)}
                        value={values.phoneNumber}
                        showBorder={true}
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
                      placeholder="Enter password"
                      showBorder={true}
                      value={values.password}
                      onBlur={handleBlur('password')}
                      secureText={!showPassword}
                      error={errors.password}
                      onChangeText={handleChange('password')}
                      touched={touched.password}
                      // onBlur={handleBlur('password')}

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
                    <Input
                      label="Confirm Password"
                      placeholder="Enter Confirm password"
                      // value={passwords}
                      showBorder={true}
                      // onBlur={handleBlur('password')}

                      // error={errors.password}

                      value={values.confirmPassword}
                      onBlur={handleBlur('confirmPassword')}
                      secureText={!showPasswordCon}
                      error={errors.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      touched={touched.password}
                      // touched={touched.password}
                      secureToggle={() => setShowPasswordCon(!showPasswordCon)}
                      // image1={
                      //   <Image
                      //     source={require('../../../Assets/Images/password.png')}
                      //     style={styles.passwordImage}
                      //     resizeMode="contain"
                      //   />
                      // }
                      // image2={
                      //   showPasswordCon ? (
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
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Text style={styles.errors}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                    {/* {errors.email && touched.email && (
                      <Text style={styles.errors}>{errors.email}</Text>
                    )} */}

                    <View style={styles.forgotView}>
                      {/* <Text
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.forgotText}>
                    Don't have an account?{' '}
                    <Text style={styles.boldLastText}>Sign Up.</Text>
                  </Text> */}

                      <View style={styles.bottomButtonView}>
                        <View style={styles.row}>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',

                              alignItems: 'center',
                            }}
                            onPress={() => setCheck(!check)}>
                            <CheckIcon
                              name={
                                !check
                                  ? 'checkbox-blank-outline'
                                  : 'checkbox-marked'
                              }
                              size={20}
                              color={!check ? 'grey' : '#FFBD00'}
                            />
                            <View style={{width: '95%'}}>
                              <Text
                                numberOfLines={2}
                                style={{
                                  color: '#888888',
                                  fontSize: 14,
                                  fontFamily: 'ArialCE',
                                  marginLeft: 5,
                                }}>
                                I have read and agreed to the{' '}
                                <Text
                                  onPress={() => {
                                    navigation.navigate('Terms', {
                                      item: 'https://intechsol-developer.co/workaman/public/pdf/terms.pdf',
                                    });
                                  }}
                                  style={{
                                    color: '#FFBD00',
                                    fontFamily: 'ArialMdm',
                                  }}>
                                  Terms and conditions
                                </Text>
                              </Text>
                            </View>
                          </TouchableOpacity>
                          {/* <Text style={{color: 'grey'}}>Forgot password?</Text> */}
                        </View>
                        {errors.terms && touched.terms && (
                          <Text style={styles.errors}>{errors.terms}</Text>
                        )}
                        <View style={{marginTop: heightPercentageToDP(5)}}>
                          <FillButton
                            //   disabled={!isValid}
                            customColor="#FFBD00"
                            customTextColor="white"
                            Name="Sign Up"
                            onPress={() => {
                              handleSubmit();
                              console.log('error,', errors);
                            }}
                          />
                          <View
                            style={{
                              marginTop: 20,
                              alignItems: 'center',
                              marginBottom: 30,
                            }}>
                            <Text
                              style={{color: '#6A6A6A', fontFamily: 'ArialCE'}}>
                              Already have Account?
                              <Text
                                onPress={() => navigation.navigate('Login')}
                                style={{
                                  color: '#FFBD00',
                                  fontFamily: 'ArialMdm',
                                }}>
                                {' '}
                                Log In
                              </Text>
                            </Text>
                          </View>
                        </View>
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

export default SellerSignup;
