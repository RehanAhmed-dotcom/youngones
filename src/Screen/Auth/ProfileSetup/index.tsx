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
import GenderIcon from 'react-native-vector-icons/Fontisto';
import styles from './style';
import {Formik} from 'formik';
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Formik} from 'formik';
import FillButton from '../../../Component/FillButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  GenderProfile,
  sellerSignUpValidationSchema,
} from '../../../lib/ValidationSchemas';
// import {postApiwithFormData} from '../../../lib/Apis/api';
import ImagePicker from 'react-native-image-crop-picker';
// import {setPermanatEmail, setUser} from '../../../ReduxToolkit/MyUserSlice';
// import {useDispatch} from 'react-redux';
// import {setUser} from '../../../ReduxToolkit/MyUserSlice';
import Loader from '../../../Component/Loader';
import HeaderComp from '../../../Component/HeaderComp';
import {useDispatch, useSelector} from 'react-redux';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
import {setUser} from '../../../ReduxToolkit/MyUserSlice';
import DropDown from '../../../Component/DropDown';
// import Loader from '../../../Components/Loader';
// import {postApiWithSimplePayload} from '../../../Lib/api';
// import {loginValidationSchema} from '../../../Lib/ValidationSchemas';
const ProfileSetup = ({navigation}: {navigation: any}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {user} = useSelector(state => state.user);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const items1 = [
    {id: 1, label: 'Male', value: 'Male'},
    {id: 2, label: 'Female', value: 'Female'},
    {id: 3, label: 'Not Preferred', value: 'Not Preferred'},
  ];
  // console.log('user', user.gender);
  // console.log('user', user);
  const handleValueChange1 = (value: any) => {
    console.log('Selected value:', value());
  };
  const handleWholeItem1 = (value: any) => {
    console.log('item', value);
  };
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const pickImage = setFunction => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      setFunction('Image', image.path);
    });
  };
  const [gender, setGender] = useState('');
  const [image, setImage] = useState('');
  const [showPasswordCon, setShowPasswordCon] = useState(false);
  const [check, setCheck] = useState(false);
  const SignUp = (
    Gender: string,
    Address: string,
    Education: string,
    Goals: string,
    Image: string,
  ) => {
    setShowModal(true);
    const formdata = new FormData();
    formdata.append('gender', Gender);
    formdata.append('address', Address);
    formdata.append('educational_background', Education);
    formdata.append('goals', Goals);
    {
      image &&
        formdata.append('image', {
          uri: image,
          type: 'image/jpeg',
          name: `image${new Date()}.jpg`,
        });
    }
    // formdata.append('type', 'seller');
    // console.log('hello');

    postApiWithFormDataWithToken({url: 'edit', token: user.api_token}, formdata)
      .then(res => {
        console.log('redd', res);
        setShowModal(false);
        if (res.status == 'success') {
          dispatch(setUser(res.userdata));
          navigation.navigate('Expertise');
          // navigation.navigate('SellerVerification', {email});
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
  const ErrorAlert = () => {
    Alert.alert('Error', 'Please check Terms and conditions');
  };
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  return (
    <Formik
      initialValues={{
        Gender: '',
        Address: '',
        Education: '',
        Goals: '',
        Image: '',
      }}
      validateOnMount={true}
      onSubmit={values => {
        // navigation.navigate('SellerVerification');
        SignUp(
          values.Gender,
          values.Address,
          values.Education,
          values.Goals,
          values.Image,
        );
        // console.log('hello', values);
      }}
      s
      validationSchema={GenderProfile}>
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
          <HeaderComp label="Profile Setup" />
          <View style={styles.imageView}>
            <Wrapper behavior="padding" style={{flex: 1}}>
              <ScrollView
                style={{
                  width: '100%',
                  height: '100%',
                  flex: 1,
                }}>
                <View style={styles.contextView}>
                  <View style={styles.loginContainer}>
                    <TouchableOpacity onPress={() => pickImage(setFieldValue)}>
                      <Image
                        source={
                          image
                            ? {uri: image}
                            : require('../../../Assets/Images/placeholder.png')
                        }
                        style={{width: 100, borderRadius: 10, height: 100}}
                      />
                    </TouchableOpacity>

                    <View style={{height: 10}} />
                    <View
                      style={[
                        styles.mainInputView,
                        {
                          marginTop: 20,
                          width: widthPercentageToDP(90),
                          // backgroundColor: 'red',
                          height: !open1 ? 80 : 200,
                        },
                      ]}>
                      <DropDown
                        open={open1}
                        value={values.Gender}
                        label="Gender"
                        placeholder="Gender"
                        setOpen={setOpen1}
                        setValue={setValue1}
                        items={items1}
                        onChange={handleValueChange1}
                        selectItem={value => {
                          setFieldValue('Gender', value.value);
                          setValue1(value.value);
                          setGender(value.value);
                        }}
                        containerStyle={styles.dropdownContainer}
                        itemStyle={styles.dropdownItem}
                        dropDownStyle={styles.dropdown}
                      />
                    </View>

                    {errors.Gender && touched.Gender && (
                      <Text style={styles.errors}>{errors.Gender}</Text>
                    )}
                    <View style={{height: 10}} />
                    <View style={styles.mainInputView}>
                      <Input
                        label="Address"
                        placeholder="Enter Address"
                        // value={emails}
                        // type="Number"
                        // onChangeText={text => setEmails(text)}
                        value={values.Address}
                        showBorder={true}
                        onChangeText={handleChange('Address')}
                        onBlur={handleBlur('Address')}
                        error={errors.Address}
                        touched={touched.Address}
                      />
                    </View>
                    {errors.Address && touched.Address && (
                      <Text style={styles.errors}>{errors.Address}</Text>
                    )}
                    {/* <View style={{height: 10}} />
                    <Input
                      label="Fields Of Expertise"
                      placeholder="Enter Expertise"
                      // value={emails}
                      // type="Number"
                      // onChangeText={text => setEmails(text)}
                      value={values.phoneNumber}
                      showBorder={true}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      error={errors.phoneNumber}
                      touched={touched.phoneNumber}
                    /> */}
                    <View style={{height: 10}} />
                    <Input
                      label="Educational Backgrounds"
                      placeholder="Enter Backgrounds"
                      // value={emails}
                      // type="Number"
                      // onChangeText={text => setEmails(text)}
                      value={values.Education}
                      showBorder={true}
                      onChangeText={handleChange('Education')}
                      onBlur={handleBlur('Education')}
                      error={errors.Education}
                      touched={touched.Education}
                    />
                    {errors.Education && touched.Education && (
                      <Text style={styles.errors}>{errors.Education}</Text>
                    )}
                    <View style={{height: 10}} />
                    <Input
                      label="Your Goals/Intentions"
                      placeholder="Enter Goals"
                      // value={emails}
                      // type="Number"
                      // onChangeText={text => setEmails(text)}
                      value={values.Goals}
                      showBorder={true}
                      onChangeText={handleChange('Goals')}
                      onBlur={handleBlur('Goals')}
                      error={errors.Goals}
                      touched={touched.Goals}
                    />
                    {errors.Goals && touched.Goals && (
                      <Text style={styles.errors}>{errors.Goals}</Text>
                    )}

                    <View style={styles.forgotView}>
                      {/* <Text
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.forgotText}>
                    Don't have an account?{' '}
                    <Text style={styles.boldLastText}>Sign Up.</Text>
                  </Text> */}

                      <View style={styles.bottomButtonView}>
                        <View style={{marginTop: heightPercentageToDP(5)}}>
                          <FillButton
                            //   disabled={!isValid}
                            customColor="#FFBD00"
                            customTextColor="white"
                            Name="Next"
                            onPress={() => {
                              !image
                                ? Alert.alert('Warning', 'Please enter Image')
                                : !gender
                                ? Alert.alert('Warning', 'Please enter Gender')
                                : handleSubmit();
                              // console.log('errors', errors);
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </Wrapper>
          </View>
          {Loader({show: showModal})}
        </View>
      )}
    </Formik>
  );
};

export default ProfileSetup;
