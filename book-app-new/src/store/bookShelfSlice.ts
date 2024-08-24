import { createSlice } from "@reduxjs/toolkit";
import { book } from "../types";

const initialState = {
    booklist:[] as book[]
}

export const bookShelfSlice = createSlice({name: 'auth', initialState, reducers:{
    addBook: (state, action) => {state.booklist.push(action.payload.book)},
    removeBook: (state, action) => {state.booklist = state.booklist.filter((book) => {book.id !== action.payload.book.id})},
    setBookList: (state, action) =>{state.booklist = action.payload.booklist}
}})


export const {addBook, removeBook, setBookList} = bookShelfSlice.actions
export default bookShelfSlice.reducer