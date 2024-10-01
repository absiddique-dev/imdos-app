import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator, TouchableRipple} from 'react-native-paper';
import {useImdosUI} from '../provider/ImdosProvider';

const LoadingButton = ({text, onPress, style}) => {
  const {loading} = useImdosUI();
  return (
    <View className={`rounded-xl overflow-hidden ${style}`}>
      <TouchableRipple
        disabled={loading}
        className={`bg-[#FF3F4B] h-[55px] justify-center items-center ${
          loading ? 'opacity-70' : ''
        }`}
        onPress={onPress}>
        <View className="flex-row gap-2 items-center">
          {loading && <ActivityIndicator color="#fff" />}
          <Text className="text-[14px] text-white text-center">{text}</Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default LoadingButton;
