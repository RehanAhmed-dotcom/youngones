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
// import Loader from '../../../Components/Loader';
// import {postApiWithSimplePayload} from '../../../Lib/api';
// import {loginValidationSchema} from '../../../Lib/ValidationSchemas';
const Expertise = ({navigation}: {navigation: any}) => {
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
  const renderItem = ({item}) => <ExpertiseItem item={item} />;
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
            label="What is your expertise"
          />
          <View style={styles.imageView}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                height: 50,
                width: '90%',
                paddingHorizontal: 20,
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <ArrowBack name={'search1'} size={20} color={'black'} />
              <TextInput
                placeholder="Search here..."
                placeholderTextColor={'#6C757D'}
                style={{
                  color: 'black',
                  fontFamily: 'ArialCE',
                  marginLeft: 5,
                  width: '100%',
                }}
              />
            </View>
            <View style={{width: '90%', marginTop: 30}}>
              <FlatList data={data} renderItem={renderItem} />
            </View>
            <View style={{width: '90%'}}>
              <FillButton
                customColor="#FFBD00"
                customTextColor="white"
                Name="Next"
                onPress={() => navigation.navigate('Intrests')}
              />
            </View>
          </View>
          {Loader({show: showModal})}
        </View>
      )}
    </Formik>
  );
};

export default Expertise;
