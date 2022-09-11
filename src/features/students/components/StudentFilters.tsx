import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { City, ListParams } from 'models';
import { ChangeEvent, useRef } from "react";

export interface StudentFiltersProps {
    filter: ListParams;
    cityList: City[];
    onChange?: (newFilter: ListParams) => void;
    onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({ filter, onChange, onSearchChange, cityList }: StudentFiltersProps) {

    const searchRef = useRef<HTMLInputElement>()

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;
        const newFilter = {
            ...filter,
            name_like: e.target.value,
            _page: 1
        }
        onSearchChange(newFilter)
    }

    const handleCityChange = (e: SelectChangeEvent) => {
        if (!onChange) return;
        const newFilter = {
            ...filter,
            _page: 1,
            city: e.target.value || undefined
        }
        onChange(newFilter)
    }

    const handleSortChange = (e: SelectChangeEvent) => {
        if (!onChange) return;
        const value = e.target.value;
        const [_sort, _order] = value.split('.')
        const newFilter = {
            ...filter,
            _sort: _sort || undefined,
            _order: (_order as "asc" | "desc") || undefined
        }
        onChange(newFilter)
    }

    const handleClearFilter = () => {
        if (!onChange) return;
        const newFilter = {
            ...filter,
            _sort: undefined,
            _order: undefined,
            name_like: undefined,
            city: undefined
        }
        onChange(newFilter)
        if (searchRef.current) {
            searchRef.current.value = ''
        }
    }

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={5}>
                    <FormControl fullWidth size="small">
                        <InputLabel htmlFor="search">Search by name</InputLabel>
                        <OutlinedInput
                            id="search"
                            label="Search by name"
                            endAdornment={<SearchIcon />}
                            defaultValue={filter.name_like || ''}
                            onChange={handleSearchChange}
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <FormControl fullWidth size='small'>
                        <InputLabel id="city">Filter by city</InputLabel>
                        <Select
                            id="city"
                            label="Filter by city"
                            value={filter.city || ''}
                            onChange={handleCityChange}
                        >
                            <MenuItem value=''>
                                <em>All</em>
                            </MenuItem>
                            {cityList.map(city => (<MenuItem key={city.code} value={city.code}>{city.name}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <FormControl fullWidth size='small'>
                        <InputLabel id="sortBy">Sort</InputLabel>
                        <Select
                            id="sortBy"
                            label="Sort"
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                            onChange={handleSortChange}
                        >
                            <MenuItem value=''>
                                <em>No sort</em>
                            </MenuItem>
                            <MenuItem value="name.asc">Name ASC</MenuItem>
                            <MenuItem value="name.desc">Name DESC</MenuItem>
                            <MenuItem value="mark.asc">Mark ASC</MenuItem>
                            <MenuItem value="mark.desc">Mark DESC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={1}>
                    <Button variant='outlined' color="primary" fullWidth onClick={handleClearFilter}>Clear</Button>
                </Grid>

            </Grid>
        </Box>
    );
}
