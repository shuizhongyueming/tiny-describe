export declare type GroupNameGenerator = (deep: number, specName: string) => string;
export declare function setGroupNameGenerator(gng: GroupNameGenerator): void;
export declare const groupNameGenerator: GroupNameGenerator;
