import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      role: 'INTERN',
    },

    {
      id: 2,
      name: 'Alice',
      email: 'alice@example.com',
      role: 'INTERN',
    },

    {
      id: 3,
      name: 'Bob',
      email: 'bob@example.com',
      role: 'ENGINEER',
    },

    {
      id: 4,
      name: 'Admin',
      email: 'admin@example.com',
      role: 'ADMIN',
    },

    {
      id: 5,
      name: 'Manager',
      email: 'manager@example.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }
  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUsers = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };

    this.users.push(newUsers);
    return newUsers;
  }

  update(
    id: number,
    updateUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
