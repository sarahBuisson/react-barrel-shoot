export class Position {
  constructor(public x: number, public y: number, public z: number) {}

  add(other: Position): Position {
    return new Position(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  subtract(other: Position): Position {
    return new Position(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  multiply(scalar: number): Position {
    return new Position(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  divide(scalar: number): Position {
    if (scalar === 0) throw new Error("Cannot divide by zero");
    return new Position(this.x / scalar, this.y / scalar, this.z / scalar);
  }
}


export abstract class Type {
  constructor(public name: string) {
  }
}

export class EnemyType extends Type {
  constructor(public name:string,public maxLife: number
  ) {
    super(name,);
  }

}

export class ProjectileType extends Type {
  constructor(public name:string,public damage: number
  ) {
    super(name);
  }

}
export class ItemType extends Type {
  constructor(public name:string
  ) {
    super(name);
  }

}

const PlayerType: Type={} as Type


export abstract class Entity {
  constructor(public type: Type, public position: Position,
            public id: string=""+Math.random()*100000) {}
}

export class Player extends Entity {
  constructor(position: Position) {
    super(PlayerType, position);
  }
}

export class Enemy extends Entity {
  constructor(type: EnemyType, position: Position, public life: number = type.maxLife) {
    super(type, position);
  }
}

export class Item extends Entity {
  constructor(type:ItemType,position: Position) {
    super(type, position);
  }
}

export class Projectile extends Entity {
  constructor(type: ProjectileType, position: Position) {
    super(type, position );
  }
}

export class World {


  constructor(public player:Player, public entities: Entity[]=[]) {
  }
  // Vous pouvez ajouter d'autres méthodes pour interagir avec ces entités
}