const fs = require("fs");
const path = require("path");
const secrets = require("./secrets");

// regex for matching the urls
const regex = secrets.regex;

function getJSONData() {
  const dataFile = path.resolve(__dirname, "target.json");

  const fileContents = fs.readFileSync(dataFile, "utf8");

  const data = JSON.parse(fileContents);

  return data;
}

const data = getJSONData();
const urlMap = {};
const repeatedUrls = [];

data.forEach((entry) => {
  // console.log(entry.url);
  const slug = entry.url.match(regex)[1];
  // console.log(slug);
  if (!urlMap[slug]) {
    urlMap[slug] = { ...entry, duplicateFound: false };
  } else {
    if (!urlMap[slug].duplicateFound) repeatedUrls.push(urlMap[slug]);
    urlMap[slug].duplicateFound = true;
    repeatedUrls.push(entry);
  }
});

const resultFile = path.resolve(__dirname, "result.json");

fs.writeFileSync(resultFile, JSON.stringify(repeatedUrls));

console.log("Number of repeated urls: ", repeatedUrls.length);
