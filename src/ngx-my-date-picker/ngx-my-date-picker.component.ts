import { Component, ElementRef, ViewEncapsulation, ViewChild, Renderer, ChangeDetectorRef } from "@angular/core";
import { IMyDate, IMyMonth, IMyCalendarDay, IMyCalendarMonth, IMyCalendarYear, IMyWeek, IMyOptions } from "./interfaces/index";
import { UtilService } from "./services/ngx-my-date-picker.util.service";

/*
declare var require: any;
const myDpStyles: string = require("./ngx-my-date-picker.component.css");
const myDpTpl: string = require("./ngx-my-date-picker.component.html");
*/

enum KeyCode {enter = 13, esc = 27, space = 32}
enum MonthId {prev = 1, curr = 2, next = 3}

@Component({
    selector: "ngx-my-date-picker",
    styles: [`.ngxmdp .headertodaybtn,.ngxmdp .monthcell,.ngxmdp .weekdaytitle{overflow:hidden;white-space:nowrap}.ngxmdp{position:relative}.ngxmdp *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;padding:0;margin:0}.ngxmdp .selector{margin-top:2px;margin-left:-1px;position:absolute;padding:0;border:1px solid #CCC;border-radius:4px;z-index:100;animation:selectorfadein 60ms}.ngxmdp .selector:focus{border:1px solid #ADD8E6;outline:0}@keyframes selectorfadein{from{opacity:0}to{opacity:1}}.ngxmdp .selectorarrow{background:#FAFAFA;margin-top:12px;padding:0}.ngxmdp .selectorarrow:after,.ngxmdp .selectorarrow:before{bottom:100%;border:solid transparent;content:" ";height:0;width:0;position:absolute}.ngxmdp .selectorarrow:after{border-color:rgba(250,250,250,0);border-bottom-color:#FAFAFA;border-width:10px;margin-left:-10px}.ngxmdp .selectorarrow:before{border-color:rgba(204,204,204,0);border-bottom-color:#CCC;border-width:11px;margin-left:-11px}.ngxmdp .selectorarrow:focus:before{border-bottom-color:#ADD8E6}.ngxmdp .selectorarrowleft:after,.ngxmdp .selectorarrowleft:before{left:24px}.ngxmdp .selectorarrowright:after,.ngxmdp .selectorarrowright:before{left:86%}.ngxmdp ::-ms-clear{display:none}.ngxmdp .headerbtnenabled,.ngxmdp .headertodaybtnenabled,.ngxmdp .yearchangebtnenabled{cursor:pointer}.ngxmdp .headerbtndisabled,.ngxmdp .headertodaybtndisabled,.ngxmdp .yearchangebtndisabled{cursor:not-allowed;opacity:.65}.ngxmdp .headertodaybtn{background:#FFF}.ngxmdp .header{width:100%;height:30px;border-radius:4px 4px 0 0;background-color:#FAFAFA}.ngxmdp .header td{vertical-align:middle;border:none;line-height:0}.ngxmdp .header td:nth-child(1){padding-left:4px}.ngxmdp .header td:nth-child(2){text-align:center}.ngxmdp .header td:nth-child(3){padding-right:4px}.ngxmdp .caltable,.ngxmdp .monthtable,.ngxmdp .yeartable{border-radius:0 0 4px 4px;table-layout:fixed;width:100%;height:calc(100% - 30px);background-color:#FAFAFA;font-size:14px}.ngxmdp .caltable tbody tr:nth-child(6) td:first-child,.ngxmdp .monthtable tbody tr:nth-child(4) td:first-child,.ngxmdp .yeartable tbody tr:nth-child(7) td:first-child{border-bottom-left-radius:4px}.ngxmdp .caltable tbody tr:nth-child(6) td:last-child,.ngxmdp .monthtable tbody tr:nth-child(4) td:last-child,.ngxmdp .yeartable tbody tr:nth-child(7) td:last-child{border-bottom-right-radius:4px}.ngxmdp .caltable,.ngxmdp .daycell,.ngxmdp .monthcell,.ngxmdp .monthtable,.ngxmdp .weekdaytitle,.ngxmdp .yearcell,.ngxmdp .yeartable{border-collapse:collapse;color:#000;line-height:1.1}.ngxmdp .daycell,.ngxmdp .monthcell,.ngxmdp .weekdaytitle,.ngxmdp .yearcell{padding:4px;text-align:center}.ngxmdp .weekdaytitle{background-color:#DDD;font-size:11px;font-weight:400;vertical-align:middle;max-width:36px}.ngxmdp .weekdaytitleweeknbr{width:20px;border-right:1px solid #BBB}.ngxmdp .monthcell{background-color:#FAFAFA}.ngxmdp .yearcell{background-color:#FAFAFA;width:20%}.ngxmdp .daycell .datevalue{background-color:inherit;vertical-align:middle}.ngxmdp .daycell .datevalue span{vertical-align:middle}.ngxmdp .daycellweeknbr{font-size:10px;border-right:1px solid #CCC;cursor:default;color:#000}.ngxmdp .nextmonth,.ngxmdp .prevmonth{color:#CCC}.ngxmdp .disabled{cursor:default!important;color:#CCC!important;background:#FBEFEF!important}.ngxmdp .highlight{color:#fff;background-color:#46df8c!important}.ngxmdp .dimday{opacity:.5}.ngxmdp .currmonth{background-color:#F6F6F6;font-weight:400}.ngxmdp .markdate{position:absolute;width:4px;height:4px;border-radius:4px}.ngxmdp .markcurrday,.ngxmdp .markcurrmonth,.ngxmdp .markcurryear{text-decoration:underline}.ngxmdp .selectedday .datevalue,.ngxmdp .selectedmonth .monthvalue,.ngxmdp .selectedyear .yearvalue{border:none;background-color:#8EBFFF!important;border-radius:2px}.ngxmdp .headerbtncell{background-color:#FAFAFA;display:table-cell;vertical-align:middle}.ngxmdp .yearchangebtncell{text-align:center;background-color:#FAFAFA}.ngxmdp .headerbtn,.ngxmdp .headerlabelbtn,.ngxmdp .yearchangebtn{background:#FAFAFA;border:none;height:22px}.ngxmdp .headerbtn{width:16px}.ngxmdp .headerlabelbtn{font-size:14px;outline:0;cursor:default}.ngxmdp .headerlabelbtnnotedit{cursor:default}.ngxmdp .headertodaybtn{border:1px solid #CCC;padding:0 4px;border-radius:4px;font-size:11px;height:22px;min-width:60px;max-width:84px}.ngxmdp .headerbtn,.ngxmdp .headermonthtxt,.ngxmdp .headertodaybtn,.ngxmdp .headeryeartxt,.ngxmdp .yearchangebtn{color:#000}.ngxmdp button::-moz-focus-inner{border:0}.ngxmdp .headermonthtxt,.ngxmdp .headeryeartxt{text-align:center;display:table-cell;vertical-align:middle;font-size:14px;height:26px;width:40px;max-width:40px;overflow:hidden;white-space:nowrap}.ngxmdp .headertodaybtn:focus{background:#ADD8E6}.ngxmdp .headerbtn:focus,.ngxmdp .monthlabel:focus,.ngxmdp .yearchangebtn:focus,.ngxmdp .yearlabel:focus{color:#ADD8E6;outline:0}.ngxmdp .daycell:focus,.ngxmdp .monthcell:focus,.ngxmdp .yearcell:focus{outline:#CCC solid 1px}.ngxmdp .icon-ngxmydpdown,.ngxmdp .icon-ngxmydpleft,.ngxmdp .icon-ngxmydpright,.ngxmdp .icon-ngxmydpup{color:#222;font-size:20px}.ngxmdp .icon-ngxmydptoday{color:#222;font-size:11px}.ngxmdp table{display:table;border-spacing:0}.ngxmdp table td{padding:0}.ngxmdp table,.ngxmdp td,.ngxmdp th{border:none}.ngxmdp .headertodaybtnenabled:hover{background-color:#E6E6E6}.ngxmdp .tablesingleday:hover,.ngxmdp .tablesinglemonth:hover,.ngxmdp .tablesingleyear:hover{background-color:#DDD}daycell currmonth highlight tablesingleday{background-color:#46df8c!important}.ngxmdp .daycell,.ngxmdp .monthcell,.ngxmdp .monthlabel,.ngxmdp .yearcell,.ngxmdp .yearlabel{cursor:pointer}.ngxmdp .headerbtnenabled:hover,.ngxmdp .monthlabel:hover,.ngxmdp .yearchangebtnenabled:hover,.ngxmdp .yearlabel:hover{color:#777}@font-face{font-family:ngx-mydatepicker;src:url(data:application/octet-stream;base64,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QGBZZrABY7AEJmEgsAQlYGQjsAMlYGRQWCEbIyFZIyAgsAQmI0ZhOFktsDcssAAWICAgsAUmIC5HI0cjYSM8OC2wOCywABYgsAgjQiAgIEYjR7ABKyNhOC2wOSywABawAyWwAiVHI0cjYbAAVFguIDwjIRuwAiWwAiVHI0cjYSCwBSWwBCVHI0cjYbAGJbAFJUmwAiVhuQgACABjYyMgWGIbIVljuAQAYiCwAFBYsEBgWWawAWNgIy4jICA8ijgjIVktsDossAAWILAIQyAuRyNHI2EgYLAgYGawAmIgsABQWLBAYFlmsAFjIyAgPIo4LbA7LCMgLkawAiVGUlggPFkusSsBFCstsDwsIyAuRrACJUZQWCA8WS6xKwEUKy2wPSwjIC5GsAIlRlJYIDxZIyAuRrACJUZQWCA8WS6xKwEUKy2wPiywNSsjIC5GsAIlRlJYIDxZLrErARQrLbA/LLA2K4ogIDywBCNCijgjIC5GsAIlRlJYIDxZLrErARQrsARDLrArKy2wQCywABawBCWwBCYgLkcjRyNhsAlDKyMgPCAuIzixKwEUKy2wQSyxCAQlQrAAFrAEJbAEJSAuRyNHI2EgsAQjQrAJQysgsGBQWCCwQFFYswIgAyAbswImAxpZQkIjIEewBEOwAmIgsABQWLBAYFlmsAFjYCCwASsgiophILACQ2BkI7ADQ2FkUFiwAkNhG7ADQ2BZsAMlsAJiILAAUFiwQGBZZrABY2GwAiVGYTgjIDwjOBshICBGI0ewASsjYTghWbErARQrLbBCLLA1Ky6xKwEUKy2wQyywNishIyAgPLAEI0IjOLErARQrsARDLrArKy2wRCywABUgR7AAI0KyAAEBFRQTLrAxKi2wRSywABUgR7AAI0KyAAEBFRQTLrAxKi2wRiyxAAEUE7AyKi2wRyywNCotsEgssAAWRSMgLiBGiiNhOLErARQrLbBJLLAII0KwSCstsEossgAAQSstsEsssgABQSstsEwssgEAQSstsE0ssgEBQSstsE4ssgAAQistsE8ssgABQistsFAssgEAQistsFEssgEBQistsFIssgAAPistsFMssgABPistsFQssgEAPistsFUssgEBPistsFYssgAAQCstsFcssgABQCstsFgssgEAQCstsFkssgEBQCstsFossgAAQystsFsssgABQystsFwssgEAQystsF0ssgEBQystsF4ssgAAPystsF8ssgABPystsGAssgEAPystsGEssgEBPystsGIssDcrLrErARQrLbBjLLA3K7A7Ky2wZCywNyuwPCstsGUssAAWsDcrsD0rLbBmLLA4Ky6xKwEUKy2wZyywOCuwOystsGgssDgrsDwrLbBpLLA4K7A9Ky2waiywOSsusSsBFCstsGsssDkrsDsrLbBsLLA5K7A8Ky2wbSywOSuwPSstsG4ssDorLrErARQrLbBvLLA6K7A7Ky2wcCywOiuwPCstsHEssDorsD0rLbByLLMJBAIDRVghGyMhWUIrsAhlsAMkUHiwARUwLQBLuADIUlixAQGOWbABuQgACABjcLEABUKyAAEAKrEABUKzCgIBCCqxAAVCsw4AAQgqsQAGQroCwAABAAkqsQAHQroAQAABAAkqsQMARLEkAYhRWLBAiFixA2REsSYBiFFYugiAAAEEQIhjVFixAwBEWVlZWbMMAgEMKrgB/4WwBI2xAgBEAAA=) format('truetype');font-weight:400;font-style:normal}.ngxmdp .ngxmdpicon{font-family:ngx-mydatepicker;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ngxmdp .icon-ngxmydpright:before{content:"\\e800"}.ngxmdp .icon-ngxmydpleft:before{content:"\\e801"}.ngxmdp .icon-ngxmydptoday:before{content:"\\e802"}.ngxmdp .icon-ngxmydpup:before{content:"\\e803"}.ngxmdp .icon-ngxmydpdown:before{content:"\\e804"}`],
    template: `<div class="ngxmdp"><div class="selector" #selectorEl [ngxfocus]="1" [ngStyle]="{'width': opts.selectorWidth, 'height' : opts.selectorHeight, 'bottom': opts.openSelectorTopOfInput?((inputHeight + 2)+'px') : 'initial', 'right': opts.alignSelectorRight ? '0' : 'initial'}" (keyup)="onCloseSelector($event)" tabindex="0"><table class="header"><tr><td><div style="float:left"><div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelPrevMonth" class="headerbtn ngxmdpicon icon-ngxmydpleft" (click)="onPrevMonth()" [disabled]="prevMonthDisabled" [ngClass]="{'headerbtnenabled': !prevMonthDisabled, 'headerbtndisabled': prevMonthDisabled}"></button></div><div class="headermonthtxt"><button class="headerlabelbtn" [ngClass]="{'monthlabel': opts.monthSelector, 'headerlabelbtnnotedit': !opts.monthSelector}" type="button" (click)="opts.monthSelector&&onSelectMonthClicked($event)" tabindex="{{opts.monthSelector?'0':'-1'}}">{{visibleMonth.monthTxt}}</button></div><div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelNextMonth" class="headerbtn ngxmdpicon icon-ngxmydpright" (click)="onNextMonth()" [disabled]="nextMonthDisabled" [ngClass]="{'headerbtnenabled': !nextMonthDisabled, 'headerbtndisabled': nextMonthDisabled}"></button></div></div></td><td><button *ngIf="opts.showTodayBtn" type="button" class="headertodaybtn" (click)="onTodayClicked()" [disabled]="disableTodayBtn" [ngClass]="{'headertodaybtnenabled': !disableTodayBtn, 'headertodaybtndisabled': disableTodayBtn}"><span class="ngxmdpicon icon-ngxmydptoday"></span> <span>{{opts.todayBtnTxt}}</span></button></td><td><div style="float:right"><div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelPrevYear" class="headerbtn ngxmdpicon icon-ngxmydpleft" (click)="onPrevYear()" [disabled]="prevYearDisabled" [ngClass]="{'headerbtnenabled': !prevYearDisabled, 'headerbtndisabled': prevYearDisabled}"></button></div><div class="headeryeartxt"><button class="headerlabelbtn" [ngClass]="{'yearlabel': opts.yearSelector, 'headerlabelbtnnotedit': !opts.yearSelector}" type="button" (click)="opts.yearSelector&&onSelectYearClicked($event)" tabindex="{{opts.yearSelector?'0':'-1'}}">{{visibleMonth.year}}</button></div><div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelNextYear" class="headerbtn ngxmdpicon icon-ngxmydpright" (click)="onNextYear()" [disabled]="nextYearDisabled" [ngClass]="{'headerbtnenabled': !nextYearDisabled, 'headerbtndisabled': nextYearDisabled}"></button></div></div></td></tr></table><table class="caltable" *ngIf="!selectMonth&&!selectYear"><thead><tr><th class="weekdaytitle weekdaytitleweeknbr" *ngIf="opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'">#</th><th class="weekdaytitle" scope="col" *ngFor="let d of weekDays">{{d}}</th></tr></thead><tbody><tr *ngFor="let w of dates"><td class="daycell daycellweeknbr" *ngIf="opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'">{{w.weekNbr}}</td><td class="daycell" *ngFor="let d of w.week" [ngClass]="{'currmonth':d.cmo===currMonthId&&!d.disabled, 'selectedday':selectedDate.day===d.dateObj.day && selectedDate.month===d.dateObj.month && selectedDate.year===d.dateObj.year && d.cmo===currMonthId, 'disabled': d.disabled,'highlight':d.highlight ,'tablesingleday': d.cmo===currMonthId&&!d.disabled}" (click)="!d.disabled&&onCellClicked(d);$event.stopPropagation()" (keydown)="onCellKeyDown($event, d)" tabindex="0"><div *ngIf="d.markedDate.marked" class="markdate" [ngStyle]="{'background-color': d.markedDate.color}"></div><div class="datevalue" [ngClass]="{'prevmonth':d.cmo===prevMonthId,'currmonth':d.cmo===currMonthId,'nextmonth':d.cmo===nextMonthId,'highlight':d.highlight}"><span [ngClass]="{'markcurrday':d.currDay&&opts.markCurrentDay, 'dimday': d.highlight && (d.cmo===prevMonthId || d.cmo===nextMonthId || d.disabled)}">{{d.dateObj.day}}</span></div></td></tr></tbody></table><table class="monthtable" *ngIf="selectMonth"><tbody><tr *ngFor="let mr of months"><td class="monthcell tablesinglemonth" [ngClass]="{'selectedmonth': m.selected, 'disabled': m.disabled}" *ngFor="let m of mr" (click)="!m.disabled&&onMonthCellClicked(m);$event.stopPropagation()" (keydown)="onMonthCellKeyDown($event, m)" tabindex="0"><div class="monthvalue" [ngClass]="{'markcurrmonth':m.currMonth&&opts.markCurrentMonth}">{{m.name}}</div></td></tr></tbody></table><table class="yeartable" *ngIf="selectYear"><tbody><tr><td colspan="5" class="yearchangebtncell" (click)="$event.stopPropagation()"><button type="button" class="yearchangebtn ngxmdpicon icon-ngxmydpup" (click)="onPrevYears($event, years[0][0].year)" [disabled]="prevYearsDisabled" [ngClass]="{'yearchangebtnenabled': !prevYearsDisabled, 'yearchangebtndisabled': prevYearsDisabled}"></button></td></tr><tr *ngFor="let yr of years"><td class="yearcell tablesingleyear" [ngClass]="{'selectedyear': y.selected, 'disabled': y.disabled}" *ngFor="let y of yr" (click)="!y.disabled&&onYearCellClicked(y);$event.stopPropagation()" (keydown)="onYearCellKeyDown($event, y)" tabindex="0"><div class="yearvalue" [ngClass]="{'markcurryear':y.currYear&&opts.markCurrentYear}">{{y.year}}</div></td></tr><tr><td colspan="5" class="yearchangebtncell" (click)="$event.stopPropagation()"><button type="button" class="yearchangebtn ngxmdpicon icon-ngxmydpdown" (click)="onNextYears($event, years[0][0].year)" [disabled]="nextYearsDisabled" [ngClass]="{'yearchangebtnenabled': !nextYearsDisabled, 'yearchangebtndisabled': nextYearsDisabled}"></button></td></tr></tbody></table></div></div>`,
    providers: [UtilService],
    encapsulation: ViewEncapsulation.None
})

