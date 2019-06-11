const { moveCursor, clearScreenDown } = require("readline");
process.stdout.write("line 1\n");
process.stdout.write("line 2\n");
process.stdout.write("line 3\n");

moveCursor(process.stdout, 0, -2);
clearScreenDown(process.stdout);

process.stdout.write("line new 2\n");
process.stdout.write("line new 3\n");
process.stdout.write("line new 4\n");
