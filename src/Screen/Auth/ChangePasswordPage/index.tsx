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
  TextInput,
  FlatList,
} from 'react-native';
import styles from './style';
import {Formik} from 'formik';
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowBack from 'react-native-vector-icons/AntDesign';
// import {Formik} from 'formik';
import FillButton from '../../../Component/FillButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  changePasswordSchema,
  sellerSignUpValidationSchema,
} from '../../../lib/ValidationSchemas';
// import {postApiwithFormData} from '../../../lib/Apis/api';
import ImagePicker from 'react-native-image-crop-picker';
// import {setPermanatEmail, setUser} from '../../../ReduxToolkit/MyUserSlice';
// import {useDispatch} from 'react-redux';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
// import {setUser} from '../../../ReduxToolkit/MyUserSlice';
import Loader from '../../../Component/Loader';
import HeaderComp from '../../../Component/HeaderComp';
import ExpertiseItem from '../../../Component/ExpertiseItem';
import InterestItem from '../../../Component/InterestItem';
import {postApiwithFormData} from '../../../lib/Apis/api';
// import Loader from '../../../Components/Loader';
// import {postApiWithSimplePayload} from '../../../Lib/api';
// import {loginValidationSchema} from '../../../Lib/ValidationSchemas';
const ChangePasswordPage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  // const dispatch = useDispatch();
  const {email, pin} = route.params;
  const changePasswordApi = (password: string, confirmPassword: string) => {
    // navigation.navigate('TabNavigator');
    setShowModal(true);
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('pin', pin);
    formdata.append('password', password);
    formdata.append('password_confirmation', confirmPassword);
    postApiwithFormData({url: 'reset'}, formdata)
      .then(res => {
        console.log('redd', res);
        setShowModal(false);
        if (res.status == 'success') {
          // dispatch(setUser(res.userdata));
          //  console.log("res ")
          navigation.navigate('CredentialsSuccess');
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
        password: '',
        confirmPassword: '',
      }}
      validateOnMount={true}
      onSubmit={values => {
        // navigation.navigate('SellerVerification');
        changePasswordApi(values.password, values.confirmPassword);
        // console.log('hello', values);
      }}
      validationSchema={changePasswordSchema}>
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
            {
              paddingTop: Platform.OS == 'ios' ? top : 0,
              backgroundColor: 'black',
            },
          ]}>
          <HeaderComp
            leftIcon={
              <ArrowBack
                name="left"
                onPress={() => navigation.goBack()}
                size={20}
                color={'white'}
              />
            }
            label="New Credentials"
          />
          <ScrollView>
            <View style={styles.imageView}>
              <View style={{width: '80%'}}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'ArialCE',
                    textAlign: 'center',
                  }}>
                  Enter new Credentials down below
                </Text>
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  marginTop: 20,
                  justifyContent: 'center',
                  height: heightPercentageToDP(30),
                  backgroundColor: '#373A43',
                  borderRadius: 10,
                }}>
                <Image
                  source={require('../../../Assets/Images/Credentials.png')}
                  style={{width: '80%', height: '80%'}}
                  resizeMode="contain"
                />
              </View>
              <View style={{marginTop: 30, width: '90%'}}>
                {/* <View style={{height: 10}} /> */}
                <Input
                  label="Password"
                  placeholder="Enter password"
                  showBorder={true}
                  secureText={true}
                  value={values.password}
                  onBlur={handleBlur('password')}
                  // secureText={!showPassword}
                  error={errors.password}
                  onChangeText={handleChange('password')}
                  touched={touched.password}
                  //   secureText={!showPassword}

                  // onBlur={handleBlur('password')}

                  // touched={touched.password}
                  //   secureToggle={() => setShowPassword(!showPassword)}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errors}>{errors.password}</Text>
                )}
                <View style={{height: 10}} />
                <Input
                  label="Confirm Password"
                  secureText={true}
                  placeholder="Enter Confirm password"
                  value={values.confirmPassword}
                  onBlur={handleBlur('confirmPassword')}
                  error={errors.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  touched={touched.password}
                  // secureText={!showPasswordCon}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errors}>{errors.confirmPassword}</Text>
                )}
              </View>
              <View style={{width: '90%', marginTop: heightPercentageToDP(10)}}>
                <FillButton
                  customColor="#FFBD00"
                  customTextColor="white"
                  Name="Reset Password"
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          </ScrollView>

          {Loader({show: showModal})}
        </View>
      )}
    </Formik>
  );
};

export default ChangePasswordPage;
