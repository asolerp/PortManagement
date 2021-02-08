import React, {cloneElement} from 'react';
import {JobFormState} from './counter';

const providers = [<JobFormState.Provider />];

const Store = ({children: initial}) =>
  providers.reduce(
    (children, parent) => cloneElement(parent, {children}),
    initial,
  );

export {Store, JobFormState};
