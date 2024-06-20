import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  ImageBackground,
  Platform,
} from 'react-native';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import styles from './style';
import FillButton from '../../../Component/FillButton';

import Input from '../../../Component/Input';
import Loader from '../../../Component/Loader';
import {postApiWithSimplePayload} from '../../../lib/Apis/api';
import HeaderComp from '../../../Component/HeaderComp';
const ChangePassword = ({navigation, route}: {navigation: any; route: any}) => {
  const {email, pin} = route.params;
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passError, setPassError] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [showconPassword, setShowconPassword] = useState(false);
  const [passConError, setPassConError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const validationFunc = () => {
    if (password.length > 5 && conPassword.length > 5) {
      if (password != conPassword) {
        setPassError("Password doesn't match");
        setPassConError("Confirmation Password doesn't match");
      } else {
        setShowModal(true);
        postApiWithSimplePayload({
          url: 'reset',
          email,
          password,
          password_confirmation: conPassword,
          pin,
        })
          .then(res => {
            if (res) {
              setShowModal(false);
              if (res.status == 'success') {
                navigation.navigate('SellerLogin');
              }
            } else {
              setShowModal(false);
              Alert.alert('Some thing went wrong');
            }
          })
          .catch(err => {
            setShowModal(false);
            console.log('err in changePass', err);
          });
        //
      }
    } else {
      if (!password && !conPassword) {
        setPassError('Enter Password');
        setPassConError('Enter Confirmation Password');
      } else if (password != conPassword) {
        setPassError("Password doesn't match");
        setPassConError("Confirmation Password doesn't match");
      } else if (password.length < 6) {
        setPassError('Password length must be greater than 5');
      } else if (conPassword.length < 6) {
        setPassConError('Confirm password length must be greater than 5');
      } else if (!password) {
        setPassError('Enter Password');
      } else if (!conPassword) {
        setPassConError('Enter Confirmation Password');
      }
    }
  };
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? 30 : 0}]}>
      {/* <ImageBackground
        source={require('../../../Assets/Images/seayellow.jpg')}
        style={{flex: 1}}> */}
      <>
        <HeaderComp
          label="Forgot Passwod"
          // left={<ArrowLeft name="arrowleft" color="white" size={25} />}
          navigation={navigation}
        />
        <ScrollView>
          <View style={styles.contantView}>
            <View>
              <Text style={styles.forgotText}>Change Password</Text>
              <Text style={styles.detailText}>
                We have sent the reset password to the email address{' '}
                <Text style={styles.email}>{email}</Text>
              </Text>
              {/* <Text style={{color: 'black'}}>hi</Text> */}
            </View>
            <View style={styles.midView}>
              {/* <Image
                  resizeMode="contain"
                  source={require('../../../Assets/Images/changepasswrod.png')}
                  style={styles.okPic}
                /> */}
              <View style={{bottom: 20}}>
                <Input
                  showBorder
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    setPassError('');
                  }}
                  // label="New Password"
                  placeholder="Enter your password"
                  secureText={!showPassword}
                  secureToggle={() => setShowPassword(!showPassword)}
                  image1={
                    <Image
                      source={require('../../../Assets/Images/emailImage.png')}
                      style={styles.passwordImage}
                      resizeMode="contain"
                    />
                  }
                  image2={
                    showPassword ? (
                      <Image
                        source={require('../../../Assets/Images/show.png')}
                        style={styles.secureEye}
                        resizeMode="contain"
                        tintColor={'black'}
                      />
                    ) : (
                      <Image
                        source={require('../../../Assets/Images/dontShow.png')}
                        style={styles.secureEye}
                        resizeMode="contain"
                        tintColor={'black'}
                      />
                    )
                  }
                />
                {passError && (
                  <Text style={[styles.errors, {textAlign: 'center'}]}>
                    {passError}
                  </Text>
                )}
              </View>
              <View style={{bottom: 20}}>
                <Input
                  showBorder
                  value={conPassword}
                  onChangeText={text => {
                    setConPassword(text);
                    setPassConError('');
                  }}
                  // label="Re-enter New Password"
                  placeholder="Re-Enter your password"
                  secureText={!showconPassword}
                  secureToggle={() => setShowconPassword(!showconPassword)}
                  image1={
                    <Image
                      source={require('../../../Assets/Images/emailImage.png')}
                      style={styles.passwordImage}
                      resizeMode="contain"
                    />
                  }
                  image2={
                    showPassword ? (
                      <Image
                        source={require('../../../Assets/Images/show.png')}
                        style={styles.secureEye}
                        resizeMode="contain"
                        tintColor={'black'}
                      />
                    ) : (
                      <Image
                        source={require('../../../Assets/Images/dontShow.png')}
                        style={styles.secureEye}
                        resizeMode="contain"
                        tintColor={'black'}
                      />
                    )
                  }
                />
                {passConError && (
                  <Text style={[styles.errors, {textAlign: 'center'}]}>
                    {passConError}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.bottomView}>
              <FillButton
                Name="Update Password"
                onPress={() => validationFunc()}
              />
            </View>
          </View>
        </ScrollView>
      </>
      {/* </ImageBackground> */}

      {Loader({show: showModal})}
    </View>
  );
};

export default ChangePassword;