export class NgxMyDatePicker {
    @ViewChild("selectorEl") selectorEl: any;
    opts: IMyOptions;
    visibleMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    selectedMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    selectedDate: IMyDate = {year: 0, month: 0, day: 0};
    weekDays: Array<string> = [];
    dates: Array<IMyWeek> = [];
    months: Array<Array<IMyCalendarMonth>> = [];
    years: Array<Array<IMyCalendarYear>> = [];
    disableTodayBtn: boolean = false;
    dayIdx: number = 0;
    weekDayOpts: Array<string> = ["su", "mo", "tu", "we", "th", "fr", "sa"];

    selectMonth: boolean = false;
    selectYear: boolean = false;

    dateChanged: Function;
    calendarViewChanged: Function;
    closedByEsc: Function;
    inputHeight: number = 0;

    prevMonthDisabled: boolean = false;
    nextMonthDisabled: boolean = false;
    prevYearDisabled: boolean = false;
    nextYearDisabled: boolean = false;
    prevYearsDisabled: boolean = false;
    nextYearsDisabled: boolean = false;

    prevMonthId: number = MonthId.prev;
    currMonthId: number = MonthId.curr;
    nextMonthId: number = MonthId.next;

    constructor(public elem: ElementRef, private renderer: Renderer, private cdr: ChangeDetectorRef, private utilService: UtilService) {
        renderer.listen(elem.nativeElement, "click", (evt: MouseEvent) => {
            if ((this.opts.monthSelector || this.opts.yearSelector) && evt.target) {
                this.resetMonthYearSelect();
            }
        });
    }

