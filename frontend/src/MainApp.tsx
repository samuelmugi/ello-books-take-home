import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button,
  Grow,
} from "@mui/material";
import SearchBar from "./components/SearchBar";
import ReadingList from "./components/ReadingList"; 
import { Book } from "./types";

const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel 
      title
    }
  }
`;

const MainApp: React.FC = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage("");
    }, 5000); 

    return () => clearTimeout(timer);
  }, [alertMessage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredBooks = data?.books.filter((book: { title: string }) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredBooks || []);
    }
  };

  const handleAddToReadingList = (book: Book) => {
    if (!readingList.some((existingBook) => existingBook.title === book.title)) {
      setReadingList([...readingList, book]);
      setAlertMessage(`"${book.title}" added to reading list.`);
    } else {
      setAlertMessage(`"${book.title}" is already in the reading list.`);
    }
  };

  const handleRemoveFromReadingList = (bookToRemove: Book) => {
    setReadingList(
      readingList.filter((book) => book.title !== bookToRemove.title)
    );
    setAlertMessage(`"${bookToRemove.title}" removed from reading list.`);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    }
  }, [searchQuery]);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <div>
          <Typography variant="h5" gutterBottom align="center">
            Loading the coolest books...
          </Typography>
          <CircularProgress />
        </div>
      </Box>
    );
  }

  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  return (
    <Box my={4} mx={2} p={2}>
      <Typography variant="h4" align="center" gutterBottom>
        Teacher's Book Selection
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchBar onSearch={handleSearch} options={data.books} />
        </Grid>

        {(searchResults.length > 0 || searchQuery.trim() !== '') && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="center">
              Search Results
            </Typography>
            <Grow in>
              <Grid container spacing={2} justifyContent="center">
                {searchResults.map((book) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={book.title}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {book.title}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          by {book.author}
                        </Typography>
                        {book.coverPhotoURL && (
                          <img
                            src={process.env.PUBLIC_URL + "/" + book.coverPhotoURL}
                            alt={book.title}
                            style={{ maxWidth: "100%", height: "auto", marginBottom: 10 }}
                          />
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAddToReadingList(book)}
                          fullWidth
                        >
                          Add to Reading List
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grow>
          </Grid>
        )}

        <Grid item xs={12}>
          <ReadingList
            readingList={readingList}
            onRemoveFromReadingList={handleRemoveFromReadingList}
          />
        </Grid>

        {alertMessage && (
          <Grid item xs={12}>
            <Alert severity="success">{alertMessage}</Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MainApp;
