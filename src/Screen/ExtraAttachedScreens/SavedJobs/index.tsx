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
} from 'react-native';
import styles from './style';
import {Formik} from 'formik';
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
import {getApiwithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';

const SavedJobs = ({navigation}: {navigation: any}) => {
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const {user} = useSelector(state => state.user);
  const {height: windowHeight} = Dimensions.get('window');
  const data = ['New', 'Accepted', 'Cancelled', 'Completed'];
  const [saved, setSaved] = useState([]);

  const renderItem = ({item}) => (
    <RecentJobsItem item={item} navigation={navigation} />
  );

  const renderItemPopular = ({item}) => (
    <PopularJobItem item={item.job} navigation={navigation} savedJob={true} />
  );

  useEffect(() => {
    getApiwithToken({url: 'allSavedJobs', token: user?.api_token}).then(res => {
      console.log('res of savedd aapi', JSON.stringify(res));
      setSaved(res.data);
    });
  }, []);
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        leftIcon={
          <ArrowBack
            name={'left'}
            onPress={() => navigation.goBack()}
            size={20}
            color={'white'}
          />
        }
        label="Saved Jobs"
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

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                Popular jobs
              </Text>
            </View>
            <View style={{marginBottom: 100}}>
              <FlatList
                data={saved}
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

export default SavedJobs;
