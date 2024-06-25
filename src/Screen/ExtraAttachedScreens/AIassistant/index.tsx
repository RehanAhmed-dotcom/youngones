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

const AIassistant = ({navigation}: {navigation: any}) => {
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AIassistantChat')}
      style={{
        backgroundColor: '#373A43',
        marginBottom: 15,
        padding: 10,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <View style={{height: 50, width: 50, borderRadius: 30,}}> */}
        <Image
          source={require('../../../Assets/Images/ChatGptPic.png')}
          style={{height: 40, width: 40}}
        />
        {/* </View> */}
        <View>
          <Text
            style={{color: 'white', marginLeft: 20, fontFamily: 'ArialMdm'}}>
            UI/UX Designer
          </Text>
          <Text
            style={{
              color: 'white',
              marginLeft: 20,
              fontSize: 12,
              marginTop: 10,
              fontFamily: 'ArialMdm',
            }}>
            Best 2023 mobile app suggestions?
          </Text>
        </View>
      </View>
      <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>20:10</Text>
    </TouchableOpacity>
  );
  const data = [1, 2, 3, 4];
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        leftIcon={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ArrowBack
              name="left"
              onPress={() => navigation.goBack()}
              size={20}
              color={'white'}
            />
          </View>
        }
        label="AI Assistant"
      />
      <ScrollView>
        <View style={styles.imageView}>
          <View style={{width: '90%'}}>
            {/* <View
              style={{
                height: 100,
                width: '100%',
                overflow: 'hidden',
                borderRadius: 20,
                marginBottom: 20,
                // backgroundColor: 'red',
              }}></View> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#373A43',
                height: 50,
                borderRadius: 40,
                paddingHorizontal: 15,
              }}>
              <ArrowBack name={'search1'} color={'grey'} size={20} />
              <TextInput
                placeholder="Search ..."
                placeholderTextColor={'grey'}
                style={{width: '90%'}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AIassistantChat')}
                style={{
                  backgroundColor: '#560FAB',
                  borderRadius: 20,
                  width: '47%',
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                  // height: 150,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Arial-Bold',
                    fontSize: 18,
                    lineHeight: 30,
                  }}>
                  Engage in conversation with AI.
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',

                      backgroundColor: '#6F33B8',
                      height: 60,
                      width: 60,
                      borderRadius: 40,
                    }}>
                    <Image
                      source={require('../../../Assets/Images/conv.png')}
                      style={{height: 40, width: 40}}
                    />
                  </View>
                  <ArrowBack name={'arrowright'} size={30} color={'white'} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('AIassistantChat')}
                style={{
                  backgroundColor: '#560FAB',
                  borderRadius: 20,
                  width: '47%',
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                  // height: 150,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Arial-Bold',
                    fontSize: 18,
                    lineHeight: 30,
                  }}>
                  Converse with Artificial Intelligence.
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',

                      backgroundColor: '#6F33B8',
                      height: 60,
                      width: 60,
                      borderRadius: 40,
                    }}>
                    <Image
                      source={require('../../../Assets/Images/rumor.png')}
                      style={{height: 40, width: 40}}
                    />
                  </View>
                  <ArrowBack name={'arrowright'} size={30} color={'white'} />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                History
              </Text>
              <Text
                style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
                Show All
              </Text>
            </View>
            <FlatList
              data={data}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
            <View style={{height: 100}} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AIassistant;
