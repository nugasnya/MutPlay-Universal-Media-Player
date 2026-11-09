import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function MediaDetail() {
  const { id } = useLocalSearchParams();
  return <Text>Menampilkan Media ID: {id}</Text>;
}
