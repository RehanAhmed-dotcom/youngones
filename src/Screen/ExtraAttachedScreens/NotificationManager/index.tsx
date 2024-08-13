import React, {useEffect, useState} from 'react';
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
  Modal,
} from 'react-native';
import styles from './style';
import ToggleIcon from 'react-native-vector-icons/Fontisto';
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
import {
  singlePostPopularData,
  singlePostRecentData,
  suggestedPeoples,
} from '../../../Component/dummyData';
import SinglePost from '../../../Component/SinglePost';
import People from '../../../Component/People';
import {getApiwithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';

const NotificationManager = ({navigation}: {navigation: any}) => {
  const [toggle, setToggle] = useState(true);
  const {user} = useSelector(state => state.user);
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const toggleApi = () => {
    getApiwithToken({url: 'notifyStatus', token: user?.api_token}).then(res => {
      console.log('res', res);
    });
  };
  useEffect(() => {
    getApiwithToken({url: 'checkNotifyStatus', token: user?.api_token}).then(
      res => {
        console.log('res', res);
        if (res.notifyStatus == 0) {
          setToggle(false);
        } else {
          setToggle(true);
        }
      },
    );
  }, []);
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        leftIcon={
          <ArrowBack
            onPress={() => navigation.goBack()}
            name="left"
            size={20}
            color={'white'}
          />
        }
        label="Notification Manage"
        // mid={
        //   <TouchableOpacity
        //     onPress={() => navigation.navigate('Account')}
        //     style={{flexDirection: 'row', alignItems: 'center'}}>
        //     <Image
        //       source={require('../../../Assets/Images/profile.png')}
        //       style={{height: 30, width: 30, borderRadius: 20}}
        //     />
        //     <Text style={{color: 'white', marginLeft: 5, fontSize: 16}}>
        //       John Travolta
        //     </Text>
        //   </TouchableOpacity>
        // }
        // rightIcon={
        //   <Image
        //     source={require('../../../Assets/Images/Notification.png')}
        //     style={{height: 20, width: 20}}
        //     resizeMode="contain"
        //   />
        // }
      />
      <ScrollView>
        <View style={styles.imageView}>
          <View style={{width: '90%'}}>
            <View
              style={{
                backgroundColor: '#373A43',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                borderRadius: 5,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
                {`You want to turn ${toggle ? 'off' : 'on'} the notifications?`}
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ToggleIcon
                  name={toggle ? 'toggle-on' : 'toggle-off'}
                  size={20}
                  onPress={() => {
                    setToggle(!toggle);
                    toggleApi();
                  }}
                  color="#2D2D35"
                />
              </View>
            </View>

            <View style={{height: 100}} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationManager;
