import { performGachaPull } from '../src/utils/gachaLogic';

const scenarios = [10, 20, 30];

for (const pulls of scenarios) {
    const res = performGachaPull(pulls, 0);
    const totalFive = res.characters.filter(c => c.rarity === 5).length;
    const totalFour = res.characters.filter(c => c.rarity === 4).length;
    console.log(`\n--- Test ${pulls} pulls ---`);
    console.log(`Visible results: ${res.characters.length}`);
    console.log(`4★: ${totalFour} | 5★: ${totalFive}`);
    console.log(`Message: ${res.message}`);
}
