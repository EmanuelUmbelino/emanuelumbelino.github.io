import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numerologia',
  templateUrl: './numerologia.component.html',
  styleUrls: ['./numerologia.component.scss']
})
export class NumerologiaComponent implements OnInit {

  texto: string = '';
  frase: frase;

  constructor() { }

  ngOnInit() {
  }

  calcularPorPalavra(refFrase: string) {
    const palavras = refFrase.trim().split(' ');
    const frase: frase = {
      frase: refFrase.toUpperCase(),
      numero: 0,
      soma: 0,
      palavras: []
    }
    palavras.forEach(p => {
      let palavra = this.calcularPorLetras(p);
      frase.numero += palavra.soma;
      frase.palavras.push(palavra);
    });
    frase.soma = this.somarDigitos(frase.numero);

    this.frase = frase;
  }

  calcularPorLetras(refPalavra: string): palavra {
    const palavra = this.removeAcento(refPalavra);
    let total = 0;
    let valores = [];
    for (let i = 0; i < palavra.length; i++) {
      let letra = palavra[i];
      let numero = this.somarDigitos(letra.charCodeAt(0) - 64);
      total += numero;
      valores.push({ letra: letra, numero: numero });
    }

    return {
      palavra: refPalavra.toUpperCase(),
      numero: total, soma: this.somarDigitos(total),
      letras: valores
    }
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

interface letra {
  letra: string,
  numero: number,
}

interface palavra {
  palavra: string,
  numero: number,
  soma: number,
  letras: letra[]
}

interface frase {
  frase: string,
  numero: number,
  soma: number,
  palavras: palavra[]
}