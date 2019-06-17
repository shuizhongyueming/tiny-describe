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
    let specErr = null;
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
        inputLog(Object.assign({}, state, { isSubDescribeCalled, progress: "error", error: isThrowError ? null : e }));
        // if call directly no need to throw error
        if (isThrowError) {
            if (e.isOutput !== true) {
                e.message = `[${specName}] failed with ${e.name}: ${e.message}`;
                e.isOutput = true;
            }
            if (deep === 1) {
                specErr = e;
            }
            else {
                throw e;
            }
        }
    }
    if (deep === 1) {
        outputLog();
        if (specErr) {
            throw specErr;
        }
    }
}
exports.describe = describe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGVzY3JpYmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx1REFBb0Q7QUFFcEQsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxpQ0FBZSxFQUFFLENBQUM7QUFFbEQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ2QsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBRXpCLFNBQWdCLGVBQWUsQ0FBQyxDQUFVO0lBQ3hDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDbkIsQ0FBQztBQUZELDBDQUVDO0FBRUQsU0FBUyxLQUFLO0lBQ1osT0FBTyxLQUFLLEVBQUUsQ0FBQztBQUNqQixDQUFDO0FBRU0sS0FBSyxVQUFVLFFBQVEsQ0FDNUIsUUFBZ0IsRUFDaEIsUUFBMEIsRUFDMUIsT0FBZSxDQUFDLEVBQ2hCLEtBQWEsS0FBSyxFQUFFLEVBQ3BCLFdBQW1CLENBQUM7SUFFcEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUN6QixJQUFJLG1CQUFtQixHQUFHLEtBQUssQ0FBQztJQUNoQyxJQUFJLE9BQU8sR0FBaUIsSUFBSSxDQUFDO0lBQ2pDLE1BQU0sS0FBSyxHQUFHO1FBQ1osSUFBSTtRQUNKLFFBQVE7UUFDUixtQkFBbUIsRUFBRSxLQUFLO1FBQzFCLEVBQUU7UUFDRixRQUFRO0tBQ1QsQ0FBQztJQUNGLFFBQVEsbUJBQU0sS0FBSyxJQUFFLFFBQVEsRUFBRSxPQUFPLElBQUcsQ0FBQztJQUUxQyxJQUFJO1FBQ0YsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUN2QixXQUFtQixFQUNuQixXQUE2QixFQUM3QixFQUFFO1lBQ0YsSUFBSSxtQkFBbUIsS0FBSyxLQUFLLEVBQUU7Z0JBQ2pDLG1CQUFtQixHQUFHLElBQUksQ0FBQztnQkFDM0IsUUFBUSxtQkFBTSxLQUFLLElBQUUsUUFBUSxFQUFFLHVCQUF1QixJQUFHLENBQUM7YUFDM0Q7WUFDRCxNQUFNLFFBQVEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUM7UUFFRixNQUFNLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1QixRQUFRLG1CQUFNLEtBQUssSUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsU0FBUyxJQUFHLENBQUM7S0FDbEU7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLFFBQVEsbUJBQ0gsS0FBSyxJQUNSLG1CQUFtQixFQUNuQixRQUFRLEVBQUUsT0FBTyxFQUNqQixLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFDOUIsQ0FBQztRQUVILDBDQUEwQztRQUMxQyxJQUFJLFlBQVksRUFBRTtZQUNoQixJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO2dCQUN2QixDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksUUFBUSxpQkFBaUIsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2hFLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ25CO1lBRUQsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUNkLE9BQU8sR0FBRyxDQUFDLENBQUM7YUFDYjtpQkFBTTtnQkFDTCxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7S0FDRjtJQUVELElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNkLFNBQVMsRUFBRSxDQUFDO1FBQ1osSUFBSSxPQUFPLEVBQUU7WUFDWCxNQUFNLE9BQU8sQ0FBQztTQUNmO0tBQ0Y7QUFDSCxDQUFDO0FBOURELDRCQThEQyJ9