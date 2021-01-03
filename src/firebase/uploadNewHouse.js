//Firebase
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export const uploadHouseImage = async (houseUID, imageName, uploadUri) => {
  try {
    await storage().ref(`/${houseUID}/${imageName}`).putFile(uploadUri);
    const url = await storage()
      .ref(`/${houseUID}/${imageName}`)
      .getDownloadURL();
    return url;
  } catch (err) {
    console.log(err);
  }
};

export const newHouse = async (data, houseImage, userUID) => {
  try {
    const house = await firestore().collection('houses').add(data);
    const uploadImage = await uploadHouseImage(
      house.id,
      houseImage.fileName,
      houseImage.fileUri,
    );
    await firestore()
      .collection('houses')
      .doc(house.id)
      .update({houseImage: uploadImage});
  } catch (err) {
    console.log(err);
  }
};
