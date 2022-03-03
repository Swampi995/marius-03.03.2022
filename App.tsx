import { StyleSheet, SafeAreaView } from 'react-native';
import { useThemeColor } from './components';
import useCachedResources from './hooks/useCachedResources';
import MainScreen from './screens/MainScreen';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const color = useThemeColor('background');

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
        <MainScreen />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
