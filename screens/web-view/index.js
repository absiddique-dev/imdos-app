import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, AppState, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const WebViewScreen = () => {
  const navigation = useNavigation();
  const webViewRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setIsVisible(true);
      return () => setIsVisible(false);
    }, []),
  );

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      navigation.navigate('Check Page');
    }
    appState.current = nextAppState;
  };

  const injectedJavaScript = `
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
        e.preventDefault();
      }
    });
  `;

  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle={'light-content'} />
      <View style={styles.container}>
        {isVisible && (
          <WebView
            overScrollMode="never"
            ref={webViewRef}
            source={{uri: 'https://penprogrammer.com/'}}
            style={styles.webview}
            injectedJavaScript={injectedJavaScript}
            onMessage={event => {
              console.log('Message from WebView:', event.nativeEvent.data);
            }}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  webview: {
    flex: 1,
  },
});

export default WebViewScreen;
