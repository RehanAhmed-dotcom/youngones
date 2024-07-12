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
// import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FillButton from '../../../Component/FillButton';
import {Formik} from 'formik';
import {loginValidationSchema} from '../../../lib/ValidationSchemas';
import BackIcon from 'react-native-vector-icons/AntDesign';
// import {postApiWithSimplePayload} from '../../../lib/Apis/api';
// import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../Component/Loader';
import HeaderComp from '../../../Component/HeaderComp';
import {postApiwithFormData} from '../../../lib/Apis/api';
// import {removeLandingPage, setUser} from '../../../ReduxToolkit/MyUserSlice';
const Login = ({navigation}: {navigation: any}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  // const {showLanding} = useSelector(state => state.user);
  // const dispatch = useDispatch();
  const loginApi = (email: string, password: string) => {
    // navigation.navigate('TabNavigator');
    setShowModal(true);
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    postApiwithFormData({url: 'login'}, formdata)
      .then(res => {
        console.log('redd', res);
        setShowModal(false);
        if (res.status == 'success') {
          // dispatch(setUser(res.userdata));
          //  console.log("res ")
          navigation.navigate('TabNavigator');
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

  return (
    <Formik
      initialValues={{email: '', password: '', remember: false}}
      validateOnMount={true}
      onSubmit={values => {
        loginApi(values.email, values.password);
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
          <HeaderComp label="Login Account" />
          <View style={styles.imageView}>
            <Wrapper behavior="padding" style={{flex: 1}}>
              <ScrollView
                style={{
                  width: '100%',
                  height: '100%',
                }}>
                <View style={styles.contextView}>
                  <View style={styles.loginContainer}>
                    <Text style={styles.signIn}>
                      Hello, welcome back to our account
                    </Text>
                    <Image
                      source={require('../../../Assets/Images/Logo.png')}
                      style={{height: 110, width: 110, marginTop: 30}}
                    />
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
                        {/* <CheckIcon
                          name={
                            !values.remember
                              ? 'checkbox-blank-outline'
                              : 'checkbox-marked'
                          }
                          size={20}
                          color={!values.remember ? 'grey' : '#10CE5C'}
                        /> */}
                        <Text
                          style={{
                            color: 'grey',
                            fontSize: 12,
                            marginLeft: 5,
                          }}></Text>
                      </TouchableOpacity>
                      <Text
                        onPress={() => navigation.navigate('EnterEmail')}
                        style={{
                          color: 'white',
                          fontFamily: 'ArialMdm',
                          fontSize: 12,
                        }}>
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
                          customColor="#FFBD00"
                          customTextColor="white"
                          Name="Login"
                          onPress={() => handleSubmit()}
                        />
                        <TouchableOpacity
                          onPress={() => navigation.navigate('Signup')}>
                          <Text
                            onPress={() => navigation.navigate('Signup')}
                            style={styles.boldLastText}>
                            Not Registered yet?
                            <Text style={styles.bold}> Create Account</Text>
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

export default Login;
