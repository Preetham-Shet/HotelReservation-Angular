import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/models/booking';
import { BookingsService } from 'src/app/services/bookings.service';
import { SelectionModel } from "@angular/cdk/collections";
import { ChangeDatesComponent } from "../change-dates/change-dates.component";
import { DialogService } from '../../services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetMenuComponent } from '../bottom-sheet-menu/bottom-sheet-menu.component';


@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css']
})

export class BookingsListComponent implements OnInit
{
  bookings: MatTableDataSource<Booking> = new  MatTableDataSource<Booking>([]);
  columnsToDisplay = ['select','customerName', 'checkIn', 'status', 'roomType', 'phone', 'actions'];
  bookingLoadingStatus: string = "Loading...";
  isLoadingCompleted: boolean = false;
  isError: boolean = false;
  rows: Booking[] = [];
  formGroup: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection: SelectionModel<Booking> = new SelectionModel<Booking>(true, []);

  constructor(private bookingsService: BookingsService, private matBottomSheet: MatBottomSheet, private dialogService: DialogService)
  {
    this.formGroup = new FormGroup({
      search: new FormControl(null)
    });
  }

  ngOnInit(): void
  {
    this.isLoadingCompleted = false;

    this.bookingsService.getBookings().subscribe(
     {next: (response: Booking[]) =>
      {
        this.bookings = new MatTableDataSource<Booking>(response);
        this.rows = response;
        this.isLoadingCompleted = true;

        this.bookings.paginator = this.paginator;
        this.bookings.sort = this.sort;

        //filterPredicate
        this.bookings.filterPredicate = (data , filter) =>
        {
          return this.columnsToDisplay.some((column , i) =>
          {
            return column != "actions" && column != "selection" && data[column as keyof Booking] && data[column as keyof Booking].toString().toLowerCase().indexOf(filter) != -1;
          })
        }
      },
      error:(error) =>
      {
        console.log(error);
        this.isError = true;
        this.bookingLoadingStatus = "Error fetching the data";
      }},
    )
  }

  createTableDataSource(elements:any)
  {
    this.bookings = new MatTableDataSource<Booking>(elements);
    this.rows = elements;
    this.isLoadingCompleted = true;

    this.bookings.paginator = this.paginator;
    this.bookings.sort = this.sort;

    //filterPredicate
    this.bookings.filterPredicate = (data, filter) =>
    {
      return this.columnsToDisplay.some((column, i) =>
      {
        return column != "actions" && column != "select" && data[column as keyof Booking] && data[column as keyof Booking].toString().toLowerCase().indexOf(filter) != -1;
      })
    }
  }

  //Executes when the user changes the value of search textbox
  filterBookings()
  {
    if (this.formGroup.value.search != null && this.bookings)
    {
      this.bookings.filter = this.formGroup.value.search.trim();
    }
  }

  //Executes when the user clicks on clear button for search textbox
  clearFilter()
  {
    this.formGroup.patchValue({ search: "" });
    this.filterBookings();
  }
  //Returns true if all rows are selected; otherwise, false
  isAllSelected()
  {
    if (this.bookings)
    {
      const numSelected = this.selection.selected.length;
      const numRows = this.bookings.data.length;
      return numSelected == numRows;
    }
    return 
  }

  //Executes when the user checks / unchecks the master checkbox in the table
  masterToggle()
  {
    if (this.bookings)
    {
      if (this.isAllSelected())
      {
        this.selection.clear();
      }
      else
      {
        this.bookings.data.forEach(row => this.selection.select(row));
      }
    }
  }

    //Executes when the user clicks on menu icon
    openBottomSheet()
    {
      this.matBottomSheet.open(BottomSheetMenuComponent);
    }
  
    //Executes when the user clicks on "Change" button in the Check-In column
    onChangeDatesClick(booking: Booking)
    {
      let dialogRef: MatDialogRef<ChangeDatesComponent> = this.dialogService.openDateChangerDialog(booking);
  
      dialogRef.afterClosed().subscribe((myDialogResult) =>
      {
        if (myDialogResult && myDialogResult.data)
        {
          this.rows = this.rows.map(booking =>
          {
            if (booking.id == myDialogResult.data.id)
            {
              booking = { ...booking, checkIn: myDialogResult.data.checkIn, checkOut: myDialogResult.data.checkOut };
            }
  
            return booking;
          });
  
          this.createTableDataSource(this.rows);
        }
      });
    }
}