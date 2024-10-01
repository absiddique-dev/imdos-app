import React, {createContext, useContext, useState} from 'react';
import BootSplash from 'react-native-bootsplash';
import EncryptedStorage from 'react-native-encrypted-storage';

// Create a context for the application
const AppContext = createContext();

// Create a custom hook to access the context
export function useImdosUI() {
  return useContext(AppContext);
}

// Create a provider component to wrap your entire application
export function ImdosProvider({children}) {
  const [loading, setLoading] = useState(false);
  const [dialog, setAlertDialog] = useState({show: false});
  const [toast, setToast] = useState({show: false});
  const [user, setUser] = useState(null);
  const [splash, setSplash] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAppUpdate, setShowAppUpdate] = useState(false);

  // Function to set alert
  const showDialog = value => {
    setAlertDialog(value);
  };

  // Function to set toast
  const showToast = value => {
    setToast(value);
  };

  React.useEffect(() => {
    const init = async () => {
      const session = await EncryptedStorage.getItem('user_session');
      if (session !== undefined) {
        setUser(JSON.parse(session));
      }
    };

    init().finally(() => {
      setTimeout(async () => {
        await BootSplash.hide({fade: true});
      }, 1000);
    });
  }, []);

  // Value to be provided by the context
  const contextValue = {
    loading,
    setLoading,
    user,
    setUser,
    dialog,
    showDialog,
    toast,
    showToast,
    splash,
    setSplash,
    refreshing,
    setRefreshing,
    showAppUpdate,
    setShowAppUpdate,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
