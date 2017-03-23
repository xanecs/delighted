class LightBackend {
  constructor() {
  }

  onOpen() {
    console.log("Lighthouse connection established")
  }

  message(device, action, params) {
    let msg = {device: device, action: action, params: params};
    let msgString = "PUBLISH/lighthouse/"+JSON.stringify(msg);
    fetch("http://redis.fw.xanecs.me/", {
      method: "POST",
      body: msgString
    });
  }

  status(device) {
    return fetch("http://redis.fw.xanecs.me/HGETALL/lighthouse:" + device)
      .then(r => r.json())
      .then(r => r.HGETALL);
  }
}

let instance = new LightBackend();
export default instance;
