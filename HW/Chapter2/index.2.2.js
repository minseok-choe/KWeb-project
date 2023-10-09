const fs = require("fs");
const util = require("util");
const { extname, join } = require("path");

const dir = "./test";

const readdir = util.promisify(fs.readdir);

/* printFile - recursively explore folders and print filenames which satisfy predicate */
async function printFile(dirPath, predicate) {
  let files = await readdir(dirPath, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      await printFile(join(dirPath, file.name), predicate);
    } else if (predicate(file.name)) {
      console.log(join(dirPath, file.name));
    }
  }
}

printFile("test", (fileName) => extname(fileName) === ".js");
