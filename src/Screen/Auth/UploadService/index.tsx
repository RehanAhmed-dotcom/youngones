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
  PermissionsAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ImagePlaceholder from 'react-native-vector-icons/Ionicons';
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Formik} from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import FillButton from '../../../Component/FillButton';
import DropDown from '../../../Component/DropDown';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Formik} from 'formik';
import {sellerSetupAccountValidationSchema} from '../../../lib/ValidationSchemas';
// import {useDispatch, useSelector} from 'react-redux';
import {
  getApiwithOutToken,
  postApiWithFormDataWithToken,
  postApiWithSimplePayload,
} from '../../../lib/Apis/api';
import Loader from '../../../Component/Loader';
import WeekdaySelector from '../../../Component/WeekSelector';
const UploadService = ({navigation}: {navigation: any}) => {
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const [opencat, setOpenCat] = useState(false);
  const [value, setValue] = useState(null);
  const [categoryArray, setCategoryArray] = useState([]);
  const [selectedRange, setSelectedRange] = useState({start: null, end: null});
  const [catId, setCatId] = useState('');
  const [subCatId, setSubCatId] = useState('');
  const [subCat, setSubCat] = useState([]);
  console.log('subcat', subCat);
  // console.log('value of state', value);
  const items = [
    {id: 1, label: '₦15', value: '15'},
    {id: 2, label: '₦22', value: '22'},
    {id: 3, label: '₦25', value: '25'},
    {id: 1, label: '₦32', value: '32'},
    {id: 2, label: '₦45', value: '45'},
    {id: 3, label: '₦50', value: '50'},
    {id: 1, label: '₦65', value: '65'},
    {id: 2, label: '₦70', value: '70'},
    {id: 3, label: '₦100', value: '100'},
  ];
  const handleValueChange = (value: any) => {
    console.log('Selected value:', value());
  };
  const handleWholeItem = (value: any) => {
    console.log('item', value);
  };
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);

  const handleValueChange1 = (value: any) => {
    console.log('Selected value:', value());
  };

  const handleWholeItem1 = (value: any) => {
    console.log('item', value);
  };
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);

  const handleValueChange2 = (value: any) => {
    console.log('Selected value:', value());
  };
  const handleWholeItem2 = (value: any) => {
    console.log('item', value);
  };

  // const [check, setCheck] = useState(false);
  const imagePick = (setFieldValue: any) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      setFieldValue('image', image.path);
    });
  };
  const checkPermission = async (setFieldValue: any) => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
        if (
          granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          imagePick(setFieldValue);
        } else {
          console.log('Permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      imagePick(setFieldValue);
      // For iOS or other platforms
      // You can use the react-native-permissions library
      // const cameraPermission = await check(PERMISSIONS.IOS.CAMERA);
      // const storagePermission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      // if (
      //   cameraPermission === RESULTS.GRANTED &&
      //   storagePermission === RESULTS.GRANTED
      // ) {
      //   console.log('You can use the camera and access storage');
      // } else {
      //   console.log('Permission denied');
      // }
    }
  };
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  // const user = useSelector(state => state.user.user);
  const handleFail = error => {
    console.error('Google Places Autocomplete failed:', error);
  };
  // console.log('user', user);
  const serviceUpload = (
    serviceName: string,
    serviceBio: string,
    category: string,
    address: string,
    type: string,
    Price: string,
    image: string,
  ) => {
    setShowModal(true);
    const formdata = new FormData();
    {
      image &&
        formdata.append('service_image', {
          uri: image,
          type: 'image/jpeg',
          name: `image${new Date()}.jpg`,
        });
    }
    // formdata.append('serviceImage', image);
    formdata.append('serviceName', serviceName);
    formdata.append('serviceBio', serviceBio);
    formdata.append('serviceCat', catId);
    formdata.append('serviceAddress', address);
    formdata.append('serviceType', subCatId);
    formdata.append('servicePrice', Price);
    postApiWithFormDataWithToken(
      {url: 'edit', token: user?.api_token},
      formdata,
    )
      .then(res => {
        console.log('res oof upload', res);
        setShowModal(false);
        if (res.status == 'success') {
          // dispatch(setUser(res.userdata));
          navigation.navigate('BVNVerification', {item: res});
        }
      })
      .catch(err => {
        setShowModal(false);
        console.log('err in login', err);
      });
  };
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const loginWithbrackerts = () => {
    console.log('loginWithbrackerts');
  };
  const loginwithParams = (id: string) => {
    console.log('id', id);
  };
  useEffect(() => {
    getApiwithOutToken({url: 'all_cat'}).then(res => {
      console.log('res', res);
      const arr = res.data;
      const dropdownArray = arr.map(item => {
        return {
          id: item.id,
          label: item.name,
          value: item.name,
          subCat: item.sub_cat,
        };
      });
      // console.log('hello', dropdownArray);
      setCategoryArray(dropdownArray);
    });
  }, []);
  const handleDaySelection = day => {
    setSelectedRange(prevRange => {
      if (prevRange.start === null || prevRange.end !== null) {
        return {start: day, end: null}; // Set start or reset the range
      } else {
        return {...prevRange, end: day}; // Set end of the range
      }
    });
  };

  const getType = (item: any) => {
    const arr = item.subCat;
    const dropdownArray = arr.map(item => {
      return {
        id: item.id,
        label: item.name,
        value: item.name,
      };
    });
    // console.log('hello', dropdownArray);
    setSubCat(dropdownArray);
  };
  return (
    <Formik
      initialValues={{
        serviceName: '',
        serviceBio: '',
        category: '',
        address: '',
        type: '',
        Price: '',
        image: '',
      }}
      validateOnMount={true}
      onSubmit={values => {
        // navigation.navigate('BVNVerification');
        serviceUpload(
          values.serviceName,
          values.serviceBio,
          values.category,
          values.address,
          values.type,
          values.Price,
          values.image,
        );
      }}
      validationSchema={sellerSetupAccountValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
        setFieldValue,
      }) => (
        <View
          style={[
            styles.mainView,
            {paddingTop: Platform.OS == 'ios' ? top : 0},
          ]}>
          <View style={styles.imageView}>
            <Wrapper behavior="padding" style={{flex: 1}}>
              <ScrollView
                nestedScrollEnabled
                style={{
                  width: '100%',
                  height: '100%',
                }}>
                <View style={styles.contextView}>
                  <View style={styles.loginContainer}>
                    <Text style={styles.signIn}>Set up your account</Text>
                    <Text style={styles.nameText}>
                      Complete setting up your account
                    </Text>
                    <TouchableOpacity
                      onPress={() => checkPermission(setFieldValue)}
                      style={styles.imagedottedView}>
                      {values.image ? (
                        <View style={{width: '100%', height: '100%'}}>
                          <Image
                            style={{width: '100%', height: '100%'}}
                            source={{uri: values.image}}
                          />
                        </View>
                      ) : (
                        <View style={styles.emptyImageView}>
                          <ImagePlaceholder
                            name="image-outline"
                            size={30}
                            color={'grey'}
                          />
                          <Text
                            style={{
                              color: '#073F57',
                              fontFamily: 'WorkSans-Regular',
                              marginTop: 5,
                            }}>
                            Choose Image
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: 'grey',
                        fontFamily: 'WorkSans-Regular',
                        fontSize: 10,
                        marginTop: 4,
                      }}>
                      Support JPG, PNG, JPEG
                    </Text>
                    {errors.image && touched.image && (
                      <Text style={styles.errors}>{errors.image}</Text>
                    )}
                    <View style={{height: 30}} />
                    <Text
                      style={{
                        fontFamily: 'WorkSans-Medium',
                        fontSize: 14,
                        color: 'black',
                        alignSelf: 'flex-start',
                      }}>
                      Working Days
                    </Text>
                    {/* <WeekdaySelector value={selectedRange} onPress={()=>handleDaySelection}/> */}
                    <View style={styles.mainInputView}>
                      <Input
                        label="Service Name"
                        placeholder="Car Washing"
                        // value={email}
                        // onChangeText={text => setEmail(text)}
                        showBorder={true}
                        value={values.serviceName}
                        onChangeText={handleChange('serviceName')}
                        onBlur={handleBlur('serviceName')}
                        error={errors.serviceName}
                        touched={touched.serviceName}
                        //   onBlur={handleBlur('email')}
                        //   error={errors.email}
                        //   touched={touched.email}
                      />
                    </View>
                    {errors.serviceName && touched.serviceName && (
                      <Text style={styles.errors}>{errors.serviceName}</Text>
                    )}
                    <View style={{height: 10}} />
                    <View style={styles.mainInputView}>
                      <Input
                        label="Service Bio"
                        placeholder="Car Washing"
                        // value={email}
                        // onChangeText={text => setEmail(text)}
                        showBorder={true}
                        value={values.serviceBio}
                        onChangeText={handleChange('serviceBio')}
                        onBlur={handleBlur('serviceBio')}
                        error={errors.serviceBio}
                        touched={touched.serviceBio}
                      />
                    </View>
                    {errors.serviceBio && touched.serviceBio && (
                      <Text style={styles.errors}>{errors.serviceBio}</Text>
                    )}
                    <View
                      style={[
                        styles.mainInputView,
                        {marginTop: 20, height: !open ? 80 : 230},
                      ]}>
                      <DropDown
                        open={open}
                        value={values.category}
                        label="Category"
                        setOpen={setOpen}
                        setValue={setValue}
                        items={categoryArray}
                        onChange={handleValueChange}
                        selectItem={value => {
                          // console.log('item', value);
                          getType(value);
                          setFieldValue('category', value.value);
                          setCatId(value.id);
                        }}
                        containerStyle={styles.dropdownContainer}
                        itemStyle={styles.dropdownItem}
                        dropDownStyle={styles.dropdown}
                      />
                    </View>
                    {errors.category && touched.category && (
                      <Text style={styles.errors}>{errors.category}</Text>
                    )}
                    <View style={{height: 10}} />
                    <View style={[styles.mainInputView]}>
                      {/* <GooglePlacesAutocomplete
                        placeholder="Enter Address"
                        onFail={handleFail}
                        textInputProps={{
                          placeholderTextColor: 'grey', // Change this to your desired color
                          fontFamily: 'WorkSans-Regular',
                        }}
                        styles={{
                          textInputContainer: {
                            backgroundColor: '#F6F7F9',
                            borderRadius: 10,
                            height: 50,
                            fontFamily: 'WorkSans-Regular',
                          },

                          textInput: {
                            height: 50,
                            color: 'black',
                            borderWidth: 1,
                            borderColor: '#B5DBEC',
                            backgroundColor: '#F6F7F9',
                            fontSize: 16,
                          },
                        }}
                        onPress={(data, details = null) => {
                          // 'details' is provided when fetchDetails = true
                          console.log(data, details);
                        }}
                        query={{
                          key: 'AIzaSyDY4l5-EtY1kGEs2g_CNdkwKGTIgfNLa-4',
                          language: 'en',
                        }}
                      /> */}
                      <Input
                        label="Address"
                        placeholder="Enter full address"
                        showBorder={true}
                        value={values.address}
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        error={errors.address}
                        touched={touched.address}
                      />
                    </View>
                    {errors.address && touched.address && (
                      <Text style={styles.errors}>{errors.address}</Text>
                    )}
                    <View style={{height: 10}} />
                    <View
                      style={[
                        styles.mainInputView,
                        {marginTop: 20, height: !opencat ? 80 : 230},
                      ]}>
                      <DropDown
                        open={opencat}
                        value={values.type}
                        label="Type"
                        setOpen={setOpenCat}
                        setValue={setValue}
                        items={subCat}
                        onChange={handleValueChange}
                        selectItem={value => {
                          console.log('item', value);
                          // getType(item);
                          setFieldValue('type', value.value);
                          setSubCatId(value.id);
                        }}
                        containerStyle={styles.dropdownContainer}
                        itemStyle={styles.dropdownItem}
                        dropDownStyle={styles.dropdown}
                      />
                    </View>
                    {errors.type && touched.type && (
                      <Text style={styles.errors}>{errors.type}</Text>
                    )}
                    <View style={[styles.twoDrop]}>
                      {/* <View
                        style={[
                          styles.mainInputView,
                          {
                            marginTop: 20,
                            height: !open1 ? 80 : 200,
                            // backgroundColor: 'red',
                            width: '45%',
                          },
                        ]}>
                        <DropDown
                          open={open1}
                          value={value1}
                          label="Type"
                          setOpen={setOpen1}
                          placeholder="Type"
                          setValue={setValue1}
                          items={categoryArray}
                          onChange={handleValueChange1}
                          selectItem={value => {
                            console.log('item', value);
                            setFieldValue('type', value.value);
                          }}
                          containerStyle={styles.dropdownContainer}
                          itemStyle={styles.dropdownItem}
                          dropDownStyle={styles.dropdown}
                        />
                      </View> */}
                      <View
                        style={[
                          styles.mainInputView,
                          {
                            marginTop: 20,
                            height: !open2 ? 80 : 200,
                            width: '100%',
                          },
                        ]}>
                        <DropDown
                          open={open2}
                          value={values.Price}
                          label="Price"
                          setOpen={setOpen2}
                          placeholder="Price"
                          setValue={setValue2}
                          items={items}
                          onChange={handleValueChange2}
                          selectItem={value => {
                            console.log('item', value);
                            setFieldValue('Price', value.value);
                          }}
                          // selectItem={handleWholeItem2}
                          containerStyle={styles.dropdownContainer}
                          itemStyle={styles.dropdownItem}
                          dropDownStyle={styles.dropdown}
                        />
                      </View>
                    </View>
                    {errors.type && touched.type && (
                      <Text style={styles.errors}>{errors.type}</Text>
                    )}
                    {errors.Price && touched.Price && (
                      <Text style={styles.errors}>{errors.Price}</Text>
                    )}
                    <View style={styles.forgotView}>
                      <View style={styles.bottomButtonView}>
                        <FillButton
                          //   disabled={!isValid}
                          customColor="#0F8BC2"
                          customTextColor="white"
                          Name="Proceed"
                          onPress={() => handleSubmit()}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </Wrapper>
          </View>
          {Loader({show: showModal})}
        </View>
      )}
    </Formik>
  );
};

export default UploadService;
