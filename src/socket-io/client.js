import io from "socket.io-client";

var socket = io("https://halfbean01.herokuapp.com");
var client = socket.on("connect", () => {});

export default client;

// export function client() {
//     var client = io("https://halfbean01.herokuapp.com");
//     return client;
// }
// var client = io("https://halfbean01.herokuapp.com");
// module.exports = { client };