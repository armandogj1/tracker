const testNotification = async () => {
  if (!Notification) return console.log('no notification');

  if (Notification.permission === 'default') {
    await Notification.requestPermission();
  }

  if (Notification.permission === 'granted') {
    new Notification('This is test');
  }
};

export { testNotification };
