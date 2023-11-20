# Quer-apostar-quanto-back-end-
back-end de um sistema de apostas que automatiza os seus processos para competir.  

# Demo
```bash
https://casadeapostas.onrender.com
```

# Como funciona?
Este projeto é uma API REST para atender a aplicação de apostas em jogos de futebol. Ela possui três entidades: `Participant`, `Game`, `Bet` definidas no arquivo `schema.prisma`.
Para entidade, foram criadas 7 rotas: 

- POST `/participants`: Cria um novo participante. O nome do novo participante não pode existir anteriormente no banco de dados, caso já exista, um erro 409 é retornado. A estrutura esperada para o participant é: 
```
{
    name: string;
	balance: number; 
}
```
Se a estrutura não for respeitada, um erro 422 é retornado.

- POST `/games`: Cria um novo jogo, com placar inicial 0x0 e marcado como não finalizado. A estrutura esperada para o jogo é: 

```
{
	homeTeamName: string;
	awayTeamName: string;
}
```
Se a estrutura não for respeitada, um erro 422 é retornado.

- POST `/bets`: Cadastra uma aposta de um participante em um determinado jogo. O valor da aposta é descontado imediatamente do saldo do participante. A estrutura esperada para a aposta é:

```
{ 
	homeTeamScore: number;
	awayTeamScore: number; 
	amountBet: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
	gameId: number; 
	participantId: number;
}
```
Se a estrutura não for respeitada, um erro 422 é retornado.

- POST `/games/:id/finish`: Finaliza um jogo e consequentemente atualiza todas as apostas atreladas a ele, calculando o valor ganho em cada uma e atualizando o saldo dos participantes ganhadores. A estrutura esperada é:
```
{
	homeTeamScore: number;
	awayTeamScore: number;
}
```
Se a estrutura não for respeitada, um erro 422 é retornado.

- GET `/participants`: Retorna todos os participantes e seus respectivos saldos.

- GET `/games`: Retorna todos os jogos cadastrados.

- GET `/games/:id`: Retorna os dados de um jogo junto com as apostas atreladas a ele. Caso o jogo não existe retorna um erro 404.


# Motivação 
Este projeto foi feito para praticar a construção de uma API REST usando o ecossistema Node e Express junto com as tecnologias TypeScript e Prisma.

# Tecnologias utilizadas
Para este projeto, foram utilizadas:

- Node (versão 18.17.0);
- Express;
- TypeScript;
- Prisma;
- Postgres;
- Jest e Supertest;


# Como rodar em desenvolvimento

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Run all migrations

```bash
npx prisma migrate dev
```

4. Run the back-end in a development environment:

```bash
npm run dev
```
