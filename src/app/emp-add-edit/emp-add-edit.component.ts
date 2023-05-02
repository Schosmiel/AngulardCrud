import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit{
  empForm: FormGroup;


 education:  string []=[
"Matrix",
"Diplomat",
"Intermediaire",
"Graduate",
"Poste Graduate"];

constructor(private _fb : FormBuilder,
  private _empService: EmployeeService, 
  private _dialogRef:MatDialogRef<EmpAddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private _coreService :CoreService
  ) 
  {
   this.empForm= this._fb.group({
    firstName:'',
    lastName:'',
    email:'',
    dateNaiss:'',
    gender:'',
    education:'',
    entreprise:'',
    experience:'',
    package:'',
    
   })
}
ngOnInit(): void {
    this.empForm.patchValue(this.data);
}
onFormSubmit(){
  if (this.empForm.valid){
    if(this.data){
      this._empService.updateEmployee(this.data.id ,this.empForm.value).subscribe({
        next:(val: any)=>{
         this._coreService.openSnackBar('Détail employé mise à jour!');
         this._dialogRef.close(true);
        },
        error: (err:any)=>{
          console.error(err)
        }
      })
    }else{
      this._empService.addEmployee(this.empForm.value).subscribe({
        next:(val: any)=>{
         this._coreService.openSnackBar('Employe ajouté avec succé!', 'Okay');
         this._dialogRef.close(true);
        },
        error: (err:any)=>{
          console.error(err)
        }
      })
    }
    
  }
}
}
