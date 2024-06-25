import React, {useState} from 'react';
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
} from 'react-native';
import styles from './style';
import {Formik} from 'formik';
import Input from '../../../Component/Input';
import CheckIcon from 'react-native-vector-icons/EvilIcons';
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
  singlePostPopularData,
  singlePostRecentData,
  suggestedPeoples,
} from '../../../Component/dummyData';
import SinglePost from '../../../Component/SinglePost';
import People from '../../../Component/People';

const More = ({navigation}: {navigation: any}) => {
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const data = ['Saved Jobs', 'My Posts', 'Payments', 'Wallet'];
  const renderItemSuggest = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        item == 'Saved Jobs'
          ? navigation.navigate('SavedJobs')
          : item == 'My Posts'
          ? navigation.navigate('MyPosts')
          : item == 'Wallet'
          ? navigation.navigate('Wallet')
          : console.log('hello')
      }
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        width: '100%',
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 20,

        backgroundColor: '#373A43',
      }}>
      <Text style={{color: 'white'}}>{item}</Text>
      <ArrowBack name={'right'} size={20} color={'white'} />
    </TouchableOpacity>
  );
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        leftIcon={<ArrowBack name={'left'} size={20} color={'whie'} />}
        label="More"
        rightIcon={<CheckIcon name={'user'} size={30} color={'#FFBD00'} />}
      />
      {/* <ScrollView> */}
      <View style={styles.imageView}>
        <View
          style={{
            width: '90%',
            flex: 1,
            paddingTop: heightPercentageToDP(10),
            // height: '100%',
            // backgroundColor: 'red',
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          {/* <Text>hell</Text> */}
          <FlatList
            data={data}
            // horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItemSuggest}
          />
          {/* <View style={{height: 100}} /> */}
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default More;
