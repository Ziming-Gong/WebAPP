const path = require('/Users/ming/Desktop/Class/INFO6250/student--Ziming-Gong/work/setup-test');

const people = `
Name           |  NEUID   | Slack handle | github ID
Ziming Gong    | 010029417| @Ziming Gong | Ziming-Gong

`.split('\n').filter( truthy => truthy );

if (require.main === module) {
  // Run if we are being run directly

  // List the people
  for ( person of people ) {
    console.log(person);
  }
}
// If not being run directly, return the text
module.exports = people;
