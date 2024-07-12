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
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
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
const SubmitDocument = ({navigation}: {navigation: any}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  // const dispatch = useDispatch();
  const data = [
    'User Interface/User Experience Designer',
    'Flutter Front-End Developer',
    'Flutter Back-End Developer',
    'React Front-End Developer',
    'React Back-End Developer',
    'Accounting',
  ];

  const renderItem = ({item}) => <InterestItem item={item} />;
  const [document, setDocument] = useState({});
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
        Information: '',
        CV: '',
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
            label="Submit Document"
          />

          <View style={styles.imageView}>
            <View style={{width: '90%', flex: 1}}>
              <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                Additional details
              </Text>
              <Text
                style={{color: 'white', fontFamily: 'ArialMdm', marginTop: 30}}>
                More Information
              </Text>
              <TextInput
                placeholder="Write here..."
                placeholderTextColor={'white'}
                textAlignVertical="top"
                value={values.Information}
                onChangeText={() => handleChange('Information')}
                onBlur={handleBlur('Information')}
                style={{
                  backgroundColor: '#373A43',
                  borderRadius: 20,
                  padding: 20,
                  fontFamily: 'ArialCE',
                  marginTop: 10,
                  height: 200,
                }}
              />
              {errors.Information && touched.Information && (
                <Text style={styles.errors}>{errors.Information}</Text>
              )}
              {/* {document && <View>
                
                </View>} */}
              <TouchableOpacity
                onPress={async () => {
                  try {
                    const pickerResult = await DocumentPicker.pickSingle({
                      presentationStyle: 'fullScreen',
                      copyTo: 'cachesDirectory',
                    });
                    setDocument(pickerResult);
                    console.log('pickerResult', pickerResult);
                    setFieldValue('CV', pickerResult);
                    // setImages;
                  } catch (e) {
                    console.log('error', e);
                  }
                }}
                style={{
                  backgroundColor: '#373A43',
                  marginTop: 40,
                  height: 150,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../../../Assets/Images/upload.png')}
                  style={{height: 50, width: 50}}
                />
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'ArialMdm',
                    marginTop: 10,
                  }}>
                  Upload CV/Resume
                </Text>
              </TouchableOpacity>
              {errors.CV && touched.CV && (
                <Text style={styles.errors}>{errors.CV}</Text>
              )}

              <Text
                style={{color: 'white', fontFamily: 'ArialCE', marginTop: 20}}>
                You may attach up to 10 files under the size of 25 MB each.
                Include work sample or other documents to support your
                application
              </Text>
            </View>

            <View style={{width: '90%', marginBottom: 30}}>
              <FillButton
                customColor="#FFBD00"
                customTextColor="white"
                Name="Next"
                onPress={() => {
                  navigation.navigate('SuccessSubmit');
                  // handleSubmit();
                }}
              />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SubmitDocument;
