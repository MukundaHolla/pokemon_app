import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestAPIService } from '../../service/rest-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  PokemonDetails: any = [];
  imgPathFront = '';
  imgPathBack = '';
  likeColor = '';
  panelOpenState = false;

  constructor(
    private route: ActivatedRoute,
    public restApi: RestAPIService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pokemonDetails(params['id']);
    });
  }

  pokemonDetails(id) {
    let param = id[0] === '/' ? id[1] : id;
    return this.restApi.getPokemonDetails(param).subscribe((data: {}) => {
      console.log(data);
      this.PokemonDetails = data;
      this.imgPathFront = this.PokemonDetails['sprites']['front_default'];
      this.imgPathBack = this.PokemonDetails['sprites']['front_shiny'];
    });
  }

  likeChange() {
    this.likeColor = 'warn';
  }

  shareUrl() {
    let url = window.location.href;
    var clipboard = document.createElement('input');
    document.body.appendChild(clipboard);
    clipboard.value = url;
    clipboard.select();
    document.execCommand('copy');
    document.body.removeChild(clipboard);
    this.openSnackBar('Copied URL to clipboard', 'Close');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }
}
