import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar({ value, onChangeText }: { value: string; onChangeText: (v: string) => void }) {
  return (
    <View style={styles.box}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Telusuri media..."
        placeholderTextColor="#888"
        style={styles.input}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  box: { backgroundColor: '#202020', borderRadius: 24, paddingHorizontal: 16, height: 44, justifyContent: 'center' },
  input: { color: '#fff', fontSize: 15 },
});
