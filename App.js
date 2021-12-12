import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Title, ImageBackground } from 'react-native';
import { Card, Header, Button, Divider } from 'react-native-elements';
import logo from './assets/YaleLogo.jpg';
import { Audio } from 'expo-av';
import {FontAwesome} from '@expo/vector-icons';

export default function App() {
  //creates react states for the my recording and mysounduri varaibles and ways to change their states
  const [myrecording, setRecording] = React.useState(null);
  const [mysounduri, setMySoundUri] = React.useState(null);


  //function to start recording
  async function startRecording() {

    //clears the mysounduri variable when recording new recording
    setMySoundUri(null);

    try {
      //makes sure the app has permission to record
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();

      //makes sure the app can record on IOS devices and plays sound even if the phone is on silent mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 

      //creates new recording instance and records
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      //sets myrecording variable as the recording
      setRecording(recording);
      console.log('Recording started');

      //catches errors
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  //function to stop recording
  async function stopRecording() {
    console.log('Stopping recording..');

    //stops the recording 
    setRecording(undefined);
    await myrecording.stopAndUnloadAsync();

    //sets the mysounduri variable as the uri from the recording
    setMySoundUri(myrecording.getURI());
    console.log('Recording stopped', mysounduri);
  }

  //function to play sound
  async function playSound() {
    try {

    //gets the sound from the audio recording's uri
    const {sound} = await Audio.Sound.createAsync( { uri: mysounduri })

    //makes sure audio can play on the phone. playsInSilentModeIOS should be false to play audio on speakers
    await Audio.setAudioModeAsync(
      { allowsRecordingIOS: false },
      { playsInSilentModeIOS: false }, 
      { shouldPlay: true }
    );

    //plays the sound
    console.log('Playing Sound');
    await sound.playAsync();

    //catches any errors
    } catch (error) {
      console.error('an error occurred', error);
    };
  }

  //ui for app
  return (
    <View>
      <Header containerStyle={{backgroundColor: '#00356B'}}>
        <Text style={styles.headertext}>Recorder App</Text>
      </Header>
        <Card style={{textAlign:'center'}}>
          <FontAwesome.Button
            style={styles.button}
            name = {myrecording ? 'stop-circle-o' : 'play-circle-o'}
            title={myrecording ? 'Stop Recording' : 'Start Recording'}
            onPress={myrecording ? stopRecording : startRecording}
          >
            {myrecording ? 'Stop Recording' : 'Start Recording'}
          </FontAwesome.Button>
          <Divider orientation='horizontal' width={20} color='white'/>
          <FontAwesome.Button 
            style={styles.button}
            name = "play-circle-o"
            title="Play Sound" 
            onPress={playSound} 
          >
            Play Sound
          </FontAwesome.Button>
        </Card>
      <ImageBackground source={logo} style = {styles.image}/>    
      <Text style={styles.text}>
        by Alex Jin & James Leung
      </Text>
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
  headertext: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    width: Dimensions.get('window').width,
    fontSize: 36,
  },
  button: {
    backgroundColor: '#00356B',
  },
  title: {
    textAlign: 'center',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    color: '#00356B',
  },
  image: {
    width: 400,
    height: 400,
  }
});