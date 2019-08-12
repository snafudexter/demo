console.log("Service Worker Loaded...");
console.log('my service worker')
self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification("Blaze", {
    body: data.title,
    icon: "/favicon.ico"
  });
});
