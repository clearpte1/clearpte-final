import React, {Dispatch } from 'react';

// Define the shape of your state
interface State {
  count: number;
  isLoggedIn: boolean;
}

// Define the shape of your actions
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'IsLoggedIn' };

// Define the initial state
export const initialState: State = {
  count: 0,
  isLoggedIn: false,
};

// Create a reducer function
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'IsLoggedIn':
      return {...state, isLoggedIn: state.isLoggedIn };
    default:
      return state;
  }
};

// Create the context
const GlobalStateContext = React.createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});


export { GlobalStateContext};