import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import HeaderComp from '../../../Component/HeaderComp';
import Arrow from 'react-native-vector-icons/AntDesign';
const ServideDetails = ({navigation, route}) => {
  const {top, bottom} = useSafeAreaInsets();
  const {item} = route.params;
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp label={item.fullname} navigation={navigation} />
      <ScrollView>
        <View style={styles.middle}>
          <Image
            source={{uri: item.service_image}}
            style={{width: '100%', height: 200}}
          />
          <View style={[styles.middle, {width: '90%'}]}>
            <View style={styles.detailView}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={
                    item.image
                      ? {uri: item.image}
                      : require('../../../Assets/Images/girl.jpeg')
                  }
                  style={{width: 30, height: 30, borderRadius: 30}}
                />
                <Text
                  style={{
                    color: 'black',
                    marginLeft: 20,
                    fontFamily: 'WorkSans-Medium',
                  }}>
                  {item.fullname}
                </Text>
              </View>
              <Text
                style={{
                  color: '#030F2D',
                  marginTop: 10,
                  fontFamily: 'WorkSans-Medium',
                }}>
                {item.serviceType}
              </Text>
              {/* <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../../../Assets/Images/starts.jpeg')}
                  style={{width: 70, height: 20}}
                />
                <Text
                  style={{
                    color: '#344346',
                    fontFamily: 'WorkSans-Medium',
                    fontSize: 12,
                    marginLeft: 5,
                  }}>
                  4.3
                </Text>
              </View> */}
            </View>
            <View style={{bottom: 30}}>
              <Text style={{fontFamily: 'WorkSans-SemiBold', color: 'black'}}>
                About this service provider
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontFamily: 'WorkSans-Regular',
                  fontSize: 14,
                  marginTop: 10,
                }}>
                {item.serviceBio}
                {/* <Text
                  style={{
                    color: 'red',
                    fontSize: 12,
                    fontFamily: 'WorkSans-Regular',
                  }}>
                  Read More
                </Text> */}
              </Text>
            </View>
            <View>
              {/* <Text
                style={{
                  fontFamily: 'WorkSans-SemiBold',
                  marginTop: 0,
                  color: 'black',
                }}>
                Working Hours
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={{color: 'black', fontFamily: 'WorkSans-Medium'}}>
                  Day{' '}
                </Text>
                <Arrow
                  name="arrowright"
                  size={15}
                  style={{marginTop: 3}}
                  color={'black'}
                />
                <View style={{marginLeft: 5}}>
                  <Text
                    style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
                    Tuesday - Friday
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'WorkSans-Regular',
                      fontSize: 10,
                      opacity: 0.7,
                      marginTop: 0,
                    }}>
                    Excluding public holidays
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={{color: 'black', fontFamily: 'WorkSans-Medium'}}>
                  Time{' '}
                </Text>
                <Arrow
                  name="arrowright"
                  size={15}
                  style={{marginTop: 3}}
                  color={'black'}
                />
                <View style={{marginLeft: 5}}>
                  <Text
                    style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
                    10am to 5pm
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text style={{color: 'black', fontFamily: 'WorkSans-SemiBold'}}>
                  Reviews{' '}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Image
                  resizeMode="contain"
                  source={require('../../../Assets/Images/starts.jpeg')}
                  style={{width: 70, height: 20}}
                />
                <Arrow
                  name="arrowright"
                  size={15}
                  style={{marginTop: 3}}
                  color={'black'}
                />
                <View style={{marginLeft: 5}}>
                  <Text
                    style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
                    Aurora
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 12,
                  fontFamily: 'WorkSans-Regular',
                }}>
                I used their service recently and I don't have any complain.
                Their customer service is excellent
              </Text> */}
              <View style={styles.acceptView}>
                <TouchableOpacity
                  onPress={() => {
                    const userItem = {
                      username: item.fullname,
                      email: item.email,
                      image: item.image,
                      id: item.id,
                    };
                    navigation.navigate('MessageScreen', {item: userItem});
                  }}
                  style={styles.accept}>
                  <Text style={{color: 'white', fontFamily: 'WorkSans-Medium'}}>
                    Message
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[
                    styles.accept,
                    {backgroundColor: '#E7F3F9', marginRight: 0},
                  ]}>
                  <Text style={{color: 'black', fontFamily: 'WorkSans-Medium'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ServideDetails;
