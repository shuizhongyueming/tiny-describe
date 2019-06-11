import { groupNameGenerator } from "./groupNameGenerator";
import { outputGenerator } from "./outputGenerator";

const output = outputGenerator();

export type DescribeCallback = (describe: Describe) => Promise<void> | void;
export type Describe = (
  specName: string,
  callback: DescribeCallback,
  deep?: number,
  id?: number,
  parentId?: number
) => void;

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
  const groupName = groupNameGenerator(deep, specName);
  const subDeep = deep + 1;
  let isSubDescribeCalled = false;
  const state = {
    groupName,
    deep,
    specName,
    isSubDescribeCalled: false,
    id,
    parentId
  };
  output({ ...state, progress: "begin" });

  try {
    await callback(
      async (subSpecName: string, subCallback: DescribeCallback) => {
        if (isSubDescribeCalled === false) {
          isSubDescribeCalled = true;
          output({ ...state, progress: "beforeSubDescribeCall" });
        }
        await describe(subSpecName, subCallback, subDeep, getId(), id);
      }
    );
    output({ ...state, isSubDescribeCalled, progress: "success" });
  } catch (e) {
    output({
      ...state,
      isSubDescribeCalled,
      progress: "error",
      error: e
    });
    e.message = `${groupName} 失败\n ${e.message}`;
    throw e;
  }
}
