import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DebtsService} from '../../../services/debts.service';
import {GroupsService} from '../../../services/groups.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SnackBarService} from '../../../services/snack-bar.service';

@Component({
    selector: 'app-debts',
    templateUrl: './debts.component.html',
    styleUrls: ['./debts.component.scss']
})
export class DebtsComponent implements OnInit {
    id = this.route.snapshot.paramMap.get('id');
    loanCreation = false;
    debts = [];
    members = [];
    displayedColumns: string[] = ['name', 'created by', 'value', 'status', 'date', 'actions'];
    loanData = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        value: new FormControl('', [Validators.minLength(1), Validators.maxLength(10)]),
        debtor: new FormControl('', [Validators.required]),
    });

    constructor(private debtsService: DebtsService,
                private groupService: GroupsService,
                private snackBar: SnackBarService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.fetchDebts();
        this.fetchMembers();
    }

    public fetchMembers() {
        this.groupService.getMembers(this.id).subscribe(
            (res) => {
                this.members = res.members;
            },
        );
    }

    public fetchDebts() {
        this.debtsService.getDebts(this.id).subscribe(
            (res) => {
                this.debts = res.debts;
            },
        );
    }

    public saveLoan() {
        this.debtsService.createLoan(this.id, this.loanData.value).subscribe(
            (res) => {
                this.snackBar.show('Debt got created');
                this.loanCreation = false;
                this.fetchDebts();
            }, (err) => {
                this.snackBar.show('There was an error creating the debt');
            }
        );
    }

    public payDebt(holderId) {
        this.debtsService.payDebt(this.id, holderId).subscribe(
            (res) => {
                this.snackBar.show('Debt was set as paid');
                this.fetchDebts();
            }, (err) => {
                this.snackBar.show('There was an error paying the debt');
            }
        );
    }
}
