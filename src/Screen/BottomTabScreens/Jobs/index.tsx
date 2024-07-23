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
  Dimensions,
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
import {
  PopularJobs,
  RecentJobsData,
  singlePostPopularData,
  singlePostRecentData,
  suggestedPeoples,
} from '../../../Component/dummyData';
import SinglePost from '../../../Component/SinglePost';
import People from '../../../Component/People';
import RecentJobsItem from '../../../Component/RecentJobsItem';
import {PopularData} from '../../../Component/ExtraData/PopularData';
import PopularJobItem from '../../../Component/PopularJobItem';
import DropDown from '../../../Component/DropDown';
import {useSelector} from 'react-redux';
import {getApiwithToken} from '../../../lib/Apis/api';

const Jobs = ({navigation}: {navigation: any}) => {
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const {user} = useSelector(state => state.user);
  const {height: windowHeight} = Dimensions.get('window');
  const data = ['New', 'Accepted', 'Cancelled', 'Completed'];
  const [checked, setChecked] = useState('New');
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [recent, setRecent] = useState([]);
  const [popular, setPopular] = useState([]);

  const [items, setItems] = useState([
    {label: 'UI/UX Designer', value: 'UI/UX Designer'},
    {label: 'Front-End Developer', value: 'Front-End Developer'},
    {label: 'Back-End Developer', value: 'Back-End Developer'},
    {label: 'Flutter developer', value: 'Flutter developer'},
    {label: 'React Developer', value: 'React Developer'},
    {label: 'Java Developer', value: 'Java Developer'},
  ]);
  const [itemss1, setItemss1] = useState([
    {label: 'Rawalpindi', value: 'Rawalpindi'},
    // {label: 'Rawalpindi', value: 'Rawalpindi'},
    {label: 'Karachi', value: 'Karachi'},
    {label: 'Lahore', value: 'Lahore'},
    {label: 'Fasalabadd', value: 'Fasalabadd'},
    {label: 'Sargodha', value: 'Sargodha'},
  ]);
  const [itemss2, setItemss2] = useState([
    {label: '$100-150', value: '$100-150'},
    {label: '$200-250', value: '$200-250'},
    {label: '$300-350', value: '$300-350'},
    {label: '$400-450', value: '$400-450'},
    {label: '$500-550', value: '$500-550'},
    // {label: 'Java Developer', value: 'Java Developer'},
  ]);
  const [itemss3, setItemss3] = useState([
    {label: '3-4', value: '3-4'},
    {label: '4-6', value: '4-6'},
    {label: '6-8', value: '6-8'},
    {label: '8-10', value: '8-10'},
    {label: '10-12', value: '10-12'},
    // {label: 'Java Developer', value: 'Java Developer'},
  ]);
  const [itemss4, setItemss4] = useState([
    {label: '1 Month', value: '1 Month'},
    {label: '2 Month', value: '2 Month'},
    {label: '3 Month', value: '3 Month'},
    {label: '4 Month', value: '4 Month'},
    {label: '5 Month', value: '5 Month'},
    {label: '6 Month', value: '6 Month'},
    {label: '7 Month', value: '7 Month'},
    {label: '8 Month', value: '8 Month'},
    {label: '9 Month', value: '9 Month'},
    {label: '10 Month', value: '10 Month'},
    {label: '11 Month', value: '11 Month'},
    {label: '12 Month', value: '12 Month'},
  ]);
  const handleValueChange = (value: any) => {
    console.log('Selected value:', value());
  };
  const handleWholeItem = (value: any) => {
    console.log('item', value);
    // setBank(value.id);
  };

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);

  const handleValueChange1 = (value: any) => {
    console.log('Selected value:', value());
  };
  const handleWholeItem1 = (value: any) => {
    console.log('item', value);
    // setBank(value.id);
  };
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);

  const handleValueChange2 = (value: any) => {
    console.log('Selected value:', value());
  };
  const handleWholeItem2 = (value: any) => {
    console.log('item', value);
    // setBank(value.id);
  };

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);

  const handleValueChange3 = (value: any) => {
    console.log('Selected value:', value());
  };
  const handleWholeItem3 = (value: any) => {
    console.log('item', value);
    // setBank(value.id);
  };
  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);

  const handleValueChange4 = (value: any) => {
    console.log('Selected value:', value());
  };
  const handleWholeItem4 = (value: any) => {
    console.log('item', value);
    // setBank(value.id);
  };
  const renderItem = ({item}) => (
    <RecentJobsItem item={item} navigation={navigation} />
  );

  const renderItemPopular = ({item}) => (
    <PopularJobItem item={item} navigation={navigation} />
  );
  const FilterModal = () => (
    <Modal
      animationType="slide"
      onRequestClose={() => setShowModal(!showModal)}
      transparent={true}
      visible={showModal}>
      <View
        style={{
          flex: 1,
          // height: hp(100),
          backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'flex-end',

          zIndex: 200,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          // position: 'absolute',
        }}>
        {/* <ScrollView
          nestedScrollEnabled
          contentContainerStyle={{
            paddingVertical: 20,
            alignItems: 'center',
          }}> */}
        <View
          style={{
            backgroundColor: '#2D2D35',
            width: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: heightPercentageToDP(90),
          }}>
          <View
            style={{
              width: '90%',
              height: '100%',
              paddingVertical: 20,
              alignSelf: 'center',
              //   backgroundColor: 'red',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: open ? 220 : 70,
                marginBottom: 20,
              }}>
              <DropDown
                open={open}
                value={value}
                label="Select Job"
                setOpen={val => {
                  setOpen(val);
                  setOpen1(false);
                  setOpen2(false);
                  setOpen3(false);
                  setOpen4(false);
                }}
                setValue={setValue}
                placeholder="Select Job"
                items={items}
                onChange={handleValueChange}
                selectItem={handleWholeItem}
                containerStyle={styles.dropdownContainer}
                itemStyle={styles.dropdownItem}
                dropDownStyle={styles.dropdown}
              />
            </View>
            <View
              style={{
                width: '100%',
                height: open1 ? 220 : 70,
                marginBottom: 20,
              }}>
              <DropDown
                open={open1}
                value={value1}
                label="Location"
                setOpen={val => {
                  setOpen1(val);
                  setOpen(false);
                  setOpen2(false);
                  setOpen3(false);
                  setOpen4(false);
                }}
                setValue={setValue1}
                placeholder="Select Location"
                items={itemss1}
                onChange={handleValueChange1}
                selectItem={handleWholeItem1}
                containerStyle={styles.dropdownContainer}
                itemStyle={styles.dropdownItem}
                dropDownStyle={styles.dropdown}
              />
            </View>
            <View
              style={{
                width: '100%',
                height: open2 ? 220 : 70,
                marginBottom: 20,
              }}>
              <DropDown
                open={open2}
                value={value2}
                label="Salary"
                setOpen={val => {
                  setOpen1(false);
                  setOpen(false);
                  setOpen2(val);
                  setOpen3(false);
                  setOpen4(false);
                }}
                setValue={setValue2}
                placeholder="Select Salary"
                items={itemss2}
                onChange={handleValueChange2}
                selectItem={handleWholeItem2}
                containerStyle={styles.dropdownContainer}
                itemStyle={styles.dropdownItem}
                dropDownStyle={styles.dropdown}
              />
            </View>
            <View
              style={{
                width: '100%',
                height: open3 ? 220 : 70,
                marginBottom: 20,
              }}>
              <DropDown
                open={open3}
                value={value3}
                label="Working Hours"
                setOpen={val => {
                  setOpen1(false);
                  setOpen(false);
                  setOpen2(false);
                  setOpen3(val);
                  setOpen4(false);
                }}
                setValue={setValue3}
                placeholder="Select Hours"
                items={itemss3}
                onChange={handleValueChange3}
                selectItem={handleWholeItem3}
                containerStyle={styles.dropdownContainer}
                itemStyle={styles.dropdownItem}
                dropDownStyle={styles.dropdown}
              />
            </View>
            <View style={{width: '100%', height: open4 ? 220 : 70}}>
              <DropDown
                open={open4}
                value={value4}
                label="Job duration"
                setOpen={val => {
                  setOpen1(false);
                  setOpen(false);
                  setOpen2(false);
                  setOpen3(false);
                  setOpen4(val);
                }}
                setValue={setValue4}
                placeholder="Select duration"
                items={itemss4}
                onChange={handleValueChange4}
                selectItem={handleWholeItem4}
                containerStyle={styles.dropdownContainer}
                itemStyle={styles.dropdownItem}
                dropDownStyle={styles.dropdown}
              />
            </View>
            <View style={{marginTop: 40, width: '100%'}}>
              <FillButton
                Name="Apply Filter"
                customColor="#FFBD00"
                customTextColor="white"
                onPress={() => setShowModal(false)}
              />
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </Modal>
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getApiwithToken({url: 'allJobs', token: user.api_token}).then(res => {
        // console.log('res of appi', res);
        setRecent(res.data);
        setPopular(res.data);
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        leftIcon={
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Image
              source={require('../../../Assets/Images/Filter.png')}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        }
        label="Jobs"
      />
      <ScrollView>
        <View style={styles.imageView}>
          <View style={{width: '90%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {data.map(item => (
                <TouchableOpacity
                  onPress={() => setChecked(item)}
                  style={{
                    paddingBottom: 10,
                    borderBottomWidth: checked == item ? 2 : 0,
                    borderBottomColor: '#FFBD00',
                  }}>
                  <Text
                    style={{
                      fontFamily: checked == item ? 'ArialMdm' : 'ArialCE',
                      color: checked == item ? 'white' : 'grey',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 30,
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                Recently added
              </Text>
              <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text>
            </View>
            <FlatList
              data={recent}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                Popular Jobs
              </Text>
              <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text>
            </View>
            <View style={{marginBottom: 100}}>
              <FlatList
                data={popular}
                //   horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItemPopular}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {FilterModal()}
    </View>
  );
};

export default Jobs;
