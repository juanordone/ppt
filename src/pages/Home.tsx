import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { calculatorOutline } from 'ionicons/icons';
import './Home.css';

interface GameResult {
  playerChoice: string;
  computerChoice: string;
  result: string;
  winner: string;
}

const Home: React.FC = () => {
  const options: string[] = ['roca', 'papel', 'tijera'];
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);

  function play() {
    const computerChoice = options[Math.floor(Math.random() * options.length)];
    const playerChoice = options[Math.floor(Math.random() * options.length)];
    setPlayerChoice(playerChoice);
    setComputerChoice(computerChoice);

    let newResult: GameResult;
    if (playerChoice === computerChoice) {
      newResult = {
        playerChoice,
        computerChoice,
        result: 'Empate!',
        winner: 'Empate',
      };
    } else if (
      (playerChoice === 'roca' && computerChoice === 'tijera') ||
      (playerChoice === 'papel' && computerChoice === 'roca') ||
      (playerChoice === 'tijera' && computerChoice === 'papel')
    ) {
      newResult = {
        playerChoice,
        computerChoice,
        result: 'Tu ganas!',
        winner: 'Jugador',
      };
    } else {
      newResult = {
        playerChoice,
        computerChoice,
        result: 'Tu pierdes!',
        winner: 'Máquina',
      };
    }

    setResult(newResult.result);
    setGameHistory([...gameHistory, newResult].slice(-10));
  }

  function reset() {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setGameHistory([]);
  }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Juego de Roca, Papel o Tijera</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              {computerChoice && (
                <div className="choice">
                  <IonIcon icon={calculatorOutline} />
                  <IonLabel>{computerChoice}</IonLabel>
                </div>
              )}
            </IonCol>
            <IonCol>
              {playerChoice && (
                <div className="choice">
                  <IonIcon icon={calculatorOutline} />
                  <IonLabel>{playerChoice}</IonLabel>
                </div>
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={play}>
                Jugar
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={reset}>
                Reiniciar
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {result && <h2>{result}</h2>}
              {gameHistory.length > 0 && (
                <div>
                  <h3>Historial de partidas:</h3>
                  <ul>
                    {gameHistory.map((game: GameResult, index: number) => (
                      <li key={index}>
                        Jugador: {game.playerChoice} - Máquina: {game.computerChoice} - Resultado: {game.result} - Ganador: {game.winner}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
};

export default Home;


