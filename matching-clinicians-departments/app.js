const fs = require("fs");
const path = require("path");

function getJSONData(filepath) {
  const dataFile = path.resolve(__dirname, filepath);

  const fileContents = fs.readFileSync(dataFile, "utf8");

  const data = JSON.parse(fileContents);

  return data;
}

const provData = getJSONData("provs.json");
const depData = getJSONData("deps.json");
// console.log(depData);

const providerMap = {};

provData.forEach((prov) => {
  if (providerMap[prov.npi]) return;
  const departments = [];
  const departmentUuids = JSON.parse(prov.departmentUuids);
  departmentUuids.forEach((provDep) => {
    const matchedDep = depData.find((dep) => dep?.depId === provDep);
    departments.push(matchedDep);
  });
  const displayName = JSON.parse(prov.name).display;
  // console.log(departments);

  providerMap[prov.npi] = {
    ...prov,
    name: displayName,
    departmentUuids: departmentUuids,
    departments: departments,
  };
});

const resultFile = path.resolve(__dirname, "result.json");

fs.writeFileSync(resultFile, JSON.stringify(providerMap));
