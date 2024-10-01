import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

import InputField from './InputField';
import imdos from '../imdos';
import {useImdosUI} from '../provider/ImdosProvider';
import LoadingButton from './LoadingButton';

const SignUp = ({setSelected}) => {
  const {setLoading} = useImdosUI();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [checked, setChecked] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Check all the required fields should not be empty
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.password
      ) {
        return ToastAndroid.show(
          'Input fields are required',
          ToastAndroid.SHORT,
        );
      }

      // Check the email, phone, name, password regex
      const nameRegex = /^[a-zA-Z\s]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[6-9]\d{9}$/;
      const passwordRegex = /^.{6,}$/;

      // Name validation
      if (!nameRegex.test(formData.name)) {
        return ToastAndroid.show(
          'Name should only contain letters and spaces',
          ToastAndroid.SHORT,
        );
      }

      // Email validation
      if (!emailRegex.test(formData.email)) {
        return ToastAndroid.show(
          'Please enter a valid email address',
          ToastAndroid.SHORT,
        );
      }

      // Phone validation
      if (!phoneRegex.test(formData.phone)) {
        return ToastAndroid.show(
          'Please enter a valid phone number',
          ToastAndroid.SHORT,
        );
      }

      // Password validation
      if (!passwordRegex.test(formData.password)) {
        return ToastAndroid.show(
          'Password should be at least 6 characters long',
          ToastAndroid.SHORT,
        );
      }

      if (!checked) {
        return ToastAndroid.show(
          'Please accept the Terms & Conditions',
          ToastAndroid.SHORT,
        );
      }

      const exists = await imdos.request(
        'SELECT * FROM users WHERE email = ? OR phone = ?',
        [formData.email, formData.phone],
      );

      if (exists.length === 0) {
        const data = await imdos.request(
          'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
          [formData.name, formData.email, formData.phone, formData.password],
        );

        if (data?.status === 'success') {
          await EncryptedStorage.setItem(
            'user_session',
            JSON.stringify({
              id: data?.new_id,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
            }),
          );
          navigation.navigate('Main');
        } else {
          return ToastAndroid.show(
            'Failed to create account',
            ToastAndroid.SHORT,
          );
        }
      } else {
        return ToastAndroid.show('Account already exist', ToastAndroid.SHORT);
      }
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
    <View className="flex-col">
      <View className="py-8">
        <Text className="text-[35px] text-[#192E51] font-semibold">Create</Text>
        <Text className="text-[35px] text-[#192E51] font-semibold">
          an account
        </Text>
      </View>
      <KeyboardAvoidingView behavior="height">
        <View>
          <InputField
            placeholder={'Name'}
            icon={'user'}
            value={formData.name}
            onChangeText={value => handleChange('name', value)}
          />
          <InputField
            placeholder={'Email'}
            icon={'mail'}
            value={formData.email}
            onChangeText={value => handleChange('email', value)}
          />
          <InputField
            placeholder={'Phone'}
            icon={'phone'}
            value={formData.phone}
            onChangeText={value => handleChange('phone', value)}
            type={'number-pad'}
          />
          <InputField
            placeholder={'Password'}
            icon={'eye'}
            value={formData.password}
            onChangeText={value => handleChange('password', value)}
            secureTextEntry
          />
        </View>
        <View className="mb-2">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setChecked(!checked)}>
            <View className="flex-row items-center">
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
                color="#192E51"
              />
              <Text className="text-[#607698]">I have read the </Text>
              <Text className="text-[#FF3F4B] font-semibold">
                Terms & Conditions
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View className="bg-[#FF3F4B] h-[55px] rounded-xl mb-4">
          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.7}
            className="flex-row justify-center items-center h-full">
            <Text className="text-[14px] text-white">Sign Up</Text>
          </TouchableOpacity>

        </View> */}
        <LoadingButton text={'Sign Up'} style={'my-4'} onPress={handleSubmit} />
        <TouchableOpacity
          onPress={() => setSelected(0)}
          activeOpacity={0.7}
          className="flex-row justify-center">
          <Text className="text-[#607698]">
            Already have an account? <Text className="font-bold">Log In</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;
