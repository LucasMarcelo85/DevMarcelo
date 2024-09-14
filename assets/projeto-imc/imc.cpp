#include <iostream>
#include <stdio.h>

int main(int argc, char** argv) {
    float imc = 0, peso = 0, altura = 0;

    do {
        printf("\n \t Digite seu peso (em kg): ");
        scanf("%f", &peso);
        if (peso < 30 || peso > 250) {
            printf("\n \t Peso inv�lido. Por favor, digite um valor entre 30 kg e 200 kg.\n");
        }
    } 
	while (peso < 30 || peso > 200);

    do {
        printf("\n \t Digite sua altura (em metros): ");
        scanf("%f", &altura);
        if (altura < 1.2 || altura > 2.5) {
            printf("\n \t Altura inv�lida. Por favor, digite um valor entre 1,2 m e 2,5 m.\n");
        }
    } 
	while (altura < 1.2 || altura > 2.5);

    imc = peso / (altura * altura);

    printf("\n \t Seu IMC e = %.2f\n", imc);
    
    if (imc < 18.5) {
        printf ("\n\t Voce esta abaixo do peso normal");
    }
    else if (imc >= 18.5 && imc <= 24.9) {
        printf ("\n\t Seu peso esta normal");
    }
    else if (imc >= 25.0 && imc <= 29.9) {
        printf ("\n\t Voce esta com excesso de peso");
    }
    else if (imc >= 30.0 && imc <= 34.9) {
        printf ("\n\t Voce este em obesidade classe I");
    }
    else if (imc >= 35.0 && imc <= 39.9) {
        printf ("\n\t Voce este em obesidade classe II");
    }
    else {
        printf ("\n\t Voc� est� em obesidade classe III");
    }

    return 0;
}

