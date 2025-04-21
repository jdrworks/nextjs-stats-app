import React from 'react';
import Link from 'next/link';

export const Player: React.FC<{
    name: string;
    id: number;
}> = ({name, id}) => {
    return (
        <div>Player: <Link href={`/player/${id}`}>{name}</Link></div>
    );
}
