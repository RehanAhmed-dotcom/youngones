import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import StartIcon from 'react-native-vector-icons/AntDesign';
const AllServiceRender = ({item, navigation}) => {
  return (
    <View style={styles.serviceStyle}>
      <Image style={styles.imageList} source={{uri: item.service_image}} />
      <View style={styles.secondView}>
        <Text style={styles.nameText}>{item.fullname}</Text>
        <Text style={styles.secondText}>{item.serviceName}</Text>
        <Text style={[styles.secondText, {marginTop: 5}]}>
          {item.serviceAddress}
        </Text>
        <Text style={[styles.secondText, {marginTop: 5}]}>{item.phone_no}</Text>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 0,

              alignItems: 'center',
            }}>
            <StartIcon name="star" color={'#FFBD00'} size={10} />
            <StartIcon name="star" color={'#FFBD00'} size={10} />
            <StartIcon name="star" color={'#FFBD00'} size={10} />
            <StartIcon name="star" color={'#FFBD00'} size={10} />
            <StartIcon name="star" color={'#FFBD00'} size={10} />
          </View>
          <Text style={{color: 'grey', fontSize: 12, marginLeft: 5}}>
            {item.rating}
          </Text>
        </View> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ServideDetails', {item})}
          style={styles.connectButton}>
          <Text style={{color: 'white', fontFamily: 'WorkSans-Medium'}}>
            Connect
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllServiceRender;
