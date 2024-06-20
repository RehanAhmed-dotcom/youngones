import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import styles from './style';
import Share from 'react-native-share';
import SettingIcon from 'react-native-vector-icons/AntDesign';
import FileIcon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import HeaderComp from '../../../Component/HeaderComp';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getApiwithToken} from '../../../lib/Apis/api';
const Profile = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const {top} = useSafeAreaInsets();
  const [settingData, setSettingData] = useState({});
  const inviteLink = 'https://workaman.com';
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getApiwithToken({url: 'setting', token: user.api_token}).then(res => {
        console.log('res off set', res);
        setSettingData(res);
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const shareInvite = () => {
    const options = {
      message: 'Join me on this awesome app! Click the link to get started:',
      url: inviteLink,
    };
    Share.open(options)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        label="Settings"
        backIcon={true}
        navigation={navigation}
        showBellIcon={true}
      />
      <ScrollView>
        <View style={styles.middle}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AccountInfo')}
            style={styles.row}>
            <Image
              source={
                user.image
                  ? {uri: user?.image}
                  : require('../../../Assets/Images/girl.jpeg')
              }
              style={styles.imageView}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontFamily: 'WorkSans-SemiBold',
              }}>
              {user?.fullname}
            </Text>
          </TouchableOpacity>
          <View style={styles.topView}>
            <View
              style={[
                styles.row,
                {
                  marginTop: 0,
                  justifyContent: 'space-between',
                },
              ]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PersonalBalance', {
                    price: settingData.earning,
                  })
                }
                style={styles.oneBox}>
                <View>
                  <Text
                    style={{color: 'black', fontFamily: 'WorkSans-SemiBold'}}>
                    ₦{settingData.earning}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'WorkSans-Regular',
                      marginTop: 20,
                    }}>
                    Total Earning
                  </Text>
                </View>
                <View style={styles.round}>
                  <SettingIcon name="setting" size={20} color={'black'} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TotalServices', {text: 'Completed'})
                }
                style={styles.oneBox}>
                <View>
                  <Text
                    style={{color: 'black', fontFamily: 'WorkSans-SemiBold'}}>
                    {settingData.total_services}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'WorkSans-Regular',
                      marginTop: 20,
                    }}>
                    Total Services
                  </Text>
                </View>
                <View style={styles.round}>
                  <FileIcon name="profile" size={20} color={'black'} />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.row,
                {
                  marginTop: 28,
                  justifyContent: 'space-between',
                },
              ]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TotalServices', {text: 'Pending'})
                }
                style={styles.oneBox}>
                <View>
                  <Text
                    style={{color: 'black', fontFamily: 'WorkSans-SemiBold'}}>
                    {settingData.up_services}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'WorkSans-Regular',
                      marginTop: 20,
                    }}>
                    Upcoming Services
                  </Text>
                </View>
                <View style={styles.round}>
                  <SettingIcon name="profile" size={20} color={'black'} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  // navigation.navigate('TotalServices', {text: 'In Progress'})
                  navigation.navigate('Invoice')
                }
                style={styles.oneBox}>
                <View>
                  <Text
                    style={{color: 'black', fontFamily: 'WorkSans-SemiBold'}}>
                    {settingData.today_services}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: 'black',
                      width: '60%',
                      fontFamily: 'WorkSans-Regular',
                      marginTop: 20,
                    }}>
                    Today's Services
                  </Text>
                </View>
                <View style={[styles.round, {right: 10}]}>
                  <SettingIcon
                    name="profile"
                    // style={{borderRadius: 20}}
                    size={20}
                    color={'black'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                fontFamily: 'WorkSans-Medium',
                // marginVertical: 20,
                marginTop: 20,
                marginBottom: 10,
                fontSize: 16,
              }}>
              Settings
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Prefrences')}
                style={[styles.oneLine, {borderTopWidth: 0}]}>
                <Text style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
                  Preference
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('BVNVerificationSeller')}
                style={[styles.oneLine, {borderTopWidth: 1}]}>
                <Text style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
                  BVN
                </Text>
              </TouchableOpacity>
              {/*  <TouchableOpacity
                onPress={() => navigation.navigate('Withdraw')}
                style={[styles.oneLine, {borderTopWidth: 1}]}>
                <Text style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
                  Withdraw
                </Text>
              </TouchableOpacity>
             <TouchableOpacity
                onPress={() => {
                  shareInvite();
                }}
                style={[styles.oneLine, {borderTopWidth: 1}]}>
                <Text style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
                  Invite Friends
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                marginTop: 20,
                marginBottom: 10,
                fontFamily: 'WorkSans-Medium',
                fontSize: 16,
              }}>
              Resources
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Support')}
                style={[styles.oneLine, {borderTopWidth: 0}]}>
                <Text style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
                  Support
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Legal')}
                style={[styles.oneLine, {borderTopWidth: 1, marginBottom: 30}]}>
                <Text style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
                  Community And Legal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
