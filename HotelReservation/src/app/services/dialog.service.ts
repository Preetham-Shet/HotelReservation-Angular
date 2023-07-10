import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Booking } from '../models/booking';
import { ChangeDatesComponent } from '../components/change-dates/change-dates.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  openDateChangerDialog(booking: Booking): MatDialogRef<ChangeDatesComponent>
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "dialog-box";
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = booking;

    let dialogRef: MatDialogRef<ChangeDatesComponent> = this.matDialog.open(ChangeDatesComponent, dialogConfig);
    //console.log(dialogRef);

    return dialogRef;
  }
}
