import React, {createContext, useReducer} from 'react';
import {World} from "../domain/model.ts";
import {randomWorld, tour} from "../domain/motor.ts";
import {produce} from "immer";

interface GameState {
    world: World,
    lastMessage: string,
    keys: string[]
}


// Définir l'état initial
const initialState: GameState = {world: randomWorld(), lastMessage: "new game", keys: []};


export const actionTypes = {
    "moveLeft": "moveLeft",
    "moveRight": "moveRight",
    tour: "tour",
    keydown: "keydown", keyup: "keyup"
}
// Définir le reducer
const reducer = (state: GameState, action: { type: string }|{type:string, key:string}) => {
    switch (action.type) {
        case actionTypes.keydown:
            return produce(state, draft => {
                draft.keys.push(action.key)
                draft.lastMessage = `keydown ${action.key}`
            })
        case actionTypes.keyup:
            return produce(state, draft => {
                draft.keys = draft.keys.filter(key => key !== action.key)
                draft.lastMessage = `keyup ${action.key}`
            })
        case actionTypes.moveLeft:
            return produce(state, draft => draft["world"].player.position.x -= 1)
        case actionTypes.moveRight:
            return produce(state, draft =>draft["world"].player.position.x += 1)
        // Ajoutez vos cas d'action ici
        case actionTypes.tour:
            return produce(state, draft => {
console.log(draft.world)
                if(draft.keys.find(key => key === "ArrowLeft")) {
                    console.log("errr")
                    draft["world"].player.position.x -= 10;
                }
                if(draft.keys.find(key => key === "ArrowRight"))  draft["world"].player.position.x += 10;
                tour(draft["world"]);
                draft.lastMessage = "tour"
            })
        default:
            return state;
    }
};

// Créer le contexte
export const GlobalStateContext = createContext();

// Créer le composant fournisseur
export const GlobalStateProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalStateContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalStateContext.Provider>
    );
};