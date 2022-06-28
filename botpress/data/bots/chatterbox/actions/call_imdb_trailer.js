  const axios = require('axios')

  const myAction = async params => {
    try {
      const movie = temp.movies[params.movieNumber]
      const result = await axios.get(`https://imdb-api.com/API/Trailer/k_8i9u482p/${movie.id}`)

      const { status, data } = result

      if (status !== 200 || !data) {
        const message = {
          type: 'text',
          text: `Sorry, I couldn\'t find a trailer for this title.`,
          markdown: true
        }
        return await bp.events.replyToEvent(event, [message])
      }

      // Get rating
      const link = {
        type: 'text',
        text: data.link,
        markdown: true
      }

      const message_link = {
        type: 'text',
        text: "Here's a link for the trailer",
        markdown: true
      }
      await bp.events.replyToEvent(event, [message_link, link])
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
  return myAction(args)