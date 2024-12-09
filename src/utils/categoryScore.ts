import { Categories } from "../redux/score"

const ones = [0, 1, 2, 3, 4, 5, 6]
const twos = [0, 2, 4, 6, 8, 10]
const threes = [0, 3, 6, 9, 12, 15]
const fours = [0, 4, 8, 12, 16, 20]
const fives = [0, 5, 10, 15, 20, 25]
const sixes = [0, 6, 12, 18, 24, 30]
const fullHouse = [0, 30, 35]
const straight = [0, 20, 25]
const poker = [0, 40, 45]
const generala = [0, 50]
const doubleGenerala = [0, 100]

type CategoryScores = {
    [index in Categories]: number[];
}

const scores: CategoryScores = {
    "ones": ones,
    "twos": twos,
    "threes": threes,
    "fours": fours,
    "fives": fives,
    "sixes": sixes,
    "straight": straight,
    "fullHouse": fullHouse,
    "poker": poker,
    "generala": generala,
    "doubleGenerala": doubleGenerala,
}

export const getScoreForCategory = (category: Categories): number[] => {
    const score = scores[category];
    if (score === undefined)
        return [];
    return score;
};