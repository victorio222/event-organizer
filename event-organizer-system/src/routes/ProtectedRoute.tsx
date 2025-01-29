import { Suspense, useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import PageLoader from 'components/loader/PageLoader';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!user.userID) {
      navigate('/mainpage');
    }
  }, [user.userID, navigate]); // Ensure the effect runs when `userID` changes

  if (user.userID === '') {
    return <Suspense fallback={<PageLoader />} />;
  }
  

  return <>{children}</>;
};

export default ProtectedRoute;
