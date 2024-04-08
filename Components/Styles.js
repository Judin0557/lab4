import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9', // Change background color
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5, // Increase margin bottom
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#CCCCCC', // Change border color
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10, // Increase margin bottom
    paddingHorizontal: 10, // Add horizontal padding
  },
  button: {
    backgroundColor: '#3498DB', // Change button background color
    padding: 10,
    borderRadius: 5,
    marginTop: 20, // Increase margin top
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // Change button text color
  },
});
