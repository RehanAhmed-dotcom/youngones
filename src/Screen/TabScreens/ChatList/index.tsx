import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './style';
import database from '@react-native-firebase/database';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import Equalizer from 'react-native-vector-icons/SimpleLineIcons';
import {chatData} from '../../../Component/ExtraData/PopularData';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ChatListRender from '../../../Component/RenderItems/ChatListRender';
import {useSelector} from 'react-redux';
import HeaderComp from '../../../Component/HeaderComp';
const ChatList = ({navigation}) => {
  const [list, setList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const renderItem = ({item}) => (
    <ChatListRender item={item} navigation={navigation} />
  );
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate an API call to refresh data
    setTimeout(() => {
      _usersList();
      setRefreshing(false);
    }, 1500);
  }, []);
  // console.log('list', list);
  const searchTextGiven = e => {
    let filteredName = [];
    // if (e) {
    filteredName = list.filter(item => {
      return item?.user?.username?.toLowerCase().includes(`${e.toLowerCase()}`);
      // return item.vender.fullname.toLowerCase().includes(`${e.toLowerCase()}`);
    });
    setSearchedList(filteredName);
    // filteredName = [];
    // }
  };
  const {top} = useSafeAreaInsets();
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {user} = useSelector(state => state.user);
  useEffect(() => {
    _usersList();
  }, []);

  const _usersList = useCallback(async () => {
    try {
      database()
        .ref('users/' + user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .on('value', dataSnapshot => {
          let users = [];
          dataSnapshot.forEach(child => {
            users.push(child.val());
          });

          // Sort the users based on timestamp in descending order
          users.sort((a, b) => b.timestamp - a.timestamp);

          setList(users);
          setSearchedList(users);
        });
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  }, [user?.email]);

  console.log('lsit', list);
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        label="Messages"
        navigation={navigation}
        showBellIcon={true}
        backIcon={true}
      />
      <Wrapper behavior="padding" style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.middle}>
            <View style={[styles.searchBar, {marginBottom: 20}]}>
              <SearchIcon name="search1" size={20} color={'black'} />
              <TextInput
                placeholder="Search here...."
                placeholderTextColor={'black'}
                style={styles.inputView}
                value={searchTerm}
                onChangeText={text => {
                  setSearchTerm(text);
                  searchTextGiven(text);
                }}
              />
            </View>
            <FlatList data={searchedList} renderItem={renderItem} />
          </View>
        </ScrollView>
      </Wrapper>
    </View>
  );
};

export default ChatList;
