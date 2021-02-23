import React, {useContext} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import {Button} from 'react-native-elements';

import Accordian from '../../../components/Elements/Accordian';
import InputGroup from '../../../components/Elements/InputGroup';
import DynamicSelectorList from '../../../components/DynamicSelectorList';
import PrioritySelector from '../../../components/Elements/PrioritySelector';

// Context
import {Context} from '../../../store/jobFormStore';

// Utils
import {parsePriority} from '../../../utils/parsers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
  subtitle: {
    color: '#2A7BA5',
  },
  tasksContainer: {
    flex: 1,
  },
  tasksTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  addEditButton: {
    textAlign: 'right',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F8AA3',
  },
});

const NewEditTask = ({onSubmit, onEdit}) => {
  const [state, dispatch] = useContext(Context);

  return (
    <View style={{marginBottom: 20}}>
      <InputGroup>
        <TextInput
          style={{height: 40}}
          placeholder="Tarea"
          onChangeText={(text) =>
            dispatch({
              type: 'SET_FORM',
              label: 'taskName',
              payload: text,
            })
          }
          value={state?.job?.taskName}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Descripción"
          onChangeText={(text) =>
            dispatch({
              type: 'SET_FORM',
              label: 'taskDescription',
              payload: text,
            })
          }
          value={state?.job?.taskDescription}
        />
      </InputGroup>
      <InputGroup>
        <Accordian
          title="Asignar a..."
          subtitle={
            <View style={{flexDirection: 'row'}}>
              {state?.job?.taskWorkers?.value?.map((worker, i) => (
                <View key={i}>
                  <Text style={styles.subtitle}>{worker.firstName}</Text>
                  {state?.job?.taskWorkers?.value?.length - 1 !== i && (
                    <Text style={styles.subtitle}> & </Text>
                  )}
                </View>
              ))}
            </View>
          }
          switcher={state?.job?.taskWorkers?.switch}
          iconProps={{name: 'person', color: '#55A5AD'}}
          onOpen={() =>
            dispatch({
              type: 'SET_FORM',
              label: 'taskWorkers',
              payload: {value: [], switch: true},
            })
          }
          onClose={() =>
            dispatch({
              type: 'SET_FORM',
              label: 'taskWorkers',
              payload: {value: undefined, switch: false},
            })
          }>
          <View style={styles.asignList}>
            <DynamicSelectorList
              collection="users"
              searchBy="firstName"
              schema={{img: 'profileImage', name: 'firstName'}}
              get={state?.job?.taskWorkers?.value || []}
              set={(workers) => {
                dispatch({
                  type: 'SET_FORM',
                  label: 'taskWorkers',
                  payload: {...state.job.taskWorkers, value: workers},
                });
              }}
              multiple={true}
            />
          </View>
        </Accordian>
      </InputGroup>
      <InputGroup>
        <Accordian
          title="Prioridad"
          subtitle={[
            <Text style={styles.subtitle}>
              {parsePriority(state?.job?.taskPriority?.value)}
            </Text>,
          ]}
          switcher={state?.job?.taskPriority?.switch}
          iconProps={{name: 'house', color: '#55A5AD'}}
          onOpen={() =>
            dispatch({
              type: 'SET_FORM',
              label: 'taskPriority',
              payload: {value: undefined, switch: true},
            })
          }
          onClose={() =>
            dispatch({
              type: 'SET_FORM',
              label: 'taskPriority',
              payload: {value: undefined, switch: false},
            })
          }>
          <PrioritySelector
            get={state?.job?.taskPriority?.value || []}
            set={(priority) => {
              dispatch({
                type: 'SET_FORM',
                label: 'taskPriority',
                payload: {...state.job.taskPriority, value: priority},
              });
            }}
          />
        </Accordian>
      </InputGroup>
      <Text
        style={styles.addEditButton}
        onPress={state.job.mode === 'new' ? onSubmit : onEdit}>
        {state.job.mode === 'new' ? 'Añadir' : 'Editar'}
      </Text>
    </View>
  );
};

export default NewEditTask;
