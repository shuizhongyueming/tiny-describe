import { OutputGenerator } from "./types";
import { green, red } from "colors";

let _outputGenerator: OutputGenerator = () => {
  type OutputData = {
    deep: number;
    id: number;
    parentId: number;
    info: string;
    isFailed?: boolean;
  };
  let outputCache: OutputData[] = [];

  function log(data: OutputData) {
    const filtered = outputCache.filter(d => d.id !== data.id);
    outputCache = [...filtered, data];
  }

  function indentFormater(deep: number) {
    return "  ".repeat(deep);
  }

  function groupNameGenerator(deep: number, specName: string) {
    return `${indentFormater(deep)}${"#".repeat(deep)} ${specName}`;
  }

  function output() {
    let isAllPassed = true;
    const sorted = outputCache.sort((a, b) => {
      return a.id - b.id;
    });

    sorted.forEach(d => {
      process.stdout.write(d.info);
      if (d.isFailed) {
        isAllPassed = false;
      }
    });

    return isAllPassed;
  }

  return {
    inputLog: ({ deep, error, progress, id, parentId, specName }) => {
      const groupName = groupNameGenerator(deep, specName);
      switch (progress) {
        case "begin":
          log({ deep, id, parentId, info: `${groupName}\n` });
          break;
        case "success":
          log({ deep, id, parentId, info: green(`${groupName}\n`) });
          break;
        case "error":
          let info = red(`${groupName}\n`);
          if (error && error.isOutput !== true) {
            if (error && error.stack) {
              const stack = error.stack
                .split("\n")
                .map(l => `${indentFormater(deep)}${l}`)
                .join("\n");
              info += `${stack}\n`;
            }
          }
          log({ deep, id, parentId, info, isFailed: true });
          break;
      }
    },
    outputLog: output
  };
};

export function setOutputGenerator(og: OutputGenerator) {
  _outputGenerator = og;
}

export const outputGenerator: OutputGenerator = () => _outputGenerator();
