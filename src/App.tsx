import React, { Suspense } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

const Quiz = React.lazy(() => import('@/components/Quiz'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen message="Initializing CodeQuest..." />}>
      <Quiz />
    </Suspense>
  );
}

export default App;
