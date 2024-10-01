import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const CheckPage = () => {
  const [password, setPassword] = useState('');
  const StaticPass = '123123';
  const navigation = useNavigation();
  const [checkPass, setCheckPass] = useState(false);

  const handleSubmit = () => {
    if (!password) {
      ToastAndroid.show('Password field is empty', ToastAndroid.SHORT);
      return;
    }

    if (password === StaticPass) {
      setPassword('');
      navigation.navigate('Web View');
    } else {
      ToastAndroid.show('Incorrect Password', ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle={'light-content'} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000',
        }}>
        <View
          style={{
            backgroundColor: '#F5F5F8',
            width: '90%',
            padding: 5,
            borderRadius: 5,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 3,
              width: '100%',
              paddingHorizontal: 10,
              borderColor: '#0000',
            }}>
            <TextInput
              style={{
                textAlign: 'center',
                fontSize: 16,
                flex: 1,
                color: 'black',
              }}
              placeholder="Enter Password"
              placeholderTextColor="#607698"
              value={password}
              onChangeText={text => setPassword(text)}
              keyboardType="default"
              secureTextEntry={!checkPass}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setCheckPass(!checkPass)}>
              <Icon
                name={checkPass ? 'eye-off' : 'eye'}
                size={20}
                color="#607698"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSubmit}
            style={{
              backgroundColor: '#3B82F6',
              padding: 15,
              borderRadius: 5,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 16}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CheckPage;
