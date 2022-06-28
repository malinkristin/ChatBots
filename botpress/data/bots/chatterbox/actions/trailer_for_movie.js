  const axios = require('axios')

  const myAction = async () => {
    try {
      console.log(event.nlu.slots.title.value)

      const findMovie = await axios.get(
        `https://imdb-api.com/API/SearchTitle/k_8i9u482p/${event.nlu.slots.title.value}`
      )

      if (findMovie.status !== 200 || !findMovie.data) {
        const message = {
          type: 'text',
          text: `Sorry, I couldn't find that title.`,
          markdown: true
        }
        return await bp.events.replyToEvent(event, [message])
      }
      const results = findMovie.data.results
      const result = await axios.get(`https://imdb-api.com/API/Trailer/k_8i9u482p/${results[0].id}`)

      const { status, data } = result

      // Check if we found movies
      if (status !== 200 || !data || data.link === null) {
        const message = {
          type: 'text',
          text: `Sorry, I couldn't find a trailer for that title.`,
          markdown: true
        }
        return await bp.events.replyToEvent(event, [message])
      }

      // Get link
      const link = {
        type: 'text',
        text: `${data.link}`,
        markdown: true
      }
      const message = {
        type: 'text',
        text: `Here's a link for a trailer. 🎥`,
        markdown: true
      }
      return await bp.events.replyToEvent(event, [message, link])
    } catch (err) {
      console.error(err)
      const message = {
        type: 'text',
        text: `I messed up. Could you try again from the start?`,
        markdown: true
      }
      return await bp.events.replyToEvent(event, [message])
    }
  }
  return myAction()