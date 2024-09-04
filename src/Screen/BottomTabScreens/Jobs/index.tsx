import React, {useCallback, useEffect, useState} from 'react';
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
  RefreshControl,
} from 'react-native';
import styles from './style';
import {Formik} from 'formik';
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowBack from 'react-native-vector-icons/AntDesign';
import FillButton from '../../../Component/FillButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
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
import {
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
const Jobs = ({navigation}: {navigation: any}) => {
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const {user} = useSelector(state => state.user);
  const {height: windowHeight} = Dimensions.get('window');
  const data = ['New', 'Active', 'Online'];
  const [checked, setChecked] = useState('New');
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [recent, setRecent] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [popular, setPopular] = useState([]);
  const [Job, setJob] = useState('');
  const [Location, setLocation] = useState('');
  const [dateOfstrip, setDateOfStrip] = useState('');

  const [Salary, setSalary] = useState('');
  const [Hours, setHours] = useState('');
  const [showLoaderModal, setShowLoaderModal] = useState(false);
  const [Duration, setDuration] = useState('');
  const [items, setItems] = useState([]);
  const [itemss1, setItemss1] = useState([
    {label: 'Rawalpindi', value: 'Rawalpindi'},
    // {label: 'Rawalpindi', value: 'Rawalpindi'},
    {label: 'Karachi', value: 'Karachi'},
    {label: 'Lahore', value: 'Lahore'},
    {label: 'Fasalabadd', value: 'Fasalabadd'},
    {label: 'Sargodha', value: 'Sargodha'},
  ]);
  const [itemss2, setItemss2] = useState([
    {label: '$100-150', value: '100-150'},
    {label: '$200-250', value: '200-250'},
    {label: '$300-350', value: '300-350'},
    {label: '$400-450', value: '400-450'},
    {label: '$500-550', value: '500-550'},
    // {label: 'Java Developer', value: 'Java Developer'},
  ]);
  const [itemss3, setItemss3] = useState([
    {label: '3-4', value: '3 - 4'},
    {label: '4-6', value: '4 - 6'},
    {label: '6-8', value: '6 - 8'},
    {label: '8-10', value: '8 - 10'},
    {label: '10-12', value: '10 - 12'},
    // {label: 'Java Developer', value: 'Java Developer'},
  ]);
  const [itemss4, setItemss4] = useState([
    {label: '1 Month', value: '1 month'},
    {label: '2 Month', value: '2 month'},
    {label: '3 Month', value: '3 month'},
    {label: '4 Month', value: '4 month'},
    {label: '5 Month', value: '5 month'},
    {label: '6 Month', value: '6 month'},
    {label: '7 Month', value: '7 month'},
    {label: '8 Month', value: '8 month'},
    {label: '9 Month', value: '9 month'},
    {label: '10 Month', value: '10 month'},
    {label: '11 Month', value: '11 month'},
    {label: '12 Month', value: '12 month'},
  ]);

  // console.log('items', items);
  const handleValueChange = (value: any) => {
    // console.log('Selected value:', value());
  };
  const handleWholeItem = (value: any) => {
    // console.log('item', value);
    // setBank(value.id);
    setJob(value.value);
  };

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);

  const handleValueChange1 = (value: any) => {
    console.log('Selected value:', value());
  };
  const handleWholeItem1 = (value: any) => {
    console.log('item', value);
    setLocation(value.value);
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
    setSalary(value.value);
  };

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);

  const handleValueChange3 = (value: any) => {
    console.log('Selected value:', value());
  };
  const handleWholeItem3 = (value: any) => {
    console.log('item', value);
    // setBank(value.id);
    setHours(value.value);
  };
  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);

  const handleValueChange4 = (value: any) => {
    console.log('Selected value:', value());
  };
  const handleWholeItem4 = (value: any) => {
    console.log('item', value);
    // setBank(value.id);
    setDuration(value.value);
  };
  const renderItem = ({item}) => (
    <RecentJobsItem item={item} navigation={navigation} />
  );

  const renderItemPopular = ({item}) => (
    <PopularJobItem item={item} navigation={navigation} refresh={refreshApi} />
  );
  const ApplyFilterFunc = () => {
    setShowModal(false);
    setTimeout(() => {
      setShowLoaderModal(!showLoaderModal);
    }, 300);
    JobApi();
  };
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
                setItem={setItems}
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
                setItem={setItemss1}
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
                setItem={setItemss2}
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
                setItem={setItemss3}
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
                setItem={setItemss4}
                onChange={handleValueChange4}
                selectItem={handleWholeItem4}
                containerStyle={styles.dropdownContainer}
                itemStyle={styles.dropdownItem}
                dropDownStyle={styles.dropdown}
              />
            </View>
            <View style={{marginTop: 40, width: '100%'}}>
              <FillButton
                Name="Apply Filters"
                customColor="#FFBD00"
                customTextColor="white"
                onPress={() => ApplyFilterFunc()}
              />
              <View style={{marginTop: 30}}>
                <FillButton
                  Name="Reset Filters"
                  customColor="#373A43"
                  customTextColor="white"
                  onPress={() => {
                    setValue4(null);
                    setValue3(null);
                    setValue2(null);
                    setValue1(null);
                    setValue(null);
                    ApplyFilterFunc();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </Modal>
  );

  const JobApi = () => {
    const formData = new FormData();
    formData.append('job', Job);
    formData.append('location', Location);
    formData.append('salary', Salary);
    formData.append('hours', Hours);
    formData.append('duration', Duration);
    formData.append('date', dateOfstrip);
    postApiWithFormDataWithToken(
      {url: 'allJobs', token: user?.api_token},
      formData,
    )
      .then(res => {
        console.log('res of appi job', res);
        setRecent(res.recentlyData);
        setPopular(res.data);

        setShowLoaderModal(false);
        setJob('');
        setLocation('');
        setSalary('');
        setHours('');
        setDuration('');
        // setValue4(null);
        // setValue3(null);
        // setValue2(null);
        // setValue1(null);
        // setValue(null);
      })
      .catch(err => {
        setShowLoaderModal(false);
      });
  };
  const getExpertise = () => {
    getApiwithToken({url: 'expertise', token: user?.api_token}).then(res => {
      // console.log('res of expertise', res);
      const arr = [];
      const transferData = res.data.map(item => ({
        label: item.name,
        value: item.name,
      }));
      setItems(transferData);
    });
  };

  const [refresh, setRefresh] = useState(false);
  const refreshApi = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    JobApi();
  }, [refresh, dateOfstrip]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      JobApi();
      getExpertise();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const currentDate = moment();
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate an API call to refresh data
    setTimeout(() => {
      JobApi();

      setRefreshing(false);
    }, 1500);
  }, []);
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
        rightIcon={
          <TouchableOpacity
            onPress={() => {
              setDateOfStrip('');
            }}>
            <CheckIcon
              name="calendar-refresh-outline"
              size={25}
              color={'#FFBD00'}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.imageView}>
          <View style={{width: widthPercentageToDP(100)}}>
            <CalendarStrip
              scrollable
              style={{height: 100, paddingTop: 20, paddingBottom: 10}}
              calendarColor={'#FFBD00'}
              // maxDate={currentDate}
              calendarHeaderStyle={{color: 'white'}}
              dateNumberStyle={{color: 'white'}}
              dateNameStyle={{color: 'white'}}
              highlightDateNumberStyle={{color: '#373A43'}}
              highlightDateNameStyle={{color: '#373A43'}}
              // selectedDate={dateOfstrip}
              // leftSelector={null} // Remove left arrow
              // rightSelector={null} // Remove right arrow
              // selectedDate={dateOfstrip ? moment(dateOfstrip) : null}
              onDateSelected={
                date => setDateOfStrip(moment(date).format('YYYY-MM-DD'))
                // console.log('date', moment(date).format('DD MM YY'))
              }
            />
          </View>

          <View style={{width: '90%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {/* {data.map(item => (
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
              ))} */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                Recently added
              </Text>
              {/* <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text> */}
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
              {/* <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text> */}
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
      {Loader({show: showLoaderModal})}
    </View>
  );
};

export default Jobs;
