import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BellIcon from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import Equalizer from 'react-native-vector-icons/SimpleLineIcons';
import {
  PopularData,
  ServiceData,
} from '../../../Component/ExtraData/PopularData';
import PopularRender from '../../../Component/RenderItems/PopularRender';
import ServiceRender from '../../../Component/RenderItems/ServiceRender';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {
  getApiwithOutToken,
  getApiwithToken,
  postApiWithFormDataWithToken,
} from '../../../lib/Apis/api';
import messaging from '@react-native-firebase/messaging';
import HeaderComp from '../../../Component/HeaderComp';
import LoginLoader from '../../../Component/LoginLoader';
import FrequentRender from '../../../Component/RenderItems/FrequentRender';
import AllServiceRender from '../../../Component/RenderItems/AllServiceRender';
const BuyerHome = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const [homeArr, setHomeArr] = useState([]);
  const [search, setSearch] = useState('');
  const [homeArrSearched, setHomeArrSearched] = useState([]);
  const [frequentService, setFrequentService] = useState([]);
  const [services, setServices] = useState([]);
  // console.log('user', user);
  const quickOrderFunc = () => {
    navigation.navigate('QuickOrder');

    // getApiwithOutToken({url:''})
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getApiwithToken({url: 'buyerHome', token: user?.api_token}).then(res => {
        console.log('home', res);
        setHomeArr(res.popular);
        setHomeArrSearched(res.popular);
        setFrequentService(res.frequent);
        setServices(res.services);
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    const formData = new FormData();
    formData.append('fcm_token', fcmToken);
    postApiWithFormDataWithToken(
      {
        url: 'update-fcm',
        token: user?.api_token,
      },
      formData,
    )
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('error in update', err);
      });
    messaging().onTokenRefresh(token => {
      const formData = new FormData();
      formData.append('fcm_token', token);
      postApiWithFormDataWithToken(
        {
          url: 'update-fcm',

          token: user?.api_token,
        },
        formData,
      )
        .then(res => {})
        .catch(err => {});
    });
  };
  const searchCategory = e => {
    let filteredName = [];
    // if (e) {
    filteredName = homeArr.filter(item => {
      return item?.name?.toLowerCase().includes(`${e.toLowerCase()}`);
      // return item.vender.fullname.toLowerCase().includes(`${e.toLowerCase()}`);
    });
    setHomeArrSearched(filteredName);
    // filteredName = [];
    // }
  };
  const renderItem = ({item}) => (
    <PopularRender item={item} navigation={navigation} />
  );
  const renderItemService = ({item}) => (
    // <ServiceRender item={item} navigation={navigation} dontShow={true} />
    <AllServiceRender item={item} navigation={navigation} />
  );
  const renderItemFrequent = ({item}) => (
    <FrequentRender item={item} navigation={navigation} />
  );
  // console.log('home ', homeArrSearched);
  const {top, bottom} = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState(false);
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate an API call to refresh data
    setTimeout(() => {
      getApiwithToken({url: 'buyerHome', token: user?.api_token}).then(res => {
        // console.log('home', res);
        setHomeArr(res.popular);
        setFrequentService(res.frequent);
        setServices(res.services);
      });

      setRefreshing(false);
    }, 1500);
  }, []);
  const renderItemCategory = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setSearch('');
        navigation.navigate('ServicePage', {text: item.name, id: item.id});
      }}
      style={{
        height: 40,
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ABB8BA',
        paddingLeft: 10,
      }}>
      <Text style={{color: 'black'}}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.mainView}>
      {/* <HeaderComp
        label="Home"
        navigation={navigation}
        showBellIcon={true}
        backIcon={true}
      /> */}
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // margin,
          height: 58,
          paddingHorizontal: 15,
          marginTop: Platform.OS == 'ios' ? top : 0,
        }}>
        <Text
          style={{
            color: 'black',
            marginLeft: 10,
            fontSize: 16,
            fontFamily: 'WorkSans-Medium',
            // fontWeight: 'bold',
          }}>
          Home
        </Text>
        {user?.type ? (
          <BellIcon
            color={'black'}
            onPress={() =>
              navigation.navigate(
                user?.type != 'seller' ? 'Notifications' : 'NotificationSeller',
              )
            }
            size={20}
            name="bell"
          />
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              width: '20%',
              height: 40,
              alignItems: 'center',
              backgroundColor: '#0E7DAF',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', fontFamily: 'WorkSans-Regular'}}>
              Login
            </Text>
          </TouchableOpacity>
        )}
      </View> */}
      <Wrapper behavior="padding" style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.middle}>
            <View
              // onPress={() => }
              style={[
                styles.searchBar,
                {
                  borderBottomLeftRadius: search ? 0 : 10,
                  borderBottomRightRadius: search ? 0 : 10,
                },
              ]}>
              {/* <SearchIcon name="search1" size={20} color={'grey'} /> */}
              <TextInput
                placeholder="Search here..."
                placeholderTextColor={'grey'}
                style={styles.inputView}
                value={search}
                onChangeText={text => {
                  searchCategory(text);
                  setSearch(text);
                }}
              />

              {/* <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ServicePage', {text: search})
                }
                style={{
                  width: '20%',
                  height: '90%',
                  alignItems: 'center',
                  backgroundColor: '#0E7DAF',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: 'white', fontFamily: 'WorkSans-Regular'}}>
                  Search
                </Text>
              </TouchableOpacity> */}
              {/* <Text style={{color: '#ccc', marginLeft: 10}}>
                Search here...
              </Text> */}
              {/* <View style={styles.equalizerView}>
              <Equalizer name="equalizer" color={'black'} size={20} />
            </View> */}
            </View>
            {search && (
              <View
                style={{
                  // height: 150,
                  borderWidth: 1,
                  maxHeight: 150,
                  // backgroundColor: 'red',
                  borderColor: '#ABB8BA',
                  // borderBottomLeftRadius: 10,
                  // borderBottomRightRadius: 10,
                  borderTopWidth: 0,
                }}>
                <FlatList
                  data={homeArrSearched}
                  renderItem={renderItemCategory}
                  nestedScrollEnabled={true}
                />
              </View>
            )}

            <TouchableOpacity
              onPress={() => quickOrderFunc()}
              style={{
                height: 50,
                backgroundColor: '#0E7DAF',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginTop: 20,
              }}>
              <Text style={{color: 'white', fontFamily: 'WorkSans-Medium'}}>
                Make a Quick Order
              </Text>
            </TouchableOpacity>
            <View style={styles.popularView}>
              <View style={styles.row}>
                <Text style={styles.popular}>Popular Services</Text>
                {/* <Text
                  style={{
                    color: 'black',
                    fontFamily: 'WorkSans-Regular',
                    fontSize: 12,
                  }}>
                  See All
                </Text> */}
              </View>
              <View style={{marginTop: 5}}>
                <FlatList data={homeArr} horizontal renderItem={renderItem} />
              </View>
            </View>
            <View style={styles.popularView}>
              <View style={styles.row}>
                <Text style={styles.popular}>What services do you want?</Text>
                {/* <Text
                  style={{
                    color: 'black',
                    fontFamily: 'WorkSans-Regular',
                    fontSize: 12,
                  }}>
                  See All
                </Text> */}
              </View>
              <View style={[styles.innerView, {marginTop: 10, height: 250}]}>
                <FlatList
                  data={services}
                  renderItem={renderItemService}
                  nestedScrollEnabled={true}
                />
              </View>
            </View>
            <View
              style={[styles.popularView, {marginBottom: 20, marginTop: 15}]}>
              <View style={styles.row}>
                <Text style={styles.popular}>Frequent Services</Text>
                {/* <Text
                  style={{
                    color: 'black',
                    fontFamily: 'WorkSans-Regular',
                    fontSize: 12,
                  }}>
                  See All
                </Text> */}
              </View>
              <View style={{marginTop: 5}}>
                <FlatList
                  data={frequentService}
                  horizontal
                  renderItem={renderItemFrequent}
                />
              </View>
            </View>
            {/* <View style={styles.share}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
              Share & Get Up To N100 In Your Wallet
            </Text>
            <Text style={{color: 'grey', marginTop: 20}}>
              Give friends a N100 in their wallet upon registration
            </Text>
            <Text style={{color: '#10CE5C', fontWeight: 'bold', marginTop: 30}}>
              Invite Friends
            </Text>
          </View> */}
          </View>
        </ScrollView>
      </Wrapper>
      {/* {LoginLoader({show: true, navigation})} */}
    </View>
  );
};

export default BuyerHome;
