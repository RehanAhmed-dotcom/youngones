import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FillButton from '../../../Component/FillButton';

const StartingScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../../Assets/Images/doubleu.png')}
        style={{height: 100, width: 150}}
        tintColor={'black'}
        resizeMode="contain"
      />
      <View style={{width: '90%', position: 'absolute', bottom: 50}}>
        <FillButton
          Name="Continue"
          onPress={() => navigation.navigate('Splash')}
          customColor="#46A4DF"
          customTextColor="white"
        />
      </View>
    </View>
  );
};

export default StartingScreen;
