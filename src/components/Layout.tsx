import { Box, Flex, Heading, VStack, HStack, Text, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from '@chakra-ui/react';
import { FaBuilding, FaChartBar, FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  icon: React.ElementType;
  children: React.ReactNode;
  to: string;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, children, to, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} onClick={onClick}>
      <HStack
        spacing={4}
        px={5}
        py={3}
        rounded="md"
        bg={isActive ? 'whiteAlpha.200' : 'transparent'}
        _hover={{ bg: 'whiteAlpha.300' }}
        transition="all 0.2s"
        cursor="pointer"
        color={isActive ? 'white' : 'whiteAlpha.800'}
      >
        <Icon size={18} />
        <Text fontWeight={isActive ? 'bold' : 'medium'} fontSize="md">{children}</Text>
      </HStack>
    </Link>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Navigation = ({ onClick }: { onClick?: () => void }) => (
    <VStack align="stretch" spacing={3}>
      <NavItem icon={FaBuilding} to="/" onClick={onClick}>Agencies</NavItem>
      <NavItem icon={FaChartBar} to="/analytics" onClick={onClick}>Analytics</NavItem>
    </VStack>
  );

  return (
    <Flex h="100vh" w="100vw" overflow="hidden">
      {/* Desktop Sidebar */}
      <Box
        display={{ base: 'none', md: 'block' }}
        w="240px"
        bg="gray.900"
        p={6}
        borderRight="1px"
        borderColor="gray.700"
        shadow="xl"
      >
        <VStack align="stretch" spacing={10}>
          <Heading size="lg" color="white">eCFR</Heading>
          <Navigation />
        </VStack>
      </Box>

      {/* Mobile Header */}
      <Box
        display={{ base: 'block', md: 'none' }}
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg="gray.900"
        p={4}
        borderBottom="1px"
        borderColor="gray.700"
        shadow="xl"
        zIndex={10}
      >
        <Flex justify="center" align="center" position="relative">
          <IconButton
            aria-label="Open menu"
            icon={<FaBars />}
            variant="ghost"
            color="white"
            onClick={onOpen}
            position="absolute"
            left={0}
          />
          <Heading size="lg" color="white">eCFR</Heading>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.900">
          <DrawerCloseButton color="white" />
          <DrawerHeader borderBottomWidth="1px" borderColor="gray.700">
            <Heading size="lg" color="white">eCFR</Heading>
          </DrawerHeader>
          <DrawerBody pt={4}>
            <Navigation onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Box 
        flex={1} 
        bg="gray.800" 
        overflowY="auto"
        p={6}
        mt={{ base: '72px', md: 0 }}
        css={{
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-track': { background: '#1A202C' },
          '&::-webkit-scrollbar-thumb': {
            background: '#2D3748',
            borderRadius: '4px',
            '&:hover': { background: '#4A5568' }
          }
        }}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Layout; 