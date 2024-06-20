import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ImageBackground,
  Platform,
} from 'react-native';
// import Header from '../../../Components/Header';

import ArrowLeft from 'react-native-vector-icons/AntDesign';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './style';
import FillButton from '../../../Component/FillButton';
// import ResendModal from '../../../Components/ResendModal';
import {postApiWithSimplePayload} from '../../../lib/Apis/api';
import Loader from '../../../Component/Loader';
import HeaderComp from '../../../Component/HeaderComp';
const EnterCode = ({navigation, route}: {navigation: any; route: any}) => {
  const CELL_COUNT = 4;
  const {email} = route.params;
  const [value, setValue] = useState('');
  const [codeError, setCodeError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalLoader, setShowModalLoader] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const closeWithApi = () => {
    setShowModal(!showModal);
    postApiWithSimplePayload({url: 'fogot', email}).then(() =>
      ToastAndroid.show('Code send to your email', ToastAndroid.SHORT),
    );
  };
  const close = () => {
    setShowModal(!showModal);
    // postApiWithSimplePayload({url: 'fogot', email}).then(() =>
    //   ToastAndroid.show('Code send to your email', ToastAndroid.SHORT),
    // );
  };
  const validationApi = () => {
    setShowModalLoader(true);
    postApiWithSimplePayload({url: 'confirm-code', email, pin: value})
      .then(res => {
        setShowModalLoader(false);
        console.log('res of login', res);
        if (res.status == 'success') {
          navigation.navigate('ChangePassword', {email, pin: value});
        } else {
          Alert.alert(res.title, res.message);
        }
      })
      .catch(err => {
        console.log('err in login', err);
        setShowModalLoader(false);
      });
  };
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? 30 : 0}]}>
      {/* <ImageBackground
        source={require('../../../Assets/Images/seayellow.jpg')}
        style={{flex: 1}}> */}
      <>
        <HeaderComp
          navigation={navigation}
          label="Forgot Password"
          // left={<ArrowLeft name="arrowleft" color="white" size={25} />}
        />
        <ScrollView>
          <View style={styles.contantView}>
            <View>
              <Text style={styles.forgotText}>Verification</Text>
              <Text style={styles.detailText}>
                OTP will be send to <Text style={styles.email}>{email}</Text>
              </Text>
              {/* <Text style={{color: 'black'}}>hi</Text> */}
            </View>
            <View style={styles.midView}>
              {/* <Image
                  resizeMode="contain"
                  source={require('../../../Assets/Images/OK.png')}
                  style={styles.okPic}
                /> */}
              <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={text => {
                  setValue(text);
                  codeError && setCodeError('');
                }}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[
                      styles.cell,
                      {borderColor: codeError ? 'red' : '#B5DBEC'},
                      isFocused && styles.focusCell,
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
              <TouchableOpacity
                onPress={() => setShowModal(!showModal)}
                style={styles.resend}>
                <Text style={styles.resendText}>Resend The Code</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomView}>
              <FillButton
                Name="Verify"
                customColor="#46A4DF"
                customTextColor="white"
                onPress={
                  () =>
                    value.length == 4
                      ? validationApi()
                      : setCodeError('Enter code')
                  // navigation.navigate('ChangePassword')
                }
              />
            </View>
          </View>
        </ScrollView>
      </>
      {/* </ImageBackground> */}

      {/* {ResendModal({show: showModal, text: email, close, closeWithApi})} */}
      {Loader({show: showModalLoader})}
    </View>
  );
};

export default EnterCode;
