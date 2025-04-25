'use client';

import React, {ChangeEvent, useActionState, useState } from 'react';
import Dropdown, { dropdownConfig } from "@/app/components/forms/dropdown";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import { createGame, updateGame } from "@/app/lib/actions";
import { ControlButton } from "@/app/components/forms/button";

export interface GameFormRow {
    [k: string]: number;
    player: number;
    deck: number;
    position: number;
    id: number
}

export function GameForm({playerConfig, deckConfig, gameId, gameFormRows}: {
    playerConfig: dropdownConfig,
    deckConfig: dropdownConfig,
    gameId?: number,
    gameFormRows?: GameFormRow[],
}) {
    const initialState = { message: null, errors: {} };
    const [createState, create] = useActionState(createGame, initialState);
    const [updateState, update] = useActionState(updateGame, initialState);
    const [inputFields, setInputFields] = useState<GameFormRow[]>(gameFormRows ? gameFormRows : [
        {player: 0, deck: 0, position: 0, id: 0}
    ])

    const handleFormChange = (index: number, event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const data: GameFormRow[] = [...inputFields];
        data[index][event.target.name] = parseInt(event.target.value, 10);
        setInputFields(data);
    }

    const addFields = () => {
        const newfield: GameFormRow = {player: 0, deck: 0, position: 0, id: 0};

        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index: number) => {
        const data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    return (
        <form action={gameId ? update : create}>
            <input type="hidden" name="game" value={gameId}/>
            <div className="flex justify-end">
                <ControlButton color="green" clickHandler={addFields}>
                    <PlusIcon className="size-4 stroke-current stroke-3"/>
                </ControlButton>
            </div>
            <div>
                {inputFields.map((input, index) => {
                    return (
                        <div key={index} className="flex gap-4">
                            <input type="hidden" name="id" value={input.id} />
                            <div className="flex-grow">
                                <Dropdown config={playerConfig} index={index} onChange={handleFormChange}
                                          value={input.player}/>
                            </div>
                            <div className="flex-grow">
                                <Dropdown config={deckConfig} index={index} onChange={handleFormChange}
                                          value={input.deck}/>
                            </div>
                            <div className="flex-grow">
                                <label className="block text-md font-bold text-gray-900">Position</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                    name='position'
                                    value={input.position}
                                    onChange={event => handleFormChange(index, event)}
                                />
                            </div>
                            <div className="flex-none content-end">
                                <ControlButton color="red" clickHandler={() => removeFields(index)}>
                                    <XMarkIcon className="size-4 stroke-current stroke-3"/>
                                </ControlButton>
                            </div>
                        </div>
                    )
                })}

                <div className="flex-grow flex justify-center mt-6">
                    <button type="submit" className="w-auto h-auto">
                        <div className="flex-1 h-full">
                            <div
                                className="flex items-center justify-center flex-1 h-full p-2.5 text-emerald-50 bg-emerald-700 rounded-lg hover:bg-emerald-800 hover:text-white">
                                <div className="relative font-bold">
                                    {gameId ? 'Update Game' : 'Add Game'}
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

            </div>
        </form>
    );
}
