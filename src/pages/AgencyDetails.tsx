import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  Button,
  Spinner,
  useToast,
  Stack,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import StatCard, { Agency } from '../components/StatCard';
import { SearchBar } from '../components/SearchBar';
import { SortButton } from '../components/SortButton';
import { useSortAndFilter } from '../hooks/useSortAndFilter';
import { formatNumber } from '../utils/format';
import { API_BASE_URL } from '../config/env';

const AgencyDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [agency, setAgency] = useState<Agency | null>(null);
  const [childAgencies, setChildAgencies] = useState<Agency[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    sortDirection,
    handleSort,
    filteredAndSortedItems: filteredAndSortedChildAgencies
  } = useSortAndFilter<Agency>(childAgencies);

  useEffect(() => {
    const fetchAgencyDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<{ agency: Agency; children: Agency[] }>(
          `${API_BASE_URL}/api/agencies/${slug}`
        );
        setAgency(response.data.agency);
        setChildAgencies(response.data.children);
      } catch (error) {
        console.error('Failed to fetch agency details:', error);
        toast({
          title: 'Error',
          description: 'Failed to load agency details. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchAgencyDetails();
    }
  }, [slug, toast]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="200px">
        <Spinner size="xl" color="blue.400" />
      </Flex>
    );
  }

  if (!agency) {
    return (
      <Box textAlign="center" color="gray.400">
        Agency not found
      </Box>
    );
  }

  const renderStats = () => (
    <Flex 
      direction={{ base: 'column', sm: 'row' }}
      gap={{ base: 3, sm: 4 }}
    >
      <Box>
        <Text color="gray.400" fontSize="sm">Total Words</Text>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="blue.400">
          {formatNumber(agency.word_count)}
        </Text>
      </Box>
      <Box>
        <Text color="gray.400" fontSize="sm">Total Sections</Text>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="white">
          {formatNumber(agency.sections)}
        </Text>
      </Box>
      <Box>
        <Text color="gray.400" fontSize="sm">Child Agencies</Text>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="green.400">
          {childAgencies.length}
        </Text>
      </Box>
    </Flex>
  );

  const renderChildAgencies = () => {
    if (childAgencies.length === 0) {
      return <Text color="gray.400">This agency has no child agencies.</Text>;
    }

    return (
      <Flex direction="column" gap={3}>
        <Box>
          <Heading size="lg" mb={2}>Child Agencies</Heading>
          <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
            Browse and manage child agencies
          </Text>
        </Box>

        <Box mb={2}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search child agencies..."
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
          {filteredAndSortedChildAgencies.map((childAgency, index) => (
            <StatCard
              key={childAgency.slug}
              agency={childAgency}
              delay={index * 0.1}
              isClickable={false}
            />
          ))}
        </Grid>

        {filteredAndSortedChildAgencies.length === 0 && (
          <Text 
            color="gray.400" 
            fontSize="md" 
            textAlign="center" 
            mt={4}
          >
            No child agencies found matching your search.
          </Text>
        )}
      </Flex>
    );
  };

  return (
    <Box maxW="1600px" mx="auto" px={{ base: 2, sm: 2, md: 3 }}>
      <Flex direction="column" gap={{ base: 3, md: 4 }}>
        <Box mb={2}>
          <Button
            leftIcon={<FaArrowLeft />}
            variant="ghost"
            onClick={() => navigate('/agencies')}
            size="sm"
            alignSelf="flex-start"
            mb={2}
          >
            Back to Agencies
          </Button>

          <Heading size="xl" color="white" letterSpacing="tight" mb={2}>
            {agency.name}
          </Heading>
          {renderStats()}
        </Box>

        <Box>
          {childAgencies.length === 0 ? (
            <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
              This agency has no child agencies.
            </Text>
          ) : (
            <Flex direction="column" gap={3}>
              {renderChildAgencies()}
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default AgencyDetails; 