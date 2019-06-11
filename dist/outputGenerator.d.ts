export declare type OutputHandler = (state: {
    isSubDescribeCalled?: boolean;
    deep: number;
    id: number;
    parentId: number;
    error?: Error;
    groupName: string;
    specName: string;
    progress: CurrentProgress;
}) => void;
export declare type OutputGenerator = () => OutputHandler;
export declare type CurrentProgress = "begin" | "beforeSubDescribeCall" | "success" | "error";
export declare function setOutputGenerator(og: OutputGenerator): void;
export declare const outputGenerator: OutputGenerator;
