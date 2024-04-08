import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TransactionListComponent from './TransactionListComponent';
import TransactionDetailsComponent from './TransactionDetailsComponent';
import { collection, getDocs } from 'firebase/firestore';
import firebase from './FirebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createStackNavigator();

const TransactionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [transactionsData, setTransactionsData] = useState(null);

  const fetchTransactions = async () => {
    console.log("Fetching transactions...");
    try {
      const transactionsCollection = collection(firebase, 'transactions');
      const querySnapshot = await getDocs(transactionsCollection);
      const transactions = [];
      querySnapshot.forEach((doc) => {
        transactions.push({
          id: doc.id,
          ...doc.data()
        });
      });
      console.log("Fetched transactions:", transactions);
      setTransactionsData(transactions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchTransactions();
    }, [])
  );

  return (
    <Stack.Navigator 
      initialRouteName="TransactionsList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0077B6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {loading ? (
        <Stack.Screen name="Loading" component={LoadingScreen} />
      ) : (
        <>
          <Stack.Screen 
            name="TransactionsList" 
            component={TransactionListComponent} 
            initialParams={{ transactionsData }}
          />
          <Stack.Screen 
            name="TransactionDetail" 
            component={TransactionDetailsComponent} 
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#0077B6" />
  </View>
);

export default TransactionComponent;
