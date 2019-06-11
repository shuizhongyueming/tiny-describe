"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _groupNameGenerator = (deep, specName) => {
    const prefix = `${"  ".repeat(deep)}${"#".repeat(deep)}`;
    return `${prefix} ${specName}`;
};
function setGroupNameGenerator(gng) {
    _groupNameGenerator = gng;
}
exports.setGroupNameGenerator = setGroupNameGenerator;
exports.groupNameGenerator = (...args) => _groupNameGenerator(...args);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBOYW1lR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2dyb3VwTmFtZUdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLElBQUksbUJBQW1CLEdBQXVCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFO0lBQy9ELE1BQU0sTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDekQsT0FBTyxHQUFHLE1BQU0sSUFBSSxRQUFRLEVBQUUsQ0FBQztBQUNqQyxDQUFDLENBQUM7QUFFRixTQUFnQixxQkFBcUIsQ0FBQyxHQUF1QjtJQUMzRCxtQkFBbUIsR0FBRyxHQUFHLENBQUM7QUFDNUIsQ0FBQztBQUZELHNEQUVDO0FBRVksUUFBQSxrQkFBa0IsR0FBdUIsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQ2hFLG1CQUFtQixDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMifQ==