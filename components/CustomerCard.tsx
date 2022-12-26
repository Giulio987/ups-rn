import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import useCustomOrders from '../hooks/useCustomOrders';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from '../types/navigation';
import { Card, Icon } from '@rneui/themed';
import colors from '../constants/colors';
type Props = {
  userId: string;
  name: string;
  email: string;
};

const CustomerCard = ({ email, name, userId }: Props) => {
  const { error, loading, orders } = useCustomOrders(userId);
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MyModal', {
          name: name,
          userId: userId,
        })
      }
    >
      <Card
        containerStyle={{
          padding: 20,
          borderRadius: 8,
        }}
      >
        <View>
          <View className="flex-row justify-between">
            <View>
              <Text className="text-2xl font-bold">{name}</Text>
              <Text className="text-sm text-primaryCustomers">
                ID: {userId}
              </Text>
            </View>

            <View className="flex-row items-center justify-end">
              <Text className="text-primaryCustomers">
                {loading ? 'loading...' : `${orders.length} x`}
              </Text>
              <Icon
                className="mb-5 ml-auto"
                name="box"
                type="entypo"
                color={colors.primaryCustomers}
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
