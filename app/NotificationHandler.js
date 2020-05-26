import firebase from 'react-native-firebase';

export function checkNotificationPermission() {
  firebase.messaging().hasPermission()
    .then(enabled => {
      if (!enabled) {
        firebase.messaging().requestPermission();
      }
    });
}

export function createChannel() {
  const channel = new firebase
    .notifications.Android.Channel(
      'grilo_earthquake_app_channel',
      'grilo_earthquake_app_channel',
      firebase.notifications.Android.Importance.Max
  )
    .setSound('notification.wav')
    .setDescription('Grilo earthquake app channel');
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
    .android.setChannelId('grilo_earthquake_app_channel')
    .android.setPriority(firebase.notifications.Android.Priority.Max)
  firebase.notifications().displayNotification(_notification);
}
