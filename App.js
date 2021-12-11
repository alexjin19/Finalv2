import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [myrecording, setRecording] = React.useState(null);

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await myrecording.stopAndUnloadAsync();
    const mysounduri = myrecording.getURI();
    console.log('Recording stopped', mysounduri);
  }

  async function playSound() {
    const mysounduri = "file:///Users/alexanderjin/Library/Developer/CoreSimulator/Devices/3F86B385-4F45-4DC1-8771-D55C1AA89FAF/data/Containers/Data/Application/C8446092-AFA7-43BC-B622-633B14D4B621/Library/Caches/ExponentExperienceData/%2540anonymous%252FFinalv2-9c3c1782-436d-4a6b-9a6d-66e449e293cb/AV/recording-393227B1-A662-4F9E-8E67-F556A664ACFA.m4a"
    try {
    const {sound} = await Audio.Sound.createAsync( { uri: mysounduri })
    await Audio.setAudioModeAsync(
      { playsInSilentModeIOS: true }, 
      { shouldPlay: true }
    );
    // await playback.loadAsync();
    // setSound(playback);

    console.log('Playing Sound');
    await sound.playAsync();

    } catch (error) {
      console.error('an error occurred', error);
    };
  }

    // React.useEffect(() => {
    //   return playback
    //     ? () => {
    //         console.log('Unloading Sound');
    //         playback.unloadAsync(); }
    //     : undefined;
    // }, [playback]);
      
  //   myrecording.createNewLoadedSoundAsync() 

  return (
    <View style={styles.container}>
      <Button
        title={myrecording ? 'Stop Recording' : 'Start Recording'}
        onPress={myrecording ? stopRecording : startRecording}
      >
        Record
      </Button>
      <Button title="Play Sound - Rob changed" onPress={playSound} >
        Play Sound
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});




// import { StatusBar } from 'expo-status-bar';
// import React, { Component } from 'react';
// import { StyleSheet, Text, View, ImageBackground, Divider, Image, Dimensions} from 'react-native';
// import { Card, ListItem, Button, Icon, Header } from 'react-native-elements';
// import { Title } from 'react-native-paper';
// import AudioRecorderPlayer, { 
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption, 
//   AudioEncoderAndroidType,
//   AudioSet,
//   AudioSourceAndroidType, 
//  } from 'react-native-audio-recorder-player';

// // export default function App() {
// //   return (
// //     <View style={styles.container}>
// //       <Card>
// //         <Text>
// //           What's up!
// //           <Button
// //               buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
// //               title='wassup'
// //           />
// //         </Text>
// //       </Card>
// //       <Text>Open up App.js to start working on your app!</Text>
// //       <StatusBar style="auto" />
// //     </View>
// //   );
// // }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   headertext: {
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign: 'center',
//     width: Dimensions.get('window').width - 15,
//     fontSize: 36,
//   },

//   button: {
//     marginBottom: 15,
//   }

// });

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoggingIn: false,
//       recordSecs: 0,
//       recordTime: '00:00:00',
//       currentPositionSec: 0,
//       currentDurationSec: 0,
//       playTime: '00:00:00',
//       duration: '00:00:00',
//     };
//     this.audioRecorderPlayer = new AudioRecorderPlayer();
//   }

//   render () {
//     return (
//       <View>
//       <Header>
//         <Text style = {styles.headertext}>Recorder App!</Text>
//       </Header>
//         <Card style={styles.container}>
//           <Title style={{textAlign: 'center'}}> {this.state.recordTime}</Title>
//           <Button style = {styles.button} title="RECORD" mode="contained" icon="record" onPress={() => this.onStartRecord()}>
//             RECORD
//           </Button>
//           <Button  style = {styles.button} title="STOP" icon="stop" mode="outlined" onPress={() => this.onStopRecord()}>
//               STOP
//           </Button>
//             <Title style={{textAlign: 'center'}}> {this.state.playTime} / {this.state.duration}</Title>
//             <Button style = {styles.button} title="PLAY" mode="contained" icon="play" onPress={() => this.onStartPlay()}>
//               PLAY
//           </Button>
//           <Button style = {styles.button} title="PAUSE" icon="pause" mode="contained" onPress={() => this.onPausePlay()}>
//             PAUSE
//           </Button>
//           <Button style = {styles.button} title="STOP" icon="stop" mode="outlined" onPress={() => this.onStopPlay()}>
//             STOP
//           </Button>
//           <StatusBar style="auto" />
//         </Card>
//       </View>
//     )
//   }

//   onStartRecord = async () => {

//     const path = 'hello.m4a';
//     const audioSet = {
//       AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//       AudioSourceAndroid: AudioSourceAndroidType.MIC,
//       AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//       AVNumberOfChannelsKeyIOS: 2,
//       AVFormatIDKeyIOS: AVEncodingOption.aac,
//     };
//     console.log('audioSet', audioSet);
//     const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
//     this.audioRecorderPlayer.addRecordBackListener((e) => {
//       this.setState({
//         recordSecs: e.current_position,
//         recordTime: this.audioRecorderPlayer.mmssss(
//           Math.floor(e.current_position),
//         ),
//       });
//     });
//     console.log(`uri: ${uri}`);
//   };

//   onStopRecord = async () => {
//     const result = await this.audioRecorderPlayer.stopRecorder();
//     this.audioRecorderPlayer.removeRecordBackListener();
//     this.setState({
//       recordSecs: 0,
//     });
//     console.log(result);
//   };

//   onStartPlay = async (e) => {
//     console.log('onStartPlay');
//     const path = 'hello.m4a'
//     const msg = await this.audioRecorderPlayer.startPlayer(path);
//     this.audioRecorderPlayer.setVolume(1.0);
//     console.log(msg);
//     this.audioRecorderPlayer.addPlayBackListener((e) => {
//       if (e.current_position === e.duration) {
//         console.log('finished');
//         this.audioRecorderPlayer.stopPlayer();
//       }
//       this.setState({
//         currentPositionSec: e.current_position,
//         currentDurationSec: e.duration,
//         playTime: this.audioRecorderPlayer.mmssss(
//           Math.floor(e.current_position),
//         ),
//         duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
//       });
//     });
//   };

//   onPausePlay = async (e) => { 
//     await this.audioRecorderPlayer.pausePlayer();
//   };

//   onStopPlay = async (e) => {
//   console.log('onStopPlay');
//   this.audioRecorderPlayer.stopPlayer();
//   this.audioRecorderPlayer.removePlayBackListener();
//   };
// }

// export default App