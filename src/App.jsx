import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import About from './pages/About';
import Digital from './pages/Digital';
import Home from './pages/Home';
import Inquire from './pages/Inquire';
import OriginChooser from './pages/OriginChooser';
import PhysicalList from './pages/PhysicalList';
import Project from './pages/Project';

export default function App() {
  const location = useLocation();

  // Keyed on the path so each page is its own presence: the old one fades out
  // (see Page) before the new one mounts and plays its entrance.
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/physical" element={<OriginChooser />} />
        <Route path="/physical/:origin" element={<PhysicalList />} />
        <Route path="/digital" element={<Digital />} />
        <Route path="/work/:slug" element={<Project />} />
        {/* The earlier gallery layouts, kept but not linked from anywhere. */}
        <Route path="/classic/digital" element={<Digital variant="classic" />} />
        <Route path="/classic/physical/:origin" element={<PhysicalList variant="classic" />} />
        <Route path="/lines/digital" element={<Digital variant="lines" />} />
        <Route path="/lines/physical/:origin" element={<PhysicalList variant="lines" />} />
        <Route path="/about" element={<About />} />
        <Route path="/inquire" element={<Inquire />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
