/**
 * fetch post image
 * @param image
 * @param fileName
 * @param route
 * @param callback
 */
const fetchPatchImage = (image, fileName, route, callback) => {
  var fd = new FormData();
  fd.append(fileName, image);
  fetch(route, {
    method: "PATCH",
    body: fd,
    // mode: "cors",
  })
    .then(async (response) => {
      if (response.status === 500) {
        let responseText = await response.text();
        throw new Error(responseText);
      }
      return response.text();
    })
    .then((img) => {
      callback(URL.createObjectURL(image));
      console.log(img + "posted to server");
    })
    .catch((err) => {
      console.log(err);
    });
};
/**
 * fetch patch multi
 * @param data ex: {image: imageFile, name: "Dashie"}
 * @param route
 * @param callback
 */
const fetchPatchMulti = (data, route, callback) => {
  const fd = new FormData();
  const dataArray = Object.entries(data);
  dataArray.forEach((datum) => fd.append(datum[0], datum[1]));
  fetch(route, {
    method: "PATCH",
    body: fd,
    // mode: "cors",
  })
    .then(async (response) => {
      if (response.status === 500) {
        let responseText = await response.text();
        throw new Error(responseText);
      }
      return response.text();
    })
    .then((res) => {
      console.log(res);
      callback(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * fetch detete
 * @param route
 * @param callback
 */
const fetchDelete = (route, callback) => {
  fetch(route, {
    method: "DELETE",
  })
    .then(async (response) => {
      if (response.status === 500) {
        let responseText = await response.text();
        throw new Error(responseText);
      }
      return response.text();
    })
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * fetch post json
 * @param data
 * @param route
 * @param callbacks
 */
const fetchPostJson = async (data, route, callback) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  await fetch(route, {
    method: "POST",
    body: JSON.stringify(data),
    headers,
  })
    .then(async (res) => {
      if (res.status === 500) throw new Error(await res.text());
      return res.json();
    })
    .then((json) => {
      console.log("server response: ", json);
      callback(json);
    })
    .catch((err) => {
      console.log(`couldn't post json: ${err}`);
    });
};
/**
 * fetch patch json
 * @param data
 * @param route
 * @param callbacks
 */
const fetchPatchJson = async (data, route, callback) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  await fetch(route, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers,
  })
    .then((res) => {
      if (res.status === 200) callback();
      if (res.status === 500) console.log("500: couldn't patch");
      res.json();
    })
    .catch((err) => {
      console.log(`couldn't patch json: ${err}`);
    });
};
/**
 * fetch get json
 * @param route
 * @param cb  callback function
 */
const fetchGet = async (route, cb) => {
  await fetch(route)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      cb(json);
    })
    .catch((err) => {
      console.log(`couldn't get route: ${route}, ${err}`);
    });
};

export {
  fetchGet,
  fetchPatchImage,
  fetchPostJson,
  fetchPatchJson,
  fetchPatchMulti,
  fetchDelete,
};
