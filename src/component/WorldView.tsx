import React, {useContext, useEffect} from 'react';
import EntityView from "./EntityView.tsx";
import {actionTypes, GlobalStateContext} from "../infrastructure/GlobalStateContext.tsx";

const WorldView = () => {

    const {state, dispatch} = useContext(GlobalStateContext);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                case 'ArrowRight':
                    dispatch({type: actionTypes.keydown, key: event.key});
                    break;
                default:
                    break;
            }
        };
        const handleKeyUp = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                case 'ArrowRight':
                    dispatch({type: actionTypes.keyup, key: event.key});
                    break;
                default:
                    break;
            }
        };

        // Appeler le reducer toutes les 5 secondes
        const interval = setInterval(() => {
            dispatch({type: actionTypes.tour});
        }, 100);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Nettoyer l'écouteur d'événements lors du démontage du composant
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            clearInterval(interval);
        };
    }, [dispatch]);
    return (
        <div>
            <h2>World View</h2>
            <h2> {state.lastMessage}</h2>
            {state.world.entities.map((entity) => (
                <EntityView entity={entity} key={entity.id}/>
            ))}
            <EntityView entity={state.world.player}/>

        </div>
    );
};

export default WorldView;