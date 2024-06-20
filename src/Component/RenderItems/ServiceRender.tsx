import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import StartIcon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {heightPercentageToDP} from 'react-native-responsive-screen';
const ServiceRender = ({item, navigation, dontShow}) => {
  // console.log('te', item);
  const {user} = useSelector(state => state.user);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ServideDetails', {item})}
      style={styles.ServicerenderItem}>
      <View
        style={{
          width: '45%',
          overflow: 'hidden',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          // backgroundColor: 'red',
          height: 110,
        }}>
        <Image
          source={{uri: item.service_image}}
          resizeMode="cover"
          style={[styles.image, {width: '100%', height: '100%'}]}
        />
      </View>

      <View style={styles.nextView}>
        {user?.type == 'seller' && (
          <View style={styles.priceView}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'WorkSans-Regular',
                color: 'white',
              }}>
              ₦ {item.servicePrice}
            </Text>
          </View>
        )}

        <View style={{width: '100%'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              marginTop: 10,
              marginLeft: 10,
              fontFamily: 'WorkSans-Medium',
              // textAlign: 'left',
            }}>
            {item.serviceName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 10,
              // backgroundColor: 'red',
              alignItems: 'center',
            }}>
            {/* <Image source={{item.user.image}} style={styles.imageView} /> */}
            <Text
              style={{
                color: '#0E7DAF',
                fontSize: 12,
                fontFamily: 'WorkSans-Medium',
                marginLeft: 10,
              }}>
              {item.fullname}
            </Text>
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            // backgroundColor: 'red',
            alignSelf: 'flex-start',
            marginLeft: 10,
            marginBottom: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 24,

              alignItems: 'center',
            }}>
            <StartIcon name="star" color={'#FFBD00'} size={10} />
            <StartIcon name="star" color={'#FFBD00'} size={10} />
            <StartIcon name="star" color={'#FFBD00'} size={10} />
            <StartIcon name="star" color={'#FFBD00'} size={10} />
            <StartIcon name="star" color={'#FFBD00'} size={10} />
          </View>
         
          <Text
            style={{
              color: '#0E7DAF',

              fontFamily: 'WorkSans-Medium',
              marginLeft: 8,
              fontSize: 12,
            }}>
            4.3
          </Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default ServiceRender;
