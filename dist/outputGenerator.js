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
        let isAllPassed = true;
        const sorted = outputCache.sort((a, b) => {
            return a.id - b.id;
        });
        sorted.forEach(d => {
            process.stdout.write(d.info);
            if (d.isFailed) {
                isAllPassed = false;
            }
        });
        return isAllPassed;
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
                    log({ deep, id, parentId, info, isFailed: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0R2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL291dHB1dEdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUFvQztBQUVwQyxJQUFJLGdCQUFnQixHQUFvQixHQUFHLEVBQUU7SUFRM0MsSUFBSSxXQUFXLEdBQWlCLEVBQUUsQ0FBQztJQUVuQyxTQUFTLEdBQUcsQ0FBQyxJQUFnQjtRQUMzQixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0QsV0FBVyxHQUFHLENBQUMsR0FBRyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELFNBQVMsY0FBYyxDQUFDLElBQVk7UUFDbEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxTQUFTLGtCQUFrQixDQUFDLElBQVksRUFBRSxRQUFnQjtRQUN4RCxPQUFPLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxFQUFFLENBQUM7SUFDbEUsQ0FBQztJQUVELFNBQVMsTUFBTTtRQUNiLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUNkLFdBQVcsR0FBRyxLQUFLLENBQUM7YUFDckI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxPQUFPO1FBQ0wsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUU7WUFDOUQsTUFBTSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3JELFFBQVEsUUFBUSxFQUFFO2dCQUNoQixLQUFLLE9BQU87b0JBQ1YsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNwRCxNQUFNO2dCQUNSLEtBQUssU0FBUztvQkFDWixHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsY0FBSyxDQUFDLEdBQUcsU0FBUyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzNELE1BQU07Z0JBQ1IsS0FBSyxPQUFPO29CQUNWLElBQUksSUFBSSxHQUFHLFlBQUcsQ0FBQyxHQUFHLFNBQVMsSUFBSSxDQUFDLENBQUM7b0JBQ2pDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO3dCQUNwQyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFOzRCQUN4QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSztpQ0FDdEIsS0FBSyxDQUFDLElBQUksQ0FBQztpQ0FDWCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztpQ0FDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNkLElBQUksSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDO3lCQUN0QjtxQkFDRjtvQkFDRCxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ2xELE1BQU07YUFDVDtRQUNILENBQUM7UUFDRCxTQUFTLEVBQUUsTUFBTTtLQUNsQixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsU0FBZ0Isa0JBQWtCLENBQUMsRUFBbUI7SUFDcEQsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLENBQUM7QUFGRCxnREFFQztBQUVZLFFBQUEsZUFBZSxHQUFvQixHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDIn0=