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
  singlePostPopularData,
  singlePostRecentData,
  suggestedPeoples,
} from '../../../Component/dummyData';
import SinglePost from '../../../Component/SinglePost';
import People from '../../../Component/People';

const Home = ({navigation}: {navigation: any}) => {
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const renderItem = ({item}) => <SinglePost item={item} />;
  const renderItemPopular = ({item}) => <SinglePost item={item} />;
  const renderItemSuggest = ({item}) => <People item={item} />;
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        leftIcon={
          <Image
            source={require('../../../Assets/Images/ChatGpt.png')}
            style={{height: 20, width: 20}}
          />
        }
        // label="Home"
        mid={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../../Assets/Images/profile.png')}
              style={{height: 30, width: 30, borderRadius: 20}}
            />
            <Text style={{color: 'white', marginLeft: 5, fontSize: 16}}>
              John Travolta
            </Text>
          </View>
        }
        rightIcon={
          <Image
            source={require('../../../Assets/Images/Notification.png')}
            style={{height: 20, width: 20}}
            resizeMode="contain"
          />
        }
      />
      <ScrollView>
        <View style={styles.imageView}>
          <View style={{width: '90%'}}>
            <FillButton
              Name="Post Something Here"
              onPress={() => console.log('hello')}
              customTextColor="white"
              customColor="black"
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                Recently added
              </Text>
              <Text
                style={{color: '#6A6A6A', fontSize: 12, fontFamily: 'ArialCE'}}>
                Show All
              </Text>
            </View>
            <FlatList
              data={singlePostRecentData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <Text style={{color: 'white'}}>Popular posts</Text>
              <Text style={{color: '#6A6A6A'}}>Show All</Text>
            </View>
            <FlatList
              data={singlePostPopularData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItemPopular}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <Text style={{color: 'white'}}>Follow For More Jobs</Text>
              <Text style={{color: '#6A6A6A'}}>Show All</Text>
            </View>

            <FlatList
              data={suggestedPeoples}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItemSuggest}
            />
            <View style={{height: 100}} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
