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
import {sellerSignUpValidationSchema} from '../../../lib/ValidationSchemas';
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
const EmailVerificationPage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showModal, setShowModal] = useState<boolean>(false);
  // const dispatch = useDispatch();
  const [pinError, setPinError] = useState('');
  const CELL_COUNT = 4;
  const {email} = route.params;
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const VerificationApi = () => {
    // navigation.navigate('TabNavigator');
    setShowModal(true);
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('pin', value);
    postApiwithFormData({url: 'confirm-code'}, formdata)
      .then(res => {
        console.log('redd', res);
        setShowModal(false);
        if (res.status == 'success') {
          // dispatch(setUser(res.userdata));
          //  console.log("res ")
          navigation.navigate('ChangePasswordPage', {email, pin: value});
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
        label="Verification"
      />
      <View style={styles.imageView}>
        <View style={{width: '80%'}}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'ArialCE',
              textAlign: 'center',
            }}>
            Enter the security code we sent to your Email Address
            <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
              {' '}
              alaxadnertobi@gmail.com
            </Text>
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
            source={require('../../../Assets/Images/check.png')}
            style={{width: '80%', height: '80%'}}
            resizeMode="contain"
          />
        </View>
        <View style={{marginTop: 30, width: '80%'}}>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={val => {
              setValue(val);
              setPinError('');
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete={Platform.select({
              android: 'sms-otp',
              default: 'one-time-code',
            })}
            testID="my-code-input"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          {pinError && (
            <Text style={[styles.errors, {textAlign: 'center', marginTop: 10}]}>
              {pinError}
            </Text>
          )}
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#DEDEDE',
                fontFamily: 'ArialCE',
              }}>
              Didn't get the code?{' '}
              <Text
                style={{
                  color: '#FFBD00',
                  fontFamily: 'ArialMdm',
                  // textDecorationColor: '#FFBD00',
                  // textDecorationStyle: 'solid',
                  // textDecorationLine: 'underline',
                }}>
                Resend it
              </Text>
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}></View>
          </View>
        </View>

        <View style={{width: '90%', marginTop: heightPercentageToDP(10)}}>
          <FillButton
            customColor="#FFBD00"
            customTextColor="white"
            Name="Reset Password"
            onPress={() =>
              value.length > 3
                ? VerificationApi()
                : // ?
                  setPinError('Enter valid pin')
            }
          />
        </View>
      </View>
      {Loader({show: showModal})}
    </View>
  );
};

export default EmailVerificationPage;
