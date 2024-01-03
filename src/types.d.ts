//provide type definitions

type Task = {
    id: string;
    description: string;
    complete: boolean;
  };

type FilterKey = 'All' | 'Active' | 'Completed';