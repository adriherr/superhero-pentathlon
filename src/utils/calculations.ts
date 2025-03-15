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
        heroesScores[hero.id!] = getClimbingSkyscrapersScore(hero.attributes);
        testWins[hero.id!] = 0;
    });

    heroes.forEach(hero => {
        heroesScores[hero.id!] += getTellJokesScore(hero.id!, heroes);
    });


    let minScore = Infinity;
    let lastHero = '';
    
    Object.entries(heroesScores).forEach(([heroId, heroScore]) => {
    if (heroScore < minScore) {
        lastHero = heroId;
    }
    });
      

    // heroes.forEach(hero => {
    //     const isLast: boolean = hero.id === lowestVillainShotHeroId;
    //     const score = getVillainShotScore(hero.attributes, isLast);
    //     heroesScores[hero.id!] += score;
    //     if (score > highestVillainShotScore) {
    //         highestVillainShotScore = score;
    //         highestVillainShotHeroId = hero.id!;
    //     }
    // });

    // heroes.forEach(hero => {
    //     const isLast: boolean = hero.id === highestVillainShotHeroId;
    //     heroesScores[hero.id!] += get200kmRunScore(hero.attributes, isLast);
    // });

    // heroes.forEach(hero => {
    //     const wonTwoTests = testWins[hero.id!] >= 2;
    //     heroesScores[hero.id!] += get100CatsRescueScore(hero.attributes, wonTwoTests);
    // });

    return heroesScores;
}

export default getScores;