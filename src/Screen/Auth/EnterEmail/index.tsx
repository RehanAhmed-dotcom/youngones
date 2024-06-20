// import React, {useState} from 'react';
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Alert,
//   ImageBackground,
//   Platform,
// } from 'react-native';
// // import Header from '../../../Components/Header';

// import ArrowLeft from 'react-native-vector-icons/AntDesign';
// import styles from './style';
// import FillButton from '../../../Component/FillButton';
// import Input from '../../../Component/Input';
// // import Loader from '../../../Component/Loader';
// // import {postApiWithSimplePayload} from '../../../Lib/Apis/api';
// import {heightPercentageToDP} from 'react-native-responsive-screen';
// import HeaderComp from '../../../Component/HeaderComp';
// import {postApiWithSimplePayload} from '../../../lib/Apis/api';
// import Loader from '../../../Component/Loader';
// // import {postApiWithSimplePayload} from '../../../lib/Apis/api';
// const EnterEmail = ({navigation}: {navigation: any}) => {
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState<string>('');
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const validateEmail = (emailC: string) => {
//     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
//       emailC.replace(/\s/g, ''),
//     );
//   };
//   const validationApi = () => {
//     setShowModal(true);
//     postApiWithSimplePayload({url: 'forgot', email})
//       .then(res => {
//         setShowModal(false);
//         console.log('res of login', res);
//         if (res.status == 'success') {
//           navigation.navigate('EnterCode', {email});
//         } else {
//           Alert.alert(res.title, res.message);
//         }
//       })
//       .catch(err => {
//         console.log('err in login', err);
//         setShowModal(false);
//       });
//   };
//   return (
//     <View
//       style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? 30 : 0}]}>
//       {/* <ImageBackground
//         source={require('../../../Assets/Images/seayellow.jpg')}
//         style={{flex: 1}}> */}
//       <>
//         <HeaderComp
//           navigation={navigation}
//           label="Forgot Password"
//           // left={<ArrowLeft name="arrowleft" color="white" size={25} />}
//         />
//         <ScrollView>
//           <View style={styles.contantView}>
//             <View>
//               {/* <Text style={styles.forgotText}>Forgot Password?</Text> */}
//               <Text style={styles.detailText}>
//                 Provide your account's email for which you want to reset your
//                 password
//               </Text>
//               {/* <Text style={{color: 'black'}}>hi</Text> */}
//             </View>
//             <View style={styles.midView}>
//               {/* <Image
//                   resizeMode="contain"
//                   source={require('../../../Assets/Images/lock.png')}
//                   style={styles.okPic}
//                 /> */}
//               <View style={{bottom: 0, marginTop: heightPercentageToDP(20)}}>
//                 <Input
//                   value={email}
//                   showBorder={true}
//                   onChangeText={text => setEmail(text)}
//                   // label="Email Address"
//                   placeholder="Enter email"
//                   image1={
//                     <Image
//                       source={require('../../../Assets/Images/emailImage.png')}
//                       style={styles.passwordImage}
//                       resizeMode="contain"
//                     />
//                   }
//                 />
//                 {emailError && (
//                   <Text style={[styles.errors, {textAlign: 'center'}]}>
//                     {emailError}
//                   </Text>
//                 )}
//               </View>
//             </View>
//             <View style={styles.bottomView}>
//               <FillButton
//                 customColor="#46A4DF"
//                 customTextColor="white"
//                 Name="Send"
//                 onPress={() =>
//                   validateEmail(email)
//                     ? validationApi()
//                     : setEmailError('Please Enter valid Email')
//                 }
//               />
//             </View>
//           </View>
//         </ScrollView>
//       </>
//       {/* </ImageBackground> */}

//       {Loader({show: showModal})}
//     </View>
//   );
// };

// export default EnterEmail;
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
const EnterEmail = ({navigation}: {navigation: any}) => {
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
            label="Forgot Password"
          />
          <View style={styles.imageView}>
            <View style={{width: '80%'}}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                To reset your password, you need your email or mobile number
                that can be authenticated
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
              />
              <Text style={{color: '#DEDEDE', marginTop: 20}}>
                You have not received the email?{' '}
                <Text
                  style={{
                    color: '#FFBD00',

                    textDecorationColor: '#FFBD00',
                    textDecorationStyle: 'solid',
                    textDecorationLine: 'underline',
                  }}>
                  Resend
                </Text>
              </Text>
            </View>
            {/* <View style={{marginTop: 20, width: '90%'}}>
              <Text style={{fontSize: 16, textAlign: 'center', color: 'white'}}>
                Successful
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  marginTop: 20,
                  color: 'white',
                }}>
                Congratulations, your application has been sent
              </Text>
            </View> */}
            <View style={{width: '90%', marginTop: heightPercentageToDP(10)}}>
              <FillButton
                customColor="#FFBD00"
                customTextColor="white"
                Name="Reset Password"
                onPress={() => navigation.navigate('EmailVerificationPage')}
              />
            </View>
          </View>
          {Loader({show: showModal})}
        </View>
      )}
    </Formik>
  );
};

export default EnterEmail;
