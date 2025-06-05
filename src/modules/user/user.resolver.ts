import { Resolver, Query, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
//import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { Args } from '@nestjs/graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  private users: User[] = [
    {
      id: 'a',
      name: 'a',
      email: 'a',
    },
    {
      id: 'b',
      name: 'b',
      email: 'b',
    },
    {
      id: 'c',
      name: 'c',
      email: 'c',
    },
  ];
  @Query(() => User)
  getUser(@Args('id', { type: () => ID }) id: string): User {
    console.log('hello resolver');

    console.log('request');

    return this.users.find((user) => user.id === id) ?? this.users[0];
  }
  @Query(() => [User])
  getUsers(): User[] {
    console.log('hello resolver getUserss');

    console.log('request: getUsers');

    return this.users;
  }
  //   @Mutation(() => User)
  //   createUser(@Args('input') input: CreateUserInput) {
  //     return this.userService.create(input);
  //   }
}
