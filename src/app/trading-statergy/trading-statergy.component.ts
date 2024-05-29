import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trading-statergy',
  templateUrl: './trading-statergy.component.html',
  styleUrls: ['./trading-statergy.component.css']
})
export class TradingStatergyComponent implements OnInit {
  title = 'buying-strategy';
  showWarning = false;
  selectedOption: string | null = null;
  dontShowAgain = false;
  option:string = 'look'; 

  isAllLegs = true;
  isSLLegs = false;
  isCheckboxChecked = false;
  lastClickedLegs: string = 'alllegs';
  form: FormGroup;
  isContentVisible = false;
  itmOptions: string[] = [];
  otmOptions: string[] = [];
  legs: any[] = []; // New array to store legs

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      underlying: ['cash'],
      squareOff: ['partial'],
      legs: ['alllegs'],
      strategy: ['intraday'],
      noReentry: [false],
      reentryTime: [{ value: '', disabled: true }],
      strikeCriteria: [''],
      premium: [50],
      lower: [50],
      upper: [200],
      atmStrike: [0.5],
      atmPercentage: [0],
      atmStraddlePercentage: [0],
      underlyingType: ['futures'],
      positionType: ['buy'],
      segmentsType: ['call'],
      expiry: [''],
      selectedOption: ['look'],
      lookProfit: [0],
      lookLockProfit: [0],
      lookTrailProfit: [0],
      lookTrailLockProfit: [0],
      lookTrailIncrease: [0],
      lookTrailProfitBy: [0],
      overallTrailSLSelect: ['MTM'],
      overallTrailSLValue1: [0],
      overallTrailSLValue2: [0],
      targetProfit: this.fb.group({
        enable: [false] // Initially set to false (unchecked)
      }),
    });

    for (let i = 20; i >= 1; i--) {
      this.itmOptions.push(`ITM${i}`);
    }
    for (let i = 1; i <= 20; i++) {
      this.otmOptions.push(`OTM${i}`);
    }

    this.form.get('strikeCriteria')?.valueChanges.subscribe(value => {
      console.log('Strike Criteria changed:', value);
    });
    this.form.get('selectedOption')?.valueChanges.subscribe(option => {
      this.selectedOption = option;
    });
  }

  ngOnInit() {
    const dontShowAgainOption = localStorage.getItem('dontShowAgainOption');
    if (dontShowAgainOption) {
      this.selectedOption = dontShowAgainOption;
      this.showWarning = false;
    }

    this.form.get('noReentry')?.valueChanges.subscribe((checked: boolean) => {
      if (checked) {
        this.form.get('reentryTime')?.enable();
      } else {
        this.form.get('reentryTime')?.disable();
      }
    });
  }

  onIndexChange(event: any) {
    this.selectedOption = event.target.value;
    if (this.selectedOption === 'midcpnifty' || this.selectedOption === 'sensex' || this.selectedOption === 'bankex') {
      this.showWarning = true;
    } else {
      this.showWarning = false;
    }
  }

  closeWarning() {
    this.showWarning = false;
  }

  handleDontShowAgain(event: any) {
    this.dontShowAgain = event.target.checked;
    if (this.dontShowAgain && this.selectedOption) {
      localStorage.setItem('dontShowAgainOption', this.selectedOption);
    } else {
      localStorage.removeItem('dontShowAgainOption');
    }
  }

  selectOption(controlName: string, value: string) {
    this.form.get(controlName)?.setValue(value);
  }

  isSelected(controlName: string, value: string): boolean {
    return this.form.get(controlName)?.value === value;
  }

  onCheckboxChange(event: any) {
    this.isCheckboxChecked = event.target.checked;
    if (this.isCheckboxChecked) {
      if (this.lastClickedLegs === 'alllegs') {
        this.isAllLegs = true;
        this.isSLLegs = false;
      } else if (this.lastClickedLegs === 'sllegs') {
        this.isAllLegs = false;
        this.isSLLegs = true;
      }
    } else {
      this.isAllLegs = false;
      this.isSLLegs = false;
    }
  }

  selectStrategy(strategy: string) {
    this.form.get('strategy')?.setValue(strategy);
  }

  isStrategySelected(strategy: string): boolean {
    return this.form.get('strategy')?.value === strategy;
  }

  selectUnderlyingType(type: string) {
    this.form.get('underlyingType')?.setValue(type);
  }

  isUnderlyingTypeSelected(type: string): boolean {
    return this.form.get('underlyingType')?.value === type;
  }

  selectPositionType(type: string) {
    this.form.get('positionType')?.setValue(type);
  }

  isPositionTypeSelected(type: string): boolean {
    return this.form.get('positionType')?.value === type;
  }

  selectSegmentsType(type: string) {
    this.form.get('segmentsType')?.setValue(type);
  }

  isSegmentsTypeSelected(type: string): boolean {
    return this.form.get('segmentsType')?.value === type;
  }

  get selectedStrikeCriteria() {
    const criteria = this.form.get('strikeCriteria')?.value;
    console.log('Selected Strike Criteria:', criteria);
    return criteria;
  }

  toggleContent(): void {
    this.isContentVisible = !this.isContentVisible;
  }

  addLeg(): void {
    const leg = {
      underlyingType: this.form.get('underlyingType')?.value,
      totalLot: this.form.get('totalLot')?.value,
      positionType: this.form.get('positionType')?.value,
      segmentsType: this.form.get('segmentsType')?.value,
      expiry: this.form.get('expiry')?.value,
      strikeCriteria: this.form.get('strikeCriteria')?.value,
      premium: this.form.get('premium')?.value,
      lower: this.form.get('lower')?.value,
      upper: this.form.get('upper')?.value,
      atmStrike: this.form.get('atmStrike')?.value,
      atmPercentage: this.form.get('atmPercentage')?.value,
      atmStraddlePercentage: this.form.get('atmStraddlePercentage')?.value
    };
    this.legs.push(leg);
    console.log('Leg added:', leg);
  }

  isLegPositionTypeSelected(leg: any, type: string): boolean {
    return leg.positionType === type;
  }

  isLegSegmentsTypeSelected(leg: any, type: string): boolean {
    return leg.segmentsType === type;
  }
}
