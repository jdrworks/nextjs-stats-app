'use client';

import React from 'react';
import Dropdown, { dropdownConfig } from "@/app/components/forms/dropdown";

export const GameAddRow: React.FC<{
    playerConfig: dropdownConfig;
    deckConfig: dropdownConfig;
}> = ({playerConfig, deckConfig}) => {

    return (
        <div className="flex gap-4">
            <div className="flex-grow">
                <Dropdown config={playerConfig}></Dropdown>
            </div>
            <div className="flex-grow">
                <Dropdown config={deckConfig}></Dropdown>
            </div>
            <div className="flex-none content-end">
                <button
                    className="rounded-sm border border-white font-bold text-lg text-red-600 px-3 py-1 hover:border-red-600">
                    &#120;
                </button>
            </div>
        </div>
    );
}
