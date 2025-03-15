import type HeroInterface from "../interfaces/HeroInterface";
import type AttributesInterface from "../interfaces/HeroInterface";

const getClimbingSkyscrapersScore = (attributes: AttributesInterface): number => {
    return (attributes.strength * 4) - (attributes.weight * 2);
};

const getTellJokesScore = (idHero: string, heroes: HeroInterface[]): number => {
    const hero = heroes.find(hero => hero.id === idHero);
    if (!hero) {    
        return 0;
    }
    const sumOpponentsCharisma = heroes
        .filter(h => h.id !== idHero)
        .reduce((acc, hero) => acc + hero.attributes.charisma, 0);
    return (hero.attributes.charisma ^ 2) - (sumOpponentsCharisma);
}

const getVillainShotScore = (attributes: AttributesInterface, isLast: boolean): number => {
    return attributes.agility + attributes.strength + (isLast ? 5 : 0);
};

const get200kmRunScore = (attributes: AttributesInterface, villainShotScoreLast: boolean): number => {
    return (attributes.agility * 4) + (attributes.endurance * 2) + (villainShotScoreLast ? 10 : -1);
}

const get100CatsRescueScore = (attributes: AttributesInterface, wonTwoTests: boolean): number => {
    return (attributes.agility * 2) + (wonTwoTests ? 5 : 0);
}

const getScores = (heroes: HeroInterface[]): {[key: string]: number} => {
    let heroesScores: {[key: string]: number} = {};
    let testWins: {[key: string]: number} = {};

    heroes.forEach(hero => {
        heroesScores[hero.id!] = 0;
        testWins[hero.id!] = 0;
    });

    const tests = [
        getClimbingSkyscrapersScore,
        (hero: HeroInterface) => getTellJokesScore(hero.id!, heroes),
        (hero: HeroInterface, isLast: boolean) => getVillainShotScore(hero.attributes, isLast),
        (hero: HeroInterface, isFirst: boolean) => get200kmRunScore(hero.attributes, isFirst),
        (hero: HeroInterface, wonTwoTests: boolean) => get100CatsRescueScore(hero.attributes, wonTwoTests)
    ];

    tests.forEach((test, index) => {
        let testScores: {[key: string]: number} = {};

        heroes.forEach(hero => {
            if (index === 2) {
                const isLast = hero.id === Object.keys(heroesScores).reduce((a, b) => heroesScores[a] < heroesScores[b] ? a : b);
                testScores[hero.id!] = test(hero, isLast);
            } else if (index === 3) {
                const isFirst = hero.id === Object.keys(heroesScores).reduce((a, b) => heroesScores[a] > heroesScores[b] ? a : b);
                testScores[hero.id!] = test(hero, isFirst);
            } else if (index === 4) {
                const wonTwoTests = testWins[hero.id!] >= 2;
                testScores[hero.id!] = test(hero, wonTwoTests);
            } else {
                testScores[hero.id!] = test(hero, false);
            }
        });

        const sortedHeroes = Object.entries(testScores).sort(([, a], [, b]) => b - a);

        sortedHeroes.forEach(([heroId], rank) => {
            if (rank === 0) {
                heroesScores[heroId] += 5;
            } else if (rank === 1) {
                heroesScores[heroId] += 3;
            } else if (rank === 2) {
                heroesScores[heroId] += 1;
            }
        });

        sortedHeroes.slice(0, 3).forEach(([heroId]) => {
            testWins[heroId] += 1;
        });
    });

    return heroesScores;
}

export default getScores;