// TODO: create here a typescript interface for an olympic country

import { Participation } from "./Participation";

/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
export interface Olympic {
    map(arg0: (country: { country: any; participations: any[]; }) => { name: any; y: any; }): unknown;
    id: number;
    country: string;
    participations: Participation[];
}