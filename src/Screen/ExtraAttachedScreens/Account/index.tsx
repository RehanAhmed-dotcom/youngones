import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import HeaderComp from '../../../Component/HeaderComp';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import PopularJobItem from '../../../Component/PopularJobItem';
import FillButton from '../../../Component/FillButton';
import {accountData} from '../../../Component/dummyData';
import {useSelector} from 'react-redux';
const Account = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        item.name == 'Account'
          ? navigation.navigate('AccountInfo')
          : item.name == 'Notification Manage'
          ? navigation.navigate('NotificationManager')
          : item.name == 'Help & Support'
          ? navigation.navigate('Support')
          : console.log('hello')
      }
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#373A43',
        borderRadius: 15,
        marginBottom: 15,
        padding: 10,
      }}>
      <Image source={item.Image} style={{height: 50, width: 50}} />
      <View style={{marginLeft: 20, width: '70%'}}>
        <Text style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
          {item.name}
        </Text>
        <Text style={{color: 'white', marginTop: 5}}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      {/* <HeaderComp
        leftIcon={
          <ArrowLeft
            name={'left'}
            size={20}
            onPress={() => navigation.goBack()}
            color={'white'}
          />
        }
        label="UI/UX Designer"
      /> */}
      <View style={{width: '100%', height: heightPercentageToDP(30)}}>
        <TouchableOpacity onPress={() => console.log('outer')}>
          <Image
            source={require('../../../Assets/Images/UiUx.png')}
            style={{width: '100%', height: heightPercentageToDP(30)}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', zIndex: 20, left: 20, top: 20}}>
          <ArrowLeft name={'left'} size={20} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('inner')}
          style={{
            position: 'absolute',
            // backgroundColor: 'red',
            zIndex: 20,
            width: '100%',
            alignItems: 'center',
            bottom: -30,
          }}>
          <Image
            source={
              user?.image
                ? {uri: user?.image}
                : require('../../../Assets/Images/girl.jpeg')
            }
            style={{height: 80, borderRadius: 40, width: 80}}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View
          style={{
            width: '90%',
            flex: 1,
            //   backgroundColor: 'red',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontFamily: 'ArialMdm',
              marginTop: 40,
              fontSize: 18,
            }}>
            {user?.firstname} {user?.lastname}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
              <FillButton
                customColor="#2D2D35"
                customTextColor="white"
                Name="Followers"
                midButton={true}
                onPress={() =>
                  navigation.navigate('Followers', {name: 'Followers'})
                }
              />
            </View>
            <View style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
              <FillButton
                customColor="#2D2D35"
                customTextColor="white"
                Name="Following"
                midButton={true}
                onPress={() =>
                  navigation.navigate('Followers', {name: 'Following'})
                }
              />
            </View>
          </View>
          <View style={{marginVertical: 30}}>
            <FlatList data={accountData} renderItem={renderItem} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Account;
