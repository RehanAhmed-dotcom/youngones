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
import {
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../../ReduxToolkit/MyUserSlice';
// import Loader from '../../../Components/Loader';
// import {postApiWithSimplePayload} from '../../../Lib/api';
// import {loginValidationSchema} from '../../../Lib/ValidationSchemas';
const Expertise = ({navigation}: {navigation: any}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const data = [
    'User Interface/User Experience Designer',
    'Flutter Front-End Developer',
    'Flutter Back-End Developer',
    'React Front-End Developer',
    'React Back-End Developer',
    'Accounting',
  ];
  const [expertiseList, setExpertiseList] = useState([]);
  console.log('ex', expertiseList);
  const renderItem = ({item}) => (
    <ExpertiseItem
      onPress={() => {
        setExpertiseList(prev => {
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
    // <ExpertiseItem
    //   onPress={() => {
    //     // setExpertiseList(prev => [...prev, item]);
    //     setExpertiseList(prev => {
    //       if (prev.includes(item.name)) {
    //         // Item exists, remove it
    //         return prev.filter(existingItem => existingItem !== item);
    //       } else {
    //         // Item does not exist, add it
    //         return [...prev, item];
    //       }
    //     });
    //   }}
    //   item={item}
    // />
  );

  const {user} = useSelector(state => state.user);
  const [expertiseArray, setExpertiseArray] = useState([]);
  const [searchedExp, setSearchedExp] = useState([]);
  const [search, setSearch] = useState('');
  const SearchExpertise = (text: string) => {
    let filteredName = [];
    // if (e) {
    filteredName = expertiseArray.filter(item => {
      return item?.name.toLowerCase().includes(`${text.toLowerCase()}`);
      // return item.vender.fullname.toLowerCase().includes(`${e.toLowerCase()}`);
    });
    setSearchedExp(filteredName);
  };
  const expertise = () => {
    setShowModal(true);
    const formdata = new FormData();
    expertiseList.map(item => formdata.append('expertise[]', item.name));

    postApiWithFormDataWithToken({url: 'edit', token: user.api_token}, formdata)
      .then(res => {
        console.log('redd', res);
        setShowModal(false);
        if (res.status == 'success') {
          dispatch(setUser(res.userdata));

          navigation.navigate('Intrests');
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
  useEffect(() => {
    getApiwithToken({url: 'expertise', token: user.api_token}).then(res => {
      // console.log('res of expertise', res);
      setExpertiseArray(res.data);
      setSearchedExp(res.data);
    });
  }, []);
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
            value={search}
            onChangeText={text => {
              setSearch(text);
              SearchExpertise(text);
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
          <FlatList data={searchedExp} renderItem={renderItem} />
        </View>
        <View style={{width: '90%', marginBottom: 20}}>
          <FillButton
            customColor="#FFBD00"
            customTextColor="white"
            Name="Next"
            onPress={() =>
              expertiseList.length > 0
                ? expertise()
                : Alert.alert('Warning', 'Please select expertise')
            }
          />
        </View>
      </View>
      {Loader({show: showModal})}
    </View>
  );
};

export default Expertise;
