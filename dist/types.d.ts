export declare type DescribeCallback = (describe: Describe) => Promise<void> | void;
export declare type Describe = (specName: string, callback: DescribeCallback, deep?: number, id?: number, parentId?: number) => void;
export interface OutputError extends Error {
    isOutput: boolean;
}
export declare type IutputLogHandler = (state: {
    isSubDescribeCalled?: boolean;
    deep: number;
    id: number;
    parentId: number;
    error?: OutputError;
    specName: string;
    progress: CurrentProgress;
}) => void;
export declare type OutputGenerator = () => {
    inputLog: IutputLogHandler;
    outputLog: () => void;
};
export declare type CurrentProgress = "begin" | "beforeSubDescribeCall" | "success" | "error";
export declare type GroupNameGenerator = (deep: number, specName: string) => string;
