import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  Spinner,
  useToast,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import StatCard, { Agency } from '../components/StatCard';
import { SearchBar } from '../components/SearchBar';
import { SortButton } from '../components/SortButton';
import { useSortAndFilter } from '../hooks/useSortAndFilter';
import { API_BASE_URL } from '../config/env';

const Agencies = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    sortDirection,
    handleSort,
    filteredAndSortedItems: filteredAndSortedAgencies
  } = useSortAndFilter<Agency>(agencies);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Agency[]>(`${API_BASE_URL}/api/agencies`);
        setAgencies(response.data);
      } catch (error) {
        console.error('Failed to fetch agencies:', error);
        toast({
          title: 'Error',
          description: 'Failed to load agencies. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgencies();
  }, [toast]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="200px">
        <Spinner size="xl" color="blue.400" />
      </Flex>
    );
  }

  return (
    <Box maxW="1600px" mx="auto" px={{ base: 2, sm: 2, md: 3 }}>
      <Flex direction="column" gap={{ base: 3, md: 4 }}>
        <Box mb={2}>
          <Heading size="xl" color="white" letterSpacing="tight" mb={1}>
            Federal Regulations by Agency
          </Heading>
          <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
            Browse and explore federal regulations by agency
          </Text>
        </Box>

        <Box mb={2}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search agencies..."
          />
        </Box>

        <Stack 
          direction={{ base: 'column', sm: 'row' }} 
          spacing={2} 
          w="full" 
          justify="flex-start"
          flexWrap="wrap"
          mb={2}
        >
          <SortButton
            label="Sort by Name"
            sortKey="name"
            currentSortKey={sortBy}
            sortDirection={sortDirection}
            onClick={() => handleSort('name')}
          />
          <SortButton
            label="Sort by Words"
            sortKey="word_count"
            currentSortKey={sortBy}
            sortDirection={sortDirection}
            onClick={() => handleSort('word_count')}
          />
          <SortButton
            label="Sort by Sections"
            sortKey="sections"
            currentSortKey={sortBy}
            sortDirection={sortDirection}
            onClick={() => handleSort('sections')}
          />
        </Stack>

        <Grid 
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          }}
          gap={{ base: 2, md: 3 }}
        >
          {filteredAndSortedAgencies.map((agency, index) => (
            <StatCard
              key={agency.slug}
              agency={agency}
              delay={index * 0.1}
            />
          ))}
        </Grid>

        {filteredAndSortedAgencies.length === 0 && (
          <Text 
            color="gray.400" 
            fontSize="md" 
            textAlign="center" 
            mt={4}
          >
            No agencies found matching your search.
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default Agencies; 