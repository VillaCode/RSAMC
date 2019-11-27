import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';


@Injectable()
export class RsaService {

  primes: number[];
  publicKey: number;
  privateKey: number;
  modulo: number;
  

  constructor() { 
    this.generaLlaves();
  }


  encripta(message: string){
    let asciiKeys = [];
    for (var i = 0; i < message.length; i ++)
      asciiKeys.push(message[i].charCodeAt(0));
    
    for (let i = 0; i < asciiKeys.length; i++) {
      let exp = asciiKeys[i] ** this.privateKey;
      asciiKeys[i] = exp % this.modulo;
    }

    return asciiKeys;
  }


  desencripta(codigos: number[]){
    
  }


  generaLlaves(){
    let p = this.randomPrime(); 
    let q = this.randomPrime();

    let x = 255;
    let y = 13;
    let xy = x*y;
    let eq = (p-1)*(q-1) + 1;

    while (xy != eq) {
      x += 1;
      y = Math.floor(eq / x);
      xy = x*y;
    }

    this.publicKey = x;
    this.privateKey = y;
    this.modulo = p*q;

  }

  



 




  //////////////////////////////UTILIDADES///////////////////////////////////////////////////////

  randomPrime() {
    while (true) {
      let p = Math.floor((Math.random() * 100) + 1);

      if (this.isPrime(p)) {
        return p;
      } 
    }
  }

  isPrime(num) {
    for(var i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num > 1;
  }

  gcd (a, b){
   var r;
   while (b>0)
   {
      r=a%b;
      a=b;
      b=r;
   }
   return a;
  }

  potencia(a, b){
   var temp=1, i;
   for(i=1;i<=b;i++)
      temp*=a;
    return temp;
  }


  

}
