import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card, Icon } from '@rneui/themed';
import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { OrdersScreenNavigationProp } from '../types/navigation';

type Props = {
  item: Order;
};

const OrderCard = ({ item }: Props) => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Order', {
          order: item,
        })
      }
    >
      <Card containerStyle={{ paddingHorizontal: 20, borderRadius: 8 }}>
        <View className="flex-row justify-between items-center">
          <View>
            <Icon
              name="truck-delivery"
              type="material-community"
              color={colors.primaryOrders}
            />
            <Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
          </View>
          <View>
            <Text className="text-gray-400 text-[10px]">
              {item.carrier}-{item.trackingId}
            </Text>
            <Text className="text-gray-500 text-xl">
              {item.trackingItems.customer.name}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-sm text-primaryOrders">
              {item.trackingItems.items.length} x
            </Text>
            <Icon className="ml-2" name="box" type="feather" />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
