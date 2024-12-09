import { useSelector, useDispatch } from 'react-redux';
import {
    addUser as addUserAction,
    Categories,
    getScore as getScoreSelector,
    ScoreValue,
    updateScore as updateScoreAction
} from '../redux/score'


const useScorer = () => {
    const getScore = useSelector(getScoreSelector);

    const dispatch = useDispatch();
    const addUser = (username: string) => dispatch(addUserAction(username));
    const updateScore = (username: string, category: Categories, score: ScoreValue) => 
        dispatch(updateScoreAction({username, category, score}));
    
    const categories = Object.values(Categories);
    
    return {
        getScore,
        addUser,
        updateScore,
        categories,
    };
};

export default useScorer;