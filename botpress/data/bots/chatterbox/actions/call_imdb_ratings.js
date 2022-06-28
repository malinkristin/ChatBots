  const axios = require('axios')

  const myAction = async params => {
    try {
      const movie = temp.movies[params.movieNumber]
      const result = await axios.get(`https://imdb-api.com/API/Ratings/k_8i9u482p/${movie.id}`)

      const { status, data } = result

      if (status !== 200 || !data) {
        const message = {
          type: 'text',
          text: `Sorry, I couldn\'t find anything about how this title is rated.`,
          markdown: true
        }
        return await bp.events.replyToEvent(event, [message])
      }

      // Get rating
      const ratingImdb = data.imDb
      const ratingRotten = data.rottenTomatoes

      const message_imdb = {
        type: 'text',
        text: ratingImdb ? `IMDb gives this title a score of ${ratingImdb}.` : "I couldn't find an IMDb rating.",
        markdown: true
      }
      await bp.events.replyToEvent(event, [message_imdb])

      const message_rt = {
        type: 'text',
        text: ratingRotten
          ? `Rotten Tomatoes gives this title a score of ${ratingRotten}.`
          : "I couldn't find a Rotten Tomatoes rating.",
        markdown: true
      }
      await bp.events.replyToEvent(event, [message_rt])
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