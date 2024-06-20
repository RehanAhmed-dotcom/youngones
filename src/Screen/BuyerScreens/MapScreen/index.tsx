import React, {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import Geolocation from '@react-native-community/geolocation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FillButton from '../../../Component/FillButton';
// import {useDispatch, useSelector} from 'react-redux';
import {setMapSeen, setUser} from '../../../ReduxToolkit/MyUserSlice';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
const MapScreen = ({navigation}) => {
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState('');
  // const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    Geolocation.getCurrentPosition(info =>
      setRegion({
        latitude: parseFloat(info.coords.latitude),
        longitude: parseFloat(info.coords.longitude),
      }),
    );
  }, []);
  //
  const editAddress = () => {
    const formdata = new FormData();
    formdata.append('address', address);
    postApiWithFormDataWithToken(
      {url: 'edit', token: user?.api_token},
      formdata,
    ).then(res => {
      console.log('res', res);
      if (res.status == 'success') {
        dispatch(setMapSeen(true));
        dispatch(setUser(res.userdata));
      }
    });
  };
  //   const fetchCurrentLocation = () => {
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         const {latitude, longitude} = position.coords;
  //         setRegion({
  //           latitude,
  //           longitude,
  //           latitudeDelta: 0.0922,
  //           longitudeDelta: 0.0421,
  //         });
  //       },
  //       error => console.error(error),
  //       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  //     );
  //   };
  //   console.log('region', region);
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View style={{flex: 1}}>
      {region && (
        <>
          <View
            style={{
              position: 'absolute',
              //   height: 50,
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
              zIndex: 20,
              top,
              paddingHorizontal: 20,
              paddingBottom: 20,
              marginTop: 20,
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <Text style={{color: 'grey', marginTop: 30}}>
              Add delivery address
            </Text>
            <View
              style={{
                flexDirection: 'row',
                height: 50,
                paddingHorizontal: 15,
                borderWidth: 1,
                marginTop: 20,
                borderColor: '#ccc',
                width: '100%',
                borderRadius: 10,

                alignItems: 'center',
              }}>
              <SearchIcon name="search1" size={20} color={'#ccc'} />
              <TextInput
                placeholder="search street, city, district..."
                placeholderTextColor={'#ccc'}
                style={{color: 'grey'}}
                value={address}
                onChangeText={text => setAddress(text)}
              />
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              //   height: 50,
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20,
              bottom,
              paddingHorizontal: 20,
              paddingBottom: 20,
              paddingTop: 20,
              marginBottom: 20,
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <FillButton
              Name="Select Address"
              onPress={() => {
                editAddress();
              }}
              customColor="#46A4DF"
              customTextColor="white"
            />
          </View>
          <MapView
            style={{flex: 1}}
            // onPress={() => navigation.navigate('BuyerBottomTab')}
            initialRegion={{
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker coordinate={region} title={'You are here'} />
          </MapView>
        </>
      )}
    </View>
  );
};

export default MapScreen;
