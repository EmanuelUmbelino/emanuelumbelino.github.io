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
    const nome = this.removeAcento(refNome);
    let total = 0;
    let valores = [];
    for (let i = 0; i < nome.length; i++) {
      let letra = nome[i];
      let numero = this.somarDigitos(letra.charCodeAt(0) - 64);
      total += numero;
      valores.push({ letra: letra, numero: numero });
    }

    this.valores = valores;
    this.final = { numero: total, soma: this.somarDigitos(total) };
  }

  somarDigitos(n) {
    return (n - 1) % 9 + 1;
  }

  removeAcento(text) {
    text = text.toUpperCase();
    text = text.replace(/[ÁÀÂÃ]/g, 'A');
    text = text.replace(/[ÉÈÊ]/g, 'E');
    text = text.replace(/[ÍÌÎ]/g, 'I');
    text = text.replace(/[ÓÒÔÕ]/g, 'O');
    text = text.replace(/[ÚÙÛ]/g, 'U');
    text = text.replace(/[Ç]/g, 'C');
    text = text.replace(/[^A-Z]/g, '');
    return text;
  }

}
