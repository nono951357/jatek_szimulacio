<script>
    import { writable } from 'svelte/store';

    let dice = writable([1, 1, 1]);
    let result = writable('');
    let bet = writable('');
    let betResult = writable('');

    // Manuális súlyok
    let bigWeight = writable(0.5);
    let smallWeight = writable(0.5);
    let manualSampleSize = writable(10);

    // Véletlenszerű választás
    function getRandomChoice() {
        return Math.random() < 0.5 ? 'Nagy' : 'Kicsi';
    }
    let randomSampleSize = writable(10);

    let manualWinChances = writable({ nagy: 0, kicsi: 0 });
    let randomWinChances = writable({ nagy: 0, kicsi: 0 });

    // Game statistics
    let gamesPlayed = writable(0);
    let playerWins = writable(0);
    let computerWins = writable(0);
    let totalBets = writable(0);

    function rollDice() {
        dice.set([
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1
        ]);
        calculateResult();
        gamesPlayed.update(n => n + 1);
        totalBets.update(n => n + 1);
    }

    function calculateResult() {
        const [d1, d2, d3] = $dice;
        const sum = d1 + d2 + d3;
        result.set(`Dobások: ${d1}, ${d2}, ${d3} (Összeg: ${sum})`);

        if (($bet === 'Nagy' && sum >= 11 && sum <= 17 && !(d1 === d2 && d2 === d3)) ||
            ($bet === 'Kicsi' && sum >= 4 && sum <= 10 && !(d1 === d2 && d2 === d3))) {
            betResult.set('Nyertél!');
            playerWins.update(n => n + 1);
        } else {
            betResult.set('Vesztettél!');
            computerWins.update(n => n + 1);
        }
    }

    // Szimulációs logika
    function simulateGame() {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        const dice3 = Math.floor(Math.random() * 6) + 1;
        const sum = dice1 + dice2 + dice3;
        const isTriple = dice1 === dice2 && dice2 === dice3;

        if (sum >= 11 && sum <= 17 && !isTriple) {
            return 'Nagy';
        } else if (sum >= 4 && sum <= 10 && !isTriple) {
            return 'Kicsi';
        }
        return 'Vesztett';
    }

    function generateManualResults() {
        let nagyWins = 0;
        let kisWins = 0;

        for (let i = 0; i < $manualSampleSize; i++) {
            const result = simulateGame();
            const rand = Math.random();
            if (rand < $bigWeight && result === 'Nagy') {
                nagyWins++;
            } else if (rand >= $bigWeight && result === 'Kicsi') {
                kisWins++;
            }
        }

        manualWinChances.set({
            nagy: (nagyWins / $manualSampleSize) * 100,
            kicsi: (kisWins / $manualSampleSize) * 100
        });
    }

    function generateRandomResults() {
        let nagyWins = 0;
        let kisWins = 0;

        for (let i = 0; i < $randomSampleSize; i++) {
            const result = simulateGame();
            if (result === 'Nagy') {
                nagyWins++;
            } else if (result === 'Kicsi') {
                kisWins++;
            }
        }

        randomWinChances.set({
            nagy: (nagyWins / $randomSampleSize) * 100,
            kicsi: (kisWins / $randomSampleSize) * 100
        });
    }

    function adjustWeights(weight, otherWeight) {
        if (weight + otherWeight > 1) {
            otherWeight.set(1 - weight);
        }
    }
</script>

