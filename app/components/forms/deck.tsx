'use client';

import React, { useActionState, useState } from "react";
import { createDeck, updateDeck } from "@/app/lib/actions";
import { DeckWithRelations, OptionType } from "@/app/lib/types";
import Select from "react-select";

export function DeckForm({ playerOptions, deck }: {
    playerOptions: OptionType[],
    deck?: DeckWithRelations,
}) {
    const initialState = { message: null, errors: {} };
    const [createState, create] = useActionState(createDeck, initialState);
    const [updateState, update] = useActionState(updateDeck, initialState);
    const [name, setName] = useState(deck ? deck.name : '');
    const [player, setPlayer] = useState(deck ? deck.playerId : 0);

    const playerIndex = playerOptions.map(e => e.value).indexOf(player);

    return (
        <form action={deck ? update : create}>
            <input type="hidden" name="deckId" value={deck?.id}/>
            <div className="flex gap-4">
                <div className="flex-grow">
                    <label className="block text-md font-bold text-slate-300">Deck Name</label>
                    <input
                        type="text"
                        className="bg-slate-700 border border-slate-500 text-sm rounded-[3px] text-slate-300 hover:border-slate-400 block w-full p-2
                        focus-within:border-sky-500 focus-within:hover:border-sky-500 focus-within:ring ring-sky-500 outline-none transition ease-out duration-100"
                        name='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="flex-grow">
                    <label className="block text-md font-bold text-slate-300">Player</label>
                    <Select
                        instanceId={`player-select`}
                        defaultValue={playerOptions[playerIndex]}
                        options={playerOptions}
                        isClearable={true}
                        name="playerId"
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 3,
                            colors: {
                                ...theme.colors,
                                primary: 'var(--color-sky-500)',
                                primary75: 'var(--color-sky-300)',
                                primary50: 'var(--color-sky-200)',
                                primary25: 'var(--color-slate-600)',
                                danger: 'var(--color-red-500)',
                                dangerLight: 'var(--color-red-200)',
                                neutral0: 'var(--color-slate-700)',
                                neutral10: 'var(--color-slate-100)',
                                neutral20: 'var(--color-slate-500)',
                                neutral30: 'var(--color-slate-400)',
                                neutral40: 'var(--color-slate-400)',
                                neutral50: 'var(--color-slate-500)',
                                neutral60: 'var(--color-slate-400)',
                                neutral80: 'var(--color-slate-300)',
                            }
                        })}
                    />
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
