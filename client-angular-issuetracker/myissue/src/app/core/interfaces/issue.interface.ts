export interface Issue {
    iid: number;
    uid: number;
    type: 'HW' | 'SW';
    details: string;
    timestamp: number;
    status: 'ADDED' | 'ASSIGNED' | 'DONE';
}
