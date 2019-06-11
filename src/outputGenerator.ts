import { green, red, blue } from "colors";
import { moveCursor, clearScreenDown } from "readline";

export type OutputHandler = (state: {
  isSubDescribeCalled?: boolean;
  deep: number;
  id: number;
  parentId: number;
  error?: Error;
  groupName: string;
  specName: string;
  progress: CurrentProgress;
}) => void;
export type OutputGenerator = () => OutputHandler;

export type CurrentProgress =
  | "begin"
  | "beforeSubDescribeCall"
  | "success"
  | "error";

let _outputGenerator: OutputGenerator = () => {
  type OutputData = {
    deep: number;
    id: number;
    parentId: number;
    info: string;
  };
  let outputCache: OutputData[] = [];

  function log(data: OutputData) {
    const filtered = outputCache.filter(d => d.id !== data.id);
    const num = outputCache.reduce((num, d) => {
      const matchs = d.info.match(/\n/g);
      if (matchs) {
        num += matchs.length;
      }
      return num;
    }, 0);
    moveCursor(process.stdout, 0, -num);
    clearScreenDown(process.stdout);
    // clearLine(process.stdout, 0);
    outputCache = [...filtered, data];

    output(outputCache);
  }

  function output(datas: OutputData[]) {
    const sorted = datas.sort((a, b) => {
      return a.id - b.id;
    });

    sorted.forEach(d => process.stdout.write(d.info));
  }

  return ({ deep, groupName, error, progress, id, parentId }) => {
    switch (progress) {
      case "begin":
        log({ deep, id, parentId, info: `${groupName}\n` });
        break;
      case "success":
        log({ deep, id, parentId, info: green(`${groupName}\n`) });
        break;
      case "error":
        let info = red(groupName);
        console.log();
        if (deep === 1) {
          info += blue("\n************************");
          info += blue("\n******* 错误内容 *******");
          info += blue("\n************************\n");
          if (error) {
            info += error.message;
          }
        }
        log({ deep, id, parentId, info });
        break;
    }
  };
};

export function setOutputGenerator(og: OutputGenerator) {
  _outputGenerator = og;
}

export const outputGenerator: OutputGenerator = () => _outputGenerator();
