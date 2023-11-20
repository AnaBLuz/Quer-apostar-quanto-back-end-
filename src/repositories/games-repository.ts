import prisma from "./../database"
import { GameParams } from "protocols"
import { participantRepository } from "./participants-repository";

async function createGame(data: GameParams){
    return prisma.game.create({
        data
    });
}
async function getGames(){
    return prisma.game.findMany();
}

async function getGameById(id: number){
    return prisma.game.findUnique({
        where: { id }
    })
}

async function getGameAndBets(id: number){
   return prisma.game.findUnique({
    where:{
        id
    },
    include: {
        bets: true
    }
   });
} 

async function sumAllBets(gameId: number){
    const allBets = await prisma.bet.findMany({
        where: {
          gameId
        },
      });


  let sumAllBets = 0;
  for(let i =0; i < allBets.length; i++){
    sumAllBets = sumAllBets + allBets[i][5];
  }
  return sumAllBets;

}

async function sumAllwinnersBets(gameId: number, homeTeamScore: number, awayTeamScore: number){
    const allWinnersBets = await prisma.bet.findMany({
        where:{
            gameId,
            homeTeamScore,
            awayTeamScore
        }
    });
    let sumAllWInnersBets = 0;
    for(let i =0; i < allWinnersBets.length; i++){
        sumAllWInnersBets = sumAllWInnersBets + allWinnersBets[i][5];
      }
      return sumAllWInnersBets;

}

async function updateAllBetsAndParticipants(gameId, homeTeamScore, awayTeamScore){
    const sumAllAmountBets: Promise<number> = sumAllBets(gameId);
    const sumallAmountBetsWinners: Promise<number> = sumAllwinnersBets(gameId,homeTeamScore,awayTeamScore);

    const bets = await prisma.bet.findMany({
        where:{
            gameId
        }
    })
    for(let i =0; i < bets.length; i++){
        let newAmountWon = 0;
        if(bets[i].homeTeamScore === homeTeamScore && bets[i].awayTeamScore === awayTeamScore){
            newAmountWon = (bets[i].amountBet / await sumallAmountBetsWinners) * (await sumAllAmountBets) * (1 -0.3);
            await prisma.bet.update({
                where:{
                    id: bets[i].id
                },
                data: {
                    status: 'WON',
	                amountWon: newAmountWon
                }
            })
        }
       else {

        await prisma.bet.update({
            where:{
                id: bets[i].id
            },
            data: {
                status: 'LOST',
                amountWon: newAmountWon
            }
        })

       }
        const participant = await participantRepository.getParticipantById(bets[i].participantId);
        const balance =  participant.balance;
        const newBalance = balance + newAmountWon;
        
        await prisma.participant.update({
            where:{
                id: bets[i].participantId
            },
            data: {
                balance: newBalance
            }
        })

    }
}



async function updateGameToFinished(id: number, homeTeamScore: number, awayTeamScore: number){
      await updateAllBetsAndParticipants(id, homeTeamScore, awayTeamScore);

     return prisma.game.update({
        where:{
            id
        },
        data:{
            homeTeamScore: homeTeamScore,
	        awayTeamScore: awayTeamScore,
	        isFinished: true
        }
     });

}


export const gameRepository = {
    createGame,
    getGames,
    getGameById,
    getGameAndBets,
    updateGameToFinished
}