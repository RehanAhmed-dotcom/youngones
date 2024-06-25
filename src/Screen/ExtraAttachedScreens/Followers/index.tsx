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

const Followers = ({navigation}: {navigation: any}) => {
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
          <ArrowBack
            name={'left'}
            size={20}
            color={'white'}
            onPress={() => navigation.goBack()}
          />
        }
        label="Followers"
        // mid={
        //   <TouchableOpacity
        //     onPress={() => navigation.navigate('Account')}
        //     style={{flexDirection: 'row', alignItems: 'center'}}>
        //     <Image
        //       source={require('../../../Assets/Images/profile.png')}
        //       style={{height: 30, width: 30, borderRadius: 20}}
        //     />
        //     <Text style={{color: 'white', marginLeft: 5, fontSize: 16}}>
        //       John Travolta
        //     </Text>
        //   </TouchableOpacity>
        // }
      />
      <ScrollView>
        <View style={styles.imageView}>
          <View style={{width: '90%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 0,
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                Recently added
              </Text>
              <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text>
            </View>

            <FlatList
              data={suggestedPeoples}
              // horizontal
              numColumns={2}
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

export default Followers;
