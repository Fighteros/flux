import { plainToInstance } from 'class-transformer';
import { FindOptionsWhere, Like, ObjectLiteral, Repository } from 'typeorm';

export class ApiFeatures<T extends ObjectLiteral> {
  constructor(
    private repository: Repository<T>,
    private instanceDto,
  ) {}

  async paginate(
    page: number = 1,
    limit: number = 10,
    options?: FindOptionsWhere<T>,
  ) {
    const skip = (page - 1) * limit;
    const [getData, total] = await this.repository.findAndCount({
      ...options,
      skip,
      take: limit,
    });

    const data = plainToInstance(this.instanceDto, getData) as T[];
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async search(field: string, query: string) {
    const where = { [field]: Like(`${query}%`) } as FindOptionsWhere<T>;
    return this.repository.find({ where });
  }

  async findWithAllFeatures(params: {
    page?: number;
    limit?: number;
    filter?: { field: string; value: any };
    search?: { field: string; query: string };
    sort?: { field: string; order: 'ASC' | 'DESC' };
    options?: FindOptionsWhere<T>;
  }): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10, filter, search, sort, options } = params;

    let where: FindOptionsWhere<T> = {};
    if (filter) {
      where = { ...where, [filter.field]: filter.value };
    }
    if (search) {
      where = { ...where, [search.field]: Like(`%${search.query}%`) };
    }

    const order = sort ? { [sort.field]: sort.order } : undefined;

    return this.paginate(page, limit, {
      ...options,
      where,
      order,
    } as FindOptionsWhere<T>) as Promise<{
      data: T[];
      total: number;
      page: number;
      limit: number;
    }>;
  }
}
