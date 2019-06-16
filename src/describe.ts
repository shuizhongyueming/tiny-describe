import { DescribeCallback } from "./types";
import { outputGenerator } from "./outputGenerator";

const { inputLog, outputLog } = outputGenerator();

let uniId = 0;

function getId() {
  return uniId++;
}

export async function describe(
  specName: string,
  callback: DescribeCallback,
  deep: number = 1,
  id: number = getId(),
  parentId: number = 0
) {
  const subDeep = deep + 1;
  let isSubDescribeCalled = false;
  const state = {
    deep,
    specName,
    isSubDescribeCalled: false,
    id,
    parentId
  };
  inputLog({ ...state, progress: "begin" });

  try {
    await callback(
      async (subSpecName: string, subCallback: DescribeCallback) => {
        if (isSubDescribeCalled === false) {
          isSubDescribeCalled = true;
          inputLog({ ...state, progress: "beforeSubDescribeCall" });
        }
        await describe(subSpecName, subCallback, subDeep, getId(), id);
      }
    );
    inputLog({ ...state, isSubDescribeCalled, progress: "success" });
  } catch (e) {
    inputLog({
      ...state,
      isSubDescribeCalled,
      progress: "error",
      error: e
    });
  }

  if (deep === 1) {
    return outputLog();
  }
}
