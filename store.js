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
  var initialdate=new Date();
  const initialtask=new TaskData(initialdate,initialdate,[],"");

  function fireReducer(state=initialtask ,action)
  {
      switch(action.type)
      {
          case "UPDATE_USER":
              return action.value;
        default:
            return state;
      }
  }

  export function initStore(state=initialtask)
  {
      return createStore(fireReducer,state,applyMiddleware(thunkMiddleware));
  }
