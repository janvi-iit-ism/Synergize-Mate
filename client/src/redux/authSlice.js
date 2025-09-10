import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        allUsers:[],
        searchedQuery:'',
        singleUser: null,
        searchUserByText:"",
    },
    reducers:{
        // actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
        },
        setAllUsers:(state, action) => {
            state.allUsers = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
        setSingleUser:(state, action)=>{
            state.singleUser = action.payload;
        },
        setSearchUserByText:(state,action) => {
            state.searchUserByText = action.payload;
        },
    }
});
export const {
    setLoading, 
    setUser, 
    setAllUsers,
    setSearchedQuery,
    setSingleUser,
    setSearchUserByText,
} = authSlice.actions;
export default authSlice.reducer;