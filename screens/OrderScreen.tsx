import { View, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  OrderScreenRouteProp,
  OrdersScreenNavigationProp,
} from '../types/navigation';

const OrderScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const route = useRoute<OrderScreenRouteProp>();

  const {
    params: { order },
  } = route;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
    });
  }, []);
  return <View className="-mt-2"></View>;
};

export default OrderScreen;
