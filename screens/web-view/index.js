import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  AppState,
  StatusBar,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const WebViewScreen = () => {
  const navigation = useNavigation();
  const webViewRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const appState = useRef(AppState.currentState);
  const [url, setUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(true); // For controlling modal visibility
  const [inputUrl, setInputUrl] = useState(''); // For storing user input URL

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

  const handleUrlSubmit = () => {
    setUrl(inputUrl); // Store the input URL into state
    setModalVisible(false); // Hide the modal after URL is submitted
  };

  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle={'light-content'} />
      <View style={styles.container}>
        {isVisible && url && (
          <WebView
            overScrollMode="never"
            ref={webViewRef}
            source={{uri: url}} // Use the user-entered URL
            style={styles.webview}
            injectedJavaScript={injectedJavaScript}
            onMessage={event => {
              console.log('Message from WebView:', event.nativeEvent.data);
            }}
          />
        )}

        {/* Modal for URL Input */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter URL:</Text>
              <TextInput
                style={styles.input}
                value={inputUrl}
                onChangeText={setInputUrl}
                placeholder="Enter a URL"
                placeholderTextColor="#888"
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleUrlSubmit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WebViewScreen;
