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
const EnterValidationChoice = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  // const {showLanding} = useSelector(state => state.user);
  // const dispatch = useDispatch();
  const loginApi = (email: string, password: string) => {
    console.log('all done');
  };
  const {email} = route.params;
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
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#373A43',
              borderRadius: 10,
              width: '100%',
              paddingVertical: 10,
              // marginTop: heightPercentageToDP(20),
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../Assets/Images/phone1.png')}
                style={{height: 50, width: 50}}
              />
              <View>
                <Text style={{color: '#BDBDBD', fontFamily: 'ArialMdm'}}>
                  Via sms
                </Text>
                <Text
                  style={{color: 'white', fontFamily: 'ArialCE', marginTop: 5}}>
                  +92-333-XXXXXXX
                </Text>
              </View>
            </View>
            <BackIcon name="right" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#373A43',
              borderRadius: 10,
              width: '100%',
              paddingVertical: 10,
              marginTop: 20,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../Assets/Images/email1.png')}
                style={{height: 50, width: 50}}
                resizeMode="contain"
              />
              <View style={{marginLeft: 10}}>
                <Text style={{color: '#BDBDBD', fontFamily: 'ArialMdm'}}>
                  Via e-mail
                </Text>
                <Text
                  style={{color: 'white', fontFamily: 'ArialCE', marginTop: 5}}>
                  support@outlook.com
                </Text>
              </View>
            </View>
            <BackIcon name="right" size={20} />
          </TouchableOpacity>
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
            onPress={() => navigation.navigate('EmailVerification', {email})}
          />
        </View>
      </View>
      {/* {Loader({show: showModal})} */}
    </View>
  );
};

export default EnterValidationChoice;
