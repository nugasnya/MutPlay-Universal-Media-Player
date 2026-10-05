import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Loading() { return <View style={styles.container}><ActivityIndicator size="large" color="#fff" /></View>; }
const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f0f0f' } });
