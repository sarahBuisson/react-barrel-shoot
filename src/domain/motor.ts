import {Enemy, Projectile, World, Player, Position, Item} from "./model.ts";
import {enemies, projectiles} from "./design.ts";

export function shoot(player: Player): Projectile {
    console.log("shoot")
    // Crée un nouveau projectile à la position actuelle du joueur
    return new Projectile(`projectile_${Date.now()}`, new Position(player.position.x, player.position.y + 1, player.position.z));
}

export function tour(world: World) {
    // Le joueur tire un projectile
    world.entities.push(shoot(world.player));
    world.entities.push(new Enemy(enemies.goblinType, new Position(100*Math.random(), 50,0)));

    // Tous les projectiles avancent de y+1 et tous les ennemis avancent de y-1
    world.entities.forEach(entity => {
        if (entity instanceof Projectile) {
            entity.position.y -= 10;
        } else if (entity instanceof Enemy) {
            entity.position.y += 10;
        }
    });

    // Si un projectile touche un ennemi, ils perdent tous les deux 1 point de vie
    // Si le joueur touche un ennemi, ils perdent tous les deux 1 point de vie
    for (let i = 0; i < world.entities.length; i++) {
        for (let j = i + 1; j < world.entities.length; j++) {
            if (world.entities[i].position.x === world.entities[j].position.x &&
                world.entities[i].position.y === world.entities[j].position.y &&
                world.entities[i].position.z === world.entities[j].position.z) {
                if (world.entities[i].life) {
                    world.entities[i].life -= 1;
                }
                if (world.entities[j].life) {
                    world.entities[j].life -= 1;
                }
            }
        }
    }

    // Supprime les projectiles et les ennemis qui ont 0 points de vie
    world.entities = world.entities.filter(entity =>! entity.life || entity.life > 0);
}

export function randomWorld(): World {
    const player = new Player(new Position(0, 0, 0));
    const entities = [
        new Enemy(enemies.goblinType, new Position(0, 10, 0)),
        new Enemy(enemies.trollType, new Position(1, 10, 0)),
        new Enemy(enemies.dragonType, new Position(2, 10, 0)),
        new Projectile(projectiles.arrowType, new Position(0, -10, 0)),

    ];
    return new World(player, entities);

}