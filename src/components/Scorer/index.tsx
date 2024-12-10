import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import useScorer from '../../hooks/useScorer';
import { Categories, Score, ScoreValue } from "../../redux/score";
import { AppDispatch } from "../../redux/store";
import ScoreModal from "./modal";

interface styledScore {
    scoreValue: number
}

const Cell = styled.td`
    border: 1px solid #ccc;
    padding: 5px;
    text-align: center;
`

const Scored = styled(Cell) <styledScore>`
    background-color: ${p => p.scoreValue > 0 ? 'green' : 'inherit'};
    :before {
        content: "${p => p.scoreValue}";
    }
`

const CrossedOut = styled(Cell)`
    background-color: red;
    color: white;
    :before {
        content: "X";
    }
`

const getTotal = (score: Score) => {
    const total = Object.entries(score)
        .map(v => v[1])
        .map(score => {
            if (score.crossedOut) {
                return 0;
            }
            return score.value;
        })
        .reduce((sum, value) => sum + value);

    return total;
}

interface RenderItemOptions {
    player: string;
    category: Categories;
    score: ScoreValue;
    handleOpenModal: (player: string, category: Categories) => void;
}

const renderScore = ({ player, category, score, handleOpenModal }: RenderItemOptions) => {
    if (score.crossedOut) {
        return (<CrossedOut key={category} />)
    }
    return (
        <Scored
            key={category}
            scoreValue={score.value}
            onClick={() => handleOpenModal(
                player,
                category,
            )}
        />
    )
    // <td
    //     key={categories[i]}
    //     style={{
    //         border: '1px solid #ccc',
    //         padding: '5px',
    //         textAlign: 'center',
    //         backgroundColor: score.crossedOut ? 'red': 'transparent',
    //         color: score.crossedOut ? 'white': 'inherit',
    //         // textDecoration: score.crossedOut ? 'line-through' : 'none',
    //     }}
    //     onClick={() => handleOpenModal(
    //         row.player,
    //         categories[i],
    //         score.value,
    //         score.crossedOut
    //     )}
    // >
    //     {score.crossedOut ? "X" : score.value}
    // </td>
}

const Scorer = () => {
    const [selectedPlayer, setSelectedPlayer] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<Categories>();
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { addUser, getScore, categories } = useScorer();
    const dispatch = useDispatch<AppDispatch>();
    // useEffect(() => {
    //     dispatch(addUser('user1')); // Add default user or handle dynamically
    //     dispatch(addUser('user2')); // Add default user or handle dynamically
    // }, [dispatch]);


    const handleCloseModal = () => setOpenModal(false);
    const handleOpenModal = (player: string, category: Categories) => {
        setSelectedPlayer(player);
        setSelectedCategory(category);
        setOpenModal(true);
    }

    const categoriesColumns = categories.map(category => ({
        field: category,
        headerName: category.charAt(0).toUpperCase() + category.slice(1),
        width: 150,
    }));

    const columns = [
        {
            field: "player",
            headerName: "Player",
            width: 150,
        },
        ...categoriesColumns,
        {
            field: "total",
            headerName: "Total",
            width: 150,
        }
    ]

    const rows = Object.entries(getScore).map(score => {
        return {
            id: score[0],
            player: score[0],
            // ones: score[1].ones.value,
            // twos: score[1].twos.value,
            // threes: score[1].threes.value,
            // fours: score[1].fours.value,
            // fives: score[1].fives.value,
            // sixes: score[1].sixes.value,
            // straight: score[1].straight.value,
            // fullHouse: score[1].fullHouse.value,
            // poker: score[1].poker.value,
            // generala: score[1].generala.value,
            // doubleGenerala: score[1].doubleGenerala.value,
            scores: [
                score[1].ones,
                score[1].twos,
                score[1].threes,
                score[1].fours,
                score[1].fives,
                score[1].sixes,
                score[1].straight,
                score[1].fullHouse,
                score[1].poker,
                score[1].generala,
                score[1].doubleGenerala,
            ],
            total: getTotal(score[1]),
        }
    })
    console.table({ rows })

    return (
        <div>
            <ScoreModal
                open={openModal}
                handleClose={handleCloseModal}
                player={selectedPlayer}
                category={selectedCategory}
            />
            <h2>Generala score</h2>
            <table className="score-table" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        {/* <th style={{ border: '1px solid #ccc', padding: '8px' }}>Category</th> */}
                        {columns.map(column => (
                            <th key={column.field} style={{ border: '1px solid #ccc', padding: '5px' }}>{column.headerName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <tr key={row.id}>
                            <Cell
                                key={row.player}
                            >
                                {row.player}
                            </Cell>
                            {row.scores.map((score, i) => renderScore({
                                player: row.player,
                                category: categories[i],
                                score,
                                handleOpenModal
                            }))}
                            <Cell key={"total-" + row.player} >
                                {row.total}
                            </Cell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Scorer;