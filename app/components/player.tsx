import React from 'react';

export const Player: React.FC<{
    name: string;
    id: number;
}> = ({name, id}) => {
    return (
        <div>Player: <a href={`/player/${id}`}>{name}</a></div>
    );
}
