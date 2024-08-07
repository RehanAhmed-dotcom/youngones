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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
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
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {postApiWithSimplePayload} from '../../../lib/Apis/api';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../ReduxToolkit/MyUserSlice';
// import {removeLandingPage, setUser} from '../../../ReduxToolkit/MyUserSlice';
const EmailVerification = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const {email} = route.params;
  // const {showLanding} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const VerificationApi = () => {
    // navigation.navigate('TabNavigator');
    setShowModal(true);
    postApiWithSimplePayload({url: 'verify', email, pin: value})
      .then(res => {
        console.log('redd', res);
        setShowModal(false);
        if (res.status == 'success') {
          dispatch(setUser(res.userdata));
          //  console.log("res ")
          // navigation.navigate('ProfileSetup');
        } else {
          if (res.error) {
            Alert.alert('Error', res.error);
          }
        }
      })
      .catch(err => {
        setShowModal(false);
        console.log('err in login', err);
      });
  };
  const CELL_COUNT = 6;
  const [pinError, setPinError] = useState('');
  const [value, setValue] = useState('');
  const [Error, setError] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const loginApi = (email: string, password: string) => {
    console.log('all done');
  };
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;

  return (
    <View style={styles.mainView}>
      <HeaderComp label="Two Factor Authentication" />
      <View style={styles.imageView}>
        <View style={{width: '90%'}}>
          <Text style={[styles.signIn, {textAlign: 'center'}]}>
            App requires to protect your account.How would you like to receive
            your two factor code
          </Text>
        </View>

        <View style={{width: '90%'}}>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={text => {
              setValue(text);
              setError('');
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
          <Text
            style={{
              fontSize: 10,
              color: 'red',
              fontFamily: 'ArialMdm',
              // fontWeight: 'bold',

              alignSelf: 'center',
              marginTop: 15,
              marginLeft: 18,
            }}>
            {Error}
          </Text>
        </View>
        <View
          style={[
            styles.bottomButtonView,
            {width: '90%', marginTop: heightPercentageToDP(0)},
          ]}>
          <FillButton
            //   disabled={!isValid}
            customColor="#FFBD00"
            customTextColor="white"
            Name="Continue"
            onPress={() =>
              value.length > 5 ? VerificationApi() : setError('Enter Code')
            }
          />
        </View>
      </View>
      {Loader({show: showModal})}
    </View>
  );
};

export default EmailVerification;
