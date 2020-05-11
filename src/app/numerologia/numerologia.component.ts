import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numerologia',
  templateUrl: './numerologia.component.html',
  styleUrls: ['./numerologia.component.scss']
})
export class NumerologiaComponent implements OnInit {

  nome: string = '';
  valores: { letra: string, numero: number }[] = [];
  final: { numero: number, soma: number };

  constructor() { }

  ngOnInit() {
  }

  calcularLetras(refNome: string) {
    const nome = refNome.toUpperCase();
    let total = 0;
    let valores = [];
    for (let i = 0; i < nome.length; i++) {
      let letra = nome[i];
      let numero = this.sumDigits(letra.charCodeAt(0) - 64);
      total += numero;
      valores.push({ letra: letra, numero: numero });
    }

    this.valores = valores;
    this.final = { numero: total, soma: this.sumDigits(total) };
  }

  sumDigits(n) {
    return (n - 1) % 9 + 1;
  }

}
