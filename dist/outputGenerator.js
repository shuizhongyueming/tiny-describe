"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
let _outputGenerator = () => {
    let outputCache = [];
    function log(data) {
        const filtered = outputCache.filter(d => d.id !== data.id);
        outputCache = [...filtered, data];
        if (data.isFailed === true && data.id !== 0) {
            // a spec failed, it's parent should also failed
            const parent = outputCache.find(d => d.id === data.parentId);
            if (parent) {
                const { deep, specName, id, parentId } = parent;
                inputLog({
                    deep,
                    specName,
                    id,
                    parentId,
                    progress: "error"
                });
            }
        }
    }
    function indentFormater(deep) {
        return "  ".repeat(deep);
    }
    function groupNameGenerator(deep, specName) {
        return `${indentFormater(deep)}${"#".repeat(deep)} ${specName}`;
    }
    function outputLog() {
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
    const inputLog = ({ deep, error, progress, id, parentId, specName }) => {
        const groupName = groupNameGenerator(deep, specName);
        switch (progress) {
            case "begin":
                log({ deep, id, specName, parentId, info: `${groupName}\n` });
                break;
            case "success":
                const outputData = outputCache.find(d => d.id === id);
                // a failed output can't sucess
                if (!outputData || outputData.isFailed !== true) {
                    log({ deep, id, specName, parentId, info: colors_1.green(`${groupName}\n`) });
                }
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
                log({ deep, id, specName, parentId, info, isFailed: true });
                break;
        }
    };
    return {
        inputLog,
        outputLog
    };
};
function setOutputGenerator(og) {
    _outputGenerator = og;
}
exports.setOutputGenerator = setOutputGenerator;
exports.outputGenerator = () => _outputGenerator();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0R2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL291dHB1dEdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUFvQztBQUVwQyxJQUFJLGdCQUFnQixHQUFvQixHQUFHLEVBQUU7SUFTM0MsSUFBSSxXQUFXLEdBQWlCLEVBQUUsQ0FBQztJQUVuQyxTQUFTLEdBQUcsQ0FBQyxJQUFnQjtRQUMzQixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0QsV0FBVyxHQUFHLENBQUMsR0FBRyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFbEMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUMzQyxnREFBZ0Q7WUFDaEQsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdELElBQUksTUFBTSxFQUFFO2dCQUNWLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUM7Z0JBQ2hELFFBQVEsQ0FBQztvQkFDUCxJQUFJO29CQUNKLFFBQVE7b0JBQ1IsRUFBRTtvQkFDRixRQUFRO29CQUNSLFFBQVEsRUFBRSxPQUFPO2lCQUNsQixDQUFDLENBQUM7YUFDSjtTQUNGO0lBQ0gsQ0FBQztJQUVELFNBQVMsY0FBYyxDQUFDLElBQVk7UUFDbEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxTQUFTLGtCQUFrQixDQUFDLElBQVksRUFBRSxR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