<script>
  import { base } from '$app/paths';
  import Home from './routes/Home.svelte';
  import KoPapirOllo from './routes/KoPapirOllo.svelte';
  import Sic_bo from './routes/Sic_bo.svelte';
</script>

<nav>
  <a href="{base}/" class="nav-a">Home</a>
  <a href="{base}/KoPapirOllo" class="nav-a">Kő Papír Olló</a>
  <a href="{base}/Sic-bo" class="nav-a">Sic bo</a>
</nav>

{#if window.location.pathname === base + '/'}
  <Home />
{:else if window.location.pathname === base + '/KoPapirOllo'}
  <KoPapirOllo />
{:else if window.location.pathname === base + '/Sic-bo'}
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
