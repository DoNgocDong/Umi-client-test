import { Effect, Reducer } from "@umijs/max";
import services from '@/services';

const { getPagination, create, updateById, deleteByIds } = services.Branch;

export interface BranchState {
  list: BranchTyping.BranchInfo[];
}

export interface BranchModelType {
  namespace: 'branchs',
  state: BranchState,
  effects: {
    fetchBranchs: Effect,
  },
  reducers: {
    saveBranchs: Reducer<BranchState>,
  }
}

const BranchModel: BranchModelType = {
  namespace: 'branchs',
  state: {
    list: []
  },
  effects: {
    *fetchBranchs({payload}, {call, put}) {
      const data: BranchTyping.BranchInfo[] = yield call(getPagination, payload);
      yield put({ type: 'saveBranchs', payload: data });
    }
  },
  reducers: {
    saveBranchs(state: BranchState, { payload }) {
      return { ...state, list: payload };
    }
  }
}

export default BranchModel;