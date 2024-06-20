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
import FillButton from '../../../Component/FillButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {sellerSignUpValidationSchema} from '../../../lib/ValidationSchemas';
import Loader from '../../../Component/Loader';
import HeaderComp from '../../../Component/HeaderComp';
import ExpertiseItem from '../../../Component/ExpertiseItem';
import InterestItem from '../../../Component/InterestItem';

const Chat = ({navigation}: {navigation: any}) => {
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
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
          <Text style={{color: 'white', textAlign: 'center'}}>
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
          <Text style={{fontSize: 16, textAlign: 'center', color: 'white'}}>
            Password Has Been Reset Successfully
          </Text>
        </View>
        <View style={{width: '90%', marginTop: heightPercentageToDP(10)}}>
          <FillButton
            customColor="#FFBD00"
            customTextColor="white"
            Name="Next"
            onPress={() => navigation.navigate('SubmitDocument')}
          />
        </View>
      </View>
    </View>
  );
};

export default Chat;
