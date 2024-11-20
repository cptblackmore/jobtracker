import { Container, CssBaseline, Stack } from '@mui/material'
import { VacancyCard, VacancyData } from '@entities/VacancyCard'
import { css, Global } from '@emotion/react'

const vacancies: Array<VacancyData> = [
  {
    profession: 'Frontend Developer',
    firmName: 'Tech Solutions Ltd',
    town: 'Москва',
    description: 'Разработка интерфейсов на React и TypeScript, участие в проектировании UI/UX, поддержка и развитие существующего функционала. Требуется опыт работы в команде разработки, а также знание: HTML, CSS, JavaScript, React, TypeScript, Redux, React Native. Навыки владения английским языком приветствуются.',
    source: 0,
    paymentFrom: 120000,
    paymentTo: 150000,
    currency: 'rub',
    link: 'https://example.com/',
    datePublished: 1731385211 // День назад
  },
  {
    profession: 'Data Scientist',
    firmName: 'Инновации и Аналитика',
    town: 'Санкт-Петербург',
    description: 'Анализ и обработка данных, построение моделей машинного обучения, оптимизация бизнес-процессов на основе данных.',
    source: 0,
    paymentFrom: 150000,
    paymentTo: 200000,
    currency: 'rub',
    link: 'https://example.com/',
    datePublished: 1730901006 // 6 дней назад
  },
  {
    profession: 'Project Manager',
    firmName: 'Digital Future',
    town: 'Новосибирск',
    description: 'Управление проектами, взаимодействие с клиентами и командой разработки, контроль выполнения сроков и бюджета проекта.',
    source: 0,
    paymentFrom: 5000,
    paymentTo: 6300,
    currency: 'usd',
    link: 'https://example.com/',
    datePublished: 1720385204 // 4 месяца назад
  }
]

// fetch('https://api.superjob.ru/2.0/vacancies/?t=4&count=10', {
//   method: 'GET', // или 'POST', 'PUT' и т.д.
//   headers: {
//     'X-Api-App-Id': 'v3.r.127820309.b68cc20ac962d5436d1f0f980e84fc6c604d5ded.c1c4d1a9f2ba2dc80ce328f4808fbe72d97346dd',
//   }
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Ошибка:', error));

function App() {
  return (
    <>
      <CssBaseline>
          <Global
            styles={css`
              body {
                background-color:#36364d;
                padding-top: 0.5em;
              }
            `}
          />
          <Container maxWidth='lg'>
            <Stack
              direction='column'
              spacing={1}
            >
              {
                vacancies.map((vdata, i) => <VacancyCard key={i} data={vdata} />)
              }
            </Stack>
          </Container>
      </CssBaseline>
    </>
  )
}

export default App
