'use client';

import React, {ChangeEvent, useActionState, useState} from 'react';
import Dropdown, {dropdownConfig} from "@/app/components/dropdown";
import {XMarkIcon, PlusIcon} from "@heroicons/react/24/solid";
import {createGame} from "@/app/lib/actions";

export interface GameAddRow {
    [k: string]: number;
    player: number;
    deck: number;
    position: number;
}

export const GameAddForm: React.FC<{
    playerConfig: dropdownConfig,
    deckConfig: dropdownConfig
}> = ({playerConfig, deckConfig}) => {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useActionState(createGame, initialState);
    const [inputFields, setInputFields] = useState<GameAddRow[]>([
        {player: 0, deck: 0, position: 0}
    ])

    const handleFormChange = (index: number, event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const data: GameAddRow[] = [...inputFields];
        data[index][event.target.name] = parseInt(event.target.value, 10);
        setInputFields(data);
    }

    const addFields = () => {
        const newfield: GameAddRow = {player: 0, deck: 0, position: 0};

        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index: number) => {
        const data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    return (
        <form action={dispatch}>
            <div className="flex justify-end">
                <button type="button" onClick={addFields} className="w-auto h-auto">
                    <div className="flex-1 h-full">
                        <div
                            className="flex items-center justify-center flex-1 h-full p-2.5 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white">
                            <div className="relative">
                                <PlusIcon className="size-4 stroke-current stroke-3"/>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
            <div>
                {inputFields.map((input, index) => {
                    return (
                        <div key={index} className="flex gap-4">
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
                                <button type="button" onClick={() => removeFields(index)} className="w-auto h-auto">
                                    <div className="flex-1 h-full">
                                        <div
                                            className="flex items-center justify-center flex-1 h-full p-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white">
                                            <div className="relative">
                                                <XMarkIcon className="size-4 stroke-current stroke-3"/>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )
                })}

                <div className="flex-grow flex justify-center mt-6">
                    <button type="submit" className="w-auto h-auto">
                        <div className="flex-1 h-full">
                            <div
                                className="flex items-center justify-center flex-1 h-full p-2.5 text-gray-200 bg-purple-500 rounded-lg hover:bg-purple-700 hover:text-white">
                                <div className="relative font-bold">
                                    Add Game
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

            </div>
        </form>
    );
}
