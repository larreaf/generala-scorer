import { Box, Button, ButtonGroup, MenuItem, Modal, TextField } from '@mui/material'
import useScorer from '../../hooks/useScorer';
import { Category, ScoreValue } from '../../redux/score';
import { useEffect, useState } from 'react';
import { current } from '@reduxjs/toolkit';
import useCategoryScore from '../../hooks/useCategoryScore';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    // bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '25px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    justifyContent: 'center',
    alignItems: 'stretch',
};

interface ScoreModalProps {
    open: boolean;
    handleClose: () => void;
    player: string;
    category: Category;
}

const ScoreModal = (
    { open, handleClose, player, category }: ScoreModalProps
) => {
    // const [scoreValue, setScoreValue] = useState<number>(currentValue)
    // const [crossedOut, setCrossedOut] = useState<boolean>(isCrossedOut)
    const { updateScore } = useScorer()
    const { getScore } = useCategoryScore();

    const scores = getScore(category);

    const handleSubmit = (crossedOut: boolean, scoreValue: number) => {
        const score: ScoreValue = {
            crossedOut: crossedOut,
            value: scoreValue
        };
        updateScore(player, category, score);
        handleClose();
    }

    // useEffect(() => {
    //     setScoreValue(currentValue);
    //     setCrossedOut(isCrossedOut);
    // }, [open]);

    return (
        <Modal
            open={open}
            onClose={handleClose}>
            <Box
                component="form"
                display="flex"
                flexDirection="column"
                p={2}
                bgcolor="white"
                sx={{ ...style }}
            >
                <ButtonGroup
                    orientation="vertical"
                    aria-label="Vertical button group"
                    variant="text"
                >
                    <Button onClick={() => {
                        handleSubmit(true, 0);
                    }}>
                        {'Cross Out'}
                    </Button>
                    {scores.map(s => (
                        <Button key={s} onClick={() => {
                            handleSubmit(false, s);
                        }}>
                            {s}
                        </Button>
                    ))}
                    <Button onClick={handleClose} color={'error'}>
                        {'Cancel'}
                    </Button>
                </ButtonGroup>
            </Box>
        </Modal>
    );
};

export default ScoreModal;