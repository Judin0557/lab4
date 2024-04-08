import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionDetailsComponent = ({ route }) => {
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      {/* Section for Transaction Name, Amount, and Loc */}
      <View style={styles.section}>
        <Text style={styles.amount}>{transaction.amount}</Text>
        <Text>{transaction.name}</Text>
        <Text>{transaction.loc}</Text>
      </View>

      {/* Section for Transaction Date */}
      <View style={styles.dateSection}>
        <Text style={styles.label}>Transaction Date:</Text>
        <Text>{transaction.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Light grey background
  },
  section: {
    backgroundColor: '#D5DBDB', // Lighter grey background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#E74C3C', // Red color
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#3498DB', // Blue color
  },
});

export default TransactionDetailsComponent;
