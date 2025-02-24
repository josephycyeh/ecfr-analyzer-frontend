import { Button, Icon } from '@chakra-ui/react';
import { FaSort, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface SortButtonProps {
  label: string;
  sortKey: string;
  currentSortKey: string | null;
  sortDirection: 'asc' | 'desc';
  onClick: () => void;
}

export const SortButton = ({ 
  label, 
  sortKey, 
  currentSortKey, 
  sortDirection, 
  onClick 
}: SortButtonProps) => {
  const isActive = sortKey === currentSortKey;

  const getSortIcon = () => {
    if (!isActive) return <Icon as={FaSort} boxSize={3} />;
    return <Icon as={sortDirection === 'asc' ? FaArrowUp : FaArrowDown} boxSize={3} />;
  };

  return (
    <Button
      leftIcon={getSortIcon()}
      bg="gray.900"
      color={isActive ? 'blue.400' : 'gray.400'}
      borderWidth="2px"
      borderColor={isActive ? 'blue.400' : 'gray.700'}
      _hover={{ bg: 'gray.800' }}
      onClick={onClick}
      size="sm"
      px={4}
      display="flex"
      alignItems="center"
      gap={2}
    >
      {label}
    </Button>
  );
}; 