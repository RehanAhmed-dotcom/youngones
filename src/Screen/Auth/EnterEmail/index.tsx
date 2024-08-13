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
// import {setUser} from '../../../ReduxToolkit/MyUserSlice';
import Loader from '../../../Component/Loader';
import HeaderComp from '../../../Component/HeaderComp';
import ExpertiseItem from '../../../Component/ExpertiseItem';
import InterestItem from '../../../Component/InterestItem';
import {postApiwithFormData} from '../../../lib/Apis/api';
// import Loader from '../../../Components/Loader';
// import {postApiWithSimplePayload} from '../../../Lib/api';
// import {loginValidationSchema} from '../../../Lib/ValidationSchemas';
const EnterEmail = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const validateEmail = emailC => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailC.replace(/\s/g, ''),
    );
  };
  const emailApi = () => {
    // navigation.navigate('TabNavigator');
    setShowModal(true);
    const formdata = new FormData();
    formdata.append('email', email);
    postApiwithFormData({url: 'forgot'}, formdata)
      .then(res => {
        console.log('redd', res);
        setShowModal(false);
        if (res.status == 'success') {
          // dispatch(setUser(res.userdata));
          //  console.log("res ")
          navigation.navigate('EmailVerificationPage', {email});
        } else {
          Alert.alert('Error', res.message);
          // if (res.message.email) {
          //   Alert.alert('Error', res.message.email[0]);
          // }
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
          backgroundColor: '#2D2D35',
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
        label="Forgot Password"
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
              To reset your password, you need your email or mobile number that
              can be authenticated
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              marginTop: 40,
              justifyContent: 'center',
              height: heightPercentageToDP(30),
              backgroundColor: '#373A43',
              borderRadius: 10,
            }}>
            <Image
              source={require('../../../Assets/Images/lock.png')}
              style={{width: '80%', height: '80%'}}
              resizeMode="contain"
            />
          </View>
          <View style={{marginTop: 30}}>
            <Input
              label="Email"
              placeholder="Enter Email"
              placeholderTextColor={'white'}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
            />
          </View>
          {emailError && <Text style={styles.errors}>{emailError}</Text>}
          <View
            style={{
              width: '90%',
              marginBottom: 20,
              marginTop: heightPercentageToDP(10),
            }}>
            <FillButton
              customColor="#FFBD00"
              customTextColor="white"
              Name="Reset Password"
              onPress={() =>
                validateEmail(email)
                  ? emailApi()
                  : setEmailError('Please enter valid email')
              }
            />
          </View>
        </View>
      </ScrollView>

      {Loader({show: showModal})}
    </View>
  );
};

export default EnterEmail;
