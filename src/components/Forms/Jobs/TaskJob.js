import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';

import {Button} from 'react-native-elements';

import Accordian from '../../../components/Elements/Accordian';
import InputGroup from '../../../components/Elements/InputGroup';
import DynamicSelectorList from '../../../components/DynamicSelectorList';
import PrioritySelector from '../../../components/Elements/PrioritySelector';

// Context
import {Context} from '../../../store/jobFormStore';

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
});

const TaskForm = () => {
  const [state, dispatch] = useContext(Context);

  const addTask = () => {
    const task = {
      name: state?.job?.taskName,
      description: state?.job?.taskDescription,
      workers: state?.job?.taskWorkers,
    };
    dispatch({
      type: 'ADD_TASK',
      label: 'tasks',
      payload: task,
    });
  };

  const cleanTask = () => {
    dispatch({
      type: 'RESET_TASK',
      label: 'tasks',
    });
  };

  const handleSubmit = () => {
    addTask();
    cleanTask();
  };

  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
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
                    <React.Fragment>
                      <Text style={styles.subtitle}>{worker.firstName}</Text>
                      {state?.job?.taskWorkers?.value?.length - 1 !== i && (
                        <Text style={styles.subtitle}> & </Text>
                      )}
                    </React.Fragment>
                  ))}
                </View>
              }
              switcher={state?.job?.taskWorkers?.switch}
              iconProps={{name: 'person', color: 'blue'}}
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
              iconProps={{name: 'house', color: 'black'}}
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
          <Button onPress={handleSubmit} title="Guardar" />
        </ScrollView>
      </View>
      <Text style={styles.tasksTitle}>Tareas</Text>
      <View style={styles.tasksContainer}>
        <ScrollView>
          {state?.job?.tasks?.map((task) => (
            <Text>{task.name}</Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default TaskForm;
