import { Request } from 'express';

type Order = 'ASC' | 'DESC';

class PaginationOptionDto {
  public page: number;
  public size: number;
  public sort: string;
  public order: Order;
  public search: string;

  constructor(request: Request) {
    const { page, size, sort, order, search } = request.query;

    this.page = page ? parseInt(page as string) : 0;
    this.page = this.page > 0 ? this.page : 0;
    this.size = size ? parseInt(size as string) : 10;
    this.size = this.size > 0 ? this.size : 10;
    this.sort = sort ? (sort as string) : '';
    this.order = order ? (order as Order) : 'ASC';
    this.search = search ? (search as string) : '';
  }
}

export default PaginationOptionDto;
