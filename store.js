import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from "firebase";
import TaskData from './components/TaskData';

var firebaseConfig = {
    apiKey: "AIzaSyCwWOFzhoK7ab1QPk6UMxEu24WVvF4WDps",
    authDomain: "address-react-4353b.firebaseapp.com",
    databaseURL: "https://address-react-4353b-default-rtdb.firebaseio.com",
    projectId: "address-react-4353b",
    storageBucket: "address-react-4353b.appspot.com",
    messagingSenderId: "1038016313176",
    appId: "1:1038016313176:web:f0cd5418d2f2041524d72d"
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
    workdataList:[],
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
                });
            case "ADD_WORKDATA":
                return Object.assign({},state,{
                    workdataList:[
                        ...state.workdataList,
                        action.workdata,
                    ]
                });
        default:
            return state;
      }
  }

  export function initStore(state=initial)
  {
      return createStore(fireReducer,state,applyMiddleware(thunkMiddleware));
  }
