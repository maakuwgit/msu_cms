import * as React from 'react';
export interface SuspensePerfProps {
    children: React.ReactNode;
    traceId: string;
    fallback: React.ReactNode;
    firePerf?: import('firebase/app').default.performance.Performance;
}
export declare function SuspenseWithPerf({ children, traceId, fallback, firePerf }: SuspensePerfProps): JSX.Element;
