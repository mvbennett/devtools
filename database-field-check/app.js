const fs = require("fs");
const path = require("path");
const secrets = require("./secrets");

// main section's key name
const mainKey = secrets.mainKey;
// sub-sections' key names
const subKeys = secrets.subKeys;
// the prefix for the url if a path is used in DB
const urlPrefix = secrets.urlPrefix;

function getJSONData() {
  const dataFile = path.resolve(__dirname, "target.json");

  const fileContents = fs.readFileSync(dataFile, "utf8");

  const data = JSON.parse(fileContents);

  return data;
}

const data = getJSONData();

const mapped = {};
subKeys.forEach((key) => (mapped[key] = []));

data.forEach((entry) => {
  const url = urlPrefix + entry.Url;
  const fields = JSON.parse(entry[mainKey]);
  subKeys.forEach((key) => {
    if (fields[key]?.length)
      mapped[key].push({
        url,
        data: fields[key],
      });
  });
});

const resultFile = path.resolve(__dirname, "result.json");

fs.writeFileSync(resultFile, JSON.stringify(mapped));
