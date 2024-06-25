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
// import Loader from '../../../Components/Loader';
// import {postApiWithSimplePayload} from '../../../Lib/api';
// import {loginValidationSchema} from '../../../Lib/ValidationSchemas';
const CredentialsSuccess = ({navigation}: {navigation: any}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  // const dispatch = useDispatch();
  const data = [
    'User Interface/User Experience Designer',
    'Flutter Front-End Developer',
    'Flutter Back-End Developer',
    'React Front-End Developer',
    'React Back-End Developer',
    'Accounting',
  ];
  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };
  const renderItem = ({item}) => <InterestItem item={item} />;
  const [image, setImage] = useState('');
  const [showPasswordCon, setShowPasswordCon] = useState(false);
  const [check, setCheck] = useState(false);
  const SignUp = (
    fullname: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
  ) => {
    // setShowModal(true);
    const formdata = new FormData();
    formdata.append('fullname', fullname);
    formdata.append('email', email);
    formdata.append('phone_no', phoneNumber);
    formdata.append('password', password);
    formdata.append('password_confirmation', confirmPassword);
    formdata.append('type', 'seller');
    console.log('hello');
    navigation.navigate('EnterValidationChoice');
    // postApiwithFormData({url: 'register'}, formdata)
    //   .then(res => {
    //     console.log('redd', res);
    //     setShowModal(false);
    //     if (res.status == 'success') {
    //       // dispatch(setUser(res.userdata));
    //       navigation.navigate('SellerVerification', {email});
    //     } else {
    //       if (res.message.email) {
    //         Alert.alert('Error', res.message.email[0]);
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     setShowModal(false);
    //     console.log('err in login', err);
    //   });
  };
  const ErrorAlert = ({navigation}) => {
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
          values.email,
          values.phoneNumber,
          values.password,
          values.confirmPassword,
        );
        // console.log('hello', values);
      }}
      validationSchema={sellerSignUpValidationSchema}>
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
          <HeaderComp
            leftIcon={
              <ArrowBack
                name="left"
                onPress={() => navigation.goBack()}
                size={20}
                color={'white'}
              />
            }
            label="Successful"
          />
          <View style={styles.imageView}>
            <View style={{width: '80%'}}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'ArialCE',
                  textAlign: 'center',
                }}>
                Your password has been updated, please change your password
                regularly to avoid this happening
              </Text>
            </View>
            <View
              style={{
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                height: heightPercentageToDP(50),
                backgroundColor: '#373A43',
                borderRadius: 10,
              }}>
              <Image
                source={require('../../../Assets/Images/Done.png')}
                style={{width: '80%', height: '80%'}}
                resizeMode="contain"
              />
            </View>

            <View style={{marginTop: 20, width: '90%'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'ArialMdm',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Password Has Been Reset Successfully
              </Text>
            </View>
            <View style={{width: '90%', marginTop: heightPercentageToDP(10)}}>
              <FillButton
                customColor="#FFBD00"
                customTextColor="white"
                Name="Back to Login"
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          </View>
          {Loader({show: showModal})}
        </View>
      )}
    </Formik>
  );
};

export default CredentialsSuccess;
