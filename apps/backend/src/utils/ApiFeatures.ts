import { plainToInstance } from 'class-transformer';
import { ObjectLiteral, Repository } from 'typeorm';
import { ReadUserDto } from '../users/dto/read-user.dto';


export class ApiFeatures<T extends ObjectLiteral> {
  constructor(private repository: Repository<T>, private instanceDto) {
  }

  async paginate(page: number = 1, limit: number= 10) {
    const skip = (page - 1) * limit;
    const [getData, total] = await this.repository.findAndCount({
      skip,
      take: limit,
    })

    const data = plainToInstance(this.instanceDto, getData)
    return {
      data,
      total,
      page,
      limit
    }
  }

}