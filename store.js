import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from "firebase";
import TaskData from './components/TaskData';

var firebaseConfig = {
    apiKey: "AIzaSyBggheccil0UrV0ruYodT-RVSm937QRO9c",
    authDomain: "fireworksdb-851f6.firebaseapp.com",
    databaseURL: "https://fireworksdb-851f6-default-rtdb.firebaseio.com",
    projectId: "fireworksdb-851f6",
    storageBucket: "fireworksdb-851f6.appspot.com",
    messagingSenderId: "629832586969",
    appId: "1:629832586969:web:a7ea71450455b0001cd0c8",
    measurementId: "G-T2HJDP5WZX"
  };

  var fireapp;
  try
  {
      fireapp=firebase.initializeApp(firebaseConfig);
  }
  catch(e)
  {
      console.log(e.message);
  }

  const initial={
    login:false,
    username:"sign in",
    email:"",
    isExistUpdate:false,
  };

  function fireReducer(state=initial ,action)
  {
      switch(action.type)
      {
            case "UPDATE_USER_INFO":
                return Object.assign({},state,{
                    login:action.value.login,
                    username:action.value.username,
                    email:action.value.email,
                    isExistUpdate:action.value.isExistUpdate,
                });
        default:
            return state;
      }
  }

  export function initStore(state=initial)
  {
      return createStore(fireReducer,state,applyMiddleware(thunkMiddleware));
  }
