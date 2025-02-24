import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = 'Search...' }: SearchBarProps) => (
  <Box w="full" bg="gray.900" rounded="lg" borderWidth="2px" borderColor="gray.700">
    <InputGroup size="md">
      <InputLeftElement pointerEvents="none" h="100%" pl={3}>
        <FaSearch color="gray.400" />
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        bg="transparent"
        border="none"
        _hover={{ border: 'none' }}
        _focus={{ border: 'none', boxShadow: 'none' }}
        fontSize="md"
        pl={10}
        h={10}
      />
    </InputGroup>
  </Box>
); 