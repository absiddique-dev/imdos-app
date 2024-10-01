import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const EnquiryButton = () => {
  const navigation = useNavigation();
  return (
    <View className="px-3">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Enquiry Form')}
        className="bg-[#e6f3ff71] rounded-lg overflow-hidden shadow-sm">
        <View className="flex-row items-center py-3 px-4">
          <Image
            source={require('../assets/illustration/customer-support.png')}
            className="w-16 h-16 mr-4"
            resizeMode="contain"
          />
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="text-base font-semibold">Need assistance?</Text>
            </View>
            <Text className="text-sm">We're here to help you</Text>
          </View>
          <Icon name="message-circle" size={36} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EnquiryButton;
