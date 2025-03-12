import { Effect, Reducer, RequestError } from "@umijs/max";
import services from '@/services';
import { notification } from "antd";

const { getUsers, addUser, updateUser, deleteUser } = services.Users;

export interface UserState {
  list: UserTyping.UserInfo[];
}

export interface UserModelType {
  namespace: 'user',
  state: UserState,
  effects: {
    fetchUsers: Effect,
    addUser: Effect,
    updateUser: Effect,
    deleteUser: Effect
  },
  reducers: {
    queryUser: Reducer<UserState>,
    add: Reducer<UserState>,
    update: Reducer<UserState>,
    delete: Reducer<UserState>
  }
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    list: []
  },
  effects: {
    *fetchUsers(_, {call, put}) {
      const data: UserTyping.UserInfo[] = yield call(getUsers);
      yield put({ type: 'queryUser', payload: data });
    },

    *addUser({payload}, {call, put}) {
      try {
        const data: UserTyping.UserInfo = yield call(addUser, payload);
        yield put({ type: 'add', payload: data });
      } catch (error: RequestError | any) {
        throw error;
      }
    },

    *updateUser({ payload: {id, body} }, {call, put}) {
      try {
        const updatedData: UserTyping.UserInfo = yield call(updateUser, id, body);
        yield put({ type: 'update', payload: updatedData });
      } catch (error: RequestError | any) {
        const message = error?.response?.data?.error?.message || error?.response?.data || error?.message;
        notification.error(message || 'Unknown Error!');
      }
    },

    *deleteUser({payload: id}, {call, put}) {
      try {
        yield call(deleteUser, id);
        yield put({ type: 'delete', payload: id });
      } catch (error: RequestError | any) {
        const message = error?.response?.data?.error?.message || error?.response?.data || error?.message;
        notification.error(message || 'Unknown Error!');
      }
    }
  },
  reducers: {
    queryUser(state, {payload}) {
      return { 
        ...state, 
        list: payload 
      };
    },

    add(state, {payload}) {
      return { 
        ...state, 
        list: state.list.concat(payload) 
      }
    },

    update(state, {payload: updatedData}) {
      const list = state.list.map(el => {
        if(el.id == updatedData.id) {
          return updatedData;
        }
        else {
          return el;
        }
      });

      return {
        ...state,
        list
      }
    },

    delete(state, {payload: id}) {
      const list = state.list.filter(el => el.id != id);

      return {
        ...state,
        list
      }
    }
  }
}

export default UserModel