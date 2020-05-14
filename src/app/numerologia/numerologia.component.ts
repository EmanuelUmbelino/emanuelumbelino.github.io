import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numerologia',
  templateUrl: './numerologia.component.html',
  styleUrls: ['./numerologia.component.scss']
})
export class NumerologiaComponent implements OnInit {

  tabela = [
    'ABCDEFGHI',
    'JKLMNOPQR',
    'STUVWXYZ ',
  ]
  colunas: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  texto: string = '';
  frase: frase;

  constructor() { }

  ngOnInit() {
  }

  calcularPorPalavra(refFrase: string) {
    const palavras = refFrase.trim().replace(/\s\s+/g, ' ').split(' ');
    const frase: frase = {
      frase: refFrase.toLowerCase(),
      numero: 0,
      soma: 0,
      palavras: []
    }
    palavras.forEach(p => {
      let palavra = this.calcularPorLetras(p);
      frase.soma += palavra.numero;
      frase.palavras.push(palavra);
    });
    frase.numero = this.somarDigitos(frase.soma);

    this.frase = frase;
  }

  calcularPorLetras(refPalavra: string): palavra {
    const p: palavra = {
      palavra: this.removeAcento(refPalavra),
      numero: 0,
      soma: 0,
      letras: [],
      consoantes: { soma: 0, numero: 0, letras: [] },
      vogais: { soma: 0, numero: 0, letras: [] },
    };

    for (let i = 0; i < p.palavra.length; i++) {
      let l: letra = {
        letra: p.palavra[i],
        numero: this.somarDigitos(p.palavra[i].charCodeAt(0) - 64)
      };
      p.soma += l.numero;
      p.letras.push(l);
      if (this.esVogal(l.letra)) {
        p.vogais.letras.push(l);
        p.vogais.soma += l.numero;
      } else {
        p.consoantes.letras.push(l);
        p.consoantes.soma += l.numero;
      }
    }
    p.palavra = refPalavra.toLowerCase();
    p.numero = this.somarDigitos(p.soma);
    p.vogais.numero = this.somarDigitos(p.vogais.soma);
    p.consoantes.numero = this.somarDigitos(p.consoantes.soma);

    return p;
  }

  somarDigitos(n): number {
    return (n - 1) % 9 + 1;
  }

  esVogal(c): boolean {
    return 'AEIOU'.includes(c);
  }

  esNumeroMestre(n): boolean {
    if (n < 11) {
      return false;
    }
    let nCasas = Math.floor(Math.log10(n)) + 1;
    let nUns = Number('1'.repeat(nCasas));
    return Number.isInteger(n / nUns);
  }

  removeAcento(text): string {
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

interface conjunto {
  numero: number,
  soma: number,
  letras: letra[],
}

interface palavra extends conjunto {
  palavra: string,
  vogais: conjunto,
  consoantes: conjunto,
}

interface frase {
  frase: string,
  numero: number,
  soma: number,
  palavras: palavra[]
}