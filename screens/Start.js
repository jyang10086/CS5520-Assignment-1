import { StyleSheet, Text, View } from 'react-native';
import StartHeader from '../components/StartHeader';

export default function Start() {
  return (
    <View style={styles.container}>
      <StartHeader/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
