import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import imdos from '../imdos';
import SmallButton from './SmallButton';
import {useNavigation} from '@react-navigation/native';
import {FILE_PATH} from '../imdos/secure';
import {View, Text, Image, ToastAndroid, TouchableOpacity} from 'react-native';
import {ActivityIndicator, TouchableRipple} from 'react-native-paper';
import {useImdosUI} from '../provider/ImdosProvider';
import {Alert, Share} from 'react-native';
import EnquiryButton from './EnquiryButton';

const RecommendedProperties = () => {
  const navigation = useNavigation();
  const [properties, setProperties] = useState(null);
  const {user} = useImdosUI();

  function updateIsLiked(id, newIsLikedValue) {
    setProperties(prevProperties =>
      prevProperties.map(property =>
        property.id === id
          ? {
              ...property,
              is_liked: newIsLikedValue,
              likes:
                newIsLikedValue == 0
                  ? Number(property.likes) - 1
                  : Number(property.likes) + 1,
            }
          : property,
      ),
    );
  }

  const handleLike = async itemId => {
    try {
      const result = await imdos.request(
        'SELECT id FROM wishlists WHERE user_id = ? AND property_id = ?',
        [user?.id, itemId],
        {first: true},
      );

      if (result && result?.id) {
        await imdos.request('DELETE FROM wishlists WHERE id = ?', [result.id]);
        await imdos.request(
          'UPDATE properties SET likes = likes - 1 WHERE id = ?',
          [itemId],
        );
        updateIsLiked(itemId, 0);
      } else {
        await imdos.request(
          'INSERT INTO wishlists (user_id, property_id) VALUES (?, ?)',
          [user?.id, itemId],
        );
        await imdos.request(
          'UPDATE properties SET likes = likes + 1 WHERE id = ?',
          [itemId],
        );
        updateIsLiked(itemId, 1);
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  async function getData() {
    try {
      const data = await imdos.request(
        `SELECT 
    properties.*, location.locality AS location_name, CASE 
    WHEN wishlists.property_id IS NOT NULL THEN true 
    ELSE false END AS is_liked, CASE 
    WHEN properties.plan_type = 'fixed' THEN 
    JSON_UNQUOTE(JSON_EXTRACT(plans, '$[0].value'))
    WHEN properties.plan_type = 'dynamic' THEN 
      CONCAT(
        JSON_UNQUOTE(JSON_EXTRACT(plans, '$[0].value')), 
        ' - ', 
        JSON_UNQUOTE(JSON_EXTRACT(plans, CONCAT('$[', JSON_LENGTH(plans) - 1, '].value')))
      )
    ELSE NULL END AS price FROM properties JOIN location ON location.id = properties.location_id
    LEFT JOIN wishlists ON wishlists.property_id = properties.id AND wishlists.user_id = ? WHERE properties.status = 'active'`,
        [user?.id],
      );
      setProperties(data);
    } catch (error) {
      ToastAndroid.show('Error fetching data', ToastAndroid.SHORT);
    }
  }

  const onShare = async title => {
    try {
      await Share.share({
        message: `Hey there! Check out ${title}\nDownload the App: https://play.google.com/store/apps/details?id=com.imdos.ribub`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <EnquiryButton />
      <Text className="text-lg font-semibold px-3 mb-3 mt-2">
        Recommended Properties
      </Text>
      {!properties && (
        <ActivityIndicator size={30} className="my-2" color="#FF3F4B" />
      )}
      {properties?.map((item, index) => (
        <TouchableRipple
          key={index}
          onPress={() => {
            navigation.navigate('Property View', {propertyId: item?.id});
          }}>
          <View className="pb-3">
            <Image
              source={{
                uri: `${FILE_PATH + item?.thumbnail}`,
              }}
              className="aspect-video"
            />
            <View className="px-3">
              <View className="flex-row items-center justify-between mt-1">
                <View>
                  <Text className="text-lg font-semibold">{item?.title}</Text>
                  <Text>{item?.sub_title}</Text>
                </View>
                <Text className="text-xl font-semibold">₹{item?.price}</Text>
              </View>
              <View className="flex-row items-center justify-between mt-2">
                <View className="flex-row items-center gap-x-3">
                  <View className="flex items-center justify-center">
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        handleLike(item?.id);
                      }}>
                      <Icon
                        name={item.is_liked == 1 ? 'heart' : 'hearto'}
                        color={item.is_liked == 1 ? 'red' : 'gray'}
                        size={25}
                      />
                    </TouchableOpacity>
                    <Text className="text-[12px]">
                      Likes {item?.likes ?? 0}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      onShare(item?.title);
                    }}
                    activeOpacity={0.7}>
                    <View className="flex items-center justify-center">
                      <Icon name={'sharealt'} color="gray" size={25} />
                      <Text className="text-[12px]">Share</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <SmallButton text={'Book Now'} onPress={() => {}} />
              </View>
            </View>
          </View>
        </TouchableRipple>
      ))}
    </View>
  );
};

export default RecommendedProperties;
