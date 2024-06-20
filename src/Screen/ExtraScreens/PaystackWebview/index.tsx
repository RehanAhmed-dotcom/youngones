import React from 'react';
import {WebView} from 'react-native-webview';
const PaystackWebview = ({navigation, route}) => {
  const {url} = route.params;
  const injectedJavaScript = `
    (function() {
      var open = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function() {
        this.addEventListener('load', function() {
          if (this.readyState === 4) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              url: this.responseURL,
              status: this.status,
              response: this.responseText
            }));
          }
        });
        open.apply(this, arguments);
      };
    })();
  `;

  const handleMessage = event => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log('Response Datas:', data);
    // setResponseData(data);
    console.log('data', JSON.stringify(data));
  };
  const handleNavigationStateChange = async navState => {
    const {url} = navState;
    console.log('my url', url);
    // Check if the URL matches the specific callback URL
    if (url.includes('https://intechsol-developer.co/workaman/api/callback')) {
      try {
        // Fetch the response from the URL
        const response = await fetch(url);
        const data = await response.json(); // Assuming the response is JSON

        // Log the response in the console
        console.log('Response Datas:', data);

        // Optionally navigate back or perform any other action
        navigation.navigate('Order');
      } catch (error) {
        console.error('Error fetching the URL:', error);
      }
    }
  };
  return (
    <WebView
      source={{uri: url}}
      originWhitelist={['*']}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      onNavigationStateChange={handleNavigationStateChange}
      // injectedJavaScript={injectedJavaScript}
      // onMessage={handleMessage}
      //   onNavigationStateChange={}
      scalesPageToFit={true}
      mixedContentMode="always"
    />
  );
};

export default PaystackWebview;
