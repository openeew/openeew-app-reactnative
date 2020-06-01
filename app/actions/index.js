//=============================================================================
// Copyright Grillo Holdings Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// =============================================================================

import types from "./types";
import * as api from "../endpoint/api";

const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const initAuth = () => ({
  type: types.INIT_AUTH,
});

export const valueChanged = (payload) => ({
  type: types.VALUE_CHANGE,
  payload,
});

export const validator = (values) => (dispatch) => {
  //Init values.
  let error = Object.assign({}, values);
  //Check all fields state (empty or !empty).
  for (key in error) {
    if (values[key] === "") {
      error[key] = true;
    } else {
      error[key] = false;
    }
  }

  if (values.password !== undefined) {
    error.password = values.password.length < 6;
  }

  if (values.email !== undefined) {
    error.email = !emailRegx.test(values.email);
  }

  return new Promise((resolve) => {
    dispatch({
      type: types.FORM_ERROR,
      payload: error,
    });

    for (key in error) {
      if (error[key]) {
        switch (key) {
          case "name":
            resolve("¡Por favor ingrese un nombre valido!");
          case "email":
            resolve(
              "¡Por favor introduzca una dirección de correo electrónico válida!"
            );
          case "password":
            resolve("¡La contraseña debe contener al menos 6 caracteres!");
          default:
            resolve("Todos los campos deben ser válidos!");
        }
      }
    }
    resolve(null);
  });
};

export const toggleSubscription = (topicName, subscribeToTopic) => {
  return (dispatch) => {
    dispatch(topicSubscription());

    return api
      .toggleSubscription(topicName, subscribeToTopic)
      .then(() => {
        setTimeout(() => {
          dispatch(topicSubscriptionSuccess({ [topicName]: subscribeToTopic }));
        }, 2000);
      })
      .catch(() => dispatch(topicSubscriptionFail()));
  };
};
const topicSubscription = () => ({
  type: types.TOPIC_SUBSCRIPTION_LOADING,
});
const topicSubscriptionSuccess = (payload) => ({
  type: types.TOPIC_SUBSCRIPTION_SUCCESS,
  payload,
});
const topicSubscriptionFail = (payload) => ({
  type: types.TOPIC_SUBSCRIPTION_FAIL,
  payload,
});

export const getHistoricalEarthquakes = () => {
  return (dispatch) => {
    dispatch({ type: types.GET_HISTORICAL_DATA });
    return api
      .getHistoricalEarthquakes()
      .onSnapshot((data) =>
        dispatch({
          type: types.GET_HISTORICAL_DATA_SUCCESS,
          payload: data.docs,
        })
      );
  };
};

export function getSubscribeTopics() {
  return (dispatch) => {
    dispatch({ type: types.GET_SUBSCRIBED_TOPICS });
    api.getSubscribeTopics().then((data) => {
      return dispatch({
        type: types.GET_SUBSCRIBED_TOPICS_SUCCESS,
        payload: data,
      });
    });
  };
}
