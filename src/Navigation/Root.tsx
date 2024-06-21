import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../Screen/Auth/Splash';
import Splash1 from '../Screen/Auth/Splash1';
import Splash2 from '../Screen/Auth/Splash2';
import Splash3 from '../Screen/Auth/Splash3';
import Login from '../Screen/Auth/Login';
import Signup from '../Screen/Auth/Signup';
import SellerSignup from '../Screen/Auth/SellerSignup';
import EnterValidationChoice from '../Screen/Auth/EnterValidationChoice';
import EmailVerification from '../Screen/Auth/EmailVerification';
import ProfileSetup from '../Screen/Auth/ProfileSetup';
import Expertise from '../Screen/Auth/Expertise';
import Intrests from '../Screen/Auth/Intrests';
import SubmitDocument from '../Screen/Auth/SubmitDocument';
import SuccessSubmit from '../Screen/Auth/SuccessSubmit';
import EnterEmail from '../Screen/Auth/EnterEmail';
import EnterVerification from '../Screen/Auth/EmailVerification';
import EmailVerificationPage from '../Screen/Auth/EmailVerificationPage';
import ChangePasswordPage from '../Screen/Auth/ChangePasswordPage';
import CredentialsSuccess from '../Screen/Auth/CredentialsSuccess';
import TabNavigator from './BottomTab';
import PostDetail from '../Screen/ExtraAttachedScreens/PostDetail';
import UploadDocuments from '../Screen/ExtraAttachedScreens/UploadDocuments';

const Stack = createStackNavigator();
const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Splash1" component={Splash1} />
          <Stack.Screen name="Splash2" component={Splash2} />
          <Stack.Screen name="Splash3" component={Splash3} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SellerSignup} />
          <Stack.Screen
            name="EnterValidationChoice"
            component={EnterValidationChoice}
          />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerification}
          />
          <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
          <Stack.Screen name="Expertise" component={Expertise} />
          <Stack.Screen name="Intrests" component={Intrests} />
          <Stack.Screen name="SubmitDocument" component={SubmitDocument} />
          <Stack.Screen name="SuccessSubmit" component={SuccessSubmit} />
          <Stack.Screen name="EnterEmail" component={EnterEmail} />
          <Stack.Screen
            name="EmailVerificationPage"
            component={EmailVerificationPage}
          />
          <Stack.Screen
            name="ChangePasswordPage"
            component={ChangePasswordPage}
          />
          <Stack.Screen
            name="CredentialsSuccess"
            component={CredentialsSuccess}
          />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="PostDetail" component={PostDetail} />
          <Stack.Screen name="UploadDocuments" component={UploadDocuments} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
