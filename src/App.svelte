<script>
  import Home from './routes/Home.svelte';
  import KoPapirOllo from './routes/KoPapirOllo.svelte';
  import Sic_bo from './routes/Sic_bo.svelte';
  
  let currentPath = window.location.pathname.replace('/jatek_szimulacio', '') || '/';
</script>

<nav>
  <a href="/jatek_szimulacio/" class="nav-a" on:click={() => currentPath = '/'}>Home</a>
  <a href="/jatek_szimulacio/KoPapirOllo" class="nav-a" on:click={() => currentPath = '/KoPapirOllo'}>Kő Papír Olló</a>
  <a href="/jatek_szimulacio/Sic-bo" class="nav-a" on:click={() => currentPath = '/Sic-bo'}>Sic bo</a>
</nav>

{#if currentPath === '/'}
  <Home />
{:else if currentPath === '/KoPapirOllo'}
  <KoPapirOllo />
{:else if currentPath === '/Sic-bo'}
  <Sic_bo />
{/if}

<style>

  nav {
    display: flex;
    justify-content: space-evenly;
    background-color: #333;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  :global(.nav-a) {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.2em;
    transition: color 0.3s;
  }

  :global(.nav-a:hover) {
    color: #4CAF50;
  }
</style>
