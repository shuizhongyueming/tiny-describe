"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const groupNameGenerator_1 = require("./groupNameGenerator");
const outputGenerator_1 = require("./outputGenerator");
const output = outputGenerator_1.outputGenerator();
let uniId = 0;
function getId() {
    return uniId++;
}
async function describe(specName, callback, deep = 1, id = getId(), parentId = 0) {
    const groupName = groupNameGenerator_1.groupNameGenerator(deep, specName);
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
    output(Object.assign({}, state, { progress: "begin" }));
    try {
        await callback(async (subSpecName, subCallback) => {
            if (isSubDescribeCalled === false) {
                isSubDescribeCalled = true;
                output(Object.assign({}, state, { progress: "beforeSubDescribeCall" }));
            }
            await describe(subSpecName, subCallback, subDeep, getId(), id);
        });
        output(Object.assign({}, state, { isSubDescribeCalled, progress: "success" }));
    }
    catch (e) {
        output(Object.assign({}, state, { isSubDescribeCalled, progress: "error", error: e }));
        e.message = `${groupName} 失败\n ${e.message}`;
        throw e;
    }
}
exports.describe = describe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGVzY3JpYmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2REFBMEQ7QUFDMUQsdURBQW9EO0FBRXBELE1BQU0sTUFBTSxHQUFHLGlDQUFlLEVBQUUsQ0FBQztBQVdqQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFFZCxTQUFTLEtBQUs7SUFDWixPQUFPLEtBQUssRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFFTSxLQUFLLFVBQVUsUUFBUSxDQUM1QixRQUFnQixFQUNoQixRQUEwQixFQUMxQixPQUFlLENBQUMsRUFDaEIsS0FBYSxLQUFLLEVBQUUsRUFDcEIsV0FBbUIsQ0FBQztJQUVwQixNQUFNLFNBQVMsR0FBRyx1Q0FBa0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDckQsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUN6QixJQUFJLG1CQUFtQixHQUFHLEtBQUssQ0FBQztJQUNoQyxNQUFNLEtBQUssR0FBRztRQUNaLFNBQVM7UUFDVCxJQUFJO1FBQ0osUUFBUTtRQUNSLG1CQUFtQixFQUFFLEtBQUs7UUFDMUIsRUFBRTtRQUNGLFFBQVE7S0FDVCxDQUFDO0lBQ0YsTUFBTSxtQkFBTSxLQUFLLElBQUUsUUFBUSxFQUFFLE9BQU8sSUFBRyxDQUFDO0lBRXhDLElBQUk7UUFDRixNQUFNLFFBQVEsQ0FDWixLQUFLLEVBQUUsV0FBbUIsRUFBRSxXQUE2QixFQUFFLEVBQUU7WUFDM0QsSUFBSSxtQkFBbUIsS0FBSyxLQUFLLEVBQUU7Z0JBQ2pDLG1CQUFtQixHQUFHLElBQUksQ0FBQztnQkFDM0IsTUFBTSxtQkFBTSxLQUFLLElBQUUsUUFBUSxFQUFFLHVCQUF1QixJQUFHLENBQUM7YUFDekQ7WUFDRCxNQUFNLFFBQVEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQ0YsQ0FBQztRQUNGLE1BQU0sbUJBQU0sS0FBSyxJQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxTQUFTLElBQUcsQ0FBQztLQUNoRTtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsTUFBTSxtQkFDRCxLQUFLLElBQ1IsbUJBQW1CLEVBQ25CLFFBQVEsRUFBRSxPQUFPLEVBQ2pCLEtBQUssRUFBRSxDQUFDLElBQ1IsQ0FBQztRQUNILENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxTQUFTLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxDQUFDO0tBQ1Q7QUFDSCxDQUFDO0FBekNELDRCQXlDQyJ9