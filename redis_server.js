// const redis = require("redis");

// const { promisifyAll } = require("bluebird");

// promisifyAll(redis);

// const redisClient = async () => {
//   const client = redis.createClient({ host: "192.168.20.1", port: "6397" });
//   client.connect();

//   const setAsync = promisify(client.set).bind(client);
//   const getAsync = promisify(client.get).bind(client);
//   // await client.set("name", "reza");
//   // const fooValue = await client.get("name");
//   // console.log(fooValue);
// };

// module.exports = redisClient;

class redis_server {
  redisConnect() {
    const redis = require("redis");

    const redisClient = redis.createClient({
      host: "192.168.20.1",
      port: "6397",
    });

    redisClient.connect();

    redisClient.on("error", (err) => {
      console.log("Error " + err);
    });

    return redisClient;
  }

  setData(key, value) {
    var redisClient = this.redisConnect();
    redisClient.set(key, value);
  }

  getData(key) {
    var redisClient = this.redisConnect();
    var result = redisClient.get(key);
    return result;
  }
}

module.exports = redis_server;
