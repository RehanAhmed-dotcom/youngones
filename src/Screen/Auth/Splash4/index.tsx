import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const Splash4 = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../../../Assets/Images/Highway.png')}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            // backgroundColor: 'red',
            height: '100%',
            alignSelf: 'center',
          }}>
          <Text></Text>
          <Image
            resizeMode="contain"
            style={{height: 100, width: 150}}
            source={require('../../../Assets/Images/doubleu.png')}
          />
          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'left',
                color: 'black',
                fontFamily: 'WorkSans-Bold',
                fontSize: 20,
              }}>
              Find me...
            </Text>
            <Text
              style={{
                textAlign: 'left',
                color: 'black',
                fontFamily: 'WorkSans-Bold',
                fontSize: 20,
              }}>
              Local worker near You
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                // bottom: 30,
              }}>
              {/* MapScreen */}
              {/* navigation.navigate(' MapScreenBuyerBottomTab') */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{
                  width: '45%',
                  height: 60,
                  backgroundColor: '#0E7DAF',
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'WorkSans-Regular',
                  }}>
                  BUYER
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'WorkSans-SemiBold',
                  }}>
                  Find a Service
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SellerLogin')}
                style={{
                  width: '45%',
                  height: 60,
                  backgroundColor: '#0E7DAF',
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'WorkSans-Regular',
                  }}>
                  SELLER
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'WorkSans-SemiBold',
                  }}>
                  Sell a Service
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 12,
                fontFamily: 'WorkSans-Medium',
                marginTop: 20,
              }}>
              WORKAMAN.IO
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: heightPercentageToDP(10),
                width: '100%',
                bottom: 30,
              }}>
              <Text
                style={{fontFamily: 'WorkSans-Medium', color: 'white'}}></Text>
              <Text
                style={{fontFamily: 'WorkSans-Medium', color: 'white'}}
                // onPress={() => navigation.navigate('ServicePage')}
              ></Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      {/* <Text>Splash</Text> */}
    </View>
  );
};

export default Splash4;
