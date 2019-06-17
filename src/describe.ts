import { DescribeCallback } from "./types";
import { outputGenerator } from "./outputGenerator";

const { inputLog, outputLog } = outputGenerator();

let uniId = 0;
let isThrowError = false;

export function setIsThrowError(a: boolean) {
  isThrowError = a;
}

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
  let specErr: Error | null = null;
  const state = {
    deep,
    specName,
    isSubDescribeCalled: false,
    id,
    parentId
  };
  inputLog({ ...state, progress: "begin" });

  try {
    const subDescribe = async (
      subSpecName: string,
      subCallback: DescribeCallback
    ) => {
      if (isSubDescribeCalled === false) {
        isSubDescribeCalled = true;
        inputLog({ ...state, progress: "beforeSubDescribeCall" });
      }
      await describe(subSpecName, subCallback, subDeep, getId(), id);
    };

    await callback(subDescribe);
    inputLog({ ...state, isSubDescribeCalled, progress: "success" });
  } catch (e) {
    inputLog({
      ...state,
      isSubDescribeCalled,
      progress: "error",
      error: isThrowError ? null : e
    });

    // if call directly no need to throw error
    if (isThrowError) {
      if (e.isOutput !== true) {
        e.message = `[${specName}] failed with ${e.name}: ${e.message}`;
        e.isOutput = true;
      }

      if (deep === 1) {
        specErr = e;
      } else {
        throw e;
      }
    }
  }

  if (deep === 1) {
    outputLog();
    if (specErr) {
      throw specErr;
    }
  }
}
