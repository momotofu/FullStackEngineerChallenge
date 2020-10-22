import React, { useState, useEffect } from 'react';

export function useStateFromProp(initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => setValue(initialValue), [initialValue]);

  return [value, setValue];
}