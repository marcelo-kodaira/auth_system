export class User {
  constructor(
    public readonly id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  update(data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): void {
    if (data.firstName) this.firstName = data.firstName;
    if (data.lastName) this.lastName = data.lastName;
    if (data.email) this.email = data.email;
    if (data.password) this.password = data.password;
    if (data.isActive !== undefined) this.isActive = data.isActive;
  }
}
