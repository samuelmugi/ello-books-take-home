import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import { Book } from '../types';

interface SearchBarProps {
    onSearch: (query: string) => void;
    options: Book[]; // Add options prop to the SearchBarProps interface
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, options }) => {
    const [query, setQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState<Book[]>(options);

    useEffect(() => {
        // Filter books based on search query
        const filtered = options.filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredBooks(filtered);
    }, [query, options]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
            <Autocomplete
                options={filteredBooks}
                getOptionLabel={(option: Book) => option.title}
                style={{ width: 300 }}
                inputValue={query}
                onInputChange={(event, value) => setQuery(value)}
                onChange={(event, newValue) => {
                    if (newValue) {
                        onSearch(newValue.title);
                    } else {
                        onSearch(query);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search for a book title"
                        variant="outlined"
                        color="primary"
                    />
                )}
            />
        </Box>
    );
};

export default SearchBar;
