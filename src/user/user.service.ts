import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Entities/User.entity';
import { Repository } from 'typeorm';
import { UpdateRecruiterDto } from 'src/recruiter/dto/update-recruiter.dto';
import { UpdateUserDto } from './dto/update_user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository:Repository<User>) {}

    async findOne(id: string): Promise<User> {
        try {
          const user = await this.userRepository.findOne({
            where: { id },
          });
          if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
          }
          return user;
        } catch (error) {
          console.error(`Error retrieving user with ID ${id}:`, error);
          throw new InternalServerErrorException('Error retrieving user');
        }
      }

       async update(id: string,updateRecruiterDto: UpdateUserDto): Promise<User> {
          try {
            const recruiter = await this.findOne(id);
            if (!recruiter) {
              throw new NotFoundException(`User with ID ${id} not found`);
            }
            await this.userRepository.update(id, updateRecruiterDto);
            return await this.findOne(id);
          } catch (error) {
            console.error(`Error updating user with ID ${id}:`, error);
            throw new InternalServerErrorException('Failed to update User');
          }
        }

        async save(user:User): Promise<User> {
          return await this.userRepository.save(user);

        }

}
