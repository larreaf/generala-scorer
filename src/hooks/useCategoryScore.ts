import { Categories } from "../redux/score"
import { getScoreForCategory } from "../utils/categoryScore"

const useCategoryScore = () => {
    const getScore = (category: Categories) => getScoreForCategory(category)

    return {
        getScore
    }
}

export default useCategoryScore;