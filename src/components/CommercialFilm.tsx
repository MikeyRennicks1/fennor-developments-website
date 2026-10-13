import FilmPlayer from './FilmPlayer';

export default function CommercialFilm() {
  return <section className="cs-film cs-shell" id="commercial-film" aria-labelledby="commercial-film-title">
    <div className="cs-section-label"><span>THE COMMERCIAL ENERGY JOURNEY</span><span>36 seconds / Fennor film</span></div>
    <div className="cs-film-heading"><h2 id="commercial-film-title">From the roof.<br /><em>Into your working day.</em></h2><div><p>Machinery. Lighting. Electric heating and ventilation. See how on-site solar can contribute to the electricity your business uses during daylight hours.</p><a className="cs-link" href="#working-day">Explore your operating pattern ↓</a></div></div>
    <div className="cs-film-screen"><FilmPlayer src="/films/fennor-commercial-web-1080.mp4" poster="/images/commercial-film-poster.webp" label="Play the 36-second Fennor commercial solar film" descriptionId="cs-film-description" /></div>
    <div className="cs-film-caption"><p id="cs-film-description">Concept film · An illustrative energy journey, not a completed customer project or a savings calculation. Silent, with on-screen text. Press play when you’re ready.</p><a className="cs-link" href="#commercial-enquiry">Explore the potential at your site ↗</a></div>
    <details className="cs-film-transcript"><summary>Check the figures and grant sources</summary><div>
      <p>The consumption range comes from <a className="cs-link" href="https://www.procure.ie/average-electricity-usage-for-businesses/" target="_blank" rel="noopener noreferrer">Procure.ie’s customer-data benchmark ↗</a>. Its sample is not an official nationwide business average; sector, operating hours and equipment can change demand substantially. For your proposal, we use your own electricity history to understand the pattern at your premises.</p>
      <p>Grant terms rechecked on 9 October 2026 against <a className="cs-link" href="https://www.seai.ie/grants/business-grants/commercial-solar-pv" target="_blank" rel="noopener noreferrer">SEAI’s current commercial solar guidance ↗</a>. We explain the application steps and current terms with you before you proceed. Batteries and other extras are outside the PV grant calculation. Your offer has its own completion conditions.</p>
      <a className="cs-link" href="#commercial-funding">Explore the system-size grant allowance ↓</a>
    </div></details>
  </section>;
}
