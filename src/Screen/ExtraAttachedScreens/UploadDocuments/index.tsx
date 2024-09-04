import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  // Image,
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GestureHandlerRootView,
  LongPressGestureHandler,
  State,
} from 'react-native-gesture-handler';
import ArrowBack from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import HeaderComp from '../../../Component/HeaderComp';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../../Component/Input';
import Icon3 from 'react-native-vector-icons/Entypo';
import {createThumbnail} from 'react-native-create-thumbnail';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import FillButton from '../../../Component/FillButton';
import moment from 'moment';
import {useSelector} from 'react-redux';
import Loader from '../../../Component/Loader';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
const UploadDocuments = ({navigation, route}) => {
  const {item} = route.params;
  const {user} = useSelector(state => state.user);
  const [show, setShow] = useState(false);
  const [img, setImg] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [more, setMore] = useState('');
  const reactions = [
    {label: 'Like', icon: require('../../../Assets/Images/Ava.png')},

    {label: 'Haha', icon: require('../../../Assets/Images/profilePick.png')},
    {label: 'Wow', icon: require('../../../Assets/Images/Round.png')},
    {label: 'Sad', icon: require('../../../Assets/Images/location.png')},
    {label: 'Angry', icon: require('../../../Assets/Images/Facebook.png')},
  ];
  const [array, setArray] = useState([]);
  const convertSize = (bytes: number) => {
    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(2)} KB`;
    } else {
      const mb = kb / 1024;
      return `${mb.toFixed(2)} MB`;
    }
  };
  const removeItem = itemId => {
    setArray(prevItems => prevItems.filter(item => item !== itemId));
  };
  const renderItem = ({item}) => (
    <View
      style={{
        width: widthPercentageToDP(90),
        marginRight: 20,
        marginTop: 20,
        borderRadius: 10,
        // borderWidth: 1,
        borderColor: 'white',
        elevation: 2,
        padding: 20,
        backgroundColor: '#373A43',
        // height: 200,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../../../Assets/Images/PDF.png')}
          style={{height: 50, width: 50}}
        />
        <View style={{marginLeft: 10}}>
          <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
            {item.name}
          </Text>
          <View
            style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
            <Text
              style={{color: 'white', fontSize: 12, fontFamily: 'ArialMdm'}}>
              {convertSize(item.size)}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                marginLeft: 10,
                fontFamily: 'ArialMdm',
              }}>
              {moment().format('DD-MMM-YYYY')}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeItem(item)}
        style={{
          flexDirection: 'row',
          marginTop: 20,
          // backgroundColor: 'blue',
          alignItems: 'center',
        }}>
        <ArrowBack name={'delete'} size={20} color={'red'} />
        <Text
          style={{
            color: 'red',
            fontSize: 12,
            marginLeft: 10,
            fontFamily: 'ArialMdm',
          }}>
          Remove file
        </Text>
      </TouchableOpacity>
    </View>
  );
  const Apply = () => {
    setShowModal(true);
    const data = new FormData();
    data.append('job_id', item?.id);
    data.append('address', address);
    data.append('description', more);
    array.map(item =>
      data.append('resume', {
        uri: item.fileCopyUri,
        type: 'application/pdf',
        name: `pdf${new Date()}.pdf`,
      }),
    );
    postApiWithFormDataWithToken(
      {url: 'applyJob', token: user?.api_token},
      data,
    )
      .then(res => {
        console.log('res of apply', res);
        setShowModal(false);
        navigation.navigate('PostDetailHours', {item});
      })
      .catch(err => {
        setShowModal(false);
      });
  };
  const [showReactions, setShowReactions] = useState(false);
  const scaleAnim = new Animated.Value(0);

  const handleLongPress = ({nativeEvent}) => {
    // console.log('handleLongPress called');
    if (nativeEvent.state === State.ACTIVE) {
      console.log('Long press detected');
      setShowReactions(true);
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    console.log('Press released');
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 20000,
      useNativeDriver: true,
    }).start(() => {
      setShowReactions(false);
    });
  };

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
        label="Apply Job"
      />

      <ScrollView>
        <View
          style={{
            width: '90%',
            flex: 1,
            //   backgroundColor: 'red',
            alignSelf: 'center',
          }}>
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
                nonEditable={true}
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
                nonEditable={true}
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
              nonEditable={true}
              value={email}
              onChangeText={text => setEmail(text)}
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

          {/* <Text style={{color: 'white'}}>Additional details</Text> */}
          <Text style={{color: 'white', fontFamily: 'ArialMdm', marginTop: 20}}>
            More Information
          </Text>
          <TextInput
            placeholder="Write here..."
            placeholderTextColor={'white'}
            textAlignVertical="top"
            value={more}
            multiline
            onChangeText={text => setMore(text)}
            style={{
              backgroundColor: '#373A43',
              borderRadius: 20,
              padding: 20,
              elevation: 1,
              shadowColor: '#FAFAFA',
              // shadowColor: '#000', // Shadow color
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.5,
              shadowRadius: 1,
              fontFamily: 'ArialCE',
              marginTop: 10,
              height: 200,
            }}
          />
          <View style={{width: '100%'}}>
            <FlatList
              nestedScrollEnabled={true}
              data={array}
              horizontal
              renderItem={renderItem}
            />
          </View>
          {/* <TouchableOpacity
            onPress={async () => {
              if (array.length == 0) {
                try {
                  const pickerResult = await DocumentPicker.pickSingle({
                    presentationStyle: 'fullScreen',
                    copyTo: 'cachesDirectory',
                    type: types.pdf,
                  });
                  // setDocument(pickerResult);
                  console.log('pickerResult', pickerResult);

                  setArray(prev => [...prev, pickerResult]);
                  // setImages;
                } catch (e) {
                  console.log('error', e);
                }
              }
            }}
            style={{
              backgroundColor: '#373A43',
              marginTop: 20,
              height: 150,
              borderRadius: 20,
              borderWidth: 1,
              elevation: 1,
              shadowColor: '#FAFAFA',
              // shadowColor: '#000', // Shadow color
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.5,
              shadowRadius: 1,
              borderColor: '#9D97B5',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../Assets/Images/upload.png')}
              style={{height: 50, tintColor: 'white', width: 50}}
            />
            <Text
              style={{color: 'white', fontFamily: 'ArialMdm', marginTop: 10}}>
              Upload CV/Resume
            </Text>
          </TouchableOpacity> */}

          <View style={{marginVertical: 40}}>
            <FillButton
              customColor="#FFBD00"
              customTextColor="white"
              Name="Apply"
              onPress={() => Apply()}
            />
          </View>
        </View>
      </ScrollView>
      {Loader({show: showModal})}
    </View>
  );
};

export default UploadDocuments;
