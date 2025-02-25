import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  VStack,
  Icon,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FaBook, FaBuilding, FaFileAlt } from 'react-icons/fa';
import axios from 'axios';
import { formatNumber } from '../utils/format';
import { API_BASE_URL } from '../config/env';

interface TotalStatistics {
  total_agencies: number;
  total_sections: number;
  total_words: number;
}

interface CorrectionData {
  year: number;
  corrections: number;
}

interface StatCardProps {
  icon: React.ComponentType;
  label: string;
  value: number;
  color: string;
  delay?: number;
}

const StatCard = ({ icon, label, value, color, delay = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
  >
    <Box
      p={{ base: 4, md: 5 }}
      bg="gray.900"
      rounded="xl"
      borderWidth="2px"
      borderColor="gray.700"
      boxShadow="xl"
    >
      <Flex align="center" mb={3}>
        <Icon as={icon} boxSize={{ base: 5, md: 6 }} color={color} mr={3} />
        <Text color="gray.400" fontSize={{ base: "md", md: "lg" }}>{label}</Text>
      </Flex>
      <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="white">
        {formatNumber(value)}
      </Text>
    </Box>
  </motion.div>
);

const ChartCard = ({ title, children, description }: { title: string; children: React.ReactNode; description?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Box
      p={{ base: 4, md: 5 }}
      bg="gray.900"
      rounded="xl"
      borderWidth="2px"
      borderColor="gray.700"
      boxShadow="xl"
      height={{ base: "300px", md: "400px" }}
    >
      <VStack spacing={2} align="start" mb={3}>
        <Heading size="md">{title}</Heading>
        {description && <Text color="gray.400" fontSize="sm">{description}</Text>}
      </VStack>
      {children}
    </Box>
  </motion.div>
);

const Analytics = () => {
  const [corrections, setCorrections] = useState<CorrectionData[]>([]);
  const [totalStats, setTotalStats] = useState<TotalStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [correctionsResponse, statsResponse] = await Promise.all([
          axios.get<CorrectionData[]>(`${API_BASE_URL}/api/corrections`),
          axios.get<TotalStatistics>(`${API_BASE_URL}/api/statistics/total`)
        ]);
        setCorrections(correctionsResponse.data);
        setTotalStats(statsResponse.data);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load analytics data. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="200px">
        <Spinner size="xl" color="blue.400" />
      </Flex>
    );
  }

  const statCards = totalStats && [
    { icon: FaBuilding, label: 'Total Agencies', value: totalStats.total_agencies, color: 'blue.400' },
    { icon: FaFileAlt, label: 'Total Sections', value: totalStats.total_sections, color: 'green.400' },
    { icon: FaBook, label: 'Total Words', value: totalStats.total_words, color: 'purple.400' },
  ];

  return (
    <Box maxW="1600px" mx="auto" px={{ base: 2, sm: 2, md: 3 }}>
      <Flex direction="column" gap={{ base: 4, md: 6 }}>
        <Box>
          <Heading size={{ base: "lg", md: "xl" }} mb={{ base: 1, md: 2 }}>Analytics Dashboard</Heading>
          <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
            Analysis of federal regulations and their changes
          </Text>
        </Box>

        {statCards && (
          <Grid 
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            }}
            gap={{ base: 2, md: 3 }}
          >
            {statCards.map((card, index) => (
              <StatCard
                key={card.label}
                {...card}
                delay={index * 0.1}
              />
            ))}
          </Grid>
        )}

        <ChartCard 
          title="Regulatory Corrections" 
          description="Annual number of corrections made to federal regulations"
        >
          <Box height={{ base: "200px", md: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={corrections}
                margin={{ 
                  top: 5, 
                  right: 25, 
                  left: 0, 
                  bottom: 15
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" opacity={0.3} />
                <XAxis
                  dataKey="year"
                  stroke="#A0AEC0"
                  tickMargin={10}
                  tick={{ 
                    fill: '#A0AEC0',
                    fontSize: 10
                  }}
                  tickLine={{ stroke: '#A0AEC0' }}
                  axisLine={{ stroke: '#A0AEC0' }}
                  interval="preserveStartEnd"
                  minTickGap={10}
                  padding={{ left: 0, right: 0 }}
                />
                <YAxis
                  stroke="#A0AEC0"
                  tick={{ 
                    fill: '#A0AEC0',
                    fontSize: 10
                  }}
                  tickLine={{ stroke: '#A0AEC0' }}
                  axisLine={{ stroke: '#A0AEC0' }}
                  tickFormatter={(value) => `${value}`}
                  width={28}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2D3748',
                    borderColor: '#4A5568',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    fontSize: '11px',
                    padding: '6px 10px'
                  }}
                  labelStyle={{ color: '#A0AEC0', fontWeight: 'bold' }}
                  itemStyle={{ color: '#A0AEC0' }}
                  formatter={(value) => [`${value} corrections`, 'Total']}
                />
                <Line
                  type="monotone"
                  dataKey="corrections"
                  stroke="#4299E1"
                  strokeWidth={2}
                  dot={{ 
                    fill: '#4299E1', 
                    strokeWidth: 1.5, 
                    r: 3
                  }}
                  activeDot={{ 
                    r: 5, 
                    stroke: '#63B3ED', 
                    strokeWidth: 1.5
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </ChartCard>
      </Flex>
    </Box>
  );
};

export default Analytics; 