    initialize(opts: IMyOptions, defaultMonth: string, inputValue: string, inputHeight: number, dc: Function, cvc: Function, cbe: Function): void {
        this.opts = opts;
        this.weekDays.length = 0;

        this.isTodayDisabled();
        this.dayIdx = this.weekDayOpts.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            let idx: number = this.dayIdx;
            for (let i = 0; i < this.weekDayOpts.length; i++) {
                this.weekDays.push(this.opts.dayLabels[this.weekDayOpts[idx]]);
                idx = this.weekDayOpts[idx] === "sa" ? 0 : idx + 1;
            }
        }

        let date: IMyDate = this.utilService.isDateValid(inputValue, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.monthLabels, this.opts.enableDates);
        if (date.day !== 0 && date.month !== 0 && date.year !== 0) {
            this.selectedDate = date;
        }
        else {
            if (defaultMonth !== null && defaultMonth !== undefined && defaultMonth !== "") {
                this.selectedMonth = this.utilService.parseDefaultMonth(defaultMonth);
            }
        }

        this.dateChanged = dc;
        this.calendarViewChanged = cvc;
        this.closedByEsc = cbe;
        this.inputHeight = inputHeight;

        this.setVisibleMonth();
    }

    setCalendarView(date: IMyDate): void {
        this.selectedDate = date;
        this.setVisibleMonth();
    }

    resetMonthYearSelect(): void {
        this.selectMonth = false;
        this.selectYear = false;
    }

    onSelectMonthClicked(event: any): void {
        event.stopPropagation();
        this.selectMonth = !this.selectMonth;
        this.selectYear = false;
        this.cdr.detectChanges();
        if (this.selectMonth) {
            let today: IMyDate = this.getToday();
            this.months.length = 0;
            for (let i = 1; i <= 12; i += 3) {
                let row: Array<IMyCalendarMonth> = [];
                for (let j = i; j < i + 3; j++) {
                    let disabled: boolean = this.utilService.isMonthDisabledByDisableUntil({year: this.visibleMonth.year, month: j, day: this.daysInMonth(j, this.visibleMonth.year)}, this.opts.disableUntil)
                        || this.utilService.isMonthDisabledByDisableSince({year: this.visibleMonth.year, month: j, day: 1}, this.opts.disableSince);
                    row.push({nbr: j, name: this.opts.monthLabels[j], currMonth: j === today.month && this.visibleMonth.year === today.year, selected: j === this.visibleMonth.monthNbr, disabled: disabled});
                }
                this.months.push(row);
            }
        }
    }

    onMonthCellClicked(cell: IMyCalendarMonth): void {
        let mc: boolean = cell.nbr !== this.visibleMonth.monthNbr;
        this.visibleMonth = {monthTxt: this.opts.monthLabels[cell.nbr], monthNbr: cell.nbr, year: this.visibleMonth.year};
        this.generateCalendar(cell.nbr, this.visibleMonth.year, mc);
        this.selectMonth = false;
        this.selectorEl.nativeElement.focus();
    }

    onMonthCellKeyDown(event: any, cell: IMyCalendarMonth) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onMonthCellClicked(cell);
        }
    }

    onSelectYearClicked(event: any): void {
        event.stopPropagation();
        this.selectYear = !this.selectYear;
        this.selectMonth = false;
        this.cdr.detectChanges();
        if (this.selectYear) {
            this.generateYears(this.visibleMonth.year);
        }
    }

    onYearCellClicked(cell: IMyCalendarYear): void {
        let yc: boolean = cell.year !== this.visibleMonth.year;
        this.visibleMonth = {monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: cell.year};
        this.generateCalendar(this.visibleMonth.monthNbr, cell.year, yc);
        this.selectYear = false;
        this.selectorEl.nativeElement.focus();
    }

    onPrevYears(event: any, year: number): void {
        event.stopPropagation();
        this.generateYears(year - 25);
    }

    onNextYears(event: any, year: number): void {
        event.stopPropagation();
        this.generateYears(year + 25);
    }

    generateYears(year: number): void {
        this.years.length = 0;
        let today: IMyDate = this.getToday();
        for (let i = year; i <= 20 + year; i += 5) {
            let row: Array<IMyCalendarYear> = [];
            for (let j = i; j < i + 5; j++) {
                let disabled: boolean = this.utilService.isMonthDisabledByDisableUntil({year: j, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, j)}, this.opts.disableUntil)
                    || this.utilService.isMonthDisabledByDisableSince({year: j, month: this.visibleMonth.monthNbr, day: 1}, this.opts.disableSince);
                let minMax: boolean = j < this.opts.minYear || j > this.opts.maxYear;
                row.push({year: j, currYear: j === today.year, selected: j === this.visibleMonth.year, disabled: disabled || minMax});
            }
            this.years.push(row);
        }
        this.prevYearsDisabled = this.years[0][0].year <= this.opts.minYear || this.utilService.isMonthDisabledByDisableUntil({year: this.years[0][0].year - 1, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, this.years[0][0].year - 1)}, this.opts.disableUntil);
        this.nextYearsDisabled = this.years[4][4].year >= this.opts.maxYear || this.utilService.isMonthDisabledByDisableSince({year: this.years[4][4].year + 1, month: this.visibleMonth.monthNbr, day: 1}, this.opts.disableSince);
    }

    onYearCellKeyDown(event: any, cell: IMyCalendarYear) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onYearCellClicked(cell);
        }
    }

    isTodayDisabled(): void {
        this.disableTodayBtn = this.utilService.isDisabledDate(this.getToday(), this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.enableDates);
    }

    setVisibleMonth(): void {
        // Sets visible month of calendar
        let y: number = 0, m: number = 0;
        if (this.selectedDate.year === 0 && this.selectedDate.month === 0 && this.selectedDate.day === 0) {
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                let today: IMyDate = this.getToday();
                y = today.year;
                m = today.month;
            } else {
                y = this.selectedMonth.year;
                m = this.selectedMonth.monthNbr;
            }
        }
        else {
            y = this.selectedDate.year;
            m = this.selectedDate.month;
        }
        this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};

        // Create current month
        this.generateCalendar(m, y, true);
    }

    onPrevMonth(): void {
        // Previous month from calendar
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};
        this.generateCalendar(m, y, true);
    }

    onNextMonth(): void {
        // Next month from calendar
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};
        this.generateCalendar(m, y, true);
    }

    onPrevYear(): void {
        // Previous year from calendar
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    }

    onNextYear(): void {
        // Next year from calendar
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    }

    onCloseSelector(event: any): void {
        if (event.keyCode === KeyCode.esc) {
            this.closedByEsc();
        }
    }

    onTodayClicked(): void {
        // Today button clicked
        let today: IMyDate = this.getToday();
        this.selectDate(today);
        if (!this.opts.closeSelectorOnDateSelect) {
            this.setVisibleMonth();
        }
    }

    onCellClicked(cell: any): void {
        // Cell clicked on the calendar
        if (cell.cmo === this.prevMonthId) {
            // Previous month of day
            this.onPrevMonth();
        }
        else if (cell.cmo === this.currMonthId) {
            // Current month of day
            this.selectDate(cell.dateObj);
        }
        else if (cell.cmo === this.nextMonthId) {
            // Next month of day
            this.onNextMonth();
        }
        this.resetMonthYearSelect();
    }

    onCellKeyDown(event: any, cell: any) {
        // Cell keyboard handling
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onCellClicked(cell);
        }
    }

    selectDate(date: IMyDate): void {
        // Notifies parent using callback
        this.selectedDate = date;
        this.dateChanged(this.utilService.getDateModel(date, this.opts.dateFormat, this.opts.monthLabels), this.opts.closeSelectorOnDateSelect);
    }

    monthStartIdx(y: number, m: number): number {
        // Month start index
        let d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        let idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }

    daysInMonth(m: number, y: number): number {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    }

    daysInPrevMonth(m: number, y: number): number {
        // Return number of days of the previous month
        let d: Date = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    }

    isCurrDay(d: number, m: number, y: number, cmo: number, today: IMyDate): boolean {
        // Check is a given date the today
        return d === today.day && m === today.month && y === today.year && cmo === this.currMonthId;
    }

    getToday(): IMyDate {
        let date: Date = new Date();
        return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
    }

    getDayNumber(date: IMyDate): number {
        // Get day number: su=0, mo=1, tu=2, we=3 ...
        let d: Date = this.getDate(date.year, date.month, date.day);
        return d.getDay();
    }

    getWeekday(date: IMyDate): string {
        // Get weekday: su, mo, tu, we ...
        return this.weekDayOpts[this.getDayNumber(date)];
    }

    getDate(year: number, month: number, day: number): Date {
        // Creates a date object from given year, month and day
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    sundayIdx(): number {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }

    generateCalendar(m: number, y: number, notifyChange: boolean): void {
        this.dates.length = 0;
        let today: IMyDate = this.getToday();
        let monthStart: number = this.monthStartIdx(y, m);
        let dInThisM: number = this.daysInMonth(m, y);
        let dInPrevM: number = this.daysInPrevMonth(m, y);

        let dayNbr: number = 1;
        let cmo: number = this.prevMonthId;
        for (let i = 1; i < 7; i++) {
            let week: Array<IMyCalendarDay> = [];
            if (i === 1) {
                // First week
                let pm = dInPrevM - monthStart + 1;
                // Previous month
                for (let j = pm; j <= dInPrevM; j++) {
                    let date: IMyDate = {year: y, month: m - 1, day: j};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo, today), disabled: this.utilService.isDisabledDate(date, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.enableDates), markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends), highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates)});
                }

                cmo = this.currMonthId;
                // Current month
                let daysLeft: number = 7 - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    let date: IMyDate = {year: y, month: m, day: dayNbr};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today), disabled: this.utilService.isDisabledDate(date, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.enableDates), markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends), highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates)});
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (let j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.nextMonthId;
                    }
                    let date: IMyDate = {year: y, month: cmo === this.currMonthId ? m : m + 1, day: dayNbr};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today), disabled: this.utilService.isDisabledDate(date, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDates, this.opts.disableDateRanges, this.opts.enableDates), markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends), highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates)});
                    dayNbr++;
                }
            }
            let weekNbr: number = this.opts.showWeekNumbers  && this.opts.firstDayOfWeek === "mo" ? this.utilService.getWeekNumber(week[0].dateObj) : 0;
            this.dates.push({week: week, weekNbr: weekNbr});
        }

        this.setHeaderBtnDisabledState(m, y);

        if (notifyChange) {
            // Notify parent
            this.calendarViewChanged({year: y, month: m, first: {number: 1, weekday: this.getWeekday({year: y, month: m, day: 1})}, last: {number: dInThisM, weekday: this.getWeekday({year: y, month: m, day: dInThisM})}});
        }
    }

    setHeaderBtnDisabledState(m: number, y: number): void {
        let dpm: boolean = false;
        let dpy: boolean = false;
        let dnm: boolean = false;
        let dny: boolean = false;
        if (this.opts.disableHeaderButtons) {
            dpm = this.utilService.isMonthDisabledByDisableUntil({year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: this.daysInMonth(m === 1 ? 12 : m - 1, m === 1 ? y - 1 : y)}, this.opts.disableUntil);
            dpy = this.utilService.isMonthDisabledByDisableUntil({year: y - 1, month: m, day: this.daysInMonth(m, y - 1)}, this.opts.disableUntil);
            dnm = this.utilService.isMonthDisabledByDisableSince({year: m === 12 ? y + 1 : y, month: m === 12 ? 1 : m + 1, day: 1}, this.opts.disableSince);
            dny = this.utilService.isMonthDisabledByDisableSince({year: y + 1, month: m, day: 1}, this.opts.disableSince);
        }
        this.prevMonthDisabled = m === 1 && y === this.opts.minYear || dpm;
        this.prevYearDisabled = y - 1 < this.opts.minYear || dpy;
        this.nextMonthDisabled = m === 12 && y === this.opts.maxYear || dnm;
        this.nextYearDisabled = y + 1 > this.opts.maxYear || dny;
    }
}
