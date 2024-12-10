import { useSelector, useDispatch } from 'react-redux';
import {
    addUser as addUserAction,
    removeUser as removeUserAction,
    Categories,
    getScore as getScoreSelector,
    getUsers as getUsersSelector,
    ScoreValue,
    updateScore as updateScoreAction
} from '../redux/score'


const useScorer = () => {
    const getScore = useSelector(getScoreSelector);
    const getUsers = useSelector(getUsersSelector);

    const dispatch = useDispatch();
    const addUser = (username: string) => dispatch(addUserAction({username}));
    const removeUser = (username: string) => dispatch(removeUserAction({username}));
    const updateScore = (username: string, category: Categories, score: ScoreValue) => 
        dispatch(updateScoreAction({username, category, score}));
    
    const categories = Object.values(Categories);
    
    return {
        getScore,
        getUsers,
        addUser,
        removeUser,
        updateScore,
        categories,
    };
};

export default useScorer;