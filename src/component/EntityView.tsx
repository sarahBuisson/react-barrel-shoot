import React, { useEffect, useState } from 'react';
import { Entity, Position } from '../domain/model.ts';

const EntityView = ({ entity }:{entity:Entity}) => {
  const [finalPosition, setFinalPosition] = useState(entity.position);

  useEffect(() => {
    // Mettre à jour la position finale 5 secondes après la création de l'entité
    const timer = setInterval(() => {
      setFinalPosition(new Position(entity.position.x, entity.position.y, entity.position.z));
    }, 50);

    // Nettoyer le timer lors du démontage du composant
    return () => clearInterval(timer);
  }, [entity, entity.position.x,entity.position.y]);

  const style = {
    position: 'absolute',
    transform: `translate3d(${finalPosition.x}px, ${finalPosition.y}px, ${finalPosition.z}px)`,
    transition: 'transform 0.1s linear'
  };

  return (
    <div style={style}>
      <p>Type: {entity.type.name}</p>
      <p>Position: {entity.position.x}, {entity.position.y}, {entity.position.z}</p>
    </div>
  );
};

export default EntityView;