<style>
    main {
        text-align: center;
        padding: 2rem;
        background: linear-gradient(135deg, #1f1c2c, #928dab);
        color: white;
        font-family: 'Roboto', sans-serif;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        background-image: url('https://www.transparenttextures.com/patterns/cubes.png');
        max-width: 800px;
        margin: 0 auto;
    }

    h1 {
        font-family: 'Orbitron', sans-serif;
        color: #4CAF50;
        text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00, 0 0 20px #00ff00;
    }

    p {
        font-family: 'Roboto', sans-serif;
        color: #ddd;
    }

    button {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Orbitron', sans-serif;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #45a049;
    }

    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        opacity: 0.7;
    }

    button:disabled:hover {
        background-color: #cccccc;
    }

    select {
        padding: 10px;
        margin: 10px;
        font-family: 'Roboto', sans-serif;
        background: white;
        border: none;
        color: black;
        border-radius: 5px;

    }

    .result {
        font-size: 1.2em;
        margin-top: 20px;
    }

    .bet-result {
        font-size: 1.5em;
        margin-top: 10px;
        font-weight: bold;
    }

    .futuristic {
        font-family: 'Orbitron', sans-serif;
        text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00, 0 0 20px #00ff00;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }
    table {
        width: 80%;
        border-collapse: collapse;
        margin: 20px auto;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        overflow: hidden;
    }

    th, td {
        border: 1px solid #4CAF50;
        padding: 12px;
        text-align: center;
        color: white;
    }

    th {
        background-color: #4CAF50;
        color: white;
        font-family: 'Orbitron', sans-serif;
        text-transform: uppercase;
    }

    tr:nth-child(even) {
        background-color: rgba(76, 175, 80, 0.1);
    }

    tr:hover {
        background-color: rgba(76, 175, 80, 0.2);
    }
</style>

<main>
    <h1>Sic Bo</h1>
    <p>Tedd meg a tétet és dobj a kockákkal!</p>
    <select bind:value={$bet}>
        <option value="">Válassz egy opciót</option>
        <option value="Nagy">Nagy (11-17)</option>
        <option value="Kicsi">Kicsi (4-10)</option>
        
    </select>
    <button on:click={rollDice} disabled={!$bet}>Dobás</button>
    <p class="result">{$result}</p>
    <p class="bet-result">{$betResult}</p>


    <h2 class="futuristic">Játék Statisztika</h2>
        <table class="centered">
            <thead>
                <tr>
                    <th>Statisztika</th>
                    <th>Érték</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Lejátszott játékok száma</td>
                    <td>{$gamesPlayed}</td>
                </tr>
                <tr>
                    <td>Játékos nyerések</td>
                    <td>{$playerWins}</td>
                </tr>
                <tr>
                    <td>Ház nyerések</td>
                    <td>{$computerWins}</td>
                </tr>
                <tr>
                    <td>Összes tét</td>
                    <td>{$totalBets}</td>
                </tr>
                <tr>
                    <td>Nyerési arány</td>
                    <td>{$gamesPlayed > 0 ? (($playerWins / $gamesPlayed) * 100).toFixed(2) : 0}%</td>
                </tr>
            </tbody>
        </table>

    <section>
        <h2 class="futuristic">Manuális súly beállítás</h2>
        <label>
            Nagy súly: {$bigWeight}
            <input type="range" min="0" max="1" step="0.01" bind:value={$bigWeight} on:input={() => adjustWeights($bigWeight, smallWeight)} />
        </label>
        <label>
            Kicsi súly: {$smallWeight}
            <input type="range" min="0" max="1" step="0.01" bind:value={$smallWeight} on:input={() => adjustWeights($smallWeight, bigWeight)} />
        </label>
        <label>
            Minta mérete:
            <input type="number" min="1" bind:value={$manualSampleSize} />
        </label>
        <button on:click={generateManualResults}>Manuális eredmények generálása</button>
    </section>

    <section>
        <h2 class="futuristic">Véletlenszerű választás</h2>
        <label>
            Minta mérete:
            <input type="number" min="1" max="100000000" bind:value={$randomSampleSize} />
        </label>
        <button on:click={generateRandomResults}>Véletlenszerű eredmények generálása</button>
    </section>

    <section>
        <h2 class="futuristic">Nyertes esélyek</h2>
        <div class="grid">
            <div>
                <h3>Manuális nyertes esélyek</h3>
                <p>Nagy nyerési esély: {$manualWinChances.nagy}%</p>
                <p>Kicsi nyerési esély: {$manualWinChances.kicsi}%</p>
            </div>
            <div>
                <h3>Véletlenszerű nyertes esélyek</h3>
                <p>Nagy nyerési esély: {$randomWinChances.nagy}%</p>
                <p>Kicsi nyerési esély: {$randomWinChances.kicsi}%</p>
            </div>
        </div>
    </section>
</main>