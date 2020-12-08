import { Label } from '@core/interfaces/label.interface';
import { Message } from '@core/interfaces/message.interface';

export interface Issue {
    id?: number;
    title: string;
    description: string;
    place: string;
    labels?: Label[];
    status?: 'NEW' | 'DOING' | 'DONE';
    user?: number;
    createdAt?: string;
    modifiedAt?: string;
    messages?: Message[];
}
