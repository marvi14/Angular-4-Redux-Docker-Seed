import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import * as loginActions from '../actions/login';
import { User } from "../models/user";

/*
  From a simple array ( [] ),
  the state becomes a object where the array is contained
  withing the entities property
 */
export interface State {
  user: User
};

const initialState: State = { user: JSON.parse(localStorage.getItem('user')) || null };

export function reducer(state = initialState, action: loginActions.Actions): State {

  switch (action.type) {

    case loginActions.ActionTypes.LOG_USER: {
      return {
        user: action.payload
      };
    }

    case loginActions.ActionTypes.START_PM_LOGIN: {
      return {
        user: initialState.user
      };
    }

    case loginActions.ActionTypes.LOGOUT_USER: {
      return {
        user: null
      };
    }

    default:
      return state;
  }

};

export function getLoggedUser(state$: Observable<State>) {
  return state$.select(state => state.user);
}