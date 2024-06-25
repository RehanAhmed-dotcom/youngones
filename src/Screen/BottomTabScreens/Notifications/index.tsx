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

const Notifications = ({navigation}: {navigation: any}) => {
  const data = ['1', '2', '3', '4', '5'];
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{backgroundColor: '#FFBD00', borderRadius: 10, marginBottom: 15}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#373A43',
          left: 3,
          padding: 10,
          borderRadius: 10,
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 50,
            width: 50,

            backgroundColor: '#FFBD00',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ArrowBack color={'white'} size={20} name={'bells'} />
        </View>

        <View style={{marginLeft: 15}}>
          <View
            style={{
              // backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
              width: '70%',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
              New Notification
            </Text>
            <Text
              style={{
                fontSize: 10,
                marginRight: 4,
                color: 'white',
                fontFamily: 'ArialCE',
              }}>
              12:30PM
            </Text>
          </View>
          <Text
            style={{
              color: 'white',
              width: '60%',
              marginTop: 5,
              fontSize: 12,
              fontFamily: 'ArialCE',
              lineHeight: 20,
            }}>
            Qrygg elomin kashyyyk skirata. Oswaft mirta omwati kohl shmi.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        label="Notifications"
        leftIcon={
          <ArrowBack
            size={20}
            onPress={() => navigation.goBack()}
            color={'white'}
            name={'left'}
          />
        }
      />
      <View style={{width: '90%', paddingTop: 20, alignSelf: 'center'}}>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default Notifications;
