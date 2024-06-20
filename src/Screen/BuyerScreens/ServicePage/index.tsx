import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import HeaderComp from '../../../Component/HeaderComp';
import styles from './style';
import {allServicesData} from '../../../Component/ExtraData/PopularData';
import AllServiceRender from '../../../Component/RenderItems/AllServiceRender';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
const ServicePage = ({navigation, route}) => {
  const {text, id} = route.params;
  const {user} = useSelector(state => state.user);
  const [service, setService] = useState([]);
  const renderItem = ({item}) => (
    <AllServiceRender item={item} navigation={navigation} />
  );
  const {top, bottom} = useSafeAreaInsets();
  useEffect(() => {
    const formData = new FormData();
    formData.append('search', id);
    postApiWithFormDataWithToken(
      {url: 'searchService', token: user?.api_token},
      formData,
    ).then(res => {
      console.log('res', res);
      setService(res.data);
    });
  }, []);
  return (
    <View style={[styles.mainView, {paddingTop: top}]}>
      <HeaderComp label={`${text} Around you`} navigation={navigation} />
      <View style={styles.middle}>
        <FlatList data={service} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default ServicePage;
