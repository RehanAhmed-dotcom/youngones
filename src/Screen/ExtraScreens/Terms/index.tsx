import React, {useEffect, useState} from 'react';
// import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
// import translate from 'translate-google-api';
// import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/AntDesign';
import Pdf from 'react-native-pdf';
import styles from './Stylesheet';
const Terms = ({navigation, route}) => {
  const {item} = route.params;
  // const {t, i18n} = useTranslation();
  const [headerMesg, setHeaderMesg] = useState('');

  // console.log('pdf', item);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
      <TouchableOpacity activeOpacity={1} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.empty}>
          <Icon name="arrowleft" size={25} color={'black'} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.text}>Terms and Conditions</Text>
        </View>
        <TouchableOpacity style={styles.logout}></TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.container}>
        <Pdf
          trustAllCerts={Platform.OS == 'android' ? false : true}
          source={{
            uri: item
              ? item
              : 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
            cache: true,
          }}
          // renderActivityIndicator={progress => (
          //   <Progress.Bar progress={progress} color="#FF4029" width={200} />
          // )}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          onLoadProgress={uri => {
            console.log('uri', uri);
          }}
          style={styles.pdf}
        />
      </View>
    </SafeAreaView>
  );
};
export default Terms;
