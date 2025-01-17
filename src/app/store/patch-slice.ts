import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export enum PatchStatus {
  ACCEPTED,
  REJECTED,
  NOTAPPLICABLE
}

export type PatchData = {
  op:string,
  path:string,
  //TODO
  value:any,
} 

export type Patch = {
  data:PatchData,
  status: PatchStatus
}

export type PatchState = {
  patches: Patch[],
  selectedIndex: number | null
}

const initialState: PatchState = {
  patches: [],
  selectedIndex:null
}

export const patchSlice = createSlice({
  name: 'patches',
  initialState,
  reducers: {
    savePatches: (state, action: PayloadAction<Patch[]>) => {
      state.patches = action.payload;
    },
    setStatus:(state, action: PayloadAction<{index:number, status:PatchStatus}>) => {
      state.patches[action.payload.index].status = action.payload.status;
    },
    setSelectedIndex:(state, action:PayloadAction<number>) => {
      state.selectedIndex = action.payload
    },
    deletePatch:(state, action:PayloadAction<number>) => {
      state.patches = state.patches.filter((_, index) => index !== action.payload );
    }
  }
});

export const { savePatches,setStatus,setSelectedIndex,deletePatch } = patchSlice.actions;
export default patchSlice.reducer

