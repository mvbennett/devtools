const fs = require("fs");
const path = require("path");
const secrets = require("./secrets.js");

const allUrls = secrets.allUrls();

function getJSONData() {
  const dataFile = path.resolve(__dirname, "target.json");

  const fileContents = fs.readFileSync(dataFile, "utf8");

  const data = JSON.parse(fileContents);

  return data;
}

const data = getJSONData();
const urlMap = {};
const matchedUrls = [];

data.forEach((entry) => {
  // console.log(entry.url);
  const url = entry.URL;
  // console.log(url);

  if (allUrls.includes(url)) matchedUrls.push(entry);
});

const resultFile = path.resolve(__dirname, "result.json");

fs.writeFileSync(resultFile, JSON.stringify(matchedUrls));

console.log(
  "Number of matched urls:",
  matchedUrls.length,
  "Out of",
  data.length
);
