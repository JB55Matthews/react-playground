import './styles/App.css'
import Header from './components/Header'
import TimerApp from './components/timer/TimerApp'
import MarbleJar from './components//marbles/MarbleJar'
import SinRadio from './components/SinRadio/SinRadio'
import ProjectHeader from './components/ProjectHeader'

function App() {

  return (
    <>
    <Header />
    <ProjectHeader name="Timer and Stopwatch" desc="A timer and stopwatch that can be set, paused, and reset"/>
    <TimerApp />
    <ProjectHeader name="Marble Jar" desc="A jar you can shake and watch the marbles bounce"/>
    <MarbleJar />
    <ProjectHeader name="Sin Wave Radio" desc="A little radio where you can tune the sin wave"/>
    <SinRadio />
    <footer>
      Jason Matthews | Thanks for scrolling through!
    </footer>
    </>
  )
}

export default App