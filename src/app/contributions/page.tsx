import styles from './contributions.module.css';

const engagements = [
  'Speaker at the 2025 EFMD Asia Conference at the Republic of Korea in July 2025.',
  "Speaker at AIKP'25 – ENAE Business School at Spain in October 2025.",
  'Speaker at The Smartcities & Sport Summit 2025 at Seoul, Republic of Korea in October 2025.',
  'Speaker at Academy of Management 2025 at Denmark in July 2025.',
  'Speaker at WEBIT 2025 at Sofia in June 2025.',
  'Speaker at World AI Summit 2025 at San Francisco in June 2025.',
  'Speaker at Asia Techx at Singapore in May 2025.',
  'Speaker at the 2025 EFMD Doctoral Programme Conference in London in April 2025.',
  'Speaker at DISB 2025 at Romania in April 2025.',
  'Speaker at AI Everything 2025 at Dubai in February 2025.',
  'Speaker at THE Campus Live SE Asia 2024 in Malaysia, November 2024.',
  'Speaker at the 2024 BSIS Symposium Online: "AI in Business Education for Positive Impact," October 2024.',
  'Speaker at the Gastech 2024 Conference in Houston, USA, September 2024.',
  'Speaker at BioTechX 2024 in Philadelphia, USA, September 2024.',
  'Conducted Faculty Workshop on "AI for Research" at Adelphi University, New York, September 2024.',
  'Speaker at Identity Week America 2024 in Washington, DC, September 2024.',
  'Speaker at AI4 Conference 2024 in Las Vegas, USA, August 2024.',
  'Speaker at the Global Conference on Human Rights and AI at the University of Ljubljana, Slovenia, June 2024.',
  'Speaker at AABS Connect Conference in Johannesburg, South Africa, June 2024.',
  'Speaker at ICEDU 2024 Conference in Colombo, Sri Lanka, May 2024.',
  'Speaker at QS Higher Education Summit 2024 in UAE, February 2024.',
  'Speaker at Med-Tech Roadshow in Dubai, February 2024.',
  'Speaker at AABS African Deans & Directors Forum 2023 in Mauritius, November 2023.',
  'Speaker at QS Higher Education Summit 2023 in Malaysia, November 2023.',
  'Speaker at Global Entrepreneurship Summit 2023 in Canada, October 2023.',
  'Speaker at the 31st CEEMAN Annual Conference in Almaty, Kazakhstan, September 2023.',
  'Keynote Speaker at CISAT 2023 in China, May 2023.',
  'Speaker at DISBA Seminar at RMIT, Australia, February 2023.',
  'Keynote Speaker at ICITIM 2023 in Guangzhou, China, January 2023.',
  'Speaker at Charity AI Webinar by Data Phoenix: "NLP and Machine Learning in Healthcare."',
  'Speaker at AI in Healthcare Summit 2022 in South Africa.',
  'Speaker at Global Virtual MarTech Summit, European Track, August 2022.',
  'Speaker at De Vinci International Week at Pole Leonard De Vinci University, France, 2021.',
];

export default function ContributionsPage() {
  return (
    <>
      <div className="page-banner">
        <h1>Speaking <span className="accent-text">Engagements</span></h1>
        <p className="breadcrumb"><a href="/">Home</a> / Contributions</p>
      </div>

      <section className="section">
        <div className="container">
          <p className={styles.intro}>
            Join me as I share insights and experiences from my speaking engagements, where I explore the intersection of technology and business.
          </p>
          <div className={styles.timeline}>
            {engagements.map((e, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.dot} />
                <p>{e}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
