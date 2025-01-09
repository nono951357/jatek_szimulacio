<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import KoPapirOllo from './routes/KoPapirOllo.svelte';
  import Sic_bo from './routes/Sic_bo.svelte';
</script>

<Router>
  <nav>
    <Link to="/" class="nav-a">Home</Link>
    <Link to="/KoPapirOllo" class="nav-a">Kő Papír Olló</Link>
    <Link to="/Sic-bo" class="nav-a">Sic bo</Link>
  </nav>
  <Route path="/" class="nav-a" component={Home} />
  <Route path="/KoPapirOllo" component={KoPapirOllo} />
  <Route path="/Sic-bo" component={Sic_bo} />
</Router>

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
