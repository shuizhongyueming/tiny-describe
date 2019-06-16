export type DescribeCallback = (describe: Describe) => Promise<void> | void;

export type Describe = (
  specName: string,
  callback: DescribeCallback,
  deep?: number,
  id?: number,
  parentId?: number
) => void;

export interface OutputError extends Error {
  isOutput: boolean;
}

export type IutputLogHandler = (state: {
  isSubDescribeCalled?: boolean;
  deep: number;
  id: number;
  parentId: number;
  error?: OutputError;
  specName: string;
  progress: CurrentProgress;
}) => void;
export type OutputGenerator = () => {
  inputLog: IutputLogHandler;
  outputLog: () => void;
};

export type CurrentProgress =
  | "begin"
  | "beforeSubDescribeCall"
  | "success"
  | "error";

export type GroupNameGenerator = (deep: number, specName: string) => string;
