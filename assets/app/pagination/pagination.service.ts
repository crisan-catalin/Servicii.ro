import { Injectable } from "@angular/core";

@Injectable()
export class PaginationService {
  getLowerLimit(itemsPerPage: number, currentPage: number): number {
    return itemsPerPage * (currentPage - 1);
  }
}
