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
// import {removeLandingPage, setUser} from '../../../ReduxToolkit/MyUserSlice';
const EmailVerification = ({navigation}: {navigation: any}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  // const {showLanding} = useSelector(state => state.user);
  // const dispatch = useDispatch();
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
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
            onChangeText={setValue}
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
            onPress={() => navigation.navigate('ProfileSetup')}
          />
        </View>
      </View>
      {/* {Loader({show: showModal})} */}
    </View>
  );
};

export default EmailVerification;
