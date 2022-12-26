import { View, Text, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from '../types/navigation';
import { Image } from 'react-native';
import upsCustomer from '../assets/ups-customers.jpeg';
import { Input } from '@rneui/themed';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS } from '../graphql/queries';
import CustomerCard from '../components/CustomerCard';

const CustomersScreen = () => {
  //Navigation
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  //state
  const [input, setInput] = useState<string>('');
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="bg-primaryCustomers"
    >
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
      {data?.getCustomers
        ?.filter((customer: CustomerList) =>
          customer.value.name.toLowerCase().includes(input.toLowerCase())
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
          <CustomerCard key={ID} email={email} name={name} userId={ID} />
        ))}
    </ScrollView>
  );
};

export default CustomersScreen;
