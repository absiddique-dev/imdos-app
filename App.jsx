import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {ImdosProvider} from './provider/ImdosProvider';

import CheckPage from './screens/check-password-web';
import WebView from './screens/web-view';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const init = async () => {
      const session = await EncryptedStorage.getItem('user_session');
      if (session !== undefined) {
        setUser(JSON.parse(session));
      }
    };
    init();
  }, []);

  return (
    <NavigationContainer>
      <PaperProvider>
        <ImdosProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Check Page"
              component={CheckPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Web View"
              component={WebView}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </ImdosProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
