import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import HeaderComp from '../../../Component/HeaderComp';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import PopularJobItem from '../../../Component/PopularJobItem';
import FillButton from '../../../Component/FillButton';
import {
  accountData,
  singlePostPopularData,
  singlePostRecentData,
} from '../../../Component/dummyData';
import RatingPost from '../../../Component/RatingPost';
import SinglePost from '../../../Component/SinglePost';
const UserProfile = ({navigation}) => {
  const renderItem = ({item}) => (
    <RatingPost navigation={navigation} item={item} />
  );
  const renderItemPopular = ({item}) => (
    <SinglePost navigation={navigation} item={item} />
  );
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      {/* <HeaderComp
        leftIcon={
          <ArrowLeft
            name={'left'}
            size={20}
            onPress={() => navigation.goBack()}
            color={'white'}
          />
        }
        label="UI/UX Designer"
      /> */}
      <View style={{width: '100%', height: heightPercentageToDP(30)}}>
        <Image
          source={require('../../../Assets/Images/UiUx.png')}
          style={{width: '100%', height: heightPercentageToDP(30)}}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', zIndex: 20, left: 20, top: 20}}>
          <ArrowLeft name={'left'} size={20} color={'white'} />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            // backgroundColor: 'red',
            zIndex: 20,
            width: '100%',
            alignItems: 'center',
            bottom: -20,
          }}>
          <Image
            source={require('../../../Assets/Images/profilePick.png')}
            style={{height: 50, width: 50}}
          />
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            width: '90%',
            flex: 1,
            paddingBottom: 20,
            //   backgroundColor: 'red',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontFamily: 'ArialMdm',
              marginTop: 30,
              fontSize: 18,
            }}>
            John Travolta
          </Text>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontFamily: 'ArialCE',
              marginTop: 10,
              fontSize: 14,
            }}>
            Philadalphia America
          </Text>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontFamily: 'ArialCE',
              marginTop: 10,
              fontSize: 12,
            }}>
            500 Followers
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
              <FillButton
                customColor="#FFBD00"
                customTextColor="white"
                Name="Follow"
                midButton={true}
                onPress={() => navigation.navigate('Followers')}
              />
            </View>
            <View style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
              <FillButton
                customColor="black"
                customTextColor="white"
                Name="Chat"
                midButton={true}
                onPress={() => navigation.navigate('Followers')}
              />
            </View>
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
              About Job
            </Text>
          </View>
          <Text style={{color: '#D6D6D6', fontFamily: 'ArialCE'}}>
            Dolor velit in duis pariatur ut nostrud exercitation ex voluptate
            Lorem officia nisi. Sunt laborum in quis nostrud adipisicing mollit.
            Dolore incididunt consequat dolore laboris id cillum. Et anim do
            cupidatat esse duis. Aliquip nostrud labore pariatur qui. Pariatur
            proident ex id ea laborum eu. Aliquip aliquip mollit officia
            exercitation excepteur.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 30,
              marginBottom: 10,
            }}>
            <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
              Recent Post
            </Text>
            <Text
              style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
              Show All
            </Text>
          </View>
          {/* <View style={{marginVertical: 30}}> */}
          <FlatList
            data={singlePostRecentData}
            horizontal
            renderItem={renderItem}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
              marginBottom: 10,
            }}>
            <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
              Popular posts
            </Text>
            <Text
              style={{color: '#6A6A6A', fontSize: 10, fontFamily: 'ArialCE'}}>
              Show All
            </Text>
          </View>
          {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <Text style={{color: 'white'}}>Popular posts</Text>
              <Text style={{color: '#6A6A6A'}}>Show All</Text>
            </View> */}
          <FlatList
            data={singlePostPopularData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItemPopular}
          />
          {/* </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfile;
