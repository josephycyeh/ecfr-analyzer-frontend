import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import theme from './theme';

// Pages
import Agencies from './pages/Agencies';
import Analytics from './pages/Analytics';
import AgencyDetails from './pages/AgencyDetails';

const queryClient = new QueryClient();

const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Agencies />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/agencies/:slug" element={<AgencyDetails />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  </ChakraProvider>
);

export default App;
