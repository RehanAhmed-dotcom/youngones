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
import {useDispatch} from 'react-redux';
import {setUser} from '../../../ReduxToolkit/MyUserSlice';

const More = ({navigation}: {navigation: any}) => {
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const data = [
    {name: 'Saved Jobs', image: require('../../../Assets/Images/girlPic.png')},
    {name: 'My Posts', image: require('../../../Assets/Images/girlTea.png')},
    {name: 'Payments', image: require('../../../Assets/Images/transfer.png')},
    {name: 'Wallet', image: require('../../../Assets/Images/wallet.png')},
  ];
  const renderItemSuggest = ({item, index}) => (
    <TouchableOpacity
      onPress={() =>
        item.name == 'Saved Jobs'
          ? navigation.navigate('SavedJobs')
          : item.name == 'My Posts'
          ? navigation.navigate('MyPosts')
          : item.name == 'Wallet'
          ? navigation.navigate('Wallet')
          : null
      }
      style={{
        // flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        // height: 50,
        marginLeft: index % 2 !== 0 ? 10 : 0,
        width: '47%',
        borderRadius: 10,
        elevation: 1,
        shadowColor: '#FAFAFA',
        // shadowColor: '#000', // Shadow color
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 1,

        marginBottom: 20,
        // paddingHorizontal: 20,

        backgroundColor: '#373A43',
      }}>
      <Text
        style={{color: 'white', width: '100%', marginLeft: 30, marginTop: 10}}>
        {item.name}
      </Text>
      <Image
        source={item.image}
        resizeMode="contain"
        style={{width: '100%', marginTop: 30, height: 100}}
      />
      {/* <ArrowBack name={'right'} size={20} color={'white'} /> */}
    </TouchableOpacity>
  );
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        // leftIcon={<ArrowBack name={'left'} size={20} color={'whie'} />}
        label="More"
        rightIcon={
          <CheckIcon
            name={'user'}
            onPress={() => navigation.navigate('Account')}
            size={30}
            color={'#FFBD00'}
          />
        }
      />
      {/* <ScrollView> */}
      <View style={styles.imageView}>
        <View
          style={{
            width: '90%',
            // flex: 1,
            paddingTop: heightPercentageToDP(10),
            // height: '100%',
            // backgroundColor: 'red',
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          {/* <Text>hell</Text> */}
          <FlatList
            data={data}
            numColumns={2}
            // horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItemSuggest}
          />
          <View style={{marginVertical: 40}}>
            <FillButton
              customColor="#FFBD00"
              customTextColor="white"
              Name="Logout"
              onPress={() =>
                Alert.alert('Logout', 'Are you sure you want to logout?', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => dispatch(setUser(null))},
                ])
              }
            />
          </View>
          {/* <View style={{height: 100}} /> */}
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default More;
