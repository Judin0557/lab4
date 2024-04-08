import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import db from './FirebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const SummaryComponent = () => {

  const { transactionsData } = [];
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSummaryData = async () => {
    try {
      const transactionsCollection = collection(db, 'transactions');
      const querySnapshot = await getDocs(transactionsCollection);
      const data = querySnapshot.docs.map(doc => doc.data());
  
      const parsedAmounts = data.map(t => {
        const amount = t.amount ? parseFloat(t.amount.replace('$', '')) : 0;
        return { ...t, amount };
      });
  
      const highestTransaction = Math.max(...parsedAmounts.map(t => t.amount));
      const lowestTransaction = Math.min(...parsedAmounts.map(t => t.amount));
  
      const highSpending = parsedAmounts.find(t => t.amount === highestTransaction);
      const lowSpending = parsedAmounts.find(t => t.amount === lowestTransaction);
  
      const summary = [
        { title: 'Transactions', value: parsedAmounts.length },
        { title: 'Balance', value: `$${parsedAmounts.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}` },
        { title: 'High Spending', transaction: highSpending?.name, amount: highestTransaction },
        { title: 'Low Spending', transaction: lowSpending?.name, amount: lowestTransaction },
      ];
  
      setSummaryData(summary);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSummaryData();
    }, [transactionsData])
  );
  
  const renderItem = ({ item }) => {
    if (item.title === 'High Spending' || item.title === 'Low Spending') {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <View style={styles.transactionContainer}>
            <Text style={styles.transactionName}>{item.transaction}</Text>
            <Text style={styles.transactionAmount}>${item.amount}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    );
  };

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  return (
    <FlatList
      data={summaryData}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      keyExtractor={(item) => item.title}
      style={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#D6EAF8', // Light blue background
    borderRadius: 8,
    marginBottom: 12,
  },
  sectionContainer: {
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27AE60', // Green color
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: '#34495E', // Dark blue color
  },
  value: {
    fontSize: 18,
    color: '#E67E22', // Orange color
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionName: {
    fontSize: 18,
    color: '#8E44AD', // Purple color
  },
  transactionAmount: {
    fontSize: 18,
    color: '#C0392B', // Red color
  },
  separator: {
    height: 2,
    backgroundColor: '#BDC3C7', // Light grey color
    marginVertical: 8,
  },
});

export default SummaryComponent;
