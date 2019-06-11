export type GroupNameGenerator = (deep: number, specName: string) => string;

let _groupNameGenerator: GroupNameGenerator = (deep, specName) => {
  const prefix = `${"  ".repeat(deep)}${"#".repeat(deep)}`;
  return `${prefix} ${specName}`;
};

export function setGroupNameGenerator(gng: GroupNameGenerator) {
  _groupNameGenerator = gng;
}

export const groupNameGenerator: GroupNameGenerator = (...args) =>
  _groupNameGenerator(...args);
