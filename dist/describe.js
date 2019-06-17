"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const outputGenerator_1 = require("./outputGenerator");
const { inputLog, outputLog } = outputGenerator_1.outputGenerator();
let uniId = 0;
let isThrowError = false;
function setIsThrowError(a) {
    isThrowError = a;
}
exports.setIsThrowError = setIsThrowError;
function getId() {
    return uniId++;
}
async function describe(specName, callback, deep = 1, id = getId(), parentId = 0) {
    const subDeep = deep + 1;
    let isSubDescribeCalled = false;
    const state = {
        deep,
        specName,
        isSubDescribeCalled: false,
        id,
        parentId
    };
    inputLog(Object.assign({}, state, { progress: "begin" }));
    try {
        const subDescribe = async (subSpecName, subCallback) => {
            if (isSubDescribeCalled === false) {
                isSubDescribeCalled = true;
                inputLog(Object.assign({}, state, { progress: "beforeSubDescribeCall" }));
            }
            await describe(subSpecName, subCallback, subDeep, getId(), id);
        };
        await callback(subDescribe);
        inputLog(Object.assign({}, state, { isSubDescribeCalled, progress: "success" }));
    }
    catch (e) {
        inputLog(Object.assign({}, state, { isSubDescribeCalled, progress: "error", error: e }));
        // if call directly no need to throw error
        if (isThrowError) {
            if (e.isOutput !== true) {
                e.message = `[${specName}] failed with ${e.name}: ${e.message}`;
                e.isOutput = true;
            }
            throw e;
        }
    }
    if (deep === 1) {
        return outputLog();
    }
}
exports.describe = describe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGVzY3JpYmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx1REFBb0Q7QUFFcEQsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxpQ0FBZSxFQUFFLENBQUM7QUFFbEQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ2QsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBRXpCLFNBQWdCLGVBQWUsQ0FBQyxDQUFVO0lBQ3hDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDbkIsQ0FBQztBQUZELDBDQUVDO0FBRUQsU0FBUyxLQUFLO0lBQ1osT0FBTyxLQUFLLEVBQUUsQ0FBQztBQUNqQixDQUFDO0FBRU0sS0FBSyxVQUFVLFFBQVEsQ0FDNUIsUUFBZ0IsRUFDaEIsUUFBMEIsRUFDMUIsT0FBZSxDQUFDLEVBQ2hCLEtBQWEsS0FBSyxFQUFFLEVBQ3BCLFdBQW1CLENBQUM7SUFFcEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUN6QixJQUFJLG1CQUFtQixHQUFHLEtBQUssQ0FBQztJQUNoQyxNQUFNLEtBQUssR0FBRztRQUNaLElBQUk7UUFDSixRQUFRO1FBQ1IsbUJBQW1CLEVBQUUsS0FBSztRQUMxQixFQUFFO1FBQ0YsUUFBUTtLQUNULENBQUM7SUFDRixRQUFRLG1CQUFNLEtBQUssSUFBRSxRQUFRLEVBQUUsT0FBTyxJQUFHLENBQUM7SUFFMUMsSUFBSTtRQUNGLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFDdkIsV0FBbUIsRUFDbkIsV0FBNkIsRUFDN0IsRUFBRTtZQUNGLElBQUksbUJBQW1CLEtBQUssS0FBSyxFQUFFO2dCQUNqQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLFFBQVEsbUJBQU0sS0FBSyxJQUFFLFFBQVEsRUFBRSx1QkFBdUIsSUFBRyxDQUFDO2FBQzNEO1lBQ0QsTUFBTSxRQUFRLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDO1FBRUYsTUFBTSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUIsUUFBUSxtQkFBTSxLQUFLLElBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLFNBQVMsSUFBRyxDQUFDO0tBQ2xFO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixRQUFRLG1CQUNILEtBQUssSUFDUixtQkFBbUIsRUFDbkIsUUFBUSxFQUFFLE9BQU8sRUFDakIsS0FBSyxFQUFFLENBQUMsSUFDUixDQUFDO1FBRUgsMENBQTBDO1FBQzFDLElBQUksWUFBWSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7Z0JBQ3ZCLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxRQUFRLGlCQUFpQixDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDaEUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDbkI7WUFDRCxNQUFNLENBQUMsQ0FBQztTQUNUO0tBQ0Y7SUFFRCxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDZCxPQUFPLFNBQVMsRUFBRSxDQUFDO0tBQ3BCO0FBQ0gsQ0FBQztBQXJERCw0QkFxREMifQ==