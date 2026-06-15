import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { ReportService } from '../../core/services/report.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {

  reports: any[] = [];
  filteredReports: any[] = [];

  searchText = '';
  selectedStatus = '';

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {

    this.loadReport();

  }

  loadReport(): void {

    this.reportService
      .getDepartmentWiseReport()
      .subscribe({

        next: (res) => {

          this.reports = res;
          this.filteredReports = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  applyFilter(): void {

    this.filteredReports = this.reports.filter(x => {

      const nameMatch =
        x.employeeName
          .toLowerCase()
          .includes(this.searchText.toLowerCase());

      const statusMatch =
        this.selectedStatus === ''
        || x.employeeStatus === this.selectedStatus;

      return nameMatch && statusMatch;

    });

  }
  exportToExcel(): void {

  const worksheet =
    XLSX.utils.json_to_sheet(
      this.filteredReports
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Department Report'
  );

  const excelBuffer =
    XLSX.write(
      workbook,
      {
        bookType: 'xlsx',
        type: 'array'
      }
    );

  const data =
    new Blob(
      [excelBuffer],
      {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    );

  saveAs(
    data,
    'Department_Report.xlsx'
  );

}

exportToPdf(): void {

  const doc = new jsPDF();

  doc.text(
    'Department Wise Employee Report',
    14,
    15
  );

  autoTable(doc, {

    head: [[
      'Department',
      'Code',
      'Employee',
      'Designation',
      'Email',
      'Mobile',
      'Status'
    ]],

    body: this.filteredReports.map(
      (x: any) => [

        x.departmentName,
        x.employeeCode,
        x.employeeName,
        x.designation,
        x.email,
        x.mobileNo,
        x.employeeStatus

      ]
    )

  });

  doc.save(
    'Department_Report.pdf'
  );

}

}