"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const readline_1 = require("readline");
let _outputGenerator = () => {
    let outputCache = [];
    function log(data) {
        const filtered = outputCache.filter(d => d.id !== data.id);
        const num = outputCache.reduce((num, d) => {
            const matchs = d.info.match(/\n/g);
            if (matchs) {
                num += matchs.length;
            }
            return num;
        }, 0);
        readline_1.moveCursor(process.stdout, 0, -num);
        readline_1.clearScreenDown(process.stdout);
        // clearLine(process.stdout, 0);
        outputCache = [...filtered, data];
        output(outputCache);
    }
    function output(datas) {
        const sorted = datas.sort((a, b) => {
            return a.id - b.id;
        });
        sorted.forEach(d => process.stdout.write(d.info));
    }
    return ({ deep, groupName, error, progress, id, parentId }) => {
        switch (progress) {
            case "begin":
                log({ deep, id, parentId, info: `${groupName}\n` });
                break;
            case "success":
                log({ deep, id, parentId, info: colors_1.green(`${groupName}\n`) });
                break;
            case "error":
                let info = colors_1.red(groupName);
                console.log();
                if (deep === 1) {
                    info += colors_1.blue("\n************************");
                    info += colors_1.blue("\n******* 错误内容 *******");
                    info += colors_1.blue("\n************************\n");
                    if (error) {
                        info += error.message;
                    }
                }
                log({ deep, id, parentId, info });
                break;
        }
    };
};
function setOutputGenerator(og) {
    _outputGenerator = og;
}
exports.setOutputGenerator = setOutputGenerator;
exports.outputGenerator = () => _outputGenerator();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0R2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL291dHB1dEdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUEwQztBQUMxQyx1Q0FBdUQ7QUFvQnZELElBQUksZ0JBQWdCLEdBQW9CLEdBQUcsRUFBRTtJQU8zQyxJQUFJLFdBQVcsR0FBaUIsRUFBRSxDQUFDO0lBRW5DLFNBQVMsR0FBRyxDQUFDLElBQWdCO1FBQzNCLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzRCxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLElBQUksTUFBTSxFQUFFO2dCQUNWLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ3RCO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDTixxQkFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsMEJBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsZ0NBQWdDO1FBQ2hDLFdBQVcsR0FBRyxDQUFDLEdBQUcsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWxDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUyxNQUFNLENBQUMsS0FBbUI7UUFDakMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO1FBQzVELFFBQVEsUUFBUSxFQUFFO1lBQ2hCLEtBQUssT0FBTztnQkFDVixHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3BELE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQUssQ0FBQyxHQUFHLFNBQVMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRCxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLElBQUksSUFBSSxHQUFHLFlBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNkLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtvQkFDZCxJQUFJLElBQUksYUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7b0JBQzNDLElBQUksSUFBSSxhQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxJQUFJLGFBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO29CQUM3QyxJQUFJLEtBQUssRUFBRTt3QkFDVCxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQztxQkFDdkI7aUJBQ0Y7Z0JBQ0QsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDbEMsTUFBTTtTQUNUO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsU0FBZ0Isa0JBQWtCLENBQUMsRUFBbUI7SUFDcEQsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLENBQUM7QUFGRCxnREFFQztBQUVZLFFBQUEsZUFBZSxHQUFvQixHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDIn0=