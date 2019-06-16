"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const outputGenerator_1 = require("./outputGenerator");
const { inputLog, outputLog } = outputGenerator_1.outputGenerator();
let uniId = 0;
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
        await callback(async (subSpecName, subCallback) => {
            if (isSubDescribeCalled === false) {
                isSubDescribeCalled = true;
                inputLog(Object.assign({}, state, { progress: "beforeSubDescribeCall" }));
            }
            await describe(subSpecName, subCallback, subDeep, getId(), id);
        });
        inputLog(Object.assign({}, state, { isSubDescribeCalled, progress: "success" }));
    }
    catch (e) {
        inputLog(Object.assign({}, state, { isSubDescribeCalled, progress: "error", error: e }));
    }
    if (deep === 1) {
        return outputLog();
    }
}
exports.describe = describe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGVzY3JpYmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx1REFBb0Q7QUFFcEQsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxpQ0FBZSxFQUFFLENBQUM7QUFFbEQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBRWQsU0FBUyxLQUFLO0lBQ1osT0FBTyxLQUFLLEVBQUUsQ0FBQztBQUNqQixDQUFDO0FBRU0sS0FBSyxVQUFVLFFBQVEsQ0FDNUIsUUFBZ0IsRUFDaEIsUUFBMEIsRUFDMUIsT0FBZSxDQUFDLEVBQ2hCLEtBQWEsS0FBSyxFQUFFLEVBQ3BCLFdBQW1CLENBQUM7SUFFcEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUN6QixJQUFJLG1CQUFtQixHQUFHLEtBQUssQ0FBQztJQUNoQyxNQUFNLEtBQUssR0FBRztRQUNaLElBQUk7UUFDSixRQUFRO1FBQ1IsbUJBQW1CLEVBQUUsS0FBSztRQUMxQixFQUFFO1FBQ0YsUUFBUTtLQUNULENBQUM7SUFDRixRQUFRLG1CQUFNLEtBQUssSUFBRSxRQUFRLEVBQUUsT0FBTyxJQUFHLENBQUM7SUFFMUMsSUFBSTtRQUNGLE1BQU0sUUFBUSxDQUNaLEtBQUssRUFBRSxXQUFtQixFQUFFLFdBQTZCLEVBQUUsRUFBRTtZQUMzRCxJQUFJLG1CQUFtQixLQUFLLEtBQUssRUFBRTtnQkFDakMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixRQUFRLG1CQUFNLEtBQUssSUFBRSxRQUFRLEVBQUUsdUJBQXVCLElBQUcsQ0FBQzthQUMzRDtZQUNELE1BQU0sUUFBUSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FDRixDQUFDO1FBQ0YsUUFBUSxtQkFBTSxLQUFLLElBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLFNBQVMsSUFBRyxDQUFDO0tBQ2xFO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixRQUFRLG1CQUNILEtBQUssSUFDUixtQkFBbUIsRUFDbkIsUUFBUSxFQUFFLE9BQU8sRUFDakIsS0FBSyxFQUFFLENBQUMsSUFDUixDQUFDO0tBQ0o7SUFFRCxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDZCxPQUFPLFNBQVMsRUFBRSxDQUFDO0tBQ3BCO0FBQ0gsQ0FBQztBQXpDRCw0QkF5Q0MifQ==