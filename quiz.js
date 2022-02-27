const http = require("http");

const options = {
  host: "codequiz.azurewebsites.net",
  path: "/",
  method: "GET",
  headers: { Cookie: "hasCookie=true" },
};

const httpRequest = http.request(options, (res) => {
  let data = "";
  res.on("data", function (chunk) {
    data += chunk;
  });

  res.on("end", function () {
    if (process.argv !== undefined && process.argv[2]) {
      const splitTable = data
        .replace(/\s+/g, "")
        .split(`<td>${process.argv[2]}</td><td>`);

      if (splitTable[1] !== undefined) {
        const result = splitTable[1].split(`</td>`);
        console.log(result[0]);
      }
    } else {
      console.log("No data found.");
    }
  });
});

httpRequest.on("error", (e) => {
  console.log(`Error: ${e.message}`);
});

httpRequest.end();
