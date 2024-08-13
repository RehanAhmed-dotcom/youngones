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
import InterestItem from '../../../Component/InterestItem';
import {
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../../ReduxToolkit/MyUserSlice';
// import Loader from '../../../Components/Loader';
// import {postApiWithSimplePayload} from '../../../Lib/api';
// import {loginValidationSchema} from '../../../Lib/ValidationSchemas';
const Intrests = ({navigation}: {navigation: any}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [intrestList, setInterestList] = useState([]);
  console.log('int', intrestList);
  const {user} = useSelector(state => state.user);
  const [interestArray, setInterestArray] = useState([]);
  const [searchedInt, setSearchedInt] = useState([]);
  const [search, setSearch] = useState('');
  const SearchInterest = (text: string) => {
    let filteredName = [];
    // if (e) {
    filteredName = interestArray.filter(item => {
      return item?.name.toLowerCase().includes(`${text.toLowerCase()}`);
      // return item.vender.fullname.toLowerCase().includes(`${e.toLowerCase()}`);
    });
    setSearchedInt(filteredName);
  };
  const dispatch = useDispatch();
  const data = [
    'User Interface/User Experience Designer',
    'Flutter Front-End Developer',
    'Flutter Back-End Developer',
    'React Front-End Developer',
    'React Back-End Developer',
    'Accounting',
  ];
  useEffect(() => {
    getApiwithToken({url: 'interest', token: user?.api_token}).then(res => {
      console.log('res of expertise', res);
      setInterestArray(res.data);
      setSearchedInt(res.data);
    });
  }, []);
  const renderItem = ({item}) => (
    <InterestItem
      onPress={() => {
        setInterestList(prev => {
          // Check if the item with the same name already exists
          const itemExists = prev.some(
            existingItem => existingItem.name === item.name,
          );

          if (itemExists) {
            // Item exists, remove it
            return prev.filter(existingItem => existingItem.name !== item.name);
          } else {
            // Item does not exist, add it
            return [...prev, item];
          }
        });
      }}
      item={item}
    />
  );

  const intrestApi = () => {
    setShowModal(true);
    const formdata = new FormData();

    intrestList.map(item => formdata.append('interest[]', item.name));
    postApiWithFormDataWithToken(
      {url: 'edit', token: user?.api_token},
      formdata,
    )
      .then(res => {
        console.log('redd', res);
        setShowModal(false);
        if (res.status == 'success') {
          dispatch(setUser(res.userdata));
          navigation.navigate('SubmitDocument');
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
  const ErrorAlert = ({navigation}) => {
    Alert.alert('Error', 'Please check Terms and conditions');
  };
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
        label="What is your interests"
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
          <ArrowBack name={'search1'} size={20} color={'#1A1E25'} />
          <TextInput
            placeholder="Search here..."
            placeholderTextColor={'#6C757D'}
            value={search}
            onChangeText={text => {
              setSearch(text);
              SearchInterest(text);
            }}
            style={{
              color: 'black',
              fontFamily: 'ArialCE',
              marginLeft: 5,
              width: '100%',
            }}
          />
        </View>
        <View style={{width: '90%', flex: 1, marginTop: 30}}>
          <FlatList data={searchedInt} renderItem={renderItem} />
        </View>
        <View style={{width: '90%', marginBottom: 20}}>
          <FillButton
            customColor="#FFBD00"
            customTextColor="white"
            Name="Next"
            onPress={() =>
              intrestList.length > 2
                ? intrestApi()
                : Alert.alert('Warning', 'Please select minimum 3 intrest')
            }
          />
        </View>
      </View>
      {Loader({show: showModal})}
    </View>
  );
};

export default Intrests;
