import React from 'react';
import { List, ListItem, ListItemText, Button, Box, Grow, Card, CardContent, Typography } from '@mui/material';
import { Book } from '../types';

interface BookListProps {
    books: Book[];
    onAddToReadingList?: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onAddToReadingList }) => {
    return (
        <Box my={2}>
            <List>
                {books.map((book) => (
                    <Grow in key={book.title}>
                        <ListItem>
                            <Card variant="outlined" style={{ width: "100%" }}>
                                <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={process.env.PUBLIC_URL + "/" + book.coverPhotoURL}
                                        alt={book.title}
                                        style={{ marginRight: 16, maxWidth: 100 }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <Typography variant="h6">{book.title}</Typography>
                                        <Typography variant="subtitle1">by {book.author}</Typography>
                                    </div>
                                    {onAddToReadingList && (
                                        <Button onClick={() => onAddToReadingList(book)} variant="outlined" color="primary">
                                            Add to Reading List
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </ListItem>
                    </Grow>
                ))}
            </List>
        </Box>
    );
};

export default BookList;
