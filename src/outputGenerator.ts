import { OutputGenerator, IutputLogHandler } from "./types";
import { green, red } from "colors";

let _outputGenerator: OutputGenerator = () => {
  type OutputData = {
    deep: number;
    id: number;
    parentId: number;
    specName: string;
    info: string;
    isFailed?: boolean;
  };
  let outputCache: OutputData[] = [];

  function log(data: OutputData) {
    const filtered = outputCache.filter(d => d.id !== data.id);
    outputCache = [...filtered, data];

    if (data.isFailed === true && data.id !== 0) {
      // a spec failed, it's parent should also failed
      const parent = outputCache.find(d => d.id === data.parentId);
      if (parent) {
        const { deep, specName, id, parentId } = parent;
        inputLog({
          deep,
          specName,
          id,
          parentId,
          progress: "error"
        });
      }
    }
  }

  function indentFormater(deep: number) {
    return "  ".repeat(deep);
  }

  function groupNameGenerator(deep: number, specName: string) {
    return `${indentFormater(deep)}${"#".repeat(deep)} ${specName}`;
  }

  function outputLog() {
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

  const inputLog: IutputLogHandler = ({
    deep,
    error,
    progress,
    id,
    parentId,
    specName
  }) => {
    const groupName = groupNameGenerator(deep, specName);
    switch (progress) {
      case "begin":
        log({ deep, id, specName, parentId, info: `${groupName}\n` });
        break;
      case "success":
        const outputData = outputCache.find(d => d.id === id);
        // a failed output can't sucess
        if (!outputData || outputData.isFailed !== true) {
          log({ deep, id, specName, parentId, info: green(`${groupName}\n`) });
        }
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
        log({ deep, id, specName, parentId, info, isFailed: true });
        break;
    }
  };

  return {
    inputLog,
    outputLog
  };
};

export function setOutputGenerator(og: OutputGenerator) {
  _outputGenerator = og;
}

export const outputGenerator: OutputGenerator = () => _outputGenerator();
