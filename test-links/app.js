const fs = require("fs");
const readline = require("readline");
const path = require("path");

const project = process.argv?.[2]?.trim();
const environment = process.argv?.[3]?.trim();

function getData() {
  const dataFile = path.resolve(__dirname, "test-links.json");

  const fileContents = fs.readFileSync(dataFile, "utf8");

  const data = JSON.parse(fileContents);

  return data;
}

function getLinks(project, environment) {
  if (!project?.length) return [];

  const urls = environment?.length
    ? data[project].map((link) => data.envs[project][environment] + link)
    : data[project];
  return urls;
}

function printLinks(urls) {
  if (!urls?.length) return;

  urls.forEach((url) => console.log(url));
}

const data = getData();

if (project?.length) {
  const urls = getLinks(project, environment);
  printLinks(urls);
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter project name: ", (projectInput) => {
    if (!projectInput?.length) return rl.close();

    rl.question("Enter env: ", (envInput) => {
      const urls = getLinks(projectInput.trim(), envInput.trim());

      printLinks(urls);
      rl.close();
    });
  });
}
