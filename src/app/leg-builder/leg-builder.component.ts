import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-leg-builder',
  templateUrl: './leg-builder.component.html',
  styleUrl: './leg-builder.component.css'
})
export class LegBuilderComponent {
  strategyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LegBuilderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { strategyName: string }
  ) {
    this.strategyForm = this.fb.group({
      strategyName: [data.strategyName || '', Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.strategyForm.valid) {
      const strategyName = this.strategyForm.value.strategyName;
      this.dialogRef.close(strategyName);
    }
  }
}
