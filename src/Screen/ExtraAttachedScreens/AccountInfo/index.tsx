import React, {useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import HeaderComp from '../../../Component/HeaderComp';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';

import Input from '../../../Component/Input';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import FillButton from '../../../Component/FillButton';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../Component/Loader';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
import {setUser} from '../../../ReduxToolkit/MyUserSlice';
const AccountInfo = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  // console.log(user);
  const dispatch = useDispatch();
  const pickerFunc = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };
  const update = () => {
    setShowModal(true);
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('phone_no', phoneno);
    {
      image &&
        formData.append('image', {
          uri: image,
          type: 'image/jpeg',
          name: `image${new Date()}.jpg`,
        });
    }
    postApiWithFormDataWithToken({url: 'edit', token: user.api_token}, formData)
      .then(res => {
        console.log('res of aapi ', res);
        setShowModal(false);
        navigation.goBack();
        dispatch(setUser(res.userdata));
      })
      .catch(err => {
        console.log('err', err);
        setShowModal(false);
      });
  };
  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [phoneno, setPhoneno] = useState(user.phone_no);
  const [image, setImage] = useState(user?.image);
  const [showModal, setShowModal] = useState(false);
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        leftIcon={
          <ArrowLeft
            name={'left'}
            size={20}
            onPress={() => navigation.goBack()}
            color={'white'}
          />
        }
        label="Account"
      />

      <ScrollView>
        <View
          style={{
            width: '90%',
            flex: 1,
            //   backgroundColor: 'red',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={() => pickerFunc()}>
            <Image
              source={
                image ? {uri: image} : require('../../../Assets/Images/Ava.png')
              }
              style={{
                height: 80,
                borderRadius: 40,
                alignSelf: 'center',
                width: 80,
                marginTop: 30,
              }}
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: '#FFBD00',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20,
                marginLeft: 50,
                bottom: 20,
                borderRadius: 20,
                alignSelf: 'center',
              }}>
              <ArrowLeft name={'edit'} size={10} color={'white'} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
              <Input
                label="First Name"
                placeholder="Alaxander tobi"
                value={firstname}
                onChangeText={text => setFirstname(text)}
                showBorder={true}
                //   value={values.name}
                //   onChangeText={handleChange('name')}
                //   onBlur={handleBlur('name')}
                //   error={errors.name}
                //   touched={touched.name}
                //   onBlur={handleBlur('email')}
                //   error={errors.email}
                //   touched={touched.email}
              />
            </View>
            <View style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
              <Input
                label="Last Name"
                placeholder="Alaxander tobi"
                value={lastname}
                onChangeText={text => setLastname(text)}
                showBorder={true}
                //   value={values.name}
                //   onChangeText={handleChange('name')}
                //   onBlur={handleBlur('name')}
                //   error={errors.name}
                //   touched={touched.name}
                //   onBlur={handleBlur('email')}
                //   error={errors.email}
                //   touched={touched.email}
              />
            </View>
          </View>
          <View style={{height: 10}} />
          <View style={styles.mainInputView}>
            <Input
              label="Email"
              placeholder="Enter Email"
              showBorder={true}
              value={email}
              nonEditable={true}
              onChangeText={text => setEmail(text)}
              secureTextEntry
              // onBlur={handleBlur('email')}
              // error={errors.email}
              // touched={touched.email}
              // image1={
              //   <Image
              //     source={require('../../../Assets/Images/emailImage.png')}
              //     style={styles.passwordImage}
              //     resizeMode="contain"
              //   />
              // }
            />
          </View>
          <View style={{height: 10}} />
          <View style={styles.mainInputView}>
            <Input
              label="Phone Number"
              placeholder="Enter Phone Number"
              showBorder={true}
              value={phoneno}
              onChangeText={text => setPhoneno(text)}
              // onBlur={handleBlur('email')}
              // error={errors.email}
              // touched={touched.email}
              // image1={
              //   <Image
              //     source={require('../../../Assets/Images/emailImage.png')}
              //     style={styles.passwordImage}
              //     resizeMode="contain"
              //   />
              // }
            />
          </View>

          {/* <Text style={{color: 'white'}}>Additional details</Text> */}

          <View style={{marginTop: heightPercentageToDP(10)}}>
            <FillButton
              customColor="black"
              customTextColor="white"
              Name="Update Profile"
              onPress={() => update()}
            />
            <View style={{height: 30}} />
            <FillButton
              customColor="black"
              customTextColor="white"
              Name="Change Password"
            />
          </View>
        </View>
      </ScrollView>
      {Loader({show: showModal})}
    </View>
  );
};

export default AccountInfo;
