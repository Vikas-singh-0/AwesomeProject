import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Hello world </Text>
        <Image source={{uri: 'https://www.bing.com/images/search?view=detailV2&ccid=FG6Fv4hy&id=6912D20E6C083CC78199196885F4DC117FFB6092&thid=OIP.FG6Fv4hy7XJHC1lvoMJHqAHaEo&mediaurl=https%3a%2f%2fwww.thedigitalbridges.com%2fwp-content%2fuploads%2f2016%2f09%2fconvert-image-to-pdf-how-to.jpg&exph=900&expw=1440&q=image+to+pdf&simid=607987625479308877&FORM=IRPRST&ck=6518BC64F70B2012DD71AEC4156E2405&selectedIndex=1&itb=0'}}></Image>
      </View>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
