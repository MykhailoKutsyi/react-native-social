// // import { StatusBar } from 'expo-status-bar';
// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Storage,
//   Text,
//   View,
//   TouchableOpacity,
//   Alert,
//   ImageBackground,
//   Image,
//   TextInput,
//   Keyboard,
// } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as Location from 'expo-location';

// const initialState = {
//   photochka: '',
//   name: '',
//   location: '',
// };

// export default function CreatePostScreen({ navigation }) {
//   const [state, setState] = React.useState(initialState);

//   const [camera, setCamera] = React.useState(null);
//   const [startCamera, setStartCamera] = React.useState(false);
//   const [previewVisible, setPreviewVisible] = React.useState(false);
//   const [capturedImage, setCapturedImage] = React.useState(null);
//   const [cameraType, setCameraType] = React.useState(
//     Camera.Constants.Type.back
//   );
//   const [flashMode, setFlashMode] = React.useState('off');

//   // const _goBack = () => console.log('Went back');
//   // const _handleSearch = () => console.log('Searching');
//   // const _handleMore = () => console.log('Shown more');

//   const preStartCamera = async () => {
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     console.log(status);
//     if (status === 'granted') {
//       setStartCamera(true);
//     } else {
//       Alert.alert('Access denied');
//     }
//   };

//   const handleFlashMode = () => {
//     if (flashMode === 'on') {
//       setFlashMode('off');
//     } else if (flashMode === 'off') {
//       setFlashMode('on');
//     } else {
//       setFlashMode('auto');
//     }
//   };
//   const switchCamera = () => {
//     if (cameraType === 'back') {
//       setCameraType('front');
//     } else {
//       setCameraType('back');
//     }
//   };

//   const takePicture = async () => {
//     const { uri } = await camera.takePictureAsync();
//     console.log('uri', uri);
//     setPreviewVisible(true);
//     setCapturedImage(uri);
//   };

//   const retakePicture = () => {
//     setCapturedImage(null);
//     setPreviewVisible(false);
//     preStartCamera();
//   };

//   const savePhoto = () => {
//     // console.log('navigation', navigation);
//     // navigation.navigate('Posts', { capturedImage });
//     // console.log('capturedImage', capturedImage);
//     // retakePicture();
//     // setCapturedImage(null);
//     setStartCamera(false);
//     // setCamera(null);
//   };

//   const publishPost = () => {
//     navigation.navigate('DefaultScreen', { state, capturedImage });
//     reset();
//   };

//   const reset = () => {
//     setState(initialState);
//     setCamera(null);
//     setStartCamera(false);
//     setPreviewVisible(false);
//     setCapturedImage(null);
//   };

//   const [location, setLocation] = React.useState(null);
//   const [errorMsg, setErrorMsg] = React.useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);
//   let text = 'Waiting..';

//   if (location) {
//     console.log(location);
//     //  {"coords": {"accuracy": 48.79100036621094, "altitude": 126, "altitudeAccuracy": 1.7160584926605225, "heading": 0, "latitude": 50.4034871, "longitude": 30.635817, "speed": 0}, "mocked": false, "timestamp": 1661286663588}

//     const { latitude } = location.coords;
//     console.log('latitude', latitude);
//     const { longitude } = location.coords;
//     console.log('longitude', longitude);
//     if (errorMsg) {
//       text = errorMsg;
//     } else if (location) {
//       text = JSON.stringify(location);
//     }
//   }
//   return (
//     <View style={styles.container}>
//       {startCamera ? (
//         <View
//           style={{
//             flex: 1,
//             width: '100%',
//           }}
//         >
//           {previewVisible && capturedImage ? (
//             <CameraPreview
//               photo={capturedImage}
//               savePhoto={savePhoto}
//               retakePicture={retakePicture}
//             />
//           ) : (
//             <Camera
//               type={cameraType}
//               flashMode={flashMode}
//               style={{ flex: 1 }}
//               ref={setCamera}
//             >
//               <View
//                 style={{
//                   flex: 1,
//                   width: '100%',
//                   backgroundColor: 'transparent',
//                   flexDirection: 'row',
//                 }}
//               >
//                 <View
//                   style={{
//                     position: 'absolute',
//                     left: '5%',
//                     top: '10%',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   <TouchableOpacity
//                     onPress={handleFlashMode}
//                     style={{
//                       backgroundColor: flashMode === 'off' ? '#000' : '#fff',
//                       height: 25,
//                       width: 25,
//                       padding: 3,
//                       borderRadius: 10,
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontSize: 13,
//                       }}
//                     >
//                       ⚡
//                     </Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={switchCamera}
//                     style={{
//                       backgroundColor: '#fff',
//                       marginTop: 20,
//                       height: 25,
//                       width: 25,
//                       padding: 4,
//                       borderRadius: 10,
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontSize: 11,
//                       }}
//                     >
//                       {cameraType === 'front' ? '🤳' : '📷'}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: 0,
//                     flexDirection: 'row',
//                     flex: 1,
//                     width: '100%',
//                     padding: 20,
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   <View
//                     style={{
//                       alignSelf: 'center',
//                       flex: 1,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <TouchableOpacity
//                       onPress={takePicture}
//                       style={{
//                         width: 70,
//                         height: 70,
//                         bottom: 0,
//                         backgroundColor: '#fff',
//                         borderRadius: 100,
//                       }}
//                     />
//                   </View>
//                 </View>
//               </View>
//             </Camera>
//           )}
//         </View>
//       ) : (
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: '#fff',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <View
//             style={{
//               ...styles.form,
//               // paddingBottom: isShowKeyboard ? 40 : 144,
//             }}
//           >
//             {/* <View
//               style={{
//                 marginBottom: 10,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: 'pink',
//                 borderRadius: 10,
//               }}
//             ></View> */}
//             <TouchableOpacity
//               onPress={preStartCamera}
//               style={{
//                 // width: 130,
//                 backgroundColor: '#F6F6F6',

