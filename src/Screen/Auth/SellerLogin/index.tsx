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
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Formik} from 'formik';
import FillButton from '../../../Component/FillButton';
import {Formik} from 'formik';
// import {setPermanatEmail, setUser} from '../../../ReduxToolkit/MyUserSlice';
import {useDispatch} from 'react-redux';
// import Loader from '../../../Components/Loader';
// import {postApiWithSimplePayload} from '../../../Lib/api';
import {loginValidationSchema} from '../../../lib/ValidationSchemas';
import {postApiWithSimplePayload} from '../../../lib/Apis/api';
import {
  removeLandingPage,
  setUser,
  setVerification,
} from '../../../ReduxToolkit/MyUserSlice';
import Loader from '../../../Component/Loader';
const SellerLogin = ({navigation}: {navigation: any}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const loginApi = (email: string, password: string) => {
    setShowModal(true);
    postApiWithSimplePayload({url: 'login', email, password})
      .then(res => {
        console.log('res', res);
        setShowModal(false);
        if (res.status == 'success') {
          dispatch(setUser(res.userdata));
          dispatch(removeLandingPage());
          if (res?.userdata?.serviceName) {
            dispatch(setVerification(true));
          }
          // navigation.navigate('SellerBottomTab');
        } else {
          Alert.alert('Error', res.message);
        }
      })
      .catch(err => {
        setShowModal(false);
        console.log('err in login', err);
      });
  };
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  return (
    <Formik
      initialValues={{email: '', password: '', remember: false}}
      validateOnMount={true}
      onSubmit={values => {
        loginApi(values.email, values.password);
        // navigation.navigate('SellerBottomTab');
      }}
      validationSchema={loginValidationSchema}>
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
          <View style={styles.imageView}>
            <Wrapper behavior="padding" style={{flex: 1}}>
              <ScrollView
                style={{
                  width: '100%',
                  height: '100%',
                }}>
                <View style={styles.contextView}>
                  <View style={styles.loginContainer}>
                    <Text style={styles.signIn}>Welcome Back!</Text>
                    <Text style={styles.nameText}>
                      Welcome back, You've been missed
                    </Text>
                    <View style={styles.mainInputView}>
                      <Input
                        label="Email"
                        placeholder="Email"
                        showBorder={true}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={errors.email}
                        touched={touched.email}
                        image1={
                          <Image
                            source={require('../../../Assets/Images/emailImage.png')}
                            style={styles.passwordImage}
                            resizeMode="contain"
                          />
                        }
                      />
                    </View>
                    {errors.email && touched.email && (
                      <Text style={styles.errors}>{errors.email}</Text>
                    )}
                    <View style={{height: 10}} />
                    <Input
                      label="Password"
                      showBorder={true}
                      placeholder="Password"
                      value={values.password}
                      onBlur={handleBlur('password')}
                      secureText={!showPassword}
                      error={errors.password}
                      onChangeText={handleChange('password')}
                      touched={touched.password}
                      secureToggle={() => setShowPassword(!showPassword)}
                      image1={
                        <Image
                          source={require('../../../Assets/Images/password.png')}
                          style={styles.passwordImage}
                          resizeMode="contain"
                        />
                      }
                      image2={
                        showPassword ? (
                          <Image
                            source={require('../../../Assets/Images/show.png')}
                            style={styles.secureEye}
                            resizeMode="contain"
                            tintColor={'black'}
                          />
                        ) : (
                          <Image
                            source={require('../../../Assets/Images/dontShow.png')}
                            style={styles.secureEye}
                            resizeMode="contain"
                            tintColor={'black'}
                          />
                        )
                      }
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errors}>{errors.password}</Text>
                    )}
                    <View style={styles.row}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',

                          alignItems: 'center',
                        }}
                        onPress={() =>
                          setFieldValue(
                            'remember',
                            values.remember ? false : true,
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
                            fontSize: 12,
                            marginLeft: 5,
                          }}>
                          Remember me
                        </Text>
                      </TouchableOpacity>
                      <Text
                        onPress={() => navigation.navigate('EnterEmail')}
                        style={{color: 'grey', fontSize: 12}}>
                        Forgot password?
                      </Text>
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
                          Name="Login"
                          onPress={() => handleSubmit()}
                        />
                        <TouchableOpacity
                          onPress={() => navigation.navigate('SellerSignup')}>
                          <Text
                            onPress={() => navigation.navigate('SellerSignup')}
                            style={styles.boldLastText}>
                            Don't have an account?
                            <Text style={styles.bold}> Sign Up</Text>
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

export default SellerLogin;
