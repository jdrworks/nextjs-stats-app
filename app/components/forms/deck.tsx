'use client';

import React, { useActionState, useState } from "react";
import { createDeck, updateDeck } from "@/app/lib/actions";
import { DeckWithRelations, FormState, OptionType } from "@/app/lib/types";
import Select from "react-select";
import { Button } from "@/app/components/forms/button";

export function DeckForm({ playerOptions, deck }: {
    playerOptions: OptionType[],
    deck?: DeckWithRelations,
}) {
    const action = deck ? updateDeck : createDeck;
    const initialState: FormState = { message: null, errors: {}, status: 'default' };
    const [formState, dispatch] = useActionState(action, initialState);
    const [name, setName] = useState(deck ? deck.name : '');
    const player = deck ? deck.playerId : 0

    const playerIndex = playerOptions.map(e => e.value).indexOf(player);

    return (
        <form action={dispatch}>
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
                    <div aria-live="polite" aria-atomic="true">
                        {formState.errors?.playerId &&
                            formState.errors.playerId.map((error: string) => (
                                <p className="text-sm text-rose-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
            </div>
            <div className="flex-grow flex justify-end mt-5">
                <Button type="submit">{deck ? 'Update Deck' : 'Add Deck'}</Button>
            </div>
        </form>
    )
}
