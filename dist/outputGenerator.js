"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
let _outputGenerator = () => {
    let outputCache = [];
    function log(data) {
        const filtered = outputCache.filter(d => d.id !== data.id);
        outputCache = [...filtered, data];
    }
    function indentFormater(deep) {
        return "  ".repeat(deep);
    }
    function groupNameGenerator(deep, specName) {
        return `${indentFormater(deep)}${"#".repeat(deep)} ${specName}`;
    }
    function output() {
        const sorted = outputCache.sort((a, b) => {
            return a.id - b.id;
        });
        sorted.forEach(d => process.stdout.write(d.info));
    }
    return {
        inputLog: ({ deep, error, progress, id, parentId, specName }) => {
            const groupName = groupNameGenerator(deep, specName);
            switch (progress) {
                case "begin":
                    log({ deep, id, parentId, info: `${groupName}\n` });
                    break;
                case "success":
                    log({ deep, id, parentId, info: colors_1.green(`${groupName}\n`) });
                    break;
                case "error":
                    let info = colors_1.red(`${groupName}\n`);
                    if (error && error.isOutput !== true) {
                        if (error && error.stack) {
                            const stack = error.stack
                                .split("\n")
                                .map(l => `${indentFormater(deep)}${l}`)
                                .join("\n");
                            info += `${stack}\n`;
                        }
                    }
                    log({ deep, id, parentId, info });
                    break;
            }
        },
        outputLog: output
    };
};
function setOutputGenerator(og) {
    _outputGenerator = og;
}
exports.setOutputGenerator = setOutputGenerator;
exports.outputGenerator = () => _outputGenerator();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0R2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL291dHB1dEdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUFvQztBQUVwQyxJQUFJLGdCQUFnQixHQUFvQixHQUFHLEVBQUU7SUFPM0MsSUFBSSxXQUFXLEdBQWlCLEVBQUUsQ0FBQztJQUVuQyxTQUFTLEdBQUcsQ0FBQyxJQUFnQjtRQUMzQixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0QsV0FBVyxHQUFHLENBQUMsR0FBRyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELFNBQVMsY0FBYyxDQUFDLElBQVk7UUFDbEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxTQUFTLGtCQUFrQixDQUFDLElBQVksRUFBRSxRQUFnQjtRQUN4RCxPQUFPLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxFQUFFLENBQUM7SUFDbEUsQ0FBQztJQUVELFNBQVMsTUFBTTtRQUNiLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELE9BQU87UUFDTCxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUM5RCxNQUFNLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDckQsUUFBUSxRQUFRLEVBQUU7Z0JBQ2hCLEtBQUssT0FBTztvQkFDVixHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ3BELE1BQU07Z0JBQ1IsS0FBSyxTQUFTO29CQUNaLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFLLENBQUMsR0FBRyxTQUFTLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDM0QsTUFBTTtnQkFDUixLQUFLLE9BQU87b0JBQ1YsSUFBSSxJQUFJLEdBQUcsWUFBRyxDQUFDLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQztvQkFDakMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7d0JBQ3BDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7NEJBQ3hCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLO2lDQUN0QixLQUFLLENBQUMsSUFBSSxDQUFDO2lDQUNYLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2lDQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2QsSUFBSSxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7eUJBQ3RCO3FCQUNGO29CQUNELEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ2xDLE1BQU07YUFDVDtRQUNILENBQUM7UUFDRCxTQUFTLEVBQUUsTUFBTTtLQUNsQixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsU0FBZ0Isa0JBQWtCLENBQUMsRUFBbUI7SUFDcEQsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLENBQUM7QUFGRCxnREFFQztBQUVZLFFBQUEsZUFBZSxHQUFvQixHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDIn0=