const fs = require("fs");
const readline = require("readline");
const path = require("path");

const project = process.argv?.[2];
const environment = process.argv?.[3];

function getData() {
  const dataFile = path.resolve(__dirname, "test-links.json");

  const fileContents = fs.readFileSync(dataFile, "utf8");

  const data = JSON.parse(fileContents);

  return data;
}

const data = getData();

if (project?.length && environment?.length) {
  const urls = data[project].map(
    (link) => data.envs[project][environment] + link
  );
  urls.forEach((link) => {
    console.log(link);
  });
} else if (project?.length) {
  const urls = data[project];
  urls.forEach((link) => {
    console.log(link);
  });
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const inputProject = rl.question("Enter project name: ", (input) => {
    if (!input?.length) rl.close;

    return input;
  });

  const inputEnv = rl.question(
    "Enter the environment or hit enter to get paths",
    (input) => {
      return input;
    }
  );

  if (!inputEnv?.length) {
    const urls = data[inputProject];
    urls.forEach((link) => {
      console.log(link);
    });
    rl.close();
  } else {
    const urls = data[inputProject].map(
      (link) => data.envs[inputProject][inputEnv] + link
    );
    urls.forEach((link) => {
      console.log(link);
    });
    rl.close();
  }
}
