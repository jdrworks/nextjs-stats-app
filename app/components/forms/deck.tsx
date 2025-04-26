'use client';

import Dropdown, { dropdownConfig } from "@/app/components/forms/dropdown";
import React, { ChangeEvent, useActionState, useState } from "react";
import { createDeck, updateDeck } from "@/app/lib/actions";
import { Deck } from "@/app/lib/types";

export function DeckForm({ playerConfig, deck }: {
    playerConfig: dropdownConfig,
    deck?: Deck,
}) {
    const initialState = { message: null, errors: {} };
    const [createState, create] = useActionState(createDeck, initialState);
    const [updateState, update] = useActionState(updateDeck, initialState);
    const [name, setName] = useState(deck ? deck.name : '');
    const [player, setPlayer] = useState(deck ? deck.player_id : 0);

    const handlePlayerChange = (index: number, event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setPlayer(parseInt(event.target.value, 10));
    }

    return (
        <form action={deck ? update : create}>
            <input type="hidden" name="deck" value={deck?.id}/>
            <div className="flex gap-4">
                <div className="flex-grow">
                    <label className="block text-md font-bold text-gray-900">Deck Name</label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        name='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="flex-grow">
                    <Dropdown config={playerConfig} value={player} index={0} onChange={handlePlayerChange}/>
                </div>
            </div>
            <div className="flex-grow flex justify-end mt-6">
                <button type="submit" className="w-auto h-auto">
                    <div className="flex-1 h-full">
                        <div
                            className="flex items-center justify-center flex-1 h-full px-2.5 py-2 text-emerald-50 bg-emerald-700 rounded-lg hover:bg-emerald-800 hover:text-white">
                            <div className="relative font-bold">
                                {deck ? 'Update Deck' : 'Add Deck'}
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </form>
    )
}
