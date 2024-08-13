import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Modal,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './style';
import {Formik} from 'formik';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowBack from 'react-native-vector-icons/AntDesign';
import FillButton from '../../../Component/FillButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {sellerSignUpValidationSchema} from '../../../lib/ValidationSchemas';
import Loader from '../../../Component/Loader';
import HeaderComp from '../../../Component/HeaderComp';
import ExpertiseItem from '../../../Component/ExpertiseItem';
import InterestItem from '../../../Component/InterestItem';
import {
  PopularJobs,
  RecentJobsData,
  singlePostPopularData,
  singlePostRecentData,
  suggestedPeoples,
} from '../../../Component/dummyData';
import SinglePost from '../../../Component/SinglePost';
import People from '../../../Component/People';
import RecentJobsItem from '../../../Component/RecentJobsItem';
import {PopularData} from '../../../Component/ExtraData/PopularData';
import PopularJobItem from '../../../Component/PopularJobItem';
import DropDown from '../../../Component/DropDown';
import {useSelector} from 'react-redux';
import {getApiwithToken} from '../../../lib/Apis/api';

const ViewTask = ({navigation, route}: {navigation: any; route: any}) => {
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const {item} = route.params;
  const {user} = useSelector(state => state.user);

  const getLastSegment = (url: string) => {
    const segments = url.split('/');
    return segments.pop(); // returns the last segment
  };
  const downloadDoc = (file: string) => {
    const {config, fs} = RNFetchBlob;
    const FileName = getLastSegment(file);
    console.log('file', FileName);
    const downloads = fs.dirs.DownloadDir;
    const filePath = `${downloads}/${FileName}`;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: true,

        path: filePath,
        description: 'Downloading Document.',
      },
    };
    config(options)
      .fetch('GET', file)
      .then(res => {
        // do some magic here
        console.log('res of download', res);
      })
      .catch(err => {
        console.log('err in download', err);
      });
  };

  const renderItemPopular = ({item}) => (
    <TouchableOpacity
      // onPress={() =>
      //   navigation.navigate(item.is_apply ? 'PostDetailHours' : 'PostDetail', {
      //     item,
      //   })
      // }
      onPress={() => downloadDoc(item.file)}
      style={{
        backgroundColor: '#373A43',
        width: '100%',
        // height: 100,
        marginBottom: 20,
        elevation: 1,
        shadowColor: '#FAFAFA',
        // shadowColor: '#000', // Shadow color
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
        }}>
        <Image
          source={
            item.image
              ? {uri: item.Image}
              : require('../../../Assets/Images/download.jpeg')
          }
          style={{height: 50, borderRadius: 10, width: 50}}
        />
        <View style={{marginLeft: 15, width: '75%'}}>
          <Text
            numberOfLines={2}
            style={{
              color: 'white',
              // width: '20%',
              fontSize: 16,
              fontFamily: 'ArialMdm',
            }}>
            {item.description}
          </Text>
          <View style={{alignItems: 'flex-end', marginTop: 10}}>
            {/* <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 30,
            height: 30,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 15,
          }}></TouchableOpacity> */}
            <Text
              style={{color: '#FFBD00', fontSize: 11, fontFamily: 'ArialMdm'}}>
              {item.date}
            </Text>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontFamily: 'ArialCE'}}>
              ${item.price}
            </Text>
            <Text
              style={{color: 'white', marginLeft: 20, fontFamily: 'ArialCE'}}>
              ${item.location}
            </Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        leftIcon={
          <ArrowLeft
            name={'left'}
            size={20}
            onPress={() => navigation.goBack()}
            color={'white'}
          />
        }
        label="Job Tasks"
      />
      <ScrollView>
        <View style={styles.imageView}>
          <View style={{width: '90%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}></View>

            <View style={{marginBottom: 100}}>
              <FlatList
                data={item}
                //   horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItemPopular}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* {FilterModal()} */}
    </View>
  );
};

export default ViewTask;
