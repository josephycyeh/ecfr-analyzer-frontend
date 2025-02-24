import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../utils/format';

const MotionBox = motion(Box);

export interface Agency {
  id: string;
  name: string;
  slug: string;
  word_count: number;
  sections: number;
  snapshot_date: string | null;
  created_at: string;
  updated_at: string;
}

interface StatCardProps {
  agency: Agency;
  delay: number;
  isClickable?: boolean;
}

export const StatCard = ({ agency, delay = 0, isClickable = true }: StatCardProps) => {
  const navigate = useNavigate();

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.08 }}
      p={6}
      bg="gray.900"
      rounded="lg"
      borderWidth="2px"
      borderColor="gray.700"
      boxShadow="xl"
      _hover={{ 
        transform: isClickable ? 'translateY(-3px)' : 'none',
        transition: 'all 0.2s',
        borderColor: isClickable ? 'blue.400' : 'gray.700',
      }}
      cursor={isClickable ? 'pointer' : 'default'}
      h="full"
      w="full"
      minW={0}
      flex={1}
      onClick={isClickable ? () => navigate(`/agencies/${agency.slug}`) : undefined}
    >
      <Box h="52px" mb={5} overflow="hidden">
        <Heading size="md" color="white" letterSpacing="tight" noOfLines={2}>
          {agency.name}
        </Heading>
      </Box>
      
      <Flex justify="space-between" align="center" minW={0}>
        <Box flex={1} minW={0}>
          <Text fontSize="sm" color="gray.400" mb={1}>Words</Text>
          <Text fontSize="xl" fontWeight="bold" color="blue.400" letterSpacing="tight" noOfLines={1}>
            {formatNumber(agency.word_count)}
          </Text>
        </Box>
        <Box flex={1} textAlign="right" minW={0}>
          <Text fontSize="sm" color="gray.400" mb={1}>Sections</Text>
          <Text fontSize="xl" fontWeight="bold" color="white" letterSpacing="tight" noOfLines={1}>
            {formatNumber(agency.sections)}
          </Text>
        </Box>
      </Flex>
    </MotionBox>
  );
};

export default StatCard; 