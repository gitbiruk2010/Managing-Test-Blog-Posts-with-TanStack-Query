import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const FilterComponent = ({ userId, setUserId }) => {
  return (
    <View style={styles.container}>
      {/* Input field for filtering posts by user ID */}
      <TextInput
        style={styles.input}
        placeholder="Filter by User ID"
        value={userId}
        onChangeText={setUserId}
      />
    </View>
  );
};

// Styles for the FilterComponent
const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Space below the input field
  },
  input: {
    height: 40, // Height of the input field
    borderColor: 'gray', // Border color of the input field
    borderWidth: 1, // Border width of the input field
    padding: 10, // Padding inside the input field
  },
});

export default FilterComponent;
