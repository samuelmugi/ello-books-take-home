import React from 'react';
import { List, ListItem, ListItemText, Button, Box, Grow, Card, CardContent, Typography } from '@mui/material';
import { Book } from '../types';

interface ReadingListProps {
    readingList: Book[];
    onRemoveFromReadingList?: (bookToRemove: Book) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({ readingList, onRemoveFromReadingList }) => {
    if (readingList.length === 0) {
        return null; // If reading list is empty, don't render anything
    }

    return (
        <Box my={2}>
          <Typography variant="h6" gutterBottom align="center">
            Reading List
          </Typography>
          <Grow in>
            <Card variant="outlined">
              <CardContent>
                <List>
                  {readingList.map((book) => (
                    <ListItem key={book.title}>
                      {book.coverPhotoURL && (
                        <img
                          src={process.env.PUBLIC_URL + "/" + book.coverPhotoURL}
                          alt={book.title}
                          style={{ marginRight: 16, maxWidth: 100 }}
                        />
                      )}
                      <ListItemText primary={book.title} secondary={book.author} />
                      {onRemoveFromReadingList && (
                        <Button
                          onClick={() => onRemoveFromReadingList(book)}
                          variant="outlined"
                          color="secondary"
                        >
                          Remove from Reading List
                        </Button>
                      )}
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grow>
        </Box>
    );
};

export default ReadingList;
