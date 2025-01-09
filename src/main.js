import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import { Router, Route } from 'svelte-routing'

const app = mount(App, {
  target: document.getElementById('app'),
  props: {
    Router,
    Route
  }
})

export default app