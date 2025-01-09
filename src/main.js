import App from './App.svelte';
import { base } from '$app/paths';

const app = new App({
  target: document.getElementById('app'),
  props: {
    base: base || ''
  }
});

export default app;
