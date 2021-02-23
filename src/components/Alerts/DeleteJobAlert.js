import {Alert} from 'react-native';

const deleteJobAlert = (action) =>
  Alert.alert(
    '!Atención!',
    '¿Seguro que quieres eliminar el trabajo?',
    [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Borrar', onPress: () => action()},
    ],
    {cancelable: false},
  );

const deleteTaskAlert = (action) =>
  Alert.alert(
    '!Atención!',
    '¿Vas a eliminar la tarea?',
    [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Borrar', onPress: () => action()},
    ],
    {cancelable: false},
  );

export {deleteJobAlert, deleteTaskAlert};
