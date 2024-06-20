import React, {useEffect, useState} from 'react';
import {
  Image,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HeaderComp from '../../../Component/HeaderComp';
import styles from './style';
import Logout from 'react-native-vector-icons/AntDesign';
import Input from '../../../Component/Input';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import CameraIcon from 'react-native-vector-icons/Feather';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../../ReduxToolkit/MyUserSlice';
import {
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
import Loader from '../../../Component/Loader';
import FillButton from '../../../Component/FillButton';
import LoginLoader from '../../../Component/LoginLoader';
const BuyerAccountInfo = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  // console.log(user);
  const [fullname, setFullname] = useState(user?.fullname);
  const [email, setEmail] = useState(user?.email);
  const [number, setNumber] = useState(user?.phone_no);
  const [address, setAddress] = useState(user?.address);
  const [image, setImage] = useState(user?.image);
  const [loadingModal, setLoadingModal] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const imagePick = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };
  const deleteAccount = () => {
    getApiwithToken({url: 'delete-user', token: user.api_token}).then(res => {
      console.log('res of delete account', res);
      dispatch(setUser(null));
    });
  };
  const askToDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteAccount()},
      ],
    );
  };
  const update = () => {
    setShowModal(true);
    const formdata = new FormData();
    {
      image &&
        formdata.append('image', {
          uri: image,
          type: 'image/jpeg',
          name: `image${new Date()}.jpg`,
        });
    }
    formdata.append('fullname', fullname);
    formdata.append('email', email);
    formdata.append('phone_no', number);
    formdata.append('address', address);
    postApiWithFormDataWithToken(
      {url: 'edit', token: user?.api_token},
      formdata,
    )
      .then(res => {
        console.log('res oof upload', res);
        setShowModal(false);
        if (res.status == 'success') {
          dispatch(setUser(res.userdata));
          navigation.goBack();
        }
      })
      .catch(err => {
        setShowModal(false);
        console.log('err in login', err);
      });
  };
  const alterModal = () => {
    setLoadingModal(!loadingModal);
    navigation.goBack();
  };
  const navigationFunc = () => {
    navigation.navigate('Signup');
    setLoadingModal(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      !user?.type && setLoadingModal(true);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;

  return (
    <View style={{flex: 1, paddingTop: Platform.OS == 'ios' ? top : 0}}>
      <HeaderComp
        label="Settings"
        backIcon={true}
        navigation={navigation}
        showBellIcon={true}
      />
      <Wrapper behavior="padding" style={{flex: 1}}>
        <ScrollView>
          <View style={styles.middle}>
            <Text
              style={{
                color: 'black',
                marginTop: heightPercentageToDP(5),
                marginBottom: 20,
                fontFamily: 'WorkSans-Regular',
              }}>
              Account Info
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                // backgroundColor: 'red',
              }}>
              <TouchableOpacity
                onPress={() => imagePick()}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 50,
                  backgroundColor: '#ccc',
                  alignItems: 'center',
                  marginBottom: 20,
                  justifyContent: 'center',
                }}>
                {image ? (
                  <Image
                    source={{uri: image}}
                    style={{width: 80, height: 80, borderRadius: 50}}
                  />
                ) : (
                  <CameraIcon
                    name="camera"
                    size={20}
                    style={{marginBottom: 0}}
                    color={'black'}
                  />
                )}
              </TouchableOpacity>
              <Logout
                name="logout"
                size={20}
                onPress={() =>
                  Alert.alert('Logout', 'Are you sure you want to logout?', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        dispatch(setUser(null));
                        navigation.navigate('Login');
                      },
                    },
                  ])
                }
                color={'black'}
              />
            </View>
            <View style={styles.topView}>
              <View
                style={[
                  styles.row,
                  {
                    marginTop: 0,
                    justifyContent: 'space-between',
                  },
                ]}>
                <Input
                  value={fullname}
                  placeholder="Alexander Tobi"
                  onChangeText={text => setFullname(text)}
                  showBorder={true}
                />
              </View>
              <View
                style={[
                  styles.row,
                  {
                    marginTop: 10,
                    justifyContent: 'space-between',
                  },
                ]}>
                <Input
                  value={number}
                  placeholder="234287409"
                  onChangeText={text => setNumber(text)}
                  showBorder={true}
                />
              </View>
              <View
                style={[
                  styles.row,
                  {
                    marginTop: 0,
                    justifyContent: 'space-between',
                  },
                ]}>
                <Input
                  value={address}
                  placeholder="15 Ojoo Road, ibadan"
                  onChangeText={text => setAddress(text)}
                  showBorder={true}
                />
              </View>
              <View
                style={[
                  styles.row,
                  {
                    marginTop: 10,
                    justifyContent: 'space-between',
                  },
                ]}>
                <Input
                  value={email}
                  showBorder={true}
                  placeholder="auroradammie@gmail.com"
                  onChangeText={text => setEmail(text)}
                />
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <FillButton
                customColor="#0F8BC2"
                customTextColor="white"
                Name="Update Account"
                onPress={() => update()}
              />
            </View>
            {/* <TouchableOpacity
              onPress={() => update()}
              style={[
                styles.oneLine,
                {borderTopWidth: 0, marginBottom: 30, marginTop: 10},
              ]}>
              <Text style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
                Update Account
              </Text>
            </TouchableOpacity> */}
            <View style={styles.management}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'WorkSans-Medium',
                  fontSize: 14,
                }}>
                Account Management
              </Text>
              <TouchableOpacity
                onPress={() => askToDelete()}
                style={[
                  styles.oneLine,
                  {borderTopWidth: 0, marginBottom: 10, marginTop: 10},
                ]}>
                <Text style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
                  Deactivate Or Delete Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Wrapper>
      <LoginLoader
        show={loadingModal}
        hideModal={alterModal}
        navigationFunc={navigationFunc}
      />
      {Loader({show: showModal})}
    </View>
  );
};

export default BuyerAccountInfo;
