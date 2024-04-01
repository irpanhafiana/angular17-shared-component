import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { UITablePaginationStatus } from './table.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() tableHead: TemplateRef<any> | null = null;
  @Input() tableBody: TemplateRef<any> | null = null;
  @Input() pagination: boolean = false;

  searchTerm = '';
  tableData: any[] = [];
  totalRecord = 0;
  paginationStatus: UITablePaginationStatus = {
    page: 1,
    pageSize: 5,
    totalPages: 0,
  };

  ngOnChanges(): void {
    this.initialPagination();
  }

  initialPagination() {
    this.totalRecord = this.data.length;
    this.paginationStatus = {
      ...this.paginationStatus,
      totalPages: Math.ceil(this.totalRecord / this.paginationStatus.pageSize),
    };

    this.refreshTable();
  }

  refreshTable() {
    let data = this.data;

    // search data here
    if (this.searchTerm !== '') {
      data = this.data.filter((item) => this.matches(item));
    }

    this.totalRecord = this.data.length;
    this.paginationStatus.totalPages = Math.ceil(
      this.totalRecord / this.paginationStatus.pageSize
    );

    this.tableData = data.slice(
      (this.paginationStatus.page - 1) * this.paginationStatus.pageSize,
      (this.paginationStatus.page - 1) * this.paginationStatus.pageSize +
        this.paginationStatus.pageSize
    );
  }

  pageChange(page: number) {
    this.paginationStatus = {
      ...this.paginationStatus,
      page: page,
    };

    this.refreshTable();
  }

  matches(data: any) {
    if (data.title.toLowerCase().includes(this.searchTerm.toLowerCase())) {
      return true;
    }
    return false;
  }
}
