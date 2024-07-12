import {createSlice} from '@reduxjs/toolkit';

const BoardAssessmentSlice = createSlice({
  name: 'boardAssessment',
  initialState: {
    onBoarding: false,
    Assessment: false,
  },
  reducers: {
    changeonBoarding: state => {
      state.onBoarding = true;
    },
    changeAssessment: state => {
      state.Assessment = true;
    },
  },
});

export const {changeonBoarding, changeAssessment} =
  BoardAssessmentSlice.actions;
export default BoardAssessmentSlice.reducer;