//                 borderColor: '#E8E8E8',
//                 borderRadius: 8,
//                 borderWidth: 1,

//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: 40,

//                 width: 343,
//                 height: 240,
//                 // backgroundColor: 'lightblue',
//               }}
//             >
//               <Image
//                 source={{ uri: capturedImage }}
//                 style={{
//                   width: 330,
//                   height: 230,
//                   borderColor: '#E8E8E8',
//                   borderRadius: 8,
//                   borderWidth: 1,
//                 }}
//               />
//               {/* <Text
//                 style={{
//                   color: '#000',
//                   fontWeight: 'bold',
//                   textAlign: 'center',
//                 }}
//               >
//                 Take picture
//               </Text> */}
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={preStartCamera}
//               style={{
//                 // width: 130,
//                 // backgroundColor: '#38738A',
//                 // borderRadius: 10,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 // height: 40,

//                 // backgroundColor: 'green',
//               }}
//             >
//               <Text
//                 style={{
//                   color: '#BDBDBD',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 Add photo
//               </Text>
//             </TouchableOpacity>
//             <View>
//               <TextInput
//                 style={styles.input}
//                 placeholder={'Name'}
//                 onSubmitEditing={Keyboard.dismiss}
//                 value={state.name}
//                 onChangeText={value =>
//                   setState(prevState => ({ ...prevState, name: value }))
//                 }
//               />
//             </View>
//             <View>
//               <TextInput
//                 style={styles.input}
//                 placeholder={'Location'}
//                 onSubmitEditing={Keyboard.dismiss}
//                 value={state.location}
//                 onChangeText={value =>
//                   setState(prevState => ({ ...prevState, location: value }))
//                 }
//               />
//             </View>
//             <View style={styles.containerLocation}>
//               <Text style={styles.paragraphLocation}>{text}</Text>
//             </View>
//             <TouchableOpacity
//               onPress={publishPost}
//               style={{
//                 width: 130,
//                 height: 40,

//                 alignItems: 'center',
//               }}
//             >
//               <Text
//                 style={{
//                   // color: '#fff',
//                   fontSize: 20,
//                 }}
//               >
//                 Publish
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {/* <StatusBar style="auto" /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
//   console.log('sdsfds', photo);
//   return (
//     <View
//       style={{
//         backgroundColor: 'transparent',
//         flex: 1,
//         width: '100%',
//         height: '100%',
//       }}
//     >
//       <ImageBackground
//         source={{ uri: photo && photo }}
//         style={{
//           flex: 1,
//         }}
//       >
//         <View
//           style={{
//             flex: 1,
//             flexDirection: 'column',
//             padding: 15,
//             justifyContent: 'flex-end',
//           }}
//         >
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//             }}
//           >
//             <TouchableOpacity
//               onPress={retakePicture}
//               style={{
//                 width: 130,
//                 height: 40,

//                 alignItems: 'center',
//               }}
//             >
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: 20,
//                 }}
//               >
//                 Re-take
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={savePhoto}
//               style={{
//                 width: 130,
//                 height: 40,

//                 alignItems: 'center',
//               }}
//             >
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: 20,
//                 }}
//               >
//                 Save photo
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CommentsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommentsScreen;
