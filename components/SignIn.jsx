'use client';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InputField from './InputField';
import imdos from '../imdos';
import EncryptedStorage from 'react-native-encrypted-storage';
import LoadingButton from './LoadingButton';
import {useImdosUI} from '../provider/ImdosProvider';

const SignIn = ({setSelected}) => {
  const navigation = useNavigation();
  const {setLoading} = useImdosUI();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        return ToastAndroid.show(
          'Input fields are required',
          ToastAndroid.SHORT,
        );
      }

      // Check the regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return ToastAndroid.show(
          'Please enter a valid email address',
          ToastAndroid.SHORT,
        );
      }

      const existence = await imdos.request(
        'SELECT id, name, email, phone FROM users WHERE email = ? AND password = ?',
        [email, password],
        {first: true},
      );

      if (!existence?.id) {
        return ToastAndroid.show(
          'Invalid email or password',
          ToastAndroid.SHORT,
        );
      }

      await EncryptedStorage.setItem('user_session', JSON.stringify(existence));
      navigation.navigate('Main');
    } catch (error) {
      ToastAndroid.show(
        'An error occurred while creating the account',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-col flex-1">
      <View className="py-8">
        <Text className="text-[35px] text-[#192E51] font-semibold">
          Let's Sign
        </Text>
        <Text className="text-[35px] text-[#192E51] font-semibold">You In</Text>
      </View>
      <View>
        <View>
          <InputField
            placeholder={'Email'}
            icon={'mail'}
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            placeholder={'Password'}
            icon={'eye'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('Forgot');
          }}>
          <Text className="text-[#607698]">Forget password?</Text>
        </TouchableOpacity>
      </View>

      <LoadingButton text={'Sign In'} style={'my-4'} onPress={handleSubmit} />
      <TouchableOpacity
        onPress={() => {
          setSelected(1);
        }}
        activeOpacity={0.7}
        className="flex-row justify-center">
        <Text className="text-[#607698]">
          Don't have an account? <Text className="font-bold">Create One</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
