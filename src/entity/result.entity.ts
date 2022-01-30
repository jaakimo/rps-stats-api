import {
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ValidatorConstraint({ name: 'PLAYER', async: false })
export class IsValidPlayerResult implements ValidatorConstraintInterface {
  validate(player: Player) {
    return (
      player.played === 'ROCK' ||
      player.played === 'PAPER' ||
      player.played === 'SCISSORS'
    );
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.value.played} is not a valid hand`;
  }
}
@ValidatorConstraint({ name: 'TIMESTAMP', async: false })
export class IsValidTimeStamp implements ValidatorConstraintInterface {
  validate(t: number) {
    return t >= 0 && t <= new Date().getTime();
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.value.played} is not a valid hand`;
  }
}

type Hand = 'ROCK' | 'PAPER' | 'SCISSORS';

export class Player {
  name: string;
  played: Hand;
}

@Entity()
export class Result {
  @PrimaryColumn()
  @IsString()
  gameId!: string;
  @Column('bigint', { nullable: false })
  @Validate(IsValidTimeStamp)
  t!: number;
  @Column({ nullable: false })
  @IsString()
  type!: string;
  @Column('json', { nullable: false })
  @Validate(IsValidPlayerResult)
  playerA!: Player;
  @Column('json', { nullable: false })
  @Validate(IsValidPlayerResult)
  playerB!: Player;

  // Constructor for validation purposes
  constructor(
    gameId: string,
    t: number,
    type: string,
    playerA: Player,
    playerB: Player,
  ) {
    this.gameId = gameId;
    this.t = t;
    this.type = type;
    this.playerA = playerA;
    this.playerB = playerB;
  }
}
