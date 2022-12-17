import { View, Text, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from '../types/navigation';
import { Image } from 'react-native';
import upsCustomer from '../assets/ups-customers.jpeg';
import { Input } from '@rneui/themed';

const CustomersScreen = () => {
  //Navigation
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  //state
  const [input, setInput] = useState<string>('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ScrollView className="bg-primaryCustomers">
      <Image source={upsCustomer} className="h-64 w-full" />
      <Input
        placeholder="Cerca per cliente"
        value={input}
        onChangeText={setInput}
        containerStyle={{
          backgroundColor: 'white',
          paddingTop: 20,
          paddingBottom: 0,
          paddingHorizontal: 40,
        }}
      />
    </ScrollView>
  );
};

export default CustomersScreen;
