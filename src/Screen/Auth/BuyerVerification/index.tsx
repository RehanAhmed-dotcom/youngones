import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import FillButton from '../../../Component/FillButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {postApiWithSimplePayload} from '../../../lib/Apis/api';
import Loader from '../../../Component/Loader';
import {useDispatch} from 'react-redux';
import {
  removeLandingPage,
  setUser,
  setVerification,
} from '../../../ReduxToolkit/MyUserSlice';
// import {setPermanatEmail, setUser} from '../../../ReduxToolkit/MyUserSlice';
// import {useDispatch} from 'react-redux';
// import Loader from '../../../Components/Loader';
// import {postApiWithSimplePayload} from '../../../Lib/api';
// import {loginValidationSchema} from '../../../Lib/ValidationSchemas';
const BuyerVerification = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const CELL_COUNT = 4;
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  //   console.log('here');
  const {email} = route.params;
  const callApi = () => {
    // navigation.navigate('UploadService');
    setShowModal(true);
    postApiWithSimplePayload({url: 'verify', email, pin: value})
      .then(res => {
        console.log('res OF VERIFICATION', res);
        setShowModal(false);
        if (res.status == 'success') {
          dispatch(setUser(res.userdata));
          dispatch(removeLandingPage());
          if (res.userdata.type == 'buyer') {
            navigation.navigate('BuyerBottomTab');
          }
        }

        // if (res.status == 'success') {
        //   dispatch(setUser(res.userdata));
        //   dispatch(removeLandingPage());
        //   // navigation.navigate('UploadService');
        //   if (res.userdata.bvn_no) {
        //     dispatch(setVerification(true));
        //   } else {
        //     dispatch(setVerification(false));
        //   }
        // }
        else {
          Alert.alert('Error', res.error);
          // console.log("eror",res)
        }
      })
      .catch(err => {
        setShowModal(false);
        console.log('err in login', err);
      });
  };
  // console.log(email);
  return (
    <View style={styles.mainView}>
      <View style={styles.imageView}>
        <ScrollView
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View style={styles.contextView}>
            <View style={styles.loginContainer}>
              <Text style={styles.signIn}>Verification</Text>
              <Text style={styles.nameText}>Verify your email</Text>
              <Text style={[styles.nameText, {fontSize: 12, color: 'grey'}]}>
                We sent you a code to verify your phone number
              </Text>
              <View style={{width: '90%', marginTop: heightPercentageToDP(5)}}>
                <CodeField
                  ref={ref}
                  {...props}
                  // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                  value={value}
                  onChangeText={value => {
                    setValue(value), setError('');
                  }}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  // autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                  testID="my-code-input"
                  renderCell={({index, symbol, isFocused}) => (
                    <Text
                      key={index}
                      style={[
                        styles.cell,
                        isFocused && styles.focusCell,
                        symbol && styles.filledCell,
                      ]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
              </View>
              <Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  marginTop: 10,
                  fontFamily: 'WorkSans-Medium',
                }}>
                {error}
              </Text>
              {/* {errors.email && touched.email && (
                    <Text style={styles.errors}>{errors.email}</Text>
                  )} */}
              <View style={{marginTop: heightPercentageToDP(10)}}>
                <Text
                  style={{
                    color: '#095374',
                    fontFamily: 'WorkSans-Regular',
                    textAlign: 'center',
                  }}>
                  I didn't receive a code
                </Text>
                <Text
                  style={{
                    color: '#077D45',
                    fontFamily: 'WorkSans-Medium',
                    textAlign: 'center',
                  }}>
                  Resend
                </Text>
              </View>

              <View style={styles.forgotView}>
                {/* <Text
                  onPress={() => navigation.navigate('Signup')}
                  style={styles.forgotText}>
                  Don't have an account?{' '}
                  <Text style={styles.boldLastText}>Sign Up.</Text>
                </Text> */}

                <View style={[styles.bottomButtonView, {marginBottom: 30}]}>
                  <FillButton
                    //   disabled={!isValid}
                    customColor="#0F8BC2"
                    customTextColor="white"
                    Name="Proceed"
                    onPress={() =>
                      value.length == 4
                        ? callApi()
                        : setError('Enter Verification Code')
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {Loader({show: showModal})}
    </View>
  );
};

export default BuyerVerification;
