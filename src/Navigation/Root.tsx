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
import SavedJobs from '../Screen/ExtraAttachedScreens/SavedJobs';
import MyPosts from '../Screen/ExtraAttachedScreens/MyPosts';
import AddPost from '../Screen/ExtraAttachedScreens/AddPost';
import MessageScreen from '../Screen/ExtraAttachedScreens/MessageScreen';
import Account from '../Screen/ExtraAttachedScreens/Account';
import AccountInfo from '../Screen/ExtraAttachedScreens/AccountInfo';
import Followers from '../Screen/ExtraAttachedScreens/Followers';
import IntroVideo from '../Screen/Auth/IntroVideo';
import Wallet from '../Screen/ExtraAttachedScreens/Wallet';
import Notifications from '../Screen/BottomTabScreens/Notifications';
import UserProfile from '../Screen/ExtraAttachedScreens/UserProfile';
import PostDetailHours from '../Screen/ExtraAttachedScreens/PostDetailHours';
import AddHours from '../Screen/ExtraAttachedScreens/AddHours';
import AIassistant from '../Screen/ExtraAttachedScreens/AIassistant';
import AIassistantChat from '../Screen/ExtraAttachedScreens/AIassistantChat';
import {useSelector} from 'react-redux';
import ViewTask from '../Screen/ExtraAttachedScreens/ViewTask';
import History from '../Screen/ExtraAttachedScreens/History';
import Comment from '../Screen/ExtraAttachedScreens/Comment';
import PostActualDetail from '../Screen/ExtraAttachedScreens/PostActualDetail';
import ChatComponent from '../Screen/ExtraAttachedScreens/ChatComponent';
import VideoMagnifier from '../Screen/ExtraAttachedScreens/VideoMagnifier';

const Stack = createStackNavigator();
const Root = () => {
  const {user} = useSelector(state => state.user);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user ? (
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="IntroVideo" component={IntroVideo} />
            <Stack.Screen name="Splash1" component={Splash1} />
            <Stack.Screen name="Splash2" component={Splash2} />
            <Stack.Screen name="Splash3" component={Splash3} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SellerSignup} />

            <Stack.Screen name="EnterEmail" component={EnterEmail} />
            <Stack.Screen
              name="EnterValidationChoice"
              component={EnterValidationChoice}
            />
            <Stack.Screen
              name="ChangePasswordPage"
              component={ChangePasswordPage}
            />
            <Stack.Screen
              name="EmailVerificationPage"
              component={EmailVerificationPage}
            />
            <Stack.Screen
              name="EmailVerification"
              component={EmailVerification}
            />
            <Stack.Screen
              name="CredentialsSuccess"
              component={CredentialsSuccess}
            />
          </>
        ) : user?.gender == 'Male' ||
          'male' ||
          'female' ||
          'Female' ||
          'feMale' ||
          ('FeMale' &&
            user?.document?.length > 0 &&
            user?.expertise?.length > 0 &&
            user?.interest?.length > 0) ? (
          <>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="PostDetail" component={PostDetail} />
            <Stack.Screen name="UploadDocuments" component={UploadDocuments} />
            <Stack.Screen name="SavedJobs" component={SavedJobs} />
            <Stack.Screen name="MyPosts" component={MyPosts} />
            <Stack.Screen name="AddPost" component={AddPost} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="AccountInfo" component={AccountInfo} />
            <Stack.Screen name="Followers" component={Followers} />
            <Stack.Screen name="ViewTask" component={ViewTask} />
            <Stack.Screen name="Wallet" component={Wallet} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="PostDetailHours" component={PostDetailHours} />
            <Stack.Screen name="AddHours" component={AddHours} />
            <Stack.Screen name="AIassistant" component={AIassistant} />
            <Stack.Screen name="AIassistantChat" component={AIassistantChat} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="Comment" component={Comment} />
            <Stack.Screen name="ChatComponent" component={ChatComponent} />
            <Stack.Screen name="VideoMagnifier" component={VideoMagnifier} />
            <Stack.Screen
              name="PostActualDetail"
              component={PostActualDetail}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
            <Stack.Screen name="Expertise" component={Expertise} />
            <Stack.Screen name="Intrests" component={Intrests} />
            <Stack.Screen name="SubmitDocument" component={SubmitDocument} />
          </>
        )}
        {/* <>
         
         
          <Stack.Screen name="SuccessSubmit" component={SuccessSubmit} />
        
         
         
 
        </> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
