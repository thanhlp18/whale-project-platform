// src/components/religionInformation.tsx
import { Religion } from '@prisma/client';
import React from 'react';

type ReligionInformationProps = {
    religion: Religion;
};

const ReligionInformation: React.FC<ReligionInformationProps> = ({ religion }) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{religion.name}</h2>
            {religion.origin && (
                <p className="mb-2">
                    <span className="font-semibold">Origin:</span> {religion.origin}
                </p>
            )}
            {religion.description && (
                <p className="mb-2">
                    <span className="font-semibold">Description:</span> {religion.description}
                </p>
            )}
            {religion.location && (
                <p className="mb-2">
                    <span className="font-semibold">Location:</span> {religion.location}
                </p>
            )}
        </div>
    );
};

export default ReligionInformation;