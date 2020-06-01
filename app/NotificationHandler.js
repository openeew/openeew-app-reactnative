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

import firebase from "react-native-firebase";

export function checkNotificationPermission() {
  firebase
    .messaging()
    .hasPermission()
    .then((enabled) => {
      if (!enabled) {
        firebase.messaging().requestPermission();
      }
    });
}

export function createChannel() {
  const channel = new firebase.notifications.Android.Channel(
    "grilo_earthquake_app_channel",
    "grilo_earthquake_app_channel",
    firebase.notifications.Android.Importance.Max
  )
    .setSound("notification.wav")
    .setDescription("Grilo earthquake app channel");
  firebase.notifications().android.createChannel(channel);
}

export const notification = firebase.notifications();

export function displayNotification(notification) {
  let _notification = new firebase.notifications.Notification()
    .setNotificationId(notification.notificationId)
    .setTitle(notification.title)
    .setBody(notification.body)
    .setSound(notification.sound || notification.ios.sound)
    .setData(notification.data)
    .android.setLargeIcon(notification.largeIcon)
    .android.setChannelId("grilo_earthquake_app_channel")
    .android.setPriority(firebase.notifications.Android.Priority.Max);
  firebase.notifications().displayNotification(_notification);
}
