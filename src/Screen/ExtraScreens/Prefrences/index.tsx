import React from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import HeaderComp from '../../../Component/HeaderComp';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Preference = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp label="Prefrences" navigation={navigation} />
      <View style={styles.middle}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationSeller')}
          style={[styles.oneLine, {borderTopWidth: 0, marginTop: 20}]}>
          <Text style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
            Notification
          </Text>
        </TouchableOpacity>
        <View style={[styles.oneLine, {borderTopWidth: 1}]}>
          <Text style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
            Security
          </Text>
        </View>
        <View style={[styles.oneLine, {borderTopWidth: 1}]}>
          <Text style={{color: 'black', fontFamily: 'WorkSans-Regular'}}>
            Online
          </Text>
        </View>
        <Text
          style={{
            color: 'grey',
            fontFamily: 'WorkSans-Regular',
            marginTop: 20,
          }}>
          You'll remain online for as long as the app is open
        </Text>
      </View>
    </View>
  );
};

export default Preference;
