/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// {
//     "success": true,
//     "message": "Successfully logged in as an instructor",
//     "data": {
//         "_id": "65548eb148eb1e2381764768",
//         "email": "kisuke.urahara@gmail.com",
//         "role": "instructor",
//         "verified": false,
//         "instructor": {
//             "_id": "65548eb148eb1e2381764766",
//             "name": "Kisuke Urahara",
//             "verified": false,
//             "phone": "+8801999999999",
//             "uploadedCourses": [],
//             "favourites": [],
//             "role": "instructor",
//             "location": {
//                 "city": "dhaka",
//                 "country": "Bangladesh"
//             }
//         },
//         "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTU0OGViMTQ4ZWIxZTIzODE3NjQ3NjgiLCJlbWFpbCI6Imtpc3VrZS51cmFoYXJhQGdtYWlsLmNvbSIsImluc3RydWN0b3IiOnsiX2lkIjoiNjU1NDhlYjE0OGViMWUyMzgxNzY0NzY2IiwibmFtZSI6Iktpc3VrZSBVcmFoYXJhIiwidmVyaWZpZWQiOmZhbHNlLCJwaG9uZSI6Iis4ODAxOTk5OTk5OTk5IiwidXBsb2FkZWRDb3Vyc2VzIjpbXSwiZmF2b3VyaXRlcyI6W10sInJvbGUiOiJpbnN0cnVjdG9yIiwibG9jYXRpb24iOnsiY2l0eSI6ImRoYWthIiwiY291bnRyeSI6IkJhbmdsYWRlc2gifX0sInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzAwODAzNjcxLCJleHAiOjE3MDE0MDg0NzF9.VBL3TLMxJYFRTaW48cSHrCQiuNn-bLZXCkpY676PWcE",
//         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTU0OGViMTQ4ZWIxZTIzODE3NjQ3NjgiLCJlbWFpbCI6Imtpc3VrZS51cmFoYXJhQGdtYWlsLmNvbSIsImluc3RydWN0b3IiOnsiX2lkIjoiNjU1NDhlYjE0OGViMWUyMzgxNzY0NzY2IiwibmFtZSI6Iktpc3VrZSBVcmFoYXJhIiwidmVyaWZpZWQiOmZhbHNlLCJwaG9uZSI6Iis4ODAxOTk5OTk5OTk5IiwidXBsb2FkZWRDb3Vyc2VzIjpbXSwiZmF2b3VyaXRlcyI6W10sInJvbGUiOiJpbnN0cnVjdG9yIiwibG9jYXRpb24iOnsiY2l0eSI6ImRoYWthIiwiY291bnRyeSI6IkJhbmdsYWRlc2gifX0sInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzAwODAzNjcxLCJleHAiOjE3MDA4OTAwNzF9.vLNwUdl-CJOnjmEZJuASq68fPfVRoYXF2ZpKaMXSk_c"
//     }
// }

// Learner response
// {
//     "success": true,
//     "message": "Successfully logged in as a learner",
//     "data": {
//         "_id": "655d83c89f4dba525071eef0",
//         "email": "arafatlearner@gmail.com",
//         "role": "learner",
//         "verified": false, 
//         "learner": {
//             "_id": "655d83c89f4dba525071eeee",
//             "name": "arafat",
//             "verified": false,
//             "phone": "01999999999",
//             "enrolledCourses": [],
//             "cart": [],
//             "courseProgress": [],
//             "wishlist": [],
//             "reviews": [],
//             "favourites": [],
//             "role": "learner"
//         },
//         "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTVkODNjODlmNGRiYTUyNTA3MWVlZjAiLCJlbWFpbCI6ImFyYWZhdGxlYXJuZXJAZ21haWwuY29tIiwibGVhcm5lciI6eyJfaWQiOiI2NTVkODNjODlmNGRiYTUyNTA3MWVlZWUiLCJuYW1lIjoiYXJhZmF0IiwidmVyaWZpZWQiOmZhbHNlLCJwaG9uZSI6IjAxOTk5OTk5OTk5IiwiZW5yb2xsZWRDb3Vyc2VzIjpbXSwiY2FydCI6W10sImNvdXJzZVByb2dyZXNzIjpbXSwid2lzaGxpc3QiOltdLCJyZXZpZXdzIjpbXSwiZmF2b3VyaXRlcyI6W10sInJvbGUiOiJsZWFybmVyIn0sInJvbGUiOiJsZWFybmVyIiwiaWF0IjoxNzAwODAyMDYxLCJleHAiOjE3MDE0MDY4NjF9.aPejkDk3zCTjbXCZ2poPaE7xfvmqJMm7vANE7TdWZjo",
//         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTVkODNjODlmNGRiYTUyNTA3MWVlZjAiLCJlbWFpbCI6ImFyYWZhdGxlYXJuZXJAZ21haWwuY29tIiwibGVhcm5lciI6eyJfaWQiOiI2NTVkODNjODlmNGRiYTUyNTA3MWVlZWUiLCJuYW1lIjoiYXJhZmF0IiwidmVyaWZpZWQiOmZhbHNlLCJwaG9uZSI6IjAxOTk5OTk5OTk5IiwiZW5yb2xsZWRDb3Vyc2VzIjpbXSwiY2FydCI6W10sImNvdXJzZVByb2dyZXNzIjpbXSwid2lzaGxpc3QiOltdLCJyZXZpZXdzIjpbXSwiZmF2b3VyaXRlcyI6W10sInJvbGUiOiJsZWFybmVyIn0sInJvbGUiOiJsZWFybmVyIiwiaWF0IjoxNzAwODAyMDYxLCJleHAiOjE3MDA4ODg0NjF9.Z43DxnKEC4aLOOGzonvTEB-wTNaBKhKF9-8J0YBi5s8"
//     }
// }

interface AuthState {
    _id: string | null;
    email: string | null;
    role: string | null;
    verified: false | null;
    token: string | null;
    // user: {
    //     _id: string | null;
    //     name: string | null;
    //     phone: string | null;
    //     // verified: boolean | null;
    // };
    learner?:  {
        _id: string,
        name: string,
        verified: false,
        phone: string,
        enrolledCourses: any[],
        cart: any[],
        courseProgress: any[],
        wishlist: any[],
        reviews: any[],
        favourites: any[],
        role: string
    },
    instructor?: {
        _id: string,
        name: string,
        verified: false,
        phone: string,
        uploadedCourses: any[],
        favourites: any[],
        role: string,
        location: {
            city: string,
            country: string
        }
    },
    admin?:any
}
export interface IAuthState {
    auth: any;
}

const initialState: AuthState = {
    _id: null,
    email: null,
    role: null,
    verified: null,
    token: null,
    instructor: undefined,
    learner: undefined
    // user: {
    //     _id: null,
    //     name: null,
    //     phone: null,
    // },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveLogin: (state, action: PayloadAction<AuthState>) => {
            console.log(action)
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.token = action.payload.token;
            state.verified = action.payload.verified;
            if(action.payload.learner) {
                state.learner = action.payload.learner
            } else if(action.payload.instructor){
                state.instructor = action.payload.instructor
            } else {
                state.admin = action.payload.admin
            }
        },
        removeLogin: (state) => {
            // console.log(action)
            state._id = null;
            state.email = null;
            state.role = null;
            state.token = null;
            state.verified = null;
            state.learner = undefined
            state.instructor = undefined
            state.admin = undefined
            // if(action.payload.learner) {
            // } else if(action.payload.instructor){
            // } else {
            // }
        },
    },
});

export const { saveLogin,removeLogin } = authSlice.actions;
export default authSlice.reducer;
