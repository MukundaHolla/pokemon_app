import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RestAPIService } from '../../service/rest-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageComponent implements OnInit {
  Pokemon: any = [];
  displayedColumns: string[] = ['name', 'url'];
  dataSource = new MatTableDataSource(this.Pokemon);
  previous: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restApi: RestAPIService, public router: Router) {}

  ngOnInit() {
    this.loadPokemon();
  }

  // Get pokemon list
  loadPokemon() {
    return this.restApi.getPokemon().subscribe((data: {}) => {
      this.Pokemon = data;
      this.dataSource = new MatTableDataSource(this.Pokemon['results']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getNextRecordSet() {
    let url = this.Pokemon['next'];
    return this.restApi.getNextPokemonRecord(url).subscribe((data: {}) => {
      this.Pokemon = data;
      this.previous = this.Pokemon['previous'] === null ? false : true;
      this.dataSource = new MatTableDataSource(this.Pokemon['results']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getPreviousRecordSet() {
    return this.restApi
      .getNextPokemonRecord(this.Pokemon['previous'])
      .subscribe((data: {}) => {
        this.Pokemon = data;
        this.previous = this.Pokemon['previous'] === null ? false : true;
        this.dataSource = new MatTableDataSource(this.Pokemon['results']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
