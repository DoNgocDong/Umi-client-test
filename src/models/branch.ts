import { Effect, Reducer, RequestError } from "@umijs/max";
import services from '@/services';
import { notification } from "antd";
import { PageData, ResponseDTO } from "@/dtos/response";

const { getPagination, create, updateById, deleteByIds } = services.Branch;

export interface BranchState {
  list: BranchTyping.BranchInfo[];
  total: number;
}

export interface BranchModelType {
  namespace: 'branch',
  state: BranchState,
  effects: {
    fetchBranchs: Effect,
    addBranch: Effect,
    updateBranch: Effect,
    deleteBranchs: Effect
  },
  reducers: {
    queryBranchs: Reducer<BranchState>,
    add: Reducer<BranchState>,
    update: Reducer<BranchState>,
    delete: Reducer<BranchState>
  }
}

const BranchModel: BranchModelType = {
  namespace: 'branch',
  state: {
    list: [],
    total: 0
  },
  effects: {
    *fetchBranchs({payload}, {call, put}) {
      const {data}: {data: PageData<BranchTyping.BranchInfo[]>} = yield call(getPagination, payload);
      const {list_data, total} = data;
      console.log(list_data);
      yield put({ type: 'queryBranchs', payload: {list: list_data, total} });
    },

    *addBranch({payload}, {call, put}) {
      try {
        const {data}: ResponseDTO<BranchTyping.BranchInfo> = yield call(create, payload);
        yield put({ type: 'add', payload: data });
      } catch (error: RequestError | any) {
        throw error;
      }
    },

    *updateBranch({ payload: {id, body} }, {call, put}) {
      try {
        const {data}: ResponseDTO<BranchTyping.BranchInfo> = yield call(updateById, id, body);
        yield put({ type: 'update', payload: data });
      } catch (error: RequestError | any) {
        const message = error?.response?.data?.error?.message || error?.response?.data || error?.message;
        notification.error(message || 'Unknown Error!');
      }
    },

    *deleteBranchs({payload: ids}, {call, put}) {
      try {
        yield call(deleteByIds, ids);
        yield put({ type: 'delete', payload: ids });
      } catch (error: RequestError | any) {
        const message = error?.response?.data?.error?.message || error?.response?.data || error?.message;
        notification.error(message || 'Unknown Error!');
      }
    }
  },
  reducers: {
    queryBranchs(state, { payload }) {
      return { 
        ...state, 
        ...payload
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
        if(el.branchId == updatedData.branchId) {
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

    delete(state, {payload: ids}) {
      const list = state.list.filter(el => !ids.includes(el.branchId));

      return {
        ...state,
        list
      }
    }
  }
}

export default BranchModel;