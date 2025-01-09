<script>
    import { writable } from 'svelte/store';

    var oneThird = 1/3;
    // Manuális súlyok
    let rockWeight = writable(oneThird);
    let paperWeight = writable(oneThird);
    let scissorsWeight = writable(oneThird);
    let manualSampleSize = writable(10);

    // Véletlenszerű választás
    function getRandomChoice() {
        const choices = ['Kő', 'Papír', 'Olló'];
        return choices[Math.floor(Math.random() * choices.length)];
    }
    let randomSampleSize = writable(10);

    // Játszható játék
    let playerChoice = writable('');
    let computerChoice = writable('');
    let result = writable('');

    let manualWinChances = writable({ kő: 0, papír: 0, olló: 0 });
    let randomWinChances = writable({ kő: 0, papír: 0, olló: 0 });

    let gamesPlayed = writable(0);
    let playerWins = writable(0);
    let computerWins = writable(0);
    let draws = writable(0);

    function playGame(choice) {
        playerChoice.set(choice);
        const computer = getRandomChoice();
        computerChoice.set(computer);
        determineWinner(choice, computer);
        gamesPlayed.update(n => n + 1);
    }

    function determineWinner(player, computer) {
        if (player === computer) {
            result.set('Döntetlen');
            draws.update(n => n + 1);
        } else if (
            (player === 'Kő' && computer === 'Olló') ||
            (player === 'Papír' && computer === 'Kő') ||
            (player === 'Olló' && computer === 'Papír')
        ) {
            result.set('Játékos nyert');
            playerWins.update(n => n + 1);
        } else {
            result.set('Számítógép nyert');
            computerWins.update(n => n + 1);
        }
    }

    function generateManualResults() {
        let rockWins = 0;
        let paperWins = 0;
        let scissorsWins = 0;

        for (let i = 0; i < $manualSampleSize; i++) {
            const rand = Math.random();
            if (rand < $rockWeight) {
                rockWins++;
            } else if (rand < $rockWeight + $paperWeight) {
                paperWins++;
            } else {
                scissorsWins++;
            }
        }

        manualWinChances.set({
            kő: (rockWins / $manualSampleSize) * 100,
            papír: (paperWins / $manualSampleSize) * 100,
            olló: (scissorsWins / $manualSampleSize) * 100
        });
    }

    function generateRandomResults() {
        let rockWins = 0;
        let paperWins = 0;
        let scissorsWins = 0;

        for (let i = 0; i < $randomSampleSize; i++) {
            const choice = getRandomChoice();
            if (choice === 'Kő') {
                rockWins++;
            } else if (choice === 'Papír') {
                paperWins++;
            } else if (choice === 'Olló') {
                scissorsWins++;
            }
        }

        randomWinChances.set({
            kő: (rockWins / $randomSampleSize) * 100,
            papír: (paperWins / $randomSampleSize) * 100,
            olló: (scissorsWins / $randomSampleSize) * 100
        });
    }
</script>

<style>
    main {
        background: linear-gradient(135deg, #1f1c2c, #928dab);
        color: white;
        font-family: 'Roboto', sans-serif;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        background-image: url('https://www.transparenttextures.com/patterns/cubes.png');
        max-width: 800px;
        margin: 0 auto;
    }

    h1, h2, h3 {
        text-align: center;
        font-family: 'Orbitron', sans-serif;
    }

    section {
        margin-bottom: 20px;
        background: rgba(0, 0, 0, 0.5);
        padding: 20px;
        border-radius: 10px;
    }

    label {
        display: block;
        margin: 10px 0;
    }

    input[type="range"], input[type="number"] {
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        padding: 5px;
        border-radius: 5px;
    }

    button {
        display: block;
        margin: 10px auto;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Orbitron', sans-serif;
    }

    button:hover {
        background-color: #45a049;
    }

    .icon {
        display: inline-block;
        margin-right: 10px;
    }

    .futuristic {
        font-family: 'Orbitron', sans-serif;
        text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00, 0 0 20px #00ff00;
    }

    .centered {
        text-align: center;
    }

    .icon-button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Orbitron', sans-serif;
    }

    .icon-button img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
    }

    .icon-button:hover {
        background-color: #45a049;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }

    th {
        background-color: #4CAF50;
        color: white;
    }

    tr:nth-child(even) {
        background-color: #666666;
    }

    tr:hover {
        background-color: #7dc561;
    }
</style>

<main>
    <h1>Kő Papír Olló</h1>
    <h1 class="futuristic">Üdvözöljük a KőPapírOlló oldalon</h1>
    <p>Ez egy új oldal a SvelteKit projektedben.</p>

    <section>
        <h2 class="futuristic">Manuális súly beállítás</h2>
        <label>
            Kő súly: {$rockWeight}
            <input type="range" min="0" max="1" step="0.01" bind:value={$rockWeight} />
        </label>
        <label>
            Papír súly: {$paperWeight}
            <input type="range" min="0" max="1" step="0.01" bind:value={$paperWeight} />
        </label>
        <label>
            Olló súly: {$scissorsWeight}
            <input type="range" min="0" max="1" step="0.01" bind:value={$scissorsWeight} />
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
                <p>Kő nyerési esély: {$manualWinChances.kő}%</p>
                <p>Papír nyerési esély: {$manualWinChances.papír}%</p>
                <p>Olló nyerési esély: {$manualWinChances.olló}%</p>
            </div>
            <div>
                <h3>Véletlenszerű nyertes esélyek</h3>
                <p>Kő nyerési esély: {$randomWinChances.kő}%</p>
                <p>Papír nyerési esély: {$randomWinChances.papír}%</p>
                <p>Olló nyerési esély: {$randomWinChances.olló}%</p>
            </div>
        </div>
    </section>
    <section>
        <h2 class="futuristic">Játssz Kő-Papír-Ollót</h2>
        <div class="grid">
            <button class="icon-button" on:click={() => playGame('Kő')}>
                <img src="/assets/rock.png" class="icon" alt="Kő" />Kő
            </button>
            <button class="icon-button" on:click={() => playGame('Papír')}>
                <img src="/assets/paper.png" class="icon" alt="Papír" />Papír
            </button>
            <button class="icon-button" on:click={() => playGame('Olló')}>
                <img src="/assets/scissors.png" class="icon" alt="Olló" />Olló
            </button>
        </div>
        <p class="centered">Játékos választása: {$playerChoice}</p>
        <p class="centered">Számítógép választása: {$computerChoice}</p>
        <p class="centered">Eredmény: {$result}</p>
        <br>
        <h2 class="futuristic">Statisztika</h2>
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
                    <td>Számítógép nyerések</td>
                    <td>{$computerWins}</td>
                </tr>
                <tr>
                    <td>Döntetlenek</td>
                    <td>{$draws}</td>
                </tr>
                <tr>
                    <td>Nyerési arány</td>
                    <td>{$gamesPlayed > 0 ? (($playerWins / $gamesPlayed) * 100).toFixed(2) : 0}%</td>
                </tr>
            </tbody>
        </table>
    </section>
</main>