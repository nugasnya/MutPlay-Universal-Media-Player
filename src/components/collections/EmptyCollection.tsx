import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function EmptyCollection({ label }: { label: string }) { return <View style={styles.box}><Text style={styles.icon}>📂</Text><Text style={styles.title}>Belum ada {label}</Text><Text style={styles.text}>Tambahkan file untuk mulai mengisi koleksi.</Text></View>; }
const styles = StyleSheet.create({ box: { alignItems: 'center', paddingVertical: 70 }, icon: { fontSize: 45 }, title: { color: '#fff', fontWeight: '800', fontSize: 17, marginTop: 10 }, text: { color: '#888', marginTop: 5 } });
