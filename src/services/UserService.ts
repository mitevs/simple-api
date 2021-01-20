import { PasswordUtils } from "./../utils/PasswordUtils";
import { Service } from "typedi";
import { UserRepository } from "../repositories";
import { User } from "../entities/User";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class UserService {
  constructor(
    @InjectRepository()
    private readonly userRepository: UserRepository
  ) {}

  createUser(user: User) {
    user.password = PasswordUtils.hashPasword(user.password);
    return this.userRepository.save(user);
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUserByUsernameAndPassword(username: string, rawPassword: string) {
    const password = PasswordUtils.hashPasword(rawPassword);
    const user = await this.userRepository.findOne({ username, password });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
