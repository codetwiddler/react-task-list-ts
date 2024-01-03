import { useEffect, useRef } from 'react';

//Custom hook for comparing a current value to a prior value.
//It's generic so as to handle any sort of Type's value.
//Return Type is either that of the input Type or undefined
export const usePrevious = <T>(value: T): T | undefined => {
    const ref = useRef<T>();
    
    useEffect(() => {
      ref.current = value;
    });
  
    return ref.current;
};