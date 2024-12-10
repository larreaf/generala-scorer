import styled from '@emotion/styled';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Casino as CasinoIcon,
} from '@mui/icons-material';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import useScorer from '../../hooks/useScorer';
import { useNavigate } from 'react-router-dom';

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
  const [fruitsInBasket, setFruitsInBasket] = React.useState<Array<string>>([]);
  const [playerName, setPlayerName] = React.useState<string>("");

  const { addUser, removeUser, getUsers } = useScorer();

  // for (let i = 0; i < fruitsInBasket.length; i++) {
  //   addUser(fruitsInBasket[i]);
  // }

  const handleAddFruit = () => {
    const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
    if (nextHiddenItem) {
      setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
      const fruit = nextHiddenItem.split(' ')[0]
      const player = fruit + ' ' + playerName;
      addUser(player);
    }
  };

  const handleRemoveFruit = (item: string) => {
    setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
    removeUser(item);
  };

  return (
    <StyledUsers>
      <Button
        variant='outlined'
        size='large'
        sx={{marginTop: '16px'}}
        onClick={() => navigate("/scorer")}
      >
        Play
        <CasinoIcon />
      </Button>
      <List sx={{ mt: 1 }}>
        <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="add-player"
              title="Add player"
              size='small'
              disabled={fruitsInBasket.length >= FRUITS.length}
              onClick={handleAddFruit}
            >
              <AddIcon />
            </IconButton>
          }
        >
          <ListItem>
            <TextField
              size='small'
              onChange={(e) => setPlayerName(e.target.value)} />
          </ListItem>
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