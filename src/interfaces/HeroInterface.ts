export default interface AttributesInterface {
    agility: number;
    strength: number;
    weight: number;
    endurance: number;
    charisma: number;
}

export default interface HeroInterface {
    id?: string;
    updatedAt?: string;
    createdAt?: string;
    name: string;
    picture?: string;
    attributes: AttributesInterface;
}