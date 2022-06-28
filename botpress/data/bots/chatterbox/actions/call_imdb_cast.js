  const axios = require('axios')

  const myAction = async params => {
    try {
      const movie = temp.movies[params.movieNumber]
      const result = await axios.get(`https://imdb-api.com/API/FullCast/k_8i9u482p/${movie.id}`)

      const { status, data } = result

      // Check if we found movies
      if (status !== 200 || !data) {
        const message = {
          type: 'text',
          text: `Sorry, I couldn't find any cast information.`,
          markdown: true
        }
        return await bp.events.replyToEvent(event, [message])
      }

      const actors = data.actors
      for (var i = 0; i < 5; i++) {
        if (actors[i]) {
          const message = {
            type: 'text',
            text: `${actors[i].name} plays ${actors[i].asCharacter}`,
            markdown: true
          }
          await bp.events.replyToEvent(event, [message])
        }
      }

      const message = {
        type: 'text',
        text: `If you want to know more about an actor, aks me about them separately.`,
        markdown: true
      }
      await bp.events.replyToEvent(event, [message])
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