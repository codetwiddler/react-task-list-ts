import { useEffect, useRef } from 'react';

//custom hook for comparing a current value to a prior value
export const usePrevious = <T>(value: T): T | undefined => {
    const ref = useRef<T>();
    
    useEffect(() => {
      ref.current = value;
    });
  
    return ref.current;
};