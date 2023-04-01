const fs = require("fs");
const axios = require("axios");
let rawdata = fs.readFileSync("requestsTest.json");
let data = JSON.parse(rawdata);

const requests = data.map((req) =>
  axios.post("http://localhost:8000/api/appointment/addAppointment", req)
);

// make concurrent api calls
// const requests = data.map((req) =>
//   axios.post("http://localhost:8000/addAppointment", { req })
// );

// try {
//   // wait until all the api calls resolves
//   const result = await Promise.all(requests);

//   // posts are ready. accumulate all the posts without duplicates
//   result.map((item) => {
//     posts = addNewPosts(posts, item.data.posts);
//   });
// } catch (err) {
//   res.status(500).json({ error: String(err) });
// }

// return res.send({ posts: posts });
