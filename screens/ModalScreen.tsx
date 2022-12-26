import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ModalScreenProps as ModalScreenPropsNavigation } from '../types/navigation';
import useCustomOrders from '../hooks/useCustomOrders';
import DeliveryCard from '../components/DeliveryCard';

type ModalScreenProps = {} & ModalScreenPropsNavigation;

const ModalScreen = ({ navigation, route }: ModalScreenProps) => {
  const { name, userId } = route.params;

  const { loading, error, orders } = useCustomOrders(userId);
  return (
    <View>
      <TouchableOpacity
        className="absolute right-5 top-5 z-10"
        onPress={navigation.goBack}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>
      {/* Header */}
      <View className="mt-2">
        <View className="py-5 border-b border-primaryCustomers">
          <Text className="text-center text-xl font-bold text-primaryCustomers">
            {name}
          </Text>
          <Text className="text-center italic text-sm">deliveries</Text>
        </View>
      </View>
      {/* Lista ordini */}
      <FlatList
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
        contentContainerStyle={{ paddingBottom: 200 }}
      />
    </View>
  );
};

export default ModalScreen;
