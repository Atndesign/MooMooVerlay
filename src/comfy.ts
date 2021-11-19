// var viewersJson = {
//   viewers: [{}],
// };
// ComfyJS.onCommand = (user, command, message, flags, extra) => {
//   if (command === "play") {
//     var canSpawn = true;
//     if (viewersJson.viewers.length < 1) {
//       //   playScene.createViewer();
//       viewersJson.viewers.push({ name: user });
//       return;
//     }
//     viewersJson.viewers.forEach((element) => {
//       if (element.name == user) {
//         canSpawn = false;
//         return;
//       }
//     });
//     if (canSpawn) {
//       //   playScene.createViewer();
//       viewersJson.viewers.push({ name: user });
//     }
//   }
// };
// function getUrlVars() {
//   var vars = {};
//   var parts = window.location.href.replace(
//     /[?&]+([^=&]+)=([^&]*)/gi,
//     function (m, key, value) {
//       vars[key] = value;
//     }
//   );
//   return vars;
// }
