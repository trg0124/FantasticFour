import { useAuth } from "./components/Auth/authContext";
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Home from "./pages/home";
import ProtectedRoute from "./components/Auth/protectedRoute";
import Layout from "./components/ui/layout";
import Todo from "./pages/todo";
import Flashcards from "./pages/Flashcards";
import Motivation from "./pages/Motivation";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Resources from "./pages/Resources";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import HelpCenter from "./pages/HelpCenter";
import Accessibility from "./pages/Accessibility";
import FAQs from "./pages/FAQs";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            <Layout>
              <Todo />
            </Layout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/flashcards"
        element={
          <ProtectedRoute>
            <Layout>
              <Flashcards />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/motivation"
        element={
          <ProtectedRoute>
            <Layout>
              <Motivation />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Layout>
              <Account />
            </Layout>
          </ProtectedRoute>
        }
      />

         <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />
        
      <Route
        path="/privacy-policy"
        element={
          <ProtectedRoute>
            <Layout>
              <PrivacyPolicy />
            </Layout>
          </ProtectedRoute>
        }
      />
              
      <Route
        path="/terms-conditions"
        element={
          <ProtectedRoute> 
            <Layout>
              <TermsConditions />
            </Layout>
          </ProtectedRoute>
        }
      />
              
      <Route
        path="/help-center"
        element={
          <ProtectedRoute>
            <Layout>
              <HelpCenter />
            </Layout>
          </ProtectedRoute>
        }
      />
              
      <Route
        path="/accessibility"
        element={
          <ProtectedRoute>
            <Layout>
              <Accessibility />
            </Layout>
          </ProtectedRoute> 
        }
      />

      <Route
        path="/faqs"
        element={
          <ProtectedRoute>
            <Layout>
              <FAQs />
            </Layout>
          </ProtectedRoute>
        }
      />
              
      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <Layout>
              <Resources />
            </Layout>
          </ProtectedRoute>
        }
      />

    </Routes>
        </Router>
    

  );
}

       

