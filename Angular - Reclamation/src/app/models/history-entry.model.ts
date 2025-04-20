export interface HistoryEntry {
    id: number;
    actionType: 'CREATION' | 'RESPONSE';
    timestamp: string;
    reclamation: {
      id: number;
      title: string;
    };
  }
  