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
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowBack from 'react-native-vector-icons/AntDesign';
// import {Formik} from 'formik';
import FillButton from '../../../Component/FillButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
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
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
import {setUser} from '../../../ReduxToolkit/MyUserSlice';
// import Loader from '../../../Components/Loader';
// import {postApiWithSimplePayload} from '../../../Lib/api';
// import {loginValidationSchema} from '../../../Lib/ValidationSchemas';
const SubmitDocument = ({navigation}: {navigation: any}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const data = [
    'User Interface/User Experience Designer',
    'Flutter Front-End Developer',
    'Flutter Back-End Developer',
    'React Front-End Developer',
    'React Back-End Developer',
    'Accounting',
  ];
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
        marginVertical: 20,
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

  const [array, setArray] = useState([]);
  const [info, setInfo] = useState('');
  console.log('arry', array);

  const ErrorAlert = ({navigation}) => {
    Alert.alert('Error', 'Please check Terms and conditions');
  };
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const SubmitDoc = () => {
    setShowModal(true);
    const formdata = new FormData();
    formdata.append('about', info);

    array.map(item =>
      formdata.append('document[]', {
        uri: item.fileCopyUri,
        type: 'application/pdf',
        name: `pdf${new Date()}.pdf`,
      }),
    );
    postApiWithFormDataWithToken({url: 'edit', token: user.api_token}, formdata)
      .then(res => {
        console.log('ress of api', res);
        setShowModal(false);
        // navigation.navigate('SuccessSubmit');
        dispatch(setUser(res.userdata));
      })
      .catch(err => {
        setShowModal(false);
      });
  };
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
        label="Submit Document"
      />

      <ScrollView>
        <View style={styles.imageView}>
          <View style={{width: '90%', flex: 1}}>
            <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
              Additional details
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'ArialMdm',
                marginTop: 30,
              }}>
              More Information
            </Text>
            <TextInput
              placeholder="Write here..."
              placeholderTextColor={'white'}
              textAlignVertical="top"
              value={info}
              onChangeText={text => setInfo(text)}
              style={{
                backgroundColor: '#373A43',
                borderRadius: 20,
                padding: 20,
                fontFamily: 'ArialCE',
                marginTop: 10,
                height: 200,
              }}
            />

            {/* {document && <View>
                
                </View>} */}
            <TouchableOpacity
              onPress={async () => {
                if (array.length <= 10) {
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
                marginTop: 40,
                height: 150,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../../../Assets/Images/upload.png')}
                style={{height: 50, width: 50}}
              />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'ArialMdm',
                  marginTop: 10,
                }}>
                Upload CV/Resume
              </Text>
            </TouchableOpacity>

            <View style={{width: '100%'}}>
              <FlatList
                nestedScrollEnabled={true}
                data={array}
                horizontal
                renderItem={renderItem}
              />
            </View>

            <Text
              style={{
                color: 'white',
                fontFamily: 'ArialCE',
                marginTop: 20,
              }}>
              You may attach up to 10 files under the size of 25 MB each.
              Include work sample or other documents to support your application
            </Text>
          </View>

          <View style={{width: '90%', marginVertical: 30}}>
            <FillButton
              customColor="#FFBD00"
              customTextColor="white"
              Name="Next"
              onPress={() => {
                array.length > 0
                  ? SubmitDoc()
                  : Alert.alert('Warning', 'Please enter CV/Resume');
                // ;
                // handleSubmit();
              }}
            />
          </View>
        </View>
      </ScrollView>
      {Loader({show: showModal})}
    </View>
  );
};

export default SubmitDocument;
