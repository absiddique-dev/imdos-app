import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableRipple} from 'react-native-paper';

const items = [
  {
    id: '3ad53abb28ba',
    title: 'Property',
    logo: require('../assets/icons/property.png'),
  },
  {
    id: 'fbd91aa97f63',
    title: 'Home Decor',
    logo: require('../assets/icons/home.png'),
  },
  {
    id: '145571e29d72',
    title: 'Trips',
    logo: require('../assets/icons/trips-1.png'),
  },
  {
    id: '142398f82d282',
    title: 'Real Estate',
    logo: require('../assets/icons/invest.png'),
  },
];

const Item = ({title, logo, navigation, id}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => {
      navigation.navigate(
        id == '145571e29d72'
          ? 'Trips'
          : id == 'fbd91aa97f63'
          ? 'Home Decor'
          : id == '3ad53abb28ba'
          ? 'Properties'
          : 'Search',
      );
    }}
    className="flex-1 items-center">
    <View className="w-[60px] h-[60px] bg-[#F5F5F8] rounded-[18px] p-2.5">
      <Image source={logo} className="object-contain w-full h-full" />
    </View>
    <Text className="mt-1">{title}</Text>
  </TouchableOpacity>
);

// const Item = ({title, logo}) => {
//   const navigation = useNavigation();
//   return (
//     <TouchableRipple
//       className="flex-1 items-center"
//       onPress={() => {
//         navigation.navigate('Search');
//       }}>
//       <View>
//         <View className="w-[60px] h-[60px] bg-[#F5F5F8] rounded-[18px] p-2.5">
//           <Image source={logo} className="object-contain w-full h-full" />
//         </View>
//         <Text className="mt-1">{title}</Text>
//       </View>
//     </TouchableRipple>
//   );
// };

const Features = () => {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={items}
        numColumns={4}
        columnWrapperStyle={{columnGap: 10, marginVertical: 15}}
        renderItem={({item}) => (
          <Item
            title={item?.title}
            id={item?.id}
            logo={item?.logo}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Features;
