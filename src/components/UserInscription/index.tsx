import styled from '@emotion/styled';
import {
  Add as AddIcon,
  Casino as CasinoIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import useScorer from '../../hooks/useScorer';

const StyledUsers = styled.div`
  background-color: white;
  color: black;
  border: 5px black;
  border-radius: 30px;
  padding: 8px;
`

// const StyledHeader = styled.div`
//   padding-left: 16px;
//   padding-right: 16px;
//   height: 46px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `

const FRUITS = [
  '🍏 Apple',
  '🍌 Banana',
  '🍍 Pineapple',
  '🥥 Coconut',
  '🍉 Watermelon',
];

interface RenderItemOptions {
  item: string;
  handleRemoveFruit: (item: string) => void;
}

function renderItem({ item, handleRemoveFruit }: RenderItemOptions) {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveFruit(item)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={item} />
    </ListItem>
  );
}

const UserInscription = () => {
  const navigate = useNavigate();

  const [inputError, setInputError] = useState<boolean>(false);

  const [playerName, setPlayerName] = useState<string>("");

  const { addUser, removeUser, getUsers } = useScorer();

  const handleAddFruit = () => {
    const nextHiddenItem = FRUITS.find((f) => !getUsers.find(u => u.split(' ')[0] == f.split(' ')[0]));
    if (nextHiddenItem) {
      // setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
      const fruit = nextHiddenItem.split(' ')[0]
      const player = fruit + ' ' + playerName;
      addUser(player);
      setPlayerName("");
    }
  };

  const handleRemoveFruit = (item: string) => {
    // setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
    removeUser(item);
    setInputError(false);
  };

  const errorHelperText = useMemo(() => {
    if (inputError) {
      return 'You cannot add more players';
    }

    return '';
  }, [inputError]);

  const disableInput = useMemo(() => {
    return getUsers.length >= FRUITS.length;
  }, [getUsers])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (disableInput) {
      setInputError(true);
      return;
    }

    handleAddFruit();
  }

  return (
    <StyledUsers>
      <Button
        variant='outlined'
        size='large'
        sx={{ marginTop: '16px' }}
        disabled={getUsers.length == 0}
        onClick={() => navigate("/scorer")}
      >
        Play
        <CasinoIcon />
      </Button>
      <List sx={{ mt: 1 }}>
        <ListItem>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextField
                  error={errorHelperText != ''}
                  size='small'
                  value={playerName}
                  placeholder="Enter player name"
                  onChange={(e) => setPlayerName(e.target.value)}
                />
                <IconButton
                  edge="end"
                  aria-label="add-player"
                  title="Add player"
                  size='small'
                  disabled={disableInput}
                  onClick={handleAddFruit}
                >
                  <AddIcon />
                </IconButton>
              </div>
              <FormHelperText error={errorHelperText != ''} >{errorHelperText}</FormHelperText>
            </FormControl>
          </form>
        </ListItem>
      </List>
      <List sx={{ mt: 1 }}>
        <TransitionGroup>
          {getUsers.map((item) => (
            <Collapse key={item}>{renderItem({ item, handleRemoveFruit })}</Collapse>
          ))}
        </TransitionGroup>
      </List>
    </StyledUsers>
  );
}

export default UserInscription;