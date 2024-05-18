import {ProjectileType, EnemyType} from "./model.ts";

const goblinType = new EnemyType("Goblin", 10);
const trollType = new EnemyType("Troll", 20);
const dragonType = new EnemyType("Dragon", 50);

const alienType = new EnemyType("Alien", 15);
const robotType = new EnemyType("Robot", 25);
const cyborgType = new EnemyType("Cyborg", 35);

export const enemies = {goblinType, trollType, dragonType, alienType, robotType, cyborgType}


const arrowType = new ProjectileType("Arrow", 1);
const fireballType = new ProjectileType("Fireball", 3);
const iceShardType = new ProjectileType("Ice Shard", 2);

const laserType = new ProjectileType("Laser", 2);
const plasmaType = new ProjectileType("Plasma", 4);
const quantumType = new ProjectileType("Quantum", 3);

export const projectiles = {arrowType, fireballType, iceShardType, laserType, plasmaType, quantumType}
