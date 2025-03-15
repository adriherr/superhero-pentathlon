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

    // Calculate Climbing Skyscrapers Score
    heroes.forEach(hero => {
        heroesScores[hero.id!] = getClimbingSkyscrapersScore(hero.attributes);
        testWins[hero.id!] = 0;
    });

    // Calculate Tell Jokes Score
    heroes.forEach(hero => {
        heroesScores[hero.id!] += getTellJokesScore(hero.id!, heroes);
    });

    // Calculate Villain Shot Score
    let minScore = Infinity;
    let lastHero = '';
    
    Object.entries(heroesScores).forEach(([heroId, heroScore]) => {
        if (heroScore < minScore) {
            minScore = heroScore;
            lastHero = heroId;
        }
    });

    heroes.forEach(hero => {
        const isLast: boolean = hero.id === lastHero;
        const score = getVillainShotScore(hero.attributes, isLast);
        heroesScores[hero.id!] += score;
        if (score > 0) {
            testWins[hero.id!] += 1;
        }
    });

    // Calculate 200km Run Score
    let maxVillainShotScore = -Infinity;
    let firstHero = '';

    Object.entries(heroesScores).forEach(([heroId, heroScore]) => {
        if (heroScore > maxVillainShotScore) {
            maxVillainShotScore = heroScore;
            firstHero = heroId;
        }
    });

    heroes.forEach(hero => {
        const isFirst: boolean = hero.id === firstHero;
        const score = get200kmRunScore(hero.attributes, isFirst);
        heroesScores[hero.id!] += score;
        if (score > 0) {
            testWins[hero.id!] += 1;
        }
    });

    // Calculate 100 Cats Rescue Score
    heroes.forEach(hero => {
        const wonTwoTests = testWins[hero.id!] >= 2;
        heroesScores[hero.id!] += get100CatsRescueScore(hero.attributes, wonTwoTests);
    });

    return heroesScores;
}

export default getScores;