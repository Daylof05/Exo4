import { launchImageLibrary, Asset, ImagePickerResponse } from "react-native-image-picker";
// import { PermissionsAndroid, Platform, View } from 'react-native';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import {Button, Text, View} from 'react-native';

// const requestGalleryPermission = async () => {
//   if (Platform.OS === 'android') {
//     const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
//     if (result === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('Permission accordée');
//     } else {
//       console.log ('Permssion refusée');
//     }
//   }
// }

const uploadImage = async (imageUri : any) => {
  const formData = new FormData();
 const CLIENT_ID = "5195104fbb06fcf"
  formData.append('image', {
    uri: imageUri.uri,
    type: 'image/jpg',
    name: 'image.jpg',
  });
  try {
    console.log(imageUri)
    const response = await fetch ('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Client-ID ${CLIENT_ID}`,
      },
      body: formData,
    })
    console.log(response)
    if (response.ok) {
      const result = await response.json();
      console.log(result.data.link)
      console.log('success')
      return result.data.link;
    }else {
      console.log('Fail');
    }
  } catch (error) {
    console.error(error);
  }
};

const selectImage = async () => {
  launchImageLibrary({mediaType: 'photo' }, (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log ('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const firstAsset: Asset = response.assets[0];
      const source = { uri: firstAsset.uri };
      console.log(source);
      uploadImage(source);
    }
  })
}

const App = () => {
  // requestGalleryPermission;
  return(
    <View>
      <Text>Sélectionner une image à upload</Text>
      <Button
        title="Upload Image"
        onPress={selectImage}
      />
    </View>
  )
}

export default App;