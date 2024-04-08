import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TransactionComponent from './Components/TransactionComponent'
import SummaryComponent from './Components/SummaryComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FormComponent from './Components/FormComponent';

const Tab = createBottomTabNavigator();

export default function App() {

  // const transactionsData = [
  //   { id: 1, name: 'Starbucks', amount: '$12', date: '2024-04-01', loc: 'Toronto, ON' },
  //   { id: 2, name: 'Apple Store', amount: '$101', date: '2024-04-02', loc: 'Montreal, QC' },
  //   { id: 3, name: 'Sephora', amount: '$120', date: '2024-04-03', loc: 'Vancouver, BC' },
  //   { id: 4, name: 'Shopper Drug Mart', amount: '$12', date: '2024-04-04', loc: 'Ottawa, ON' },
  //   { id: 5, name: 'Pizza Hut', amount: '$24', date: '2024-04-05', loc: 'Calgary, AB' },
  //   { id: 6, name: 'Cheesecake Factory', amount: '$45', date: '2024-04-06', loc: 'Edmonton, AB' },
  //   { id: 7, name: 'Nike', amount: '$250', date: '2024-04-07', loc: 'Winnipeg, MB' },
  //   { id: 8, name: 'Tim Hortons', amount: '$7.89', date: '2024-04-08', loc: 'Quebec City, QC' },
  //   { id: 9, name: 'Whole Foods', amount: '$78', date: '2024-04-09', loc: 'Saskatoon, SK' },
  //   { id: 10, name: 'Cineplex', amount: '$42.50', date: '2024-04-10', loc: 'Victoria, BC' },
  // ];

  return (
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={{
        headerStyle: {
          backgroundColor: '#F4F6F7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
          <Tab.Screen name="Transactions" component={() => <TransactionComponent/>} options={{
          tabBarIcon: () => (<Ionicons name="document-text" size={24} color="black" />),}}/>
          <Tab.Screen name="Summary" component={() => <SummaryComponent />} options={{
          tabBarIcon: () => (<Ionicons name="information-circle" size={24} color="black" />),}}/>
          <Tab.Screen name="Add Transaction" component={FormComponent} options={{
          tabBarIcon: () => (<Ionicons name="add-outline" size={24} color="black" />),}}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}