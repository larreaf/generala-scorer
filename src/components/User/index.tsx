import {
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import useScorer from '../../hooks/useScorer';
import { TextField } from '@mui/material';

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

const Users = () => {
  const [fruitsInBasket, setFruitsInBasket] = React.useState(FRUITS.slice(0, 3));
  const { addUser, removeUser, getUsers } = useScorer();

  for (let i = 0; i < fruitsInBasket.length; i++) {
    addUser(fruitsInBasket[i]);
  }

  const handleAddFruit = () => {
    const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
    if (nextHiddenItem) {
      setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
      addUser(nextHiddenItem)
    }
  };

  const handleRemoveFruit = (item: string) => {
    setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
    removeUser(item);
  };

  return (
    <div>
      <TextField></TextField>
      <Button
        variant="contained"
        disabled={fruitsInBasket.length >= FRUITS.length}
        onClick={handleAddFruit}
      >
        <AddIcon />
      </Button>
      <List sx={{ mt: 1 }}>
        <TransitionGroup>
          {getUsers.map((item) => (
            <Collapse key={item}>{renderItem({ item, handleRemoveFruit })}</Collapse>
          ))}
        </TransitionGroup>
      </List>
    </div>
  );
}

export default Users;