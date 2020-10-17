import React, { useEffect, useState } from 'react';
import { Message } from '@pay-pay/api-interfaces';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
      </div>
      <div>{m.message}</div>
    </>
  );
};

export default App